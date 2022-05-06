<template>
  <td class="td-wrap">
    <span>
      <img class="mb-2 mr-2" src="/assets/img/pencil.svg" width="12" height="12" />
      <a
        :href="'/assignments/' + data.assignment._id"
      >{{data.assignment.userId ? data.assignment.userId : data.assignment.groupId}} @ {{subIfLong(data.assignment.survey.name)}}</a>
    </span>
  </td>
</template>

<script>
module.exports = {
  props: {
    data: {
      type: Object,
      default: () => ({ _id: "0" })
    }
  },
  methods: {
    subIfLong(surveyName) {
      if (surveyName.length > 10) {
        return surveyName.substring(0, 8) + "…";
      }
      return surveyName;
    }
  }
};
</script>

<style scoped>
.td-wrap {
  word-break: break-word;
}
</style>