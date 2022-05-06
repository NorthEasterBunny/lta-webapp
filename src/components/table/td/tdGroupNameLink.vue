<template>
  <span>
    <img class="mb-2 mr-2" src="/assets/img/people.svg" width="12" height="12" />
    <a
      :href="'/groups/' + data.group.groupId"
    >{{data.group.groupId}}</a>
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