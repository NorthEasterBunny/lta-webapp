<template>
  <div>
    <hLargeIconHeader :text="user.userId" :icon="'person'"></hLargeIconHeader>

    <div class="row">
      <div class="col">
        <h4>Details</h4>

        <table class="table">
          <trDetail label="_id" :codeDetail="user._id" />
          <trDetail label="userId" :text="user.userId" />
          <trDetail label="timezone" :text="user.timezone" />
          <trDetail label="deviceToken" :codeDetail="user.deviceToken" />
          <trDetail label="versionNumber" :codeDetail="user.versionNumber" />
          <trDetail label="os" :codeDetail="user.os" />
          <trDetail label="createdAt" :time="user.createdAt" />
          <trDetail label="updatedAt" :time="user.updatedAt" />
          <!-- <tr
              v-for="(group, index) in groups" :key="index"
            >
          <th>Groups</th>
                <tdGroupNameLink :data="{group}"/>

          </tr> -->
        </table>
      </div>
    </div>

    <div>
      <h3 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/people.svg" width="24" height="24" />
        Groups
      </h3>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th style="width: 25%">groupId</th>
              <th style="width: 25%">member count</th>
              <th style="width: 50%">members</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="{ active: index == currentIndex }"
              v-for="(group, index) in groups"
              :key="index"
              @click="setActive(group, index)"
              @dblclick="goToGroup(group)"
            >
              <td class="td-wrap">
                <tdGroupNameLink :data="{group}"></tdGroupNameLink>
              </td>
              <td class="td-wrap">{{group.userIds.length}}</td>
              <td class="td-wrap">{{group.userIds.join(", ")}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    <div>
      <h3 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/pencil.svg" width="24" height="24" />
        Assignments
      </h3>

      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/person.svg" width="24" height="24" />
        User Assignments
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">Assignment</th>
            <th style="width: 20%">Survey</th>
            <th style="width: 20%">Created At</th>
            <th style="width: 15%">Publish At</th>
            <th style="width: 10%">Notif</th>
            <th style="width: 10%">Track</th>
            <th style="width: 20%">Answered</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(assignment, index) in assignments.filter(a => !a.groupId)"
            :key="index"
            @dblclick="goToAssignment(assignment)"
          >
            <tdAssignmentNameLink :data="{assignment}" />
            <td>
              <a :href="'/surveys/' + assignment.survey._id">{{ assignment.survey.name }}</a>
            </td>
            <td>{{ getCalendar(assignment.createdAt) }}</td>
            <td>{{ getCalendar(assignment.publishAt) }}</td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.publishNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="publishNotifiedAt"
              />
              <img
                class="mr-1"
                v-if="assignment.expireNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="expireNotifiedAt"
              />
            </td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.firstOpenedAt"
                src="/assets/img/envelope-open.svg"
                title="firstOpenedAt"
              />
              <img
                class="mr-1"
                v-if="assignment.dataset"
                src="/assets/img/check.svg"
                title="dataset"
              />
            </td>
            <td>{{ assignment.dataset ? getCalendar(assignment.dataset.createdAt) : "Unanswered"}}</td>
          </tr>
        </tbody>
      </table>

      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/people.svg" width="24" height="24" />
        Group Assignments
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">Assignment</th>
            <th style="width: 20%">Group</th>
            <th style="width: 20%">Survey</th>
            <th style="width: 20%">Created At</th>
            <th style="width: 20%">Publish At</th>
            <th style="width: 10%">Notif</th>
            <th style="width: 10%">Track</th>
            <th style="width: 20%">Answered</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(assignment, index) in assignments.filter(a => a.groupId)"
            :key="index"
            @dblclick="goToAssignment(assignment)"
          >
            <tdAssignmentNameLink :data="{assignment}" />
            <td>
                <a :href="'/groups/' + assignment.groupId">{{ assignment.groupId }}</a>
            </td>
            <td>
              <a :href="'/surveys/' + assignment.survey._id">{{ assignment.survey.name }}</a>
            </td>
            <td>{{ getCalendar(assignment.createdAt) }}</td>
            <td>{{ getCalendar(assignment.publishAt) }}</td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.publishNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="publishNotifiedAt"
              />
              <img
                class="mr-1"
                v-if="assignment.expireNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="expireNotifiedAt"
              />
            </td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.firstOpenedAt"
                src="/assets/img/envelope-open.svg"
                title="firstOpenedAt"
              />
              <img
                class="mr-1"
                v-if="assignment.dataset"
                src="/assets/img/check.svg"
                title="dataset"
              />
            </td>
            <td>{{ assignment.dataset ? getCalendar(assignment.dataset.createdAt) : "Unanswered"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import UserDataService from "../services/UserDataService";
import AssignmentDataService from "../services/AssignmentDataService";
import GroupDataService from "../services/GroupDataService";

import tdAssignmentNameLink from "./table/td/tdAssignmentNameLink";
import tdGroupNameLink from "./table/td/tdGroupNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "user",
  components: {
    tdAssignmentNameLink,
    tdGroupNameLink,
    hLargeIconHeader,
    trDetail
  },
  data() {
    return {
      user: {
        _id: "",
        userId: "",
        timeZone: "",
        deviceToken: "",
        createdAt: "",
        updatedAt: ""
      },
      assignments: [],
      groups: [],
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    getUser(id) {
      UserDataService.get(id)
        .then(response => {
          this.user = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    getAssignmentsOfUser(id) {
      AssignmentDataService.getAssignmentsOfUser(id)
        .then(response => {
          this.assignments = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getGroupsOfUser(id) {
      GroupDataService.getGroupsOfUser(id)
        .then(response => {
          this.groups = response.data;
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
    this.getUser(this.$route.params.id);
    this.getAssignmentsOfUser(this.$route.params.id);
    this.getGroupsOfUser(this.$route.params.id);
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