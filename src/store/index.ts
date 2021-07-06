import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'

import PeerId, { create, createFromJSON, JSONPeerId } from 'peer-id';

export interface DHT {
  enabled: boolean;
  randomWalk: boolean;
}

export interface Config {
  peerId: PeerId,
  signalAddrs: string[];
  bootstrapAddrs: string[];
  dht: DHT;
}

export interface State {
  libp2p: Config
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<State>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<State>> = Symbol('vuex-key')

async function getOrCreatePeerId() {
  const storedId = localStorage.getItem('peerId');
  if (storedId != null) {
    const peerId = JSON.parse(storedId) as JSONPeerId;
    return await createFromJSON(peerId);
  }

  console.info('Could not get the stored peer id, a new one will be generated');
  const peerId = await create();
  console.info('Storing our peer id in local storage so it can be reused');
  // eslint-disable-next-line
  localStorage.setItem('peerId', JSON.stringify(peerId.toJSON()));

  return peerId;
}

export default store(async function (/* { ssrContext } */) {
  const peerId = await getOrCreatePeerId();

  const Store = createStore<State>({
    state: {
      libp2p: {
        peerId,
        signalAddrs: ['/ip4/127.0.0.1/tcp/9090/wss/p2p-webrtc-star'],
        bootstrapAddrs: [
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt'
        ],
        dht: {
          enabled: true,
          randomWalk: true,
        }
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}
