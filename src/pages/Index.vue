<template>
  <q-page class="row items-center justify-center">
    <q-btn class="call-btn" to="/start" icon="video_call" label="Start" no-wrap/>
    <q-btn class="call-btn" to="/join" icon="login" label="Join" no-wrap />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const message = ref('hello');
    return { message };
  }
});
</script>

<style lang="scss">
.call-btn {
  width: 100px;
}
</style>
