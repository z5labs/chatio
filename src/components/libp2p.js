/* eslint-disable */

import Libp2p from 'libp2p';
import Websockets from 'libp2p-websockets';
import filters from 'libp2p-websockets/src/filters';
import WebrtcStar from 'libp2p-webrtc-star';
import Mplex from 'libp2p-mplex';
import { NOISE } from 'libp2p-noise';
import KadDHT from 'libp2p-kad-dht';
import Gossipsub from 'libp2p-gossipsub';
import debug from 'debug';

const log = debug('chatio:peer');

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
      dht: KadDHT,
      pubsub: Gossipsub
    },
    config: {
      peerDiscovery: {
        autoDial: true,
        [WebrtcStar.tag]: {
          enabled: true,
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

  node.connectionManager.on('peer:discovery', peerId => log(`Discovered: ${peerId.toB58String()}`));
  node.connectionManager.on('peer:connect', conn => log(`Connected: ${conn.remotePeer.toB58String()}`));
  node.connectionManager.on('peer:disconnect', conn => log(`Disconnected: ${conn.remotePeer.toB58String()}`));

  await node.start();

  return node;
};
