<template>
  <slot :prompt="prompt"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import InviteDialog from 'src/components/InviteDialog.vue';

export default defineComponent({
  name: 'InviteButton',
  props: {
    callId: {
      type: String,
      required: true,
    },
    signingKey: {
      type: String,
    },
  },
  setup(props) {
    const q = useQuasar();
    const store = useStore();

    const prompt = () => {
      q.dialog({
        component: InviteDialog,
        componentProps: {
          callId: props.callId,
          hostId: store.state.libp2p.peerId,
        },
      })
      .onOk(() => console.log('ok'))
      .onCancel(() => console.log('cancel'))
      .onDismiss(() => console.log('dismiss'));
    };

    return {
      prompt
    };
  }
})
</script>

<style lang="scss" scoped></style>
