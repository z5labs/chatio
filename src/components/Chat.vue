<template>
  <div class="fit column justify-end">
    <div style="flex: 1 1 auto">
      <q-scroll-area class="fit">
        <q-list padding separator>
          <q-item v-for="message in messages" :key="message.timestamp">
            <q-item-section>
              <q-item-label>{{ message.user }}</q-item-label>
              <q-item-label caption lines="2">{{ message.body }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>

    <q-separator />

    <q-input @keyup.enter="sendMessage" v-model="message" placeholder="Type here...">
      <template v-slot:append>
        <q-icon @click="sendMessage" name="send" color="primary" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export interface Message {
  user: string;
  body: string;
  timestamp: number;
}

export default defineComponent({
  name: 'Chat',
  props: {
    messages: {
      type: Array as PropType<Message[]>,
      required: true
    }
  },
  emits: ['message'],
  setup(_props, { emit }) {
    const message = ref('');

    const sendMessage = () => {
      emit('message', message.value);
      message.value = '';
    };

    return {
      message,
      sendMessage
    };
  }
})
</script>

<style lang="scss" scoped></style>
