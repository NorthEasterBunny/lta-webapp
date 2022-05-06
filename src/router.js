import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/users",
      alias: ["/Users", "/webadmin/users"],
      name: "Users",
      component: () => import("./components/UserList")
    },
    {
      path: "/users/:id",
      alias: ["/User", "/webadmin/users/:id"],
      name: "User",
      component: () => import("./components/User")
    },
    {
      path: "/groups",
      alias: ["/Groups", "/webadmin/groups"],
      name: "Groups",
      component: () => import("./components/GroupList")
    },
    {
      path: "/groups/:id",
      alias: ["/Group", "/webadmin/groups/:id"],
      name: "Group",
      component: () => import("./components/Group")
    },
    {
      path: "/groups/:id/edit",
      alias: ["/GroupEdit", "/webadmin/groups/:id/edit"],
      name: "editGroup",
      component: () => import("./components/GroupEdit")
    },
    {
      path: "/addGroup",
      alias: "/webadmin/addGroup",
      name: "addGroup",
      component: () => import("./components/AddGroup")
    },
    {
      path: "/surveys",
      alias: ["/Surveys", "/", "/webadmin/", "/webadmin/surveys"],
      name: "surveys",
      component: () => import("./components/SurveyList")
    },
    {
      path: "/surveys/:id",
      alias: "/webadmin/surveys/:id",
      name: "survey-details",
      component: () => import("./components/Survey")
    },
    {
      path: "/addSurvey",
      alias: "/webadmin/addSurvey",
      name: "addSurvey",
      component: () => import("./components/AddSurvey")
    },
    {
      path: "/assignments/:id",
      alias: "/webadmin/assignments/:id",
      name: "assignment-details",
      component: () => import("./components/Assignment")
    },
    {
      path: "/assignments",
      alias: "/webadmin/assignments",
      name: "assignment-list",
      component: () => import("./components/AssignmentList")
    },
    {
      path: "/login",
      alias: "/webadmin/login",
      name: "login",
      component: () => import("./components/Login")
    }
  ]
});
