<template>
  Hello
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Call',
  props: {
    node: {
      type: Object,
    }
  },
  setup() {
    return {};
  }
})
</script>

<style lang="scss" scoped></style>
