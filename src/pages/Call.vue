<template>
  <q-page class="row items-center justify-evenly">
    <video autoplay="true" ref="video"></video>

    <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn
        fab
        color="primary"
        icon="menu"
        aria-label="Menu"
        @click="$emit('call:openMenu')"
      />
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab
        icon="more_vert"
        direction="up"
        color="accent"
        v-model="showActions"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action
          :disable="draggingFab"
          :icon="isAudioOn ? 'mic' : 'mic_off'"
          :aria-label="isAudioOn ? 'Turn microphone off' : 'Turn microphone on'"
          color="primary"
          @click="toggleAudio"
        />
        <q-fab-action
          :disable="draggingFab"
          :icon="isVideoOn ? 'videocam' : 'videocam_off'"
          :aria-label="
            isVideoOn ? 'Turn video camera off' : 'Turn video camera off'
          "
          color="primary"
          @click="toggleVideo"
        />
        <q-fab-action
          @click="$emit('call:openChat')"
          color="primary"
          icon="chat"
          :disable="draggingFab"
        />
        <q-fab-action
          @click="$emit('call:openParticipants')"
          color="primary"
          icon="group"
          :disable="draggingFab"
        />
        <q-fab-action
          :disable="draggingFab"
          icon="exit_to_app"
          aria-label="Leave call"
          color="negative"
          @click="leave"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCallStore, IOState } from 'src/stores/call-store';

export default defineComponent({
  name: 'CallPage',
  emits: ['call:openParticipants', 'call:openChat', 'call:openMenu'],
  setup() {
    const store = useCallStore();
    const router = useRouter();

    const fabPos = ref([18, 18]);
    const draggingFab = ref(false);
    const showActions = ref(false);
    const isAudioOn = computed(() => store.audio === IOState.ON);
    const isVideoOn = computed(() => store.video === IOState.ON);
    const video = ref<HTMLVideoElement | null>(null);
    const stream = computed(() => store.videoStream);

    watch(stream, (s: MediaStream) => {
      if (s === null || video.value === null) return;
      video.value.srcObject = s;
    });

    onMounted(() => {
      if (store.inCall) return;

      store.startCall().then(() => console.log('successfully started call'));
    });

    const leave = async () => {
      await store.leaveCall();
      router.back();
    };

    const moveFab = (ev: {
      isFirst: boolean;
      isFinal: boolean;
      delta: { x: number; y: number };
    }) => {
      draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;

      fabPos.value = [
        fabPos.value[0] - ev.delta.x,
        fabPos.value[1] - ev.delta.y,
      ];
    };

    return {
      video,
      fabPos,
      draggingFab,
      showActions,
      moveFab,
      isAudioOn,
      toggleAudio: store.toggleAudio,
      isVideoOn,
      toggleVideo: store.toggleVideo,
      leave,
    };
  },
});
</script>

<style lang="scss" scoped></style>
