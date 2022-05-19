import { defineStore } from 'pinia';

import { createLibp2p, Libp2p } from 'libp2p';
import { WebSockets } from '@libp2p/websockets';
import { WebRTCStar } from '@libp2p/webrtc-star';
import { Mplex } from '@libp2p/mplex';
import { Noise } from '@chainsafe/libp2p-noise';
import { GossipSub } from '@chainsafe/libp2p-gossipsub';
import { KadDHT } from '@libp2p/kad-dht';
import { dnsaddrResolver } from '@multiformats/multiaddr/resolvers';
import { publicAddressesFirst } from '@libp2p/utils/address-sort';
import { peerIdFromString } from '@libp2p/peer-id';
import { PeerId } from '@libp2p/interfaces/peer-id';
import { createEd25519PeerId } from '@libp2p/peer-id-factory';

export interface GlobalSettingsStoreState {
  peerId: PeerId | undefined;
  rendezvousStarServers: string[];
  node: Libp2p | null;
}

export const useGlobalSettingsStore = defineStore('globalSettings', {
  state: () =>
    ({
      rendezvousStarServers: [
        'https://webrtc-star-signal-qtqc6lsoaa-uc.a.run.app',
      ],
      node: null,
    } as GlobalSettingsStoreState),
  getters: {
    libp2pConfig: (state) => ({
      // peerId: state.peerId,
      // peerStore: {
      //   persistence: true,
      //   threshold: 1,
      // },
      dialer: {
        maxParallelDials: 100,
        maxAddrsToDial: 25,
        maxDialsPerPeer: 4,
        dialTimeout: 30e3,
        resolvers: {
          dnsaddr: dnsaddrResolver,
        },
        addressSorter: publicAddressesFirst,
      },
      transports: [new WebSockets(), new WebRTCStar()],
      addresses: {
        listen: state.rendezvousStarServers,
      },
      streamMuxers: [new Mplex()],
      connectionEncryption: [new Noise()],
      dht: new KadDHT(),
      pubsub: new GossipSub(),
      metrics: {
        // TODO: make this configurable through global settings
        enabled: true,
        computeThrottleMaxQueueSize: 1000,
        computeThrottleTimeout: 2000,
        movingAverageIntervals: [
          60 * 1000, // 1 minute
          5 * 60 * 1000, // 5 minutes
          15 * 60 * 1000, // 15 minutes
        ],
        maxOldPeersRetention: 50,
      },
    }),
  },
  actions: {
    async startLibP2PNode() {
      if (this.node !== null) return;

      let peerId;
      const storedPeerId = localStorage.getItem('peerId');
      if (storedPeerId !== null) {
        this.peerId = peerIdFromString(storedPeerId);
      } else {
        peerId = await createEd25519PeerId();
        this.peerId = peerId;
        localStorage.setItem('peerId', peerId.toString());
      }

      const node = await createLibp2p(this.libp2pConfig);
      this.node = node;

      node.addEventListener('peer:discovery', (ev) =>
        console.log('discoverd a peer')
      );

      await this.node?.start();
    },
    async stopLibP2PNode() {
      if (this.node === null) return;

      await this.node?.stop();

      this.node = null;
    },
  },
});
