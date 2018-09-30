<template lang="pug">
  #register
    .heading.has-text-centered
      h1.title Welcome my friend
    .field.has-addons
      .control.is-expanded
        input.input.is-rounded(placeholder="Choose a nickname")
      .control
        button.button.is-success.is-rounded Join
</template>

<script lang="ts">
  import {Component, Vue, Model} from 'vue-property-decorator';

  @Component
  export default class RegisterModal extends Vue {
  }
</script>

<style lang="scss" scoped>

</style>