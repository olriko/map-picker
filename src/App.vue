<template lang="pug">
  #app
    section.hero.is-primary
      .hero-body
        .container.has-text-centered
          h1.title  Map Picker
          h2.subtitle A funny way to choose a map to play !
    .container
      router-view
</template>

<style lang="scss">
  @import "styles/app";
</style>
