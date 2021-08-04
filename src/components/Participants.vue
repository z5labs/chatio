<template>
  <q-scroll-area class="fit">
    <q-list padding separator>
      <q-item v-for="participant in participants" :key="participant.id.toB58String()">
        <q-item-section>
          <q-item-label>{{ participant.id.toB58String() }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Participant } from 'src/components/call';

export default defineComponent({
  name: 'Participants',
  props: {
    participants: {
      type: Array as PropType<Array<Participant>>,
      required: true
    }
  },
  setup() {
    return {};
  }
})
</script>

<style lang="scss" scoped></style>
