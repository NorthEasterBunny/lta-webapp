import store from "../store";
import http from "../http-common";

http.interceptors.request.use(function (config) {
  config.headers.token = store.getters.token;
  return config;
});

class AssignmentDataService {
  getAll() {
    return http.get("/assignments");
  }

  getSortedAndFiltered(sortBy, from, to) {
    return http.get(`/assignments/sorted/${sortBy}/filtered/${from}/${to}`);
  }

  getAssignment(id) {
    return http.get(`/assignments/${id}`);
  }

  getAssignmentsOfSurvey(id) {
    return http.get(`/surveys/${id}/assignments`);
  }

  getAssignmentsOfUser(id) {
    return http.get(`/users/${id}/allassignments`);
  }

  getAssignmentsOfGroup(id) {
    return http.get(`/groups/${id}/assignments`);
  }

  search(inputText) {
    return http.get(`/assignments/search/?t=${inputText}`);
  }
}

export default new AssignmentDataService();