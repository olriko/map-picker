<template lang="pug">
  #room.section
    .columns
      .column.is-one-quarter
        current-user-room
      .column
        label.label Share to your friends !
        .field.has-addons
          p.control.is-expanded
            input.input(:value="currentHref")
          p.control
            button.button.is-success Copy
</template>

<script lang="ts">
  import {Component, Vue, Model} from 'vue-property-decorator';
  import CurrentUserRoom from '@/components/CurrentUserRoom.vue';
  import firebase from 'firebase';
  import Cookie from 'js-cookie';
  import { DateTime } from 'luxon';
  import RegisterModal from '@/components/RegisterModal.vue';

  @Component({
    components: {
      CurrentUserRoom,
    },
  })
  export default class Room extends Vue {
    public currentHref: string = window.location.href;
    public roomRef: any;
    public userRef: any;

    public mounted(): void {
      const userUid = Cookie.get('uid');
      this.roomRef = firebase.database().ref(`rooms/${this.$route.params.id}`);
      this.userRef = firebase.database().ref(`users/${userUid}`);
      const userRoomRef = this.roomRef.child(`users/${userUid}`);

      this.userRef.once('value').then((userData: any) => {
        if (userData.val()) {
         userRoomRef.once('value').then((userRoomData: any) => {
            if (!userRoomData.val()) {
              userRoomRef.push({...userData.val(), online_since: DateTime.local().toString()});
            }
          });
        } else {
          this.$modal.open({
            component: RegisterModal,
            canCancel: false,
          });
        }
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>