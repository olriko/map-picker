<template lang="pug">
  #picker-mode-form
    label.label Picker mode
    .modes
      .columns
        .column.is-half(v-for="mode in modes")
          .mode.media(:class="{selected: true}")
            figure.media-left
              p.image.is-64x64
                img(src="https://bulma.io/images/placeholders/128x128.png")
            .media-content
              .content
                strong {{ mode.name }}
                p {{ mode.description }}

</template>

<script lang="ts">
  import { Component, Model, Vue } from 'vue-property-decorator';
  import modes from '@/modes.ts';

  @Component
  export default class PickerModeForm extends Vue {

    public modes: object[] = modes;

    @Model('change', { type: Array}) public value!: string;
  }
</script>

<style lang="scss" scoped>
  .mode {
    border: 2px solid transparent;
    border-radius: 5px;
    &.selected {
      border: 2px solid $primary;
    }
  }
</style>