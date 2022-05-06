<template>
  <div class="submit-form">

    <hLargeIconHeader text="Add Group" :icon="'people'"></hLargeIconHeader>

    <div v-if="!submitted">
      <div class="form-group mt-4">
          <h4>groupId:</h4>
        <div>
          <input
            type="text"
            id="groupId"
            required
            v-model="group.groupId"
            name="groupId"
          />
        </div>
      </div>

      <button @click="saveGroup" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>The new group has been added</h4>
      <button class="btn btn-success" @click="newGroup">Add Group</button>
    </div>
  </div>
</template>

<script>
import hLargeIconHeader from "./h/hLargeIconHeader";
import GroupDataService from '../services/GroupDataService';

export default {
  name: "add-group",
  components: {
    hLargeIconHeader
  },
  data() {
    return {
      group: {
        groupId: null
      },
      submitted: false
    };
  },
  methods: {
    saveGroup() {
      var data = this.group;

      GroupDataService.create(data)
        .then(() => {
          this.$router.push({path: `/groups/${this.group.groupId}`});
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },

    newGroup() {
      this.submitted = false;
      this.group = {
        groupId: null
      };
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