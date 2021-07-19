<template>
  <Suspense>
    <template #default>
      <Libp2p>
        <router-view />
      </Libp2p>
    </template>

    <template #fallback>
      <q-layout view="lHh Lpr lFf">
        <q-page-container>
          <q-page class="row justify-center items-center">
            <h4>
              Connecting
            </h4>

            <q-spinner-dots
              color="primary"
              size="md"
              :thickness="3"
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    Libp2p: defineAsyncComponent(() => import('src/components/Libp2p.vue')),
  },
})
</script>
