<template>
  <div>
    <hLargeIconHeader :text="(assignment.userId ? assignment.userId : assignment.groupId) + ' @ ' + assignment.survey.name" :icon="'pencil'"></hLargeIconHeader>

    <div class="row">
      <div class="col">
        <h4 class="col">Details</h4>

        <table class="table">
          <trDetail label="_id" :codeDetail="assignment._id" />
          <trDetail label="userId" :text="assignment.userId" :href="'/users/' + assignment.userId" />
          <trDetail label="groupId" :text="assignment.groupId" :href="'/groups/' + assignment.groupId" />
          <trDetail
            label="survey"
            :text="assignment.survey.name"
            :href="'/surveys/' + assignment.survey._id"
            :subtext="assignment.survey.title"
            :number="assignment.survey.questions.length"
            numberSingular="question"
            numberPlural="questions"
          />
          <trDetail label="createdAt" :time="assignment.createdAt" />
          <trDetail label="publishAt" :time="assignment.publishAt" />
          <trDetail label="publishFrom" :time="assignment.publishFrom" />
          <trDetail label="publishTo" :time="assignment.publishTo" />
          <trDetail label="publishNotifiedAt" :time="assignment.publishNotifiedAt" />
          <trDetail label="expireAt" :time="assignment.expireAt" />
          <trDetail label="expireNotifiedAt" :time="assignment.expireNotifiedAt" />
          <trDetail label="firstOpenedAt" :time="assignment.firstOpenedAt" />
          <trDetail label="lastOpenedAt" :time="assignment.lastOpenedAt" />
          <trDetail
            label="Answered"
            :text="assignment.dataset ? undefined : 'Unanswered'"
            :time="assignment.dataset ? assignment.dataset.createdAt : undefined"
          />
        </table>
      </div>

      <div class="col">
        <h4>Survey config</h4>

        <textarea class="code-block" v-model="survey" rows="25" cols="40" disabled></textarea>
      </div>

      <div class="col">
        <h4>Dataset</h4>

        <textarea class="code-block" v-model="dataset" rows="25" cols="40" disabled></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import AssignmentDataService from "../services/AssignmentDataService";

import hLargeIconHeader from "./h/hLargeIconHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "survey",
  components: {
    hLargeIconHeader,
    trDetail
  },
  data() {
    return {
      assignment: {
        userId: "",
        _id: "",
        createdAt: "",
        publishAt: "",
        publishNotifiedAt: "",
        expireAt: "",
        expireNotifiedAt: "",
        firstOpenedAt: "",
        lastOpenedAt: "",
        survey: {
          createdAt: "",
          questions: []
        },
        dataset: {
          createdAt: ""
        }
      },
      survey: {
        createdAt: "",
        questions: []
      },
      dataset: {
        createdAt: ""
      }
    };
  },
  methods: {
    getTimestamp(dt) {
      return moment(dt).format("YYYY-MM-DD HH:mm Z");
    },
    getAssignment(_id) {
      AssignmentDataService.getAssignment(_id)
        .then(response => {
          this.assignment = response.data;
          console.log(response.data);
          this.survey = JSON.stringify(this.assignment.survey, null, 2);
          this.dataset = JSON.stringify(this.assignment.dataset, null, 2);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.getAssignment(this.$route.params.id);
  }
};
</script>

<style>
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
.detail {
  font-size: smaller;
  color: #666;
}
</style>