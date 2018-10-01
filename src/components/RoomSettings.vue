<template lang="pug">
  #settings(v-if="room")
    maps-form(v-model="room.maps", :readonly="readonly")
    picker-mode-form(v-model="room.mode", :readonly="readonly")

</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import MapsForm from '@/components/MapsForm.vue';
  import PickerModeForm from '@/components/PickerModeForm.vue';
  import firebase from 'firebase';
  import {mapGetters} from 'vuex';


  @Component({
    components: {
      MapsForm,
      PickerModeForm,
    },
    computed: {
      ...mapGetters(['uid']),
      readonly() {
        return this.room ? this.room.admin !== this.uid : false;
      }
    },
  })
  export default class RoomSettings extends Vue {

    @Prop({required: true, type: String}) public roomId!: string;

    public room: object | null = null;

    public created(): void {
      firebase.database().ref(`rooms/${this.roomId}`).on('value', (snap) => {
        if (snap.val()) {
          this.room = snap.val();
        }
      });
    }

    @Watch('room', { immediate: true, deep: true })
    public async onRoomChanged(val: object, oldVal: object): Promise<void> {
      if (!this.readonly && this.room) {
        await firebase.database().ref(`rooms/${this.roomId}`).update(this.room);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>