<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">
          Invite
        </div>
      </q-card-section>

      <q-card-section>
        <transition mode="out-in" name="invite">
          <InviteForm
            v-if="showForm"
            :recipients="options"
            v-model:recipient="invite.recipient"
            v-model:datetime="invite.datetime"
            v-model:duration="invite.duration"
            v-model:password="invite.password"
          />

          <div v-else class="col">
            <q-input v-model="token" label="Token" readonly>
              <template v-slot:after>
                <q-btn @click="copy" icon="content_copy" round dense flat />
              </template>
            </q-input>
          </div>
        </transition>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-if="showForm" color="primary" label="close" @click="onCancelClick" flat />
        <q-btn v-else color="secondary" label="back" @click="showForm = !showForm" flat />
        
        <q-btn v-if="showForm" color="primary" label="generate" @click="showForm = !showForm" flat />
        <q-btn v-else color="primary" label="dismiss" @click="onOKClick" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, PropType } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import PeerId from 'peer-id';
import { generateInvite, encodeInviteToken, expiresIn, intendedFor, validAfter } from 'src/components/call';
import InviteForm from 'src/components/InviteForm.vue';

export default defineComponent({
  name: 'InviteDialog',
  components: {
    InviteForm
  },
  props: {
    callId: {
      type: String,
      required: true,
    },
    hostId: {
      type: Object as PropType<PeerId>,
      required: true,
    },
  },
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(props) {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
        const showForm = ref(true);
        const options = ref([
          'Anyone'
        ]);
        const token = ref('');

        const curDate = new Date();

        const invite = reactive({
          recipient: 'Anyone',
          datetime: curDate,
          duration: 120,
          password: ''
        });

        watch(
          invite,
          async ({ recipient, datetime, duration, password }) => {
            const tok = generateInvite(
              {callId: props.callId, signingKey: 'secret'},
              props.hostId,
              expiresIn(duration),
              intendedFor(recipient),
              validAfter(datetime.getTime()),
            );

            const encoder = new TextEncoder();
            const data = encoder.encode(password);

            const digest = await crypto.subtle.digest('SHA-256', data);

            const encoded = await encodeInviteToken(props.hostId, tok, new Uint8Array(digest));
            token.value = encoded; // TODO: format encoded token into join link
          }
        );

        const copy = async () => await navigator.clipboard.writeText(token.value);

        return {
          showForm,
          options,
          invite,
          token,
          copy,
          dialogRef,
          onDialogHide,
          onOKClick () {
            onDialogOK()
          },
          onCancelClick: onDialogCancel
        };
  }
})
</script>

<style lang="scss" scoped></style>
