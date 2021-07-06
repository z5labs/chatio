<template>
  <q-page class="row items-center justify-center">
    <q-btn @click="startCall" color="primary">Start</q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Start',
  setup() {
    const router = useRouter();

    const startCall = async () => {
      // Generate call id from crptographically random values and SHA-256
      const rvals = crypto.getRandomValues(new Uint8Array(64));
      const buf = await crypto.subtle.digest('SHA-256', rvals.buffer);
      const hashArray = Array.from(new Uint8Array(buf));
      const id = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const query = {
        id,
      };

      void router.push({
        path: '/call',
        query: query,
      });
    };

    return {
      startCall
    };
  }
})
</script>

<style lang="scss" scoped></style>
