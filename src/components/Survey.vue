<template>
  <div>
    <hLargeIconHeader :text="currentSurvey.name" :icon="'file'"></hLargeIconHeader>

    <div class="row">
      <div class="col">
        <h4>Details</h4>

        <table class="table">
          <trDetail label="name" :text="currentSurvey.name" />
          <trDetail label="title" :text="currentSurvey.title" />
          <trDetail label="_id" :codeDetail="currentSurvey._id" />
          <trDetail label="createdAt" :time="currentSurvey.createdAt" />
          <trDetail
            label="Questions"
            :number="currentSurvey.questions.length"
            numberSingular="question"
            numberPlural="questions"
          />
        </table>
      </div>

      <div class="col">
        <h4>Config</h4>

        <textarea class="code-block" v-model="currentSurveyConfig" rows="25" cols="60" disabled></textarea>
      </div>
    </div>

    <div class="mt-5 mb-5">
      <h4>
        <img class="mb-2 mr-1" src="/assets/img/person-plus.svg" width="24" height="24" />
        Assign and Publish
      </h4>userId:
      <form class="edit-form">
        <div class="input-group">
          <select class="form-control" v-model="selectedAssignUserId">
            <option
              v-for="u in allUsers"
              v-bind:value="u.userId"
              v-bind:key="u.userId"
            >{{ u.userId }}</option>
          </select>

          <span>
            <button
              type="button"
              class="btn btn-primary ml-2"
              @click="assignSurvey"
            >Assign and Publish</button>
          </span>
        </div>
      </form>

      <h4 class="mt-4">
        <img class="mb-2 mr-1" src="/assets/img/person-plus.svg" width="24" height="24" />
        Schedule Once
      </h4>userId:
      <form class="edit-form">
        <div class="input-group">
          <select class="form-control" v-model="selectedScheduleOnceUserId">
            <option
              v-for="u in allUsers"
              v-bind:value="u.userId"
              v-bind:key="u.userId"
            >{{ u.userId }}</option>
          </select>
        </div>
        <div>
          publishAt:
          <datetime format="YYYY-MM-DD H:i:s" width="300px" v-model="scheduleOnceDatetime"></datetime>
        </div>
        <div class="mt-3">
          <span>
            <button type="button" class="btn btn-primary" @click="scheduleSurveyOnce">Schedule Once</button>
          </span>
        </div>
      </form>

      <h4 class="mt-4">
        <img class="mb-2 mr-1" src="/assets/img/person-plus.svg" width="24" height="24" />
        Schedule Series
      </h4>
      <form class="edit-form">
        userId:
        <div class="input-group">
          <select class="form-control" v-model="selectedScheduleSeriesUserId">
            <option
              v-for="u in allUsers"
              v-bind:value="u.userId"
              v-bind:key="u.userId"
            >{{ u.userId }}</option>
          </select>
        </div>
        groupId:
        <div class="input-group">
          <select class="form-control" v-model="selectedScheduleSeriesGroupId">
            <option
              v-for="g in allGroups"
              v-bind:value="g.groupId"
              v-bind:key="g.groupId"
            >{{ g.groupId }}</option>
          </select>
        </div>
        <div>
          scheduleStartDate:
          <datetime format="YYYY-MM-DD" width="300px" v-model="scheduleStartDate"></datetime>scheduleEndDate:
          <datetime format="YYYY-MM-DD" width="300px" v-model="scheduleEndDate"></datetime>
        </div>

        <div>
          Hours:
          <datetime format="H:i:s" width="60px" v-model="scheduleHM1"></datetime>
          <datetime format="H:i:s" width="60px" v-model="scheduleHM2"></datetime>
          <datetime format="H:i:s" width="60px" v-model="scheduleHM3"></datetime>
          <datetime format="H:i:s" width="60px" v-model="scheduleHM4"></datetime>
          <datetime format="H:i:s" width="60px" v-model="scheduleHM5"></datetime>
        </div>

        <div>
          randomizeMinutes:
          <input type="text" class="form-control" v-model="randomizeMinutes" />
        </div>

        <div class="mt-4">
          <span>
            <button
              type="button"
              class="btn btn-primary"
              @click="scheduleSurveySeries"
            >Schedule Series</button>
          </span>
        </div>
      </form>

      <h3 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/pencil.svg" width="24" height="24" />
        Assignments
      </h3>

      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/person.svg" width="24" height="24" />
        User assignments
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">Assignment</th>
            <th style="width: 10%">User</th>
            <th style="width: 20%">createdAt</th>
            <th style="width: 20%">publishAt</th>
            <th style="width: 10%">Notif</th>
            <th style="width: 10%">Track</th>
            <th style="width: 20%">Answered</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(assignment, index) in userAssignments" 
            :key="index"
            @dblclick="goToAssignment(assignment)"
          >
            <tdAssignmentNameLink :data="{assignment}" />
            <td>
              <a :href="'/users/' + assignment.userId">{{ assignment.userId }}</a>
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
            <td>{{ assignment.dataset ? getCalendar(assignment.dataset.createdAt) : "Unanswered" }}</td>
            <td />
          </tr>
        </tbody>
      </table>

      <div class="mt-4" v-if="!isGeneratingDownload && !(datasetCsv || datasetJson)">
        <span class="m-2">
          Generate
        </span>
        <span class="m-2">
          <a href="javascript:;" @click="generateCsv">CSV</a>
        </span>
        <span target="m-2">
          <a href="javascript:;" @click="generateJson">JSON</a>
        </span>
      </div>

      <div class="mt-4" v-if="isGeneratingDownload">
        <span class="m-2">
          Generating...
        </span>
      </div>

      <div class="mt-4" v-if="!isGeneratingDownload && (datasetCsv || datasetJson)">
        <span class="m-2" v-if="datasetCsv">
          <a 
            v-bind:href="`data:text/csv;charset=utf-8,` + encodeURIComponent(datasetCsv)"
            target="_blank" 
            v-bind:download='currentSurvey.id || currentSurvey.name + ".csv"'
            >
            Download CSV
          </a>
        </span>
        <span target="m-2" v-if="datasetJson">
          <a 
            v-bind:href="`data:text/json;charset=utf-8,` + encodeURIComponent(datasetJson)"
            target="_blank" 
            v-bind:download='currentSurvey.id || currentSurvey.name + ".json"'
            >
            Download JSON
          </a>
        </span>
      </div>

      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/people.svg" width="24" height="24" />
        Group assignments
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">Assignment</th>
            <th style="width: 10%">Group</th>
            <th style="width: 20%">createdAt</th>
            <th style="width: 20%">publishFrom</th>
            <th style="width: 20%">publishTo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(assignment, index) in groupAssignments" 
            :key="index"
            @dblclick="goToAssignment(assignment)"
          >
            <tdAssignmentNameLink :data="{assignment}" />
            <td>
              <a :href="'/groups/' + assignment.groupId">{{ assignment.groupId }}</a>
            </td>
            <td>{{ getCalendar(assignment.createdAt) }}</td>
            <td>{{ getCalendar(assignment.publishFrom) }}</td>
            <td>{{ getCalendar(assignment.publishTo) }}</td>
          </tr>
        </tbody>
      </table>


      <div class="mt-4" v-if="!isGeneratingResultsDownload && !(datasetResultsCsv || datasetResultsJson)">
        <span class="m-2">
          Generate
        </span>
        <span class="m-2">
          <a href="javascript:;" @click="generateResultsCsv">CSV</a>
        </span>
        <span target="m-2">
          <a href="javascript:;" @click="generateResultsJson">JSON</a>
        </span>
      </div>

      <div class="mt-4" v-if="isGeneratingResultsDownload">
        <span class="m-2">
          Generating...
        </span>
      </div>

      <div class="mt-4" v-if="!isGeneratingResultsDownload && (datasetResultsCsv || datasetResultsJson)">
        <span class="m-2" v-if="datasetResultsCsv">
          <a 
            v-bind:href="`data:text/csv;charset=utf-8,` + encodeURIComponent(datasetResultsCsv)"
            target="_blank" 
            v-bind:download='currentSurvey.id ? currentSurvey.id : currentSurvey.name + "_results.csv"'
            >
            Download CSV
          </a>
        </span>
        <span target="m-2" v-if="datasetResultsJson">
          <a 
            v-bind:href="`data:text/json;charset=utf-8,` + encodeURIComponent(datasetResultsJson)"
            target="_blank" 
            v-bind:download='currentSurvey.id ? currentSurvey.id : currentSurvey.name + "_results.json"'
            >
            Download JSON
          </a>
        </span>
      </div>

    </div>
  </div>

  <!-- <div class="edit-form">
      <h4>Edit Survey</h4>
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="currentSurvey.title" />
        </div>

        <div class="form-group">
          <label>
            <strong>Status:</strong>
          </label>
          {{ currentSurvey.published ? "Published" : "Pending" }}
        </div>
      </form>

      <button
        class="badge badge-primary mr-2"
        v-if="currentSurvey.published"
        @click="updatePublished(false)"
      >UnPublish</button>
      <button v-else class="badge badge-primary mr-2" @click="updatePublished(true)">Publish</button>

      <button class="badge badge-danger mr-2" @click="deleteSurvey">Delete</button>

      <button type="submit" class="badge badge-success" @click="updateSurvey">Update</button>
      <p>{{ updateMessage }}</p>
  </div>-->
</template>

<script>
import moment from "moment";
import datetime from "vuejs-datetimepicker";

import SurveyDataService from "../services/SurveyDataService";
import UserDataService from "../services/UserDataService";
import GroupDataService from '../services/GroupDataService';
import AssignmentDataService from "../services/AssignmentDataService";

import tdAssignmentNameLink from "./table/td/tdAssignmentNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import trDetail from "./table/tr/trDetail";

export default {
  components: {
    datetime,
    tdAssignmentNameLink,
    hLargeIconHeader,
    trDetail
  },
  name: "survey",
  data() {
    return {
      currentSurvey: {
        title: "",
        _id: "",
        status: "",
        createdAt: "",
        questions: []
      },
      currentSurveyConfig: "",
      updateMessage: "",
      assignMessage: "",
      allUsers: [],
      allGroups: [],
      selectedAssignUserId: "",

      selectedScheduleOnceUserId: "",
      scheduleOnceDatetime: "",

      selectedScheduleSeriesUserId: "",
      selectedScheduleSeriesGroupId: "",
      scheduleStartDate: "",
      scheduleEndDate: "",
      scheduleHM1: "",
      scheduleHM2: "",
      scheduleHM3: "",
      scheduleHM4: "",
      scheduleHM5: "",
      randomizeMinutes: 0,

      assignments: [],

      isGeneratingDownload: false,
      datasetJson: null,
      datasetCsv: null,

      isGeneratingResultsDownload: false,
      datasetResultsJson: null,
      datasetResultsCsv: null
    };
  },
  computed: {
     userAssignments: function() {
       return this.assignments.filter(a => a.userId)
     },
     groupAssignments: function() {
       return this.assignments.filter(a => a.groupId);
     }
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    getSurvey(_id) {
      SurveyDataService.getSurvey(_id)
        .then(response => {
          this.currentSurvey = response.data;
          this.currentSurveyConfig = JSON.stringify(
            this.currentSurvey,
            null,
            2
          );
        })
        .catch(e => {
          console.log(e);
        });
    },

    getUsers() {
      UserDataService.getAll()
        .then(response => {
          this.allUsers = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    getGroups() {
      GroupDataService.getAll()
        .then(response => {
          this.allGroups = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    getAssignmentsOfSurvey(id) {
      AssignmentDataService.getAssignmentsOfSurvey(id)
        .then(response => {
          this.assignments = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      console.log(status);
      var data = {
        _id: this.currentSurvey._id,
        title: this.currentSurvey.title,
        published: status
      };

      SurveyDataService.update(this.currentSurvey._id, data)
        .then(response => {
          this.currentSurvey.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateSurvey() {
      SurveyDataService.update(this.currentSurvey._id, this.currentSurvey)
        .then(response => {
          console.log(response.data);
          this.updateMessage = "The Survey was updated successfully!";
        })
        .catch(e => {
          console.log(e);
          this.updateMessage = "Update failed.";
        });
    },

    assignSurvey() {
      SurveyDataService.assignSurvey(
        this.currentSurvey._id,
        this.selectedAssignUserId
      )
        .then(response => {
          console.log(response.data);
          this.assignMessage = "The user has been assigned the survey.";
          this.getAssignmentsOfSurvey()
        })
        .catch(e => {
          console.log(e);
          this.updateMessage = "Assignment failed.";
          alert(this.updateMessage);
        });
    },

    scheduleSurveyOnce() {
      SurveyDataService.scheduleSurveyOnce(
        this.currentSurvey._id,
        this.selectedScheduleOnceUserId,
        this.scheduleOnceDatetime
      )
        .then(response => {
          console.log(response.data);
          this.assignMessage =
            "The survey series has been scheduled at " +
            this.scheduleOnceDatetime +
            ".";
          this.getAssignmentsOfSurvey()
        })
        .catch(e => {
          console.log(e);
          this.updateMessage = "Scheduling once failed.";
          alert(this.updateMessage);
        });
    },

    scheduleSurveySeries() {
      SurveyDataService.scheduleSurveySeries(
        this.currentSurvey._id,
        this.selectedScheduleSeriesUserId,
        this.selectedScheduleSeriesGroupId,
        this.scheduleStartDate,
        this.scheduleEndDate,
        this.scheduleHM1,
        this.scheduleHM2,
        this.scheduleHM3,
        this.scheduleHM4,
        this.scheduleHM5,
        this.randomizeMinutes
      )
        .then(response => {
          console.log(response.data);
          this.assignMessage = "The survey series has been scheduled.";
          this.getAssignmentsOfSurvey()
        })
        .catch(e => {
          console.log(e);
          this.updateMessage = "Scheduling series failed.";
          alert(this.updateMessage);
        });
    },

    deleteSurvey() {
      SurveyDataService.delete(this.currentSurvey._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "surveys" });
        })
        .catch(e => {
          console.log(e);
        });
    },

    goToAssignment(assignment) {
      window.location.href = "/assignments/" + assignment._id;
    },

    generateCsv() {
      this.isGeneratingDownload = true
      SurveyDataService.getCsv(this.currentSurvey._id)
        .then(apiResponse => {
          this.datasetCsv = apiResponse.data
          this.isGeneratingDownload = false
      })
    },

    generateJson() {
      this.isGeneratingDownload = true
      SurveyDataService.getJson(this.currentSurvey._id)
        .then(apiResponse => {
          this.datasetJson = JSON.stringify(apiResponse.data)
          this.isGeneratingDownload = false
      })
    },

    generateResultsCsv() {
      this.isGeneratingResultsDownload = true
      SurveyDataService.getResultsCsv(this.currentSurvey._id)
        .then(apiResponse => {
          this.datasetResultsCsv = apiResponse.data
          this.isGeneratingResultsDownload = false
      })
    },

    generateResultsJson() {
      this.isGeneratingDoisGeneratingResultsDownloadwnload = true
      SurveyDataService.getResultsJson(this.currentSurvey._id)
        .then(apiResponse => {
          this.datasetResultsJson = JSON.stringify(apiResponse.data)
          this.isGeneratingResultsDownload = false
      })
    }
  },
  
  mounted() {
    moment.locale("en-ca");
    this.updateMessage = "";
    this.assignMessage = "";
    this.getSurvey(this.$route.params.id);
    this.getUsers();
    this.getGroups();
    this.getAssignmentsOfSurvey(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
}
.list {
  max-width: 100%;
}
.code-block {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  background: #ddd;
  color: #666;
}
.code-detail {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  color: #666;
}
.td-wrap {
  word-break: break-word;
}
.h-spacer {
  margin-right: 200;
}
</style>