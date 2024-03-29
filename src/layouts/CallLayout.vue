<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="absolute-left column justify-end items-start" style="z-index: 2">
          <InviteButton :callId="id">
            <template v-slot="{ prompt }">
              <q-btn
                @click="prompt"
                icon="person_add"
                :label="iconOnly ? '' : 'Invite'"
                flat
              />
            </template>
          </InviteButton>

          <q-btn
            @click="toggleMic"
            :icon="muted ? 'mic_off' : 'mic'"
            :label="iconOnly ? '' : 'Audio'"
            flat
          >
            <q-tooltip anchor="center right" self="center left">
              {{ muted ? 'Unmute' : 'Mute' }}
            </q-tooltip>
          </q-btn>

          <q-btn
            @click="toggleVideo"
            :icon="streaming ? 'videocam' : 'videocam_off'"
            :label="iconOnly ? '' : 'Video'"
            flat
          >
            <q-tooltip anchor="center right" self="center left">
              {{ streaming ? 'Disable' : 'Enable' }}
            </q-tooltip>
          </q-btn>
        </div>

        <div class="absolute-right column justify-end items-end" style="z-index: 2">
          <q-btn @click="toggleParticipants" icon-right="people" :label="iconOnly ? '' : 'Participants'" flat />

          <q-btn @click="toggleChat" icon-right="message" :label="iconOnly ? '' : 'Chat'" flat>
            <q-badge v-if="missedMessages > 0" color="red" floating>{{ missedMessages }}</q-badge>
          </q-btn>
        </div>

        <Call />
      </q-page>
    </q-page-container>

    <q-drawer
      v-model="openDrawer"
      side="right"
      :width="300"
      :breakpoint="500"
    >
      <Chat v-if="viewChat" @message="sendMessage" :messages="messages" />

      <Participants v-if="viewParticipants" :participants="participants" />
    </q-drawer>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref, onUnmounted, inject } from 'vue';
import { useStore } from 'src/store';
import Libp2p from 'libp2p';
import { watchParticipants } from 'src/components/call';
import { subscribe, Message } from 'src/components/chat';
import InviteButton from 'src/components/InviteButton.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'CallLayout',
  components: {
    InviteButton,
    Call: defineAsyncComponent(() => import('components/Call.vue')),
    Chat: defineAsyncComponent(() => import('components/Chat.vue')),
    Participants: defineAsyncComponent(() => import('components/Participants.vue')),
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
    const $q = useQuasar();
    const store = useStore();

    const username = computed(() => store.state.username);

    const node = inject('node') as Libp2p;
    const muted = ref(false);
    const streaming = ref(false);
    const viewChat = ref(false);
    const viewParticipants = ref(false);
    const openDrawer = computed(() => viewChat.value || viewParticipants.value);
    const iconOnly = computed(() => $q.screen.lt.md);

    const participants = watchParticipants(node);

    const messages = ref<Message[]>([]);
    const missedMessages = ref(0);

    const toggleMic = () => muted.value = !muted.value;

    const toggleVideo = () => streaming.value = !streaming.value;

    const toggleChat = () => {
      viewChat.value = !viewChat.value;
      viewParticipants.value = false;
      missedMessages.value = 0;
    };

    const toggleParticipants = () => {
      viewParticipants.value = !viewParticipants.value;
      viewChat.value = false;
    };

    const { publish, unsubscribe } = subscribe(node, {callId: props.id, signingKey: ''}, msg => {
      messages.value.push(msg);

      if (viewChat.value || !store.state.notifications.appearOnChatMessage) return;

      missedMessages.value += 1;
      $q.notify({
        group: 'chat',
        position: 'top',
        icon: 'message',
        message: msg.body,
        actions: [
          { label: 'Respond', handler: toggleChat },
          { label: 'Dismiss' },
        ],
      });
    });

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
      iconOnly,
      muted,
      streaming,
      toggleMic,
      toggleVideo,
      viewChat,
      viewParticipants,
      openDrawer,
      toggleParticipants,
      toggleChat,
      participants,
      missedMessages,
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
