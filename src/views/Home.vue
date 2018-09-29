<template lang="pug">
  #home
    router-link(:to="{name: 'create-room'}").button Create room
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
