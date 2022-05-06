<template>
  <div>
    <hLargeIconHeader text="Groups" :icon="'people'"></hLargeIconHeader>

    <div>
      <div class="search-field input-group mb-4 mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search by groupId"
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

      <div class="col-md-2 ml-4">
        <div v-if="currentGroup">
          <tableDetailsHeader
            icon="person"
            :text="currentGroup.groupId"
            :href="'/groups/' + currentGroup.groupId"
          />

          <table class="table">
            <trDetail label="groupId" :codeDetail="currentGroup.groupId" />
            <trDetail label="createdAt" :time="currentGroup.createdAt" />
            <trDetail label="updatedAt" :time="currentGroup.updatedAt" />
          </table>
        </div>
      </div>
    </div>

    <table class="table">
      <tr>
        <td>
          <a :href="'/addGroup'">Add Group</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from "moment";

import GroupDataService from "../services/GroupDataService";

import tdGroupNameLink from "./table/td/tdGroupNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import tableDetailsHeader from "./table/tableDetailsHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "group-list",
  components: {
    tdGroupNameLink,
    hLargeIconHeader,
    tableDetailsHeader,
    trDetail
  },
  data() {
    return {
      groups: [],
      currentGroup: null,
      currentIndex: -1,
      searchInput: ""
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    retrieveGroups() {
      GroupDataService.getAll()
        .then(response => {
          this.groups = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveGroup();
      this.currentGroup = null;
      this.currentIndex = -1;
    },

    setActive(group, index) {
      this.currentGroup = group;
      this.currentIndex = index;
    },
    goToGroup(group) {
      window.location.href = "/groups/" + group.groupId;
    },

    search() {
      GroupDataService.findByGroupId(this.searchInput)
        .then(response => {
          this.groups = response.data;
          this.setActive(null);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.retrieveGroups();
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