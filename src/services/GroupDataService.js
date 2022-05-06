
import store from "../store";
import http from "../http-common";

http.interceptors.request.use(function (config) {
  config.headers.token = store.getters.token;
  return config;
});

class GroupDataService {
  getAll() {
    return http.get("/groups");
  }

  get(id) {
    return http.get(`/groups/${id}`);
  }

  create(data) {
    return http.post(`/groups/${data.groupId}`, data);
  }

  update(data) {
    return http.put(`/groups/${data.groupId}`, data);
  }
 
  findByGroupId(id) {
    return http.get(`/groups/search/?t=${id}`);
  }

  getGroupsOfUser(id) {
    return http.get(`/groups/user/${id}`);
  }
}

export default new GroupDataService();