import axios from "axios";

// import store from "./store";


import router from './router'

const API = axios.create({
  baseURL: "https://lta.easterbunnyschool.edu/api",
  headers: {
    "Content-type": "application/json"
    // "token": store ? (store.state.user ? JSON.stringify(store.state.user.data) : "no user") : "no store"
  }
})

API.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error.response.data)
  if (error.response.status === 401) {
    // store.dispatch('logout')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default API;