<template>
  <div class="container">
    <TodoList />
    <AppFooter />
  </div>
</template>

<script>
import Vue from "vue";

import TodoList from "./components/TodoList";
import AppFooter from "./components/TheFooter";

import { FETCH_TASKS } from "./store/actions.type.js";

export default Vue.extend({
  name: "App",
  components: {
    TodoList,
    AppFooter,
  },
  created() {
    this.$store.dispatch(FETCH_TASKS);
  },
});
</script>

