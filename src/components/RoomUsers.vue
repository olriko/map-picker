<template lang="pug">
  aside.menu
    p.menu-label Users
      span.is-pulled-right(v-if="room") {{  Object.keys(room.users).length }} / 5
    ul.menu-list(v-if="room")
      li(v-for="(user, index) in room.users") {{ user.nickname }}
        .icons.is-pulled-right
          span.icon.has-text-info(v-if="room.admin === index")
            i.fas.fa-star
          span.icon.has-text-success(v-if="isOnline(user.online)")
            i.fas.fa-check
          span.icon.has-text-danger(v-else)
            i.fas.fa-times
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import firebase from 'firebase';
  import {DateTime, Interval} from 'luxon';
  import {mapGetters} from 'vuex';

  @Component({
    computed: {
      ...mapGetters(['uid']),
    },
  })
  export default class RoomUsers extends Vue {
    @Prop({type: Object}) public room!: object | null;

    public interval: number = null;

    public isOnline(date: string): boolean {
      const start = DateTime.fromISO(date);
      const interval = Interval.fromDateTimes(start, DateTime.local());
      return interval.length('seconds') <= 8;
    }

    public created(): void {
      this.interval = setInterval(async () => {
        await firebase.database().ref(`rooms/${this.room.id}/users/${this.uid}/online`).set(DateTime.local().toString());
      }, 7000);
    }

    public beforeDestroy(): void {
      clearInterval(this.interval);
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    li {
      height: 2rem;
    }
  }
</style>