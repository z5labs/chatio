<template>
  <WithNode :node="node">
    <slot></slot>
  </WithNode>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';
import { startLibp2p } from 'src/components/libp2p';
import WithNode from 'src/components/WithNode.vue';

export default defineComponent({
  name: 'Libp2p',
  components: {
    WithNode,
  },
  async setup() {
    const store = useStore();

    const node = await startLibp2p(store.state.libp2p);

    return {
      node
    };
  }
})
</script>

<style lang="scss" scoped></style>
