import { defineStore } from 'pinia';
import {ref} from "vue";

export const useRoomStore = defineStore('room', {
  state: () => ({
    roomName: ref(''),
    privacy: ref(''),
    inviteCode: ref(''),
    username: ref(''),
    createorjoin: ref(false),
  }),
  actions: {
createRoom(roomName, privacy, username) {
    this.roomName = roomName
    this.privacy = privacy
    this.username = username
    this.createorjoin = true
    }
  },
});
