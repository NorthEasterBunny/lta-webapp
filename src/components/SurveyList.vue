<template>
  <div>
    <hLargeIconHeader text="Surveys" :icon="'files'"></hLargeIconHeader>

    <div>
      <div class="search-field input-group mb-4 mt-4">
        <input type="text" class="form-control" placeholder="Search by name" v-model="name" />
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
              <th style="width: 40%">name</th>
              <th style="width: 40%">createdAt</th>
              <th style="width: 20%">Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="{ active: index == currentIndex }"
              v-for="(survey, index) in surveys"
              :key="index"
              @click="setActive(survey, index)"
              @dblclick="goToSurvey(survey)"
            >
              <td class="td-wrap">
                <tdSurveyNameLink :data="{survey}"></tdSurveyNameLink>
              </td>
              <td class="td-wrap">{{ getCalendar(survey.createdAt) }}</td>
              <td class="td-wrap">{{ survey.questions.length }}</td>
            </tr>
          </tbody>
        </table>

        <table class="table">
          <tr>
            <td>
              <a :href="'/addSurvey'">Add Survey</a>
            </td>
          </tr>
        </table>
      </div>

      <div class="col-md-2 ml-4">
        <div v-if="currentSurvey._id != ''">
          <tableDetailsHeader
            icon="file"
            :text="currentSurvey.name"
            :href="'/surveys/' + currentSurvey._id"
          />
          <table class="table">
            <trDetail label="title" :text="currentSurvey.title" />
            <trDetail
              label="createdAt" :time="currentSurvey.createdAt"
            />
            <trDetail label="Questions" :text="currentSurvey.questions.length" />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import SurveyDataService from "../services/SurveyDataService";

import tdSurveyNameLink from "./table/td/tdSurveyNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import tableDetailsHeader from "./table/tableDetailsHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "survey-list",
  components: {
    tdSurveyNameLink,
    hLargeIconHeader,
    tableDetailsHeader,
    trDetail
  },
  data() {
    var emptySurvey = {
      title: "",
      _id: "",
      status: "",
      createdAt: "",
      questions: []
    };

    this.emptySurvey = emptySurvey;
    return {
      surveys: [],
      currentSurvey: emptySurvey,
      currentIndex: -1,
      name: "",
      title: "",
      createdAt: ""
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then(response => {
          this.surveys = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      console.log("refreshList");
      this.retrieveSurveys();
      this.currentSurvey = null;
      this.currentIndex = -1;
    },

    setActive(survey, index) {
      if (index === this.currentIndex) {
        this.currentSurvey = this.emptySurvey;
        this.currentIndex = -1;
      } else {
        this.currentSurvey = survey;
        this.currentIndex = index;
      }
    },

    search() {
      SurveyDataService.findByName(this.name)
        .then(response => {
          this.surveys = response.data;
          this.setActive(this.emptySurvey);
        })
        .catch(e => {
          console.log(e);
        });
    },

    goToSurvey(survey) {
      window.location.href = "/surveys/" + survey._id;
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.currentSurvey = this.emptySurvey;
    this.retrieveSurveys();
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