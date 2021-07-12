<template>
  <q-page class="column items-center justify-center">
    <q-input v-model="id" label="Call ID" clearable />
    <q-btn @click="startCall" color="primary">Start</q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Start',
  setup() {
    const router = useRouter();
    const id = ref('');

    // Generate call id from crptographically random values and SHA-256
    const rvals = crypto.getRandomValues(new Uint8Array(64));
    void crypto.subtle.digest('SHA-256', rvals.buffer).then(buf => {
      const hashArray = Array.from(new Uint8Array(buf));
      id.value = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    });

    const startCall = () => {
      const query = {
        id: id.value,
      };

      void router.push({
        path: '/call',
        query: query,
      });
    };

    return {
      id,
      startCall
    };
  }
})
</script>

<style lang="scss" scoped></style>
