<template lang="pug">
  #new.section
    h1.title Create room
    maps-form(v-model="form.maps")
    picker-mode-form(v-model="form.mode")
    .columns.is-centered
      .column.is-three-fifths
        button(@click="ready()").button.is-fullwidth.is-primary Ready
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator';
import MapsForm from '@/components/MapsForm.vue';
import PickerModeForm from '@/components/PickerModeForm.vue';
import Firebase from 'firebase';
import Cookie from 'js-cookie';
import { DateTime } from 'luxon';

interface Form {
  maps: string[];
  mode: string;
}

@Component({
    components: {
      MapsForm,
      PickerModeForm,
    },
})
export default class CreateRoom extends Vue {

  public ref = Firebase.database().ref('rooms');

  public form: object = {
    maps: [
      'dust2',
      'inferno',
      'cache',
      'overpass',
      // 'cobble',
      'train',
      'mirage',
      'nuke',
    ],
    mode: 'three-most-picked-map',
  };

  public async ready(): Promise<void> {

    const roomRef = this.ref.push();
    try {
      await roomRef.set({
        ...this.form,
        admin: Cookie.get('user'),
        created_at: DateTime.local().toString(),
      });

      this.$toast.open({
        message: 'Successfully created !',
        queue: false,
        type: 'is-success',
        position: 'is-bottom',
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
