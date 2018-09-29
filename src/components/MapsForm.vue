<template lang="pug">
  #maps-form.field
    label.label Map pool
    .control
      .maps.columns
        .column(v-for="map in maps")
          .map(:class="{ selected: value.includes(map)}", @click="toggle(map)")
            img(:src="require(`@/assets/maps/${map}.jpg`)")


</template>

<script lang="ts">
  import { Vue, Component, Model, Emit } from 'vue-property-decorator';

  @Component
  export default class CreateRoom extends Vue {

    public readonly maps: string[] = [
      'dust2',
      'inferno',
      'cache',
      'overpass',
      'train',
      'mirage',
      'nuke',
      'cobble',
    ];

    @Model('change', { type: Array}) public value!: string[];

    public toggle(map: string): void {
      if (this.value.includes(map)) {
        this.value.splice(this.value.indexOf(map), 1);
      } else {
        this.value.push(map);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .maps {
    .map {
      cursor: pointer;
      img {
        border-radius: 5px;
        border: 2px solid transparent;
        filter: grayscale(1);
      }

      &.selected {
        img {
          filter: grayscale(0);
          border: 2px solid $primary;
        }
      }
    }
  }
</style>