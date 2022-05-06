<template>
  <div class="submit-form">

    <hLargeIconHeader text="Add Survey" :icon="'file-plus'"></hLargeIconHeader>

    <div v-if="!submitted">
      <div class="form-group mt-4">
          <h4>Config:</h4>
        <div>
          <textarea
            type="text"
            rows="10"
            cols="80"
            class="code-block"
            id="config"
            required
            v-model="survey.config"
            name="config"
          />
        </div>
      </div>

      <button @click="saveSurvey" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newSurvey">Add Survey</button>
    </div>
  </div>
</template>

<script>
import SurveyDataService from "../services/SurveyDataService";

import hLargeIconHeader from "./h/hLargeIconHeader";

export default {
  name: "add-survey",
  components: {
    hLargeIconHeader
  },
  data() {
    return {
      survey: {
        id: null,
        title: "",
        config: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveSurvey() {
      var data = this.survey.config;

      SurveyDataService.create(data)
        .then(response => {
          this.survey.id = response.data.id;
          this.survey.config = response.data.config;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },

    newSurvey() {
      this.submitted = false;
      this.survey = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 1300px;
  margin: auto;
}
.code-block {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  background: #ddd;
  color: #666;
}
</style>