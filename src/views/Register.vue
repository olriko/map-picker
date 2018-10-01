<template lang="pug">
  #register.section
    .heading.has-text-centered
      h1.title Welcome my friend
    .columns.is-centered
      .column.is-half
        .field.has-addons
          .control.is-expanded
            input.input.is-rounded(v-model="nickname", placeholder="Choose a nickname")
          .control
            button.button.is-success.is-rounded(@click="register()") Join
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import firebase from 'firebase';
  import Cookie from 'js-cookie';

  @Component
  export default class Register extends Vue {

    public nickname: string = '';

    public async register(): Promise<void> {
      if (this.nickname.length) {
        const ref = firebase.database().ref('users').child(Cookie.get('uid')!);
        await ref.set({
          nickname: this.nickname,
        });

        if (this.$route.query.room) {
          this.$router.push({name: 'room', params: {id: this.$route.query.room}});
        } else {
          this.$router.push({name: 'home'});
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>