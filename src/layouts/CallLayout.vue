<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="row items-center justify-center">
        <Suspense>
          <template #default>
            <Libp2p @node="setNode">
              <template v-slot="{ node }">
                <Call :node="node" />
              </template>
            </Libp2p>
          </template>

          <template #fallback>
            <q-spinner
              color="primary"
              size="3em"
            />
          </template>
        </Suspense>
      </q-page>
    </q-page-container>

    <q-drawer
      v-model="showChat"
      side="right"
      :width="300"
      :breakpoint="500"
      elevated
    >
      <Chat @message="sendMessage" :messages="messages" />
    </q-drawer>

    <q-footer bordered class="bg-black text-primary">
      <q-toolbar>
        <q-checkbox v-model="audio" label="Audio" color="primary" keep-color />
        <q-checkbox v-model="video" label="Video" color="primary" keep-color />

        <q-space />

        <q-btn icon="people" label="Participants" flat />
        <q-btn @click="showChat = !showChat" icon="message" label="Chat" flat />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, Ref } from 'vue';
import { Message } from 'src/components/model';

export default defineComponent({
  name: 'CallLayout',
  components: {
    Libp2p: defineAsyncComponent(() => import('components/Libp2p.vue')),
    Call: defineAsyncComponent(() => import('components/Call.vue')),
    Chat: defineAsyncComponent(() => import('components/Chat.vue'))
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    pwd: {
      type: String,
    }
  },
  setup() {
    const node: Ref<Record<string, unknown> | null> = ref(null);
    const audio = ref(false);
    const video = ref(false);
    const showChat = ref(false);
    const messages = ref<Message[]>([]);

    const setNode = (n: Record<string, unknown>) => node.value = n;

    const sendMessage = (body: string) => {
      const timestamp = Date.now();

      messages.value.push({
        user: 'Me',
        body,
        timestamp
      })
    };

    return {
      audio,
      video,
      showChat,
      messages,
      sendMessage,
      setNode,
    };
  }
})
</script>

<style lang="scss" scoped></style>
