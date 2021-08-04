<template>
  <div class="col">
    <q-select v-model="rec" :options="recipients" label="Recipient" />

    <div class="row q-gutter-sm">
      <q-input v-model="date" type="date" label="Call starts on" class="col" />

      <q-input v-model="time" type="time" label="Call starts at" class="col" />
    </div>

    <q-input v-model="dur" type="number" label="Call will last for" suffix="minutes(s)" />

    <q-input v-model="pwd" :type="pwdType" label="Password">
    </q-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  name: 'InviteForm',
  props: {
    recipients: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    recipient: {
      type: String,
      required: true
    },
    datetime: {
      type: Object as PropType<Date>,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  emits: [
    'update:recipient',
    'update:datetime',
    'update:duration',
    'update:password',
  ],
  setup(props, { emit }) {
    const rec = computed({
      get: () => props.recipient,
      set: (value) => emit('update:recipient', value)
    });

    const date = computed({
      get: () => {
        const year = props.datetime.getFullYear();
        let month: string | number = props.datetime.getMonth()+1;
        let day: string | number = props.datetime.getDate();

        if (month < 10) month = '0' + month.toString();
        if (day < 10) day = '0' + day.toString();

        return `${year}-${month}-${day}`;
      },
      set: (value) => {
        const [year, month, day] = value.split('-').map(s => s.startsWith('0') ? s.slice(1) : s).map(s => parseInt(s));

        emit('update:datetime', new Date(year, month-1, day, props.datetime.getHours(), props.datetime.getMinutes()));
      }
    });

    const time = computed({
      get: () => {
        let hours: string | number = props.datetime.getHours();
        let minutes: string | number = props.datetime.getMinutes();

        if (hours < 10) hours = '0' + hours.toString();
        if (minutes < 10) minutes = '0' + minutes.toString();

        return `${hours}:${minutes}`;
      },
      set: (value) => {
        const [hours, minutes] = value.split(':').map(s => s.startsWith('0') ? s.slice(1) : s).map(s => parseInt(s));
        emit('update:datetime', new Date(props.datetime.getFullYear(), props.datetime.getMonth(), props.datetime.getDate(), hours, minutes));
      }
    });

    const dur = computed({
      get: () => props.duration,
      set: (value) => emit('update:duration', value)
    });

    const pwd = computed({
      get: () => props.password,
      set: (value) => emit('update:password', value)
    });

    const showPwd = ref(false);
    const pwdType = computed(() => showPwd.value ? 'text' : 'password');

    return {
      rec,
      date,
      time,
      dur,
      pwd,
      showPwd,
      pwdType,
    };
  }
})
</script>

<style lang="scss" scoped></style>
