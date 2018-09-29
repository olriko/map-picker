<template lang="pug">
  #new.section
    h1.title Create room
    maps-form(v-model="form.maps")
    picker-mode-form(v-model="form.mode")
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator';
import MapsForm from '@/components/MapsForm.vue';
import PickerModeForm from '@/components/PickerModeForm.vue';

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
  };
}
</script>
