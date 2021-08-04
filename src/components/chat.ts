import Libp2p from 'libp2p';
import uint8arrayFromString from 'uint8arrays/from-string';
import uint8arrayToString from 'uint8arrays/to-string';
import { Message as pbMessage } from 'src/proto/message';
import { Config } from 'src/components/call';

export interface Message {
  user: string;
  body: string;
  created: number;
}

export interface ChatConn {
  unsubscribe: () => void;
  publish: (message: Message) => Promise<void|null>;
}

export const subscribe = (node: Libp2p, config: Config, onMessage: (msg: Message) => void): ChatConn => {
  const topic = `/chatio/${config.callId}/chat/1.0.0`;
  const handler = handleMessage(onMessage);

  node.pubsub.on(topic, handler);
  node.pubsub.subscribe(topic);

  return {
    unsubscribe: () => {
      node.pubsub.removeListener(topic, handler);
      node.pubsub.unsubscribe(topic);
    },
    publish: async (message: Message) => {
      const msg = pbMessage.encode({
        user: message.user,
        body: uint8arrayFromString(message.body),
        created: message.created
      }).finish();

      await node.pubsub.publish(topic, msg);
    },
  };
};

const handleMessage = (onMessage: (msg: Message) => void) => (message: {data?: (Uint8Array|null)}) => {
  if (!message || !message.data) return;

  const msg = pbMessage.decode(message.data);

  onMessage({
    user: msg.user,
    body: uint8arrayToString(msg.body),
    created: msg.created
  });
};
