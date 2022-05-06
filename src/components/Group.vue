<template>
  <div>
    <hLargeIconHeader :text="group.groupId" :icon="'people'"></hLargeIconHeader>

    <div class="row">
      <div class="col">
        <h4>Details</h4>

        <table class="table">
          <trDetail label="_id" :codeDetail="group._id" />
          <trDetail label="groupId" :text="group.groupId" />
          <trDetail label="createdAt" :time="group.createdAt" />
          <trDetail label="updatedAt" :time="group.updatedAt" />
        </table>
      </div>
    </div>

    <div>
      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/person.svg" width="24" height="24" />
        Members
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">userId</th>
            <th style="width: 30%">timezone</th>
            <th style="width: 20%" tooltip="deviceToken">
              <img class="mb-1 mr-1" src="/assets/img/phone.svg" title="deviceToken" />
            </th>
            <th style="width: 15%">os</th>
            <th style="width: 15%">v</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in members"
            :key="index"
          >
            <td class="td-wrap">
              <tdUserNameLink :data="{user}"></tdUserNameLink>
            </td>
            <td class="td-wrap">{{user.timezone}}</td>
            <td class="td-wrap code-detail">
              <img class="mb-1 mr-1" src="/assets/img/phone.svg" title="deviceToken" />
            </td>
            <td class="td-wrap">{{user.os}}</td>
            <td class="td-wrap">{{user.versionNumber}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <table class="table">
      <tr></tr>
      <tr v-show="this.members.length == 0">
        <td v-show="this.members.length == 0">No members.</td>
      </tr>
      <tr>
        <td>
          <a :href="`/groups/${this.group.groupId}/edit`">Edit</a>
        </td>
      </tr>
    </table>


      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/people.svg" width="24" height="24" />
        Group Assignments
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">Assignment</th>
            <th style="width: 20%">Survey</th>
            <th style="width: 20%">createdAt</th>
            <th style="width: 20%">publishFrom</th>
            <th style="width: 20%">publishTo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(assignment, index) in assignments"
            :key="index"
            @dblclick="goToAssignment(assignment)"
          >
            <tdAssignmentNameLink :data="{assignment}" />
            <td>
              <a :href="'/surveys/' + assignment.survey._id">{{ assignment.survey.name }}</a>
            </td>
            <td>{{ getCalendar(assignment.createdAt) }}</td>
            <td>{{ getCalendar(assignment.publishFrom) }}</td>
            <td>{{ getCalendar(assignment.publishTo) }}</td>
          </tr>
        </tbody>
      </table>

  </div>
</template>

<script>
import moment from "moment";

import GroupDataService from "../services/GroupDataService";
import UserDataService from "../services/UserDataService";
import AssignmentDataService from "../services/AssignmentDataService";

import tdUserNameLink from "./table/td/tdUserNameLink";
import tdAssignmentNameLink from "./table/td/tdAssignmentNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "group",
  components: {
    tdUserNameLink,
    tdAssignmentNameLink,
    hLargeIconHeader,
    trDetail
  },
  data() {
    return {
      group: {
        _id: "",
        groupId: "",
        createdAt: "",
        updatedAt: ""
      },
      members: [],
      currentIndex: -1,
      assignments: []
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    getGroup(id) {
      GroupDataService.get(id)
        .then(response => {
          this.group = response.data;

          this.members = [];
          this.group.userIds.forEach(userId => {
            UserDataService.get(userId).then(response => {
              this.members.push(response.data);
            });
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    getAssignmentsOfGroup(id) {
      AssignmentDataService.getAssignmentsOfGroup(id)
        .then(response => {
          this.assignments = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    goToAssignment(assignment) {
      window.location.href = "/assignments/" + assignment._id;
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.message = "";
    this.getGroup(this.$route.params.id);
    this.getAssignmentsOfGroup(this.$route.params.id);
    // this.retrieveUsers();
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.td-wrap {
  word-break: break-word;
}
.code-detail {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  color: #666;
}
</style>