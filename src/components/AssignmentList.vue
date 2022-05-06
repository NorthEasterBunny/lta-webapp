<template>
  <div>
    <hLargeIconHeader text="Assignments" :icon="'pencil'"></hLargeIconHeader>

    <div>
      <div class="search-field input-group mb-4 mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search by survey name, user id, or group id"
          v-model="searchInput"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
        </div>
      </div>
    </div>

    <div class="search-field input-group mb-4 mt-4">
      <label>From:</label>
      <datetime class="ml-2 mr-2" format="YYYY-MM-DD" width="316px" v-model="filterFrom" @input="retrieveAssignments"></datetime>
      <label>To:</label>
      <datetime class="ml-2 mr-2" format="YYYY-MM-DD" width="316px" v-model="filterTo" @input="retrieveAssignments"></datetime>
    </div>

    <div class="list row mt-4">
      <div class="col-md-4">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th style="width: 20%">Assignment</th>
              <th style="width: 22%">publish</th>
              <th style="width: 14%">Assignee</th>
              <th style="width: 25%">Survey</th>
              <th style="width: 8%">Notif</th>
              <th style="width: 8%">Track</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="{ active: index == currentIndex }"
              v-for="(assignment, index) in assignments"
              :key="index"
              @click="setActive(assignment, index)"
              @dblclick="goToAssignment(assignment)"
            >
              <!-- <tr v-bind:class="{ 'table-success': assignment.dataset }" v-for="(assignment, index) in assignments" :key="index"> -->

              <tdAssignmentNameLink :data="{assignment}" />
              <tdGrayIfFuture v-if="assignment.publishAt" :unixMs="assignment.publishAt" />
              <tdGrayIfFuture v-if="!assignment.publishAt" :unixMs="assignment.publishFrom" :unixMs2 = assignment.publishTo />
              <td class="td-wrap">
                <span v-if="assignment.userId" >
                  <img class="mb-2 mr-2" src="/assets/img/person.svg" width="12" height="12" />
                  <a :href="'/users/' + assignment.userId">{{ assignment.userId }}</a>
                </span>
                <span v-if="assignment.groupId" >
                  <img class="mb-2 mr-2" src="/assets/img/people.svg" width="12" height="12" />
                  <a :href="'/groups/' + assignment.groupId">{{ assignment.groupId }}</a>
                </span>
              </td>
              <td class="td-wrap">
                <a :href="'/surveys/' + assignment.survey._id">{{ assignment.survey.name }}</a>
              </td>
              <td>
                <img class="mr-1" v-if="assignment.publishNotifiedAt" src="assets/img/phone-vibrate.svg" title="publishNotifiedAt"/>
                <img class="mr-1" v-if="assignment.expireNotifiedAt"  src="assets/img/phone-vibrate.svg" title="expireNotifiedAt"/>
              </td>
              <td>
                <img class="mr-1" v-if="assignment.firstOpenedAt" src="assets/img/envelope-open.svg" title="firstOpenedAt"/>
                <img class="mr-1" v-if="assignment.dataset" src="assets/img/check.svg" title="dataset"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-2 ml-4">
        <div v-if="currentAssignment">
          <tableDetailsHeader
            icon="pencil"
            :text="(currentAssignment.userId ? currentAssignment.userId : currentAssignment.groupId) + ' @ ' + currentAssignment.survey.name"
            :href="'/assignments/' + currentAssignment._id"
          />
          <table class="table">
            <trDetail
              label="User"
              :text="currentAssignment.userId"
              :href="'/users/' + currentAssignment.userId"
            />
            <trDetail
              label="Survey"
              :text="currentAssignment.survey.name"
              :href="'/surveys/' + currentAssignment.survey._id"
              :subtext="currentAssignment.survey.title"
              :number="currentAssignment.survey.questions.length"
              numberSingular="question"
              numberPlural="questions"
            />
            <trDetail label="createdAt" :time="currentAssignment.createdAt" />
            <trDetail label="publishAt" :time="currentAssignment.publishAt" />
            <trDetail
              label="Answered"
              :text="currentAssignment.dataset ? undefined : 'Unanswered'"
              :time="currentAssignment.dataset ? currentAssignment.dataset.createdAt : undefined"
            />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssignmentDataService from "../services/AssignmentDataService";

import moment from "moment";
import datetime from "vuejs-datetimepicker";
import tdAssignmentNameLink from "./table/td/tdAssignmentNameLink";
import tdGrayIfFuture from "./table/td/tdGrayIfFuture";
import hLargeIconHeader from "./h/hLargeIconHeader";
import tableDetailsHeader from "./table/tableDetailsHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "assignment-list",
  components: {
    datetime,
    tdAssignmentNameLink,
    tdGrayIfFuture,
    hLargeIconHeader,
    tableDetailsHeader,
    trDetail
  },
  data() {
    return {
      assignments: [],
      currentIndex: -1,
      currentAssignment: null,
      searchInput: "",
      filterFrom: moment()
        .startOf("day")
        .format("YYYY-MM-DD"),
      filterTo: moment()
        .endOf("day")
        .format("YYYY-MM-DD")
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    retrieveAssignments() {
      AssignmentDataService.getSortedAndFiltered(
        "publishAt",
        moment(this.filterFrom)
          .startOf("day")
          .unix(),
        moment(this.filterTo)
          .endOf("day")
          .unix()
      )
        .then(response => {
          this.assignments = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      console.log("refreshList");
      this.retrieveAssignments();
    },

    setActive(assignment, index) {
      this.currentAssignment = assignment;
      this.currentIndex = index;
    },
    goToAssignment(assignment) {
      window.location.href = "/assignments/" + assignment._id;
    },

    search() {
      AssignmentDataService.search(this.searchInput)
        .then(response => {
          this.assignments = response.data;
          this.setActive(null);
        })
        .catch(e => {
          console.log(e);
        });
    },
    isToHappen(stamp) {
      return moment(stamp).isAfter(moment());
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.retrieveAssignments();
  }
};
</script>

<style>
.list {
  text-align: left;
  width: 1800pt;
}
.td-wrap {
  word-break: break-word;
}
.search-field {
  width: 578pt;
}
.code-detail {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  color: #666;
}
.detail {
  font-size: smaller;
  color: #666;
}
.active {
  background: #eaeaea;
}
.ra {
  text-align: right;
}
.text-align-center {
  text-align: center;
}
</style>