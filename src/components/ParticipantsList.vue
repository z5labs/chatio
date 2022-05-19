<template>
  <q-list separator padding>
    <q-item-label header>{{ $t('call.participants.header') }}</q-item-label>

    <q-item v-for="participant in participants" :key="participant.peerId">
      <q-item-section>
        <q-item-label>{{ participant.name }}</q-item-label>
        <q-item-label caption lines="1">{{ participant.peerId }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCallStore } from 'src/stores/call-store';

export default defineComponent({
  name: 'ParticipantsList',
  setup() {
    const store = useCallStore();

    return {
      participants: store.participants,
    };
  },
});
</script>

<style lang="scss" scoped></style>
