<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <InviteButton :callId="id"/>
        <Call />
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
import { computed, defineAsyncComponent, defineComponent, ref, onUnmounted, inject } from 'vue';
import { useStore } from 'src/store';
import Libp2p from 'libp2p';
import { subscribe, Message } from 'src/components/chat';
import InviteButton from 'src/components/InviteButton.vue';

export default defineComponent({
  name: 'CallLayout',
  components: {
    InviteButton,
    Call: defineAsyncComponent(() => import('components/Call.vue')),
    Chat: defineAsyncComponent(() => import('components/Chat.vue')),
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
  setup(props) {
    const store = useStore();

    const username = computed(() => store.state.username);

    const node = inject('node') as Libp2p;
    const audio = ref(false);
    const video = ref(false);
    const showChat = ref(false);

    const messages = ref<Message[]>([]);

    const { publish, unsubscribe } = subscribe(node, {callId: props.id, signingKey: ''}, msg => messages.value.push(msg));

    const sendMessage = async (body: string) => {
      const created = Date.now();

      const msg: Message = {
        user: username.value,
        body,
        created
      };

      messages.value.push(msg);

      await publish(msg);
    };

    onUnmounted(() => {
      unsubscribe();
    });

    return {
      audio,
      video,
      showChat,
      messages,
      sendMessage,
      prompt
    };
  }
})
</script>

<style lang="scss" scoped>
.call-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
