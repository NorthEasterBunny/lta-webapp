<template>
  <div>
    <hLargeIconHeader text="Users" :icon="'person'"></hLargeIconHeader>

    <div>
      <div class="search-field input-group mb-4 mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search by userId"
          v-model="searchInput"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
        </div>
      </div>
    </div>

    <div class="list row mt-4">
      <div class="col-md-4">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th style="width: 20%">userId</th>
              <th style="width: 30%">timezone</th>
              <th style="width: 20%" tooltip="deviceToken">
                <img class="mb-1 mr-1" src="/assets/img/phone.svg" title="deviceToken"/>
              </th>
              <th style="width: 15%">os</th>
              <th style="width: 15%">v</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="{ active: index == currentIndex }"
              v-for="(user, index) in users"
              :key="index"
              @click="setActive(user, index)"
              @dblclick="goToUser(user)"
            >
              <td class="td-wrap">
                <tdUserNameLink :data="{user}"></tdUserNameLink>
              </td>
              <td class="td-wrap">{{user.timezone}}</td>
              <td class="td-wrap code-detail">
                <img class="mb-1 mr-1" src="/assets/img/phone.svg" title="deviceToken"/>
              </td>
              <td class="td-wrap">{{user.os}}</td>
              <td class="td-wrap">{{user.versionNumber}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-2 ml-4">
        <div v-if="currentUser">
          <tableDetailsHeader
            icon="person"
            :text="currentUser.userId"
            :href="'/users/' + currentUser.userId"
          />

          <table class="table">
            <trDetail label="userId" :codeDetail="currentUser.userId" />
            <trDetail label="timezone" :codeDetail="currentUser.timezone" />
            <trDetail label="deviceToken" :codeDetail="currentUser.deviceToken" />
            <trDetail label="os" :codeDetail="currentUser.os" />
            <trDetail label="versionNumber" :codeDetail="currentUser.versionNumber" />
            <trDetail label="createdAt" :time="currentUser.createdAt" />
            <trDetail label="updatedAt" :time="currentUser.updatedAt" />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import UserDataService from "../services/UserDataService";

import tdUserNameLink from "./table/td/tdUserNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import tableDetailsHeader from "./table/tableDetailsHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "user-list",
  components: {
    tdUserNameLink,
    hLargeIconHeader,
    tableDetailsHeader,
    trDetail
  },
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchInput: ""
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
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

    refreshList() {
      this.retrieveUser();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActive(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
    goToUser(user) {
      window.location.href = "/users/" + user.userId;
    },

    search() {
      UserDataService.findByUserId(this.searchInput)
        .then(response => {
          this.users = response.data;
          this.setActive(null);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.retrieveUsers();
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