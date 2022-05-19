<template>
  <q-list>
    <q-item-label header>{{ $t('call.menu.header') }}</q-item-label>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CallMenu',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
