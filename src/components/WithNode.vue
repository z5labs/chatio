<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, provide, PropType } from 'vue';
import Libp2p from 'libp2p';

export default defineComponent({
  name: 'WithNode',
  props: {
    node: {
      type: Object as PropType<Libp2p>,
      required: true,
    }
  },
  setup(props) {
    provide('node', props.node);

    return {};
  }
})
</script>

<style lang="scss" scoped></style>
