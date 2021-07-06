<template>
  <slot :node="node"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';
import { createLibp2p } from 'src/components/libp2p';

export default defineComponent({
  name: 'Libp2p',
  emits: ['node'],
  async setup(_props, { emit }) {
    const store = useStore();

    const node = await createLibp2p(store.state.libp2p);

    emit('node', node);

    return {
      node
    };
  }
})
</script>

<style lang="scss" scoped></style>
