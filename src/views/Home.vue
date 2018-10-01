<template lang="pug">
  #home
    .section
      .columns.is-centered
        .column.is-half
          button(@click="createRoom").button.is-fullwidth.is-rounded.is-info Create room
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import { DateTime } from 'luxon';
import {mapGetters} from 'vuex';


@Component({
  computed: {
    ...mapGetters(['uid']),
  },
})
export default class Home extends Vue {

  public ref = firebase.database().ref('rooms');

  public form: object = {
    maps: [
      'dust2',
      'inferno',
      'cache',
      'overpass',
      'train',
      'mirage',
      'nuke',
    ],
    mode: 'three-most-picked-map',
    status: 'settings',
  };

  public async createRoom(): Promise<void> {
    const roomRef = this.ref.push();
    try {
      await roomRef.set({
        ...this.form,
        admin: this.uid,
        created_at: DateTime.local().toString(),
      });
      this.$router.push({name: 'room', params: {id: roomRef.key!}});
    } catch (e) {
      this.$toast.open({
        message: 'An error happened !',
        queue: false,
        type: 'is-danger',
        position: 'is-bottom',
      });
    }
  }
}
</script>
