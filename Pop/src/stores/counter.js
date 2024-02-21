import { defineStore } from 'pinia';
import {ref} from "vue";

export const useRoomStore = defineStore('room', {
  state: () => ({
      userId: ref(''),
    roomName: ref(''),
    privacy: ref(''),
    inviteCode: ref(''),
    username: ref(''),
    createorjoin: ref(''),
      publicRooms: ref([]),
      players: ref([]),
      roomInfo: ref(null),
      roomOwner: ref(''),
  }),
  actions: {
      createRoom(roomName, privacy, username) {
          this.roomName = roomName
          this.privacy = privacy
          this.username = username
          this.createorjoin = true
      },

      joinRoom(inviteCode, username) {
          this.inviteCode = inviteCode
          this.username = username
          this.createorjoin = false
          console.log('inviteCode:', inviteCode)
      },
      updatePublicRooms(rooms) {
          this.publicRooms = rooms
      },
      resetRoom() {
          this.roomName = ''
          this.privacy = ''
          this.inviteCode = ''
          this.username = ''
          this.createorjoin = ''
          this.publicRooms = []
          this.players = []
          this.roomInfo = null
      },

  }
})
