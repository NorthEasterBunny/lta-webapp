<template>
  <tr>
    <th>{{label}}</th>

    <td class="ra td-wrap">
      <a :href="href">{{ text }}</a>
      <div class="detail">{{subtext}}</div>
      <div class="code-detail">{{ codeDetail }}</div>
      <div>{{ timeFromNowComputed }}</div>
      <div class="code-detail">{{ timeMomentComputed }}</div>
      <div class="detail">{{ numberComputed }}</div>
    </td>
  </tr>
</template>

<script>
import moment from "moment";

export default {
  props: {
    label: {
      type: String,
      default: "<label>"
    },
    text: {
      type: String
    },
    subtext: {
      type: String
    },
    codeDetail: {
      type: String
    },
    time: {
      type: String
    },
    timeCodeDetail: {
      type: Date
    },
    href: {
      type: String
    },
    number: {
      type: Number
    },
    numberSingular: {
      type: String
    },
    numberPlural: {
      type: String
    },
  },
  computed: {
    numberComputed() {
      if (!this.number) {
        return "";
      }
      return this.number + " " + (this.number == 1 ? this.numberSingular : this.numberPlural);
    },
    timeFromNowComputed() {
      if (!this.time) {
        return "";
      }
      return this.getTimeFromNow(this.time);
    },
    timeMomentComputed() {
      if (!this.time) {
        return "";
      }
      return this.getTimeMoment(this.time);
    }
  },
  methods: {
    getTimeFromNow(dt) {
      return moment(dt).fromNow();
    },
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    getTimeMoment(dt) {
      return moment(dt);
    },
  }
};
</script>

<style scoped>
</style>