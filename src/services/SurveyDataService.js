import moment from "moment";

import store from "../store";
import http from "../http-common";

http.interceptors.request.use(function (config) {
  config.headers.token = store.getters.token;
  return config;
});

class SurveyDataService {
  getAll() {
    return http.get("/surveys");
  }

  getSurvey(id) {
    return http.get(`/surveys/${id}`);
  }

  create(data) {
    return http.post("/surveys", data);
  }

  delete(id) {
    return http.delete(`/surveys/${id}`);
  }

  findByName(inputText) {
    return http.get(`/surveys/search/?t=${inputText}`);
  }

  getCsv(id) {
    return http.get(`/surveys/${id}/datasets/csv`);
  }

  getJson(id) {
    return http.get(`/surveys/${id}/datasets`);
  }

  getResultsCsv(id) {
    return http.get(`/surveys/${id}/datasets/results/csv`);
  }

  getResultsJson(id) {
    return http.get(`/surveys/${id}/datasets/results/json`);
  }

  assignSurvey(sid, uid) {
    return http.post(`/users/${uid}/surveys/${sid}`);
  }

  scheduleSurveyOnce(sid, uid, publishAt) {
    // alert("publishAt: '" + moment(publishAt.format("YYYY-MM-DD HH:mm")) + "'.");
    if (!moment(publishAt).isValid()) {
      alert("publishAt not valid: '" + publishAt + "'.");
      return;
    }

    var publishAtMillis = moment(publishAt).utc().unix();
    return http.post(`/users/${uid}/schedule/survey/${sid}/${publishAtMillis}`);
  }

  scheduleSurveySeries(sid, uid, gid, startYMD, endYMD, hm1, hm2, hm3, hm4, hm5, plusMinusRandomMinutes) {

    if ((uid && gid) || (!uid && !gid)) {
      alert("please select either user or group");
      return;
    }

    if (!moment(startYMD).isValid()) {
      alert("publishAt not valid: '" + startYMD + "'.");
      return;
    }
    if (!moment(endYMD).isValid()) {
      alert("publishAt not valid: '" + endYMD + "'.");
      return;
    }

    // var startDateUtcUnix = moment(startYMD).unix();
    // var endDateUtcUnix = moment(endYMD).unix();

    // alert(startDate);
    // alert(moment(startDate));
    // alert(moment(startDate).unix());
    // alert(moment(startDate).format('X'));

    // alert(moment(startDate).format("YYYY-MM-DD"));
    // alert(moment(startDate).unix().format("YYYY-MM-DD"));
    
    if (uid) {
      return http.post(`/users/${uid}/schedule/survey/${sid}/${startYMD}/${endYMD}/${hm1}+${hm2}+${hm3}+${hm4}+${hm5}/${plusMinusRandomMinutes}`);
    } else if (gid) {
      return http.post(`/groups/${gid}/schedule/survey/${sid}/${startYMD}/${endYMD}/${hm1}+${hm2}+${hm3}+${hm4}+${hm5}/${plusMinusRandomMinutes}`);
    }
  }
}

export default new SurveyDataService();
