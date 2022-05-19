<template>
  <q-page class="row items-center justify-evenly">
    <suspense>
      <NewCallForm @start="startCall" />

      <!-- TODO: add fallback/skeleton loader -->
    </suspense>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import NewCallForm from 'src/components/NewCallForm.vue';

export default defineComponent({
  name: 'StartCall',
  components: {
    NewCallForm,
  },
  setup() {
    const router = useRouter();

    const startCall = (opts: { id: string }) => {
      router.push('/call/' + opts.id);
    };

    return {
      startCall,
    };
  },
});
</script>

<style lang="scss" scoped></style>
