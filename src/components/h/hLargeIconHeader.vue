<template>
  <h1 class="mt-4">
    <img class="mb-2 mr-2" :src="imgSrc" width="38" height="38" />
    {{text}}
  </h1>
</template>

<script>
module.exports = {
  props: {
    text: {
      type: String,
      default: "<Header>"
    },
    icon: {
      type: String,
      default: "file-code"
    }
  },
  computed: {
    imgSrc() {
      return `/assets/img/${encodeURIComponent(this.icon)}.svg`;
    }
  }
};
</script>

<style scoped>
</style>