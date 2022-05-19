<template>
  <q-page class="row items-center justify-evenly">
    <q-btn color="white" text-color="black" label="New Call" to="/new" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return {};
  },
});
</script>
