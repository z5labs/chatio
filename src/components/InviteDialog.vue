<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">
          Invite
        </div>
      </q-card-section>

      <q-card-section>
        <q-select v-model="audience" :options="options" label="Intended for..." />

        <q-input v-model="invite" label="Link" readonly>
          <template v-slot:after>
            <q-btn @click="copy" icon="content_copy" round dense flat />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="dismiss" @click="onOKClick" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'InviteDialog',
  props: {
    callId: {
      type: String,
      required: true,
    }
  },
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup() {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
        const audience = ref('Anyone');
        const options = ref([
          'Anyone'
        ]);
        const invite = computed(() => audience.value);

        const copy = async () => await navigator.clipboard.writeText(invite.value);

        return {
          audience,
          options,
          invite,
          copy,
          dialogRef,
          onDialogHide,
          onOKClick () {
            onDialogOK()
          },

          // we can passthrough onDialogCancel directly
          onCancelClick: onDialogCancel
        };
  }
})
</script>

<style lang="scss" scoped></style>
