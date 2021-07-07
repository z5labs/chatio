import { ref, Ref, watch } from 'vue';
import Libp2p, { Connection } from 'libp2p';
import uint8arrayFromString from 'uint8arrays/from-string';
import uint8arrayToString from 'uint8arrays/to-string';
import { Message as pbMessage } from 'src/proto/message';

export interface Message {
  user: string;
  body: string;
  created: number;
}

export interface ChatConn {
  messages: Ref<Message[]>;
  disconnect: () => void;
  send: (message: Message) => Promise<void|null>;
}

export const connect = (node: Ref<Libp2p|null>, topic: string): ChatConn => {
  const messages = ref<Message[]>([]);
  const handler = handleMessage(messages);
  const peers = new Set();

  watch(node, libp2p => {
    if (!libp2p) return;

    libp2p.on('peer:connect', (conn: Connection) => {
      console.log('Connected to', conn.remotePeer.toB58String());
      if (peers.has(conn.remotePeer.toB58String())) return;
      peers.add(conn.remotePeer.toB58String());
    });

    libp2p.on('peer:disconnect', (conn: Connection) => {
      console.log('Disconnected from', conn.remotePeer.toB58String());
      peers.delete(conn.remotePeer.toB58String());
    });

    libp2p.pubsub.on(topic, handler);
    libp2p.pubsub.subscribe(topic);
  });

  return {
    messages: messages,
    disconnect: () => {
      if (!node.value) return;
      node.value.pubsub.removeListener(topic, handler);
      node.value.pubsub.unsubscribe(topic);
    },
    send: async (message: Message) => {
      if (!node.value) return;

      const msg = pbMessage.encode({
        user: message.user,
        body: uint8arrayFromString(message.body),
        created: message.created
      }).finish();

      await node.value.pubsub.publish(topic, msg);
    },
  };
};

const handleMessage = (messages: Ref<Message[]>) => (message: {data?: (Uint8Array|null)}) => {
  if (!message || !message.data) return;

  const msg = pbMessage.decode(message.data);

  messages.value.push({
    user: msg.user,
    body: uint8arrayToString(msg.body),
    created: msg.created
  });
};
