<template>
  <td v-bind:class="{ 'td-gray': !data.assignment.dataset }">
    {{
    data.assignment.dataset 
    ?
    getCalendar(data.assignment.dataset.createdAt)
    :
    "Unanswered"
    }}
  </td>
</template>

<script>
var moment = require("moment");

module.exports = {
  props: {
    data: {
      type: Object,
      default: () => ({ _id: "0" })
    }
  },
  methods: {
    isToHappen(stamp) {
      return moment(stamp).isAfter(moment());
    },
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    }
  }
};
</script>

<style scoped>
.td-wrap {
  word-break: break-word;
}
.td-gray {
  color: #aaa;
}
</style>