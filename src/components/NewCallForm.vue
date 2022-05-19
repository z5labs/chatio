<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h5">Start a Call</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-input
        v-model="callId"
        label="Call ID"
        hint="Make it as random as possible"
        hide-hint
        outlined
      />
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn label="Start" @click="emitStart" flat />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCallStore } from 'src/stores/call-store';

const generateRandomId = async () => {
  // Apply SHA-256 to 100 random bytes
  const rndData = crypto.getRandomValues(new Uint8Array(100));
  const dig = await crypto.subtle.digest('SHA-256', rndData.buffer);

  // base64 encode hash and then make sure its url safe
  const b64 = btoa(String.fromCharCode(...new Uint8Array(dig)));
  return encodeURIComponent(b64); // TODO: this isn't technically the base64 url alphabet so eventually improve this
};

export default defineComponent({
  name: 'NewCallForm',
  emits: ['start'],
  async setup(_props, { emit }) {
    const store = useCallStore();

    const randId = await generateRandomId();
    console.log('random-id: ' + randId);
    const callId = ref(randId);

    const emitStart = () => {
      store.id = callId.value;
      emit('start', { id: callId.value });
    };

    return {
      callId,
      emitStart,
    };
  },
});
</script>

<style lang="scss" scoped></style>
