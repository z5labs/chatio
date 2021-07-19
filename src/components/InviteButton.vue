<template>
  <q-btn
    @click="prompt"
    class="absolute-top-left"
    label="Invite"
    color="primary"
    style="z-index: 7;"
    flat
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
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

    const prompt = () => {
      q.dialog({
        component: InviteDialog,
        componentProps: {
          callId: props.callId,
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
