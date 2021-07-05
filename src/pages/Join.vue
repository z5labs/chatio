<template>
  <q-page class="row items-center justify-center">
      <q-form @submit="joinCall" style="max-width: 400px;">
        <q-input v-model="call.id" label="Call ID" />

        <q-input v-model="call.password" label="Password" />

        <q-btn icon="video_call" label="Join" type="submit" />
      </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Join',
  setup() {
    const router = useRouter();

    const call = reactive({
      id: '',
      password: '',
    });

    const joinCall = () => {
      const query: {id: string; pwd?: string } = {
        id: call.id,
        pwd: call.password,
      };

      if (!query.pwd) delete query.pwd;

      void router.push({
        path: '/call',
        query: query,
      });
    };

    return {
      call,
      joinCall
    };
  }
})
</script>

<style lang="scss" scoped></style>
