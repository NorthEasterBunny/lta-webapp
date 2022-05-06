<template>
  <span>
    <img class="mb-2 mr-2" src="/assets/img/person.svg" width="12" height="12" />
    <a
      :href="'/users/' + data.user.userId"
    >{{data.user.userId}}</a>
  </span>
</template>

<script>
module.exports = {
  props: {
    data: {
      type: Object,
      default: () => ({ _id: "0" })
    }
  }
};
</script>

<style scoped>
</style>