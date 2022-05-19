<!-- this layout is meant to be used in the context of in a call. -->

<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="showMenu" side="left" overlay elevated behavior="mobile">
      <CallMenu />
    </q-drawer>

    <q-drawer
      v-model="showParticipants"
      side="right"
      overlay
      elevated
      behavior="mobile"
    >
      <ParticipantsList />
    </q-drawer>

    <q-drawer
      v-model="showChat"
      side="right"
      overlay
      elevated
      behavior="mobile"
    >
      <InCallChat />
    </q-drawer>

    <q-page-container>
      <router-view
        @call:openMenu="toggleMenu"
        @call:openParticipants="toggleParticipants"
        @call:openChat="toggleChat"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CallMenu from 'src/components/CallMenu.vue';
import ParticipantsList from 'src/components/ParticipantsList.vue';
import InCallChat from 'src/components/InCallChat.vue';

export default defineComponent({
  name: 'CallLayout',
  components: {
    CallMenu,
    ParticipantsList,
    InCallChat,
  },
  setup() {
    const showMenu = ref(false);
    const showParticipants = ref(false);
    const showChat = ref(false);

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };

    const toggleParticipants = () => {
      showChat.value = false;
      showParticipants.value = !showParticipants.value;
    };

    const toggleChat = () => {
      showParticipants.value = false;
      showChat.value = !showChat.value;
    };

    return {
      showMenu,
      toggleMenu,
      showParticipants,
      toggleParticipants,
      showChat,
      toggleChat,
    };
  },
});
</script>

<style lang="scss" scoped></style>
