<template lang="pug">
  #room.section
    .columns
      .column.is-one-quarter
        room-users(:room="room")
      .column
        label.label Share to your friends !
        .field.has-addons
          p.control.is-expanded
            input.input(:value="currentHref")
          p.control
            button.button.is-success Copy
        room-settings(v-if="room", :roomId="room.id")
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import RoomUsers from '@/components/RoomUsers.vue';
  import RoomSettings from '@/components/RoomSettings.vue';
  import firebase from 'firebase';
  import {DateTime} from 'luxon';
  import {mapGetters} from 'vuex';

  @Component({
    components: {
      RoomUsers,
      RoomSettings,
    },
    computed: {
      ...mapGetters(['uid', 'userRef', 'user']),
    },
  })
  export default class Room extends Vue {
    public currentHref: string = window.location.href;
    public roomRef: any = null;
    public room: any = null;

    public async created(): Promise<void> {
      this.roomRef = firebase.database().ref(`rooms/${this.$route.params.id}`);
      this.roomRef.on('value', (snap) => {
        if (snap.val()) {
          this.room = {...snap.val(), id: this.$route.params.id};
        }
      });
      await this.addCurrentUserToTheRoom();
    }

    public async addCurrentUserToTheRoom(): Promise<void> {
      const usersRoomRef = this.roomRef.child(`users`);
      const userRoomRef = usersRoomRef.child(this.uid);

      const snap = await usersRoomRef.once('value');
      const snapVal = snap.val();
      if (!snapVal || (!snapVal[this.uid] && Object.keys(snapVal).length < 5)) {
        userRoomRef.set({
          ...this.user,
          online: DateTime.local().toString(),
          join_at: DateTime.local().toString(),
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>