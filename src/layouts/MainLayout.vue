<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          :aria-label="$t('main.menu.ariaLabel')"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> chatio </q-toolbar-title>

        <div>chatio v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useGlobalSettingsStore } from 'src/stores/global-settings-store';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const store = useGlobalSettingsStore();

    const leftDrawerOpen = ref(false);

    onMounted(async () => {
      await store.startLibP2PNode();
      console.log('successfully started libp2p node');
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
