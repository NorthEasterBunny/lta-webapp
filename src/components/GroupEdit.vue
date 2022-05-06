<template>
  <div>
    <hLargeIconHeader :text="group.groupId" :icon="'people'"></hLargeIconHeader>

    <h2 class="mt-5">Edit group</h2>

    <a :href="`/groups/${this.group.groupId}`">{{this.group.groupId}}</a>

    <h4 class="mt-5">
      <img class="mb-1 mr-1" src="/assets/img/person.svg" width="24" height="24" />
      All users
    </h4>

    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th style="width: 20%">User</th>
          <th style="width: 40%">timezone</th>
          <th style="width: 40%">Member</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td class="td-wrap">
            <tdUserNameLink :data="{user}"></tdUserNameLink>
          </td>
          <td class="td-wrap">{{user.timezone}}</td>
          <td>
            <input
              type="checkbox"
              :value="user.userId"
              v-model="selectedUserIds"
              @change="arrayCompare()"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <button
      @click="updateGroup"
      type="submit"
      class="btn btn-primary"
      :disabled="!this.selectionModified"
    >Update</button>
  </div>
</template>

<script>
import moment from "moment";

import GroupDataService from "../services/GroupDataService";
import UserDataService from "../services/UserDataService";

import tdUserNameLink from "./table/td/tdUserNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";

export default {
  name: "group",
  components: {
    tdUserNameLink,
    hLargeIconHeader
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
      users: [],
      selectedUserIds: [],
      selectionModified: false
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
          this.selectedUserIds = this.group.userIds;
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateGroup() {
      var data = this.group;
      data.userIds = this.selectedUserIds;
      GroupDataService.update(data)
        .then(response => {
          console.log(response.data);
          this.$router.push({ path: `/groups/${this.group.groupId}` });
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
      setTimeout(() => {
        this.arrayCompare();
      }, 2000);
    },
    arrayCompare() {
      if (this.members.length !== this.selectedUserIds.length) {
        this.selectionModified = true;
        return;
      }

      var superset = [];
      this.members.forEach(user => {
        superset[user.userId] = 1;
      });

      this.selectedUserIds.forEach(e => {
        if (!superset[e]) {
          this.selectionModified = true;
          return;
        } else {
          superset[e] = superset[e] + 1;
        }
      });

      for (let e in superset) {
        if (superset[e] != 2) {
          this.selectionModified = true;
          return;
        }
      }
      this.selectionModified = false;
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.message = "";
    this.getGroup(this.$route.params.id);
    this.retrieveUsers();
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