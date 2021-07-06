/* eslint-disable */

// Libp2p Core
import Libp2p from 'libp2p';
// Transports
import Websockets from 'libp2p-websockets';
import filters from 'libp2p-websockets/src/filters';
import WebrtcStar from 'libp2p-webrtc-star';
// Stream Muxer
import Mplex from 'libp2p-mplex';
// Connection Encryption
import { NOISE } from 'libp2p-noise';
// Peer Discovery
import Bootstrap from 'libp2p-bootstrap';
import KadDHT from 'libp2p-kad-dht';
// Gossipsub
import Gossipsub from 'libp2p-gossipsub';

const transportKey = Websockets.prototype[Symbol.toStringTag];

export const createLibp2p = async (config) => {
  const node = await Libp2p.create({
    peerId: config.peerId,
    addresses: {
      listen: config.signalAddrs,
    },
    modules: {
      transport: [Websockets, WebrtcStar],
      streamMuxer: [Mplex],
      connEncryption: [NOISE],
      peerDiscovery: [Bootstrap],
      dht: KadDHT,
      pubsub: Gossipsub
    },
    config: {
      peerDiscovery: {
        bootstrap: {
          list: config.bootstrapAddrs,
        }
      },
      dht: {
        enabled: config.dht.enabled,
        randomWalk: {
          enabled: config.dht.randomWalk,
        }
      },
      transport: {
        [transportKey]: {
          // by default websockets do not allow localhost dials
          // let's enable it for testing purposes in this example
          filter: filters.all
        }
      }
    }
  });

  await node.start();

  return node;
};
