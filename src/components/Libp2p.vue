<template>
  <slot :node="node"></slot>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Libp2p',
  emits: ['node'],
  async setup(_props, { emit }) {
    const node = ref({});

    await new Promise(resolve => setTimeout(() => {
      resolve(null);
      emit('node', {});
    }, 5000));

    return {
      node
    };
  }
})
</script>

<style lang="scss" scoped></style>
