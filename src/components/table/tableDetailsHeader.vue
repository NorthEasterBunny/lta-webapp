<template>
  <table class="table">
    <tr>
      <th class="text-align-center td-wrap">
        <img class="mb-2" :src="imgSrc" width="24" height="24" />
        <h4>
          <a :href="href">{{text}}</a>
        </h4>
      </th>
    </tr>
  </table>
</template>

<script>
module.exports = {
  props: {
    text: {
      type: String,
      default: "<Header>"
    },
    href: {
      type: String
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