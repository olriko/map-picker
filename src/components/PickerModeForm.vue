<template lang="pug">
  #picker-mode-form
    label.label Picker mode
    .modes
      .columns
        .column.is-half(v-for="mode in modes")
          .mode.media(:class="{selected: mode.uid === value, readonly: readonly}", @click="set(mode.uid)")
            figure.media-left
              p.image.is-64x64
                img(src="https://bulma.io/images/placeholders/128x128.png")
            .media-content
              .content
                strong {{ mode.name }}
                p {{ mode.description }}
</template>

<script lang="ts">
  import {Component, Model, Prop, Vue} from 'vue-property-decorator';
  import modes from '@/modes.ts';

  @Component
  export default class PickerModeForm extends Vue {

    @Prop({default: true, type: Boolean}) public readonly!: boolean;

    @Model('change', {type: String}) public value!: string;

    public modes: object[] = modes;

    public set(mode: string): void {
      if (!this.readonly) {
        this.$emit('change', mode);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mode {
    cursor: pointer;
    &.readonly {
      cursor: not-allowed !important;
    }
    border: 2px solid transparent;
    border-radius: 5px;
    &.selected {
      border: 2px solid $primary;
    }
  }
</style>