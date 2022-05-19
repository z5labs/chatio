import { defineStore } from 'pinia';
import { Message } from 'src/proto/chatio';

export enum IOState {
  OFF = 0,
  ON,
}

export interface Participant {
  name: string;
  peerId: string;
}

export interface CallStoreState {
  id: string;
  inCall: boolean;
  audio: IOState;
  video: IOState;
  participants: Participant[];
  receivedMessages: Message[];
  sentMessages: Message[];
  videoStream: MediaStream | null;
}

export const useCallStore = defineStore('call', {
  state: () =>
    ({
      id: '',
      inCall: false,
      audio: IOState.OFF,
      video: IOState.OFF,
      participants: [
        {
          name: 'Alice',
          peerId: 'QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N',
        },
        {
          name: 'Bob',
          peerId: 'Qma9T5YraSnpRDZqRR4krcSJabThc8nwZuJV3LercPHufi',
        },
      ],
      receivedMessages: [],
      sentMessages: [],
      videoStream: null,
    } as CallStoreState),
  actions: {
    async startCall() {
      // TODO: fire up call using libp2p
      this.inCall = true;
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1280, ideal: 3840, max: 3840 },
          height: { min: 720, ideal: 2160, max: 2160 },
        },
      });
      console.log('successfully obtained video stream');
    },
    async leaveCall() {
      // TODO: unsubscribe to messages, turn off mic, turn off video
      this.id = '';
    },
    async toggleAudio() {
      // TODO: get mic access
      this.audio = this.audio === IOState.ON ? IOState.OFF : IOState.ON;
    },
    async toggleVideo() {
      // TODO: get camera access
      this.video = this.video === IOState.ON ? IOState.OFF : IOState.ON;
    },
    async sendMessage(message: Message) {
      // TODO: use libp2p pubsub to send message to others in call
      this.sentMessages.push(message);
    },
  },
});
