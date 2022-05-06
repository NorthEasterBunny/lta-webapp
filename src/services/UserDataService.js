
import store from "../store";
import http from "../http-common";

http.interceptors.request.use(function (config) {
  config.headers.token = store.getters.token;
  return config;
});

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }
 
  findByUserId(id) {
    return http.get(`/users/search/?t=${id}`);
  }
}

export default new UserDataService();