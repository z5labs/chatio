<template>
  <q-page class="column items-center justify-center">
    <div class="q-pa-md">
      <q-form
        @submit="startCall"
        @reset="resetCallID"
        class="q-gutter-md"
      >
        <q-input
          v-model="id"
          label="Call ID"
          hint="By modifying this you trade security for convenience."
          hide-hint
          clearable
          lazy-rules
          :rules="[ val => val && val.trim().length > 0 || 'Call ID must not be empty']"
        />

        <div>
          <q-btn :disable="!id || id.trim().length === 0" type="submit" color="primary">start</q-btn>
          <q-btn type="reset" color="secondary" flat>regenerate</q-btn>
        </div>
      </q-form>
    </div>
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

    const resetCallID = async () => {
      const rvals = crypto.getRandomValues(new Uint8Array(64));
      const buf = await crypto.subtle.digest('SHA-256', rvals.buffer);
      const hashArray = Array.from(new Uint8Array(buf));
      id.value = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    return {
      id,
      startCall,
      resetCallID
    };
  }
})
</script>

<style lang="scss" scoped></style>
