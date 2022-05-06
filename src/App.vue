<template>
  <div id="app">
    <nav v-if="$store.state.user.data" class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/surveys" class="navbar-brand">LTA Admin Webapp</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/users" class="nav-link">Users</a>
        </li>
        <li class="nav-item">
          <a href="/groups" class="nav-link">Groups</a>
        </li>
        <li class="nav-item">
          <a href="/surveys" class="nav-link">Surveys</a>
        </li>
        <li class="nav-item">
          <a href="/assignments" class="nav-link">Assignments</a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">Log out</a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  
};
</script>