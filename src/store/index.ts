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
  peerId: PeerId;
  signalAddrs: string[];
  dht: DHT;
}

export interface Notifications {
  appearOnChatMessage: boolean;
}

export interface State {
  username: string;
  notifications: Notifications;
  libp2p: Config;
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
      username: peerId.toB58String(),
      notifications: {
        appearOnChatMessage: true
      },
      libp2p: {
        peerId,
        signalAddrs: [process.env.STAR_SIGNAL],
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
