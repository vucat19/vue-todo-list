<template>
  <section class="todoapp">
    <TodoListHeader @onEnter="addTask"></TodoListHeader>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input
        id="toggle-all"
        :checked="hasNoActiveTask"
        class="toggle-all"
        type="checkbox"
        @change="handleToggleAllChange"
      >
      <label
        v-show="hasTask"
        for="toggle-all"
      >Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <template v-for="(task, index) in filteredTasks">
          <TodoListItem
            :key="index"
            :task="task"
            @onRemove="removeTask(task.id)"
          ></TodoListItem>
        </template>
      </ul>
    </section>
    <!-- This footer should hidden by default and shown when there are todos -->
    <TodoListFooter
      v-if="hasTask"
      :selected-tab="selectedTab"
      :item-left="activeTaskCount"
      :show-clear-button="hasCompletedTask"
      @onTabChange="changeTab"
      @onClearButtonClicked="clearCompletedTasks"
    ></TodoListFooter>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TodoListHeader from "./TodoListHeader";
import TodoListItem from "./TodoListItem";
import TodoListFooter from "./TodoListFooter";

import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  CLEAR_TASKS,
} from "../store/actions.type";
import { FILTER_TABS } from "../constants/todo.js";

export default {
  name: "TodoList",
  components: {
    TodoListHeader,
    TodoListItem,
    TodoListFooter,
  },
  data() {
    return {
      selectedTab: FILTER_TABS.all,
      count: 0,
    };
  },
  computed: {
    ...mapGetters([
      "tasks",
      "activeTaskCount",
      "hasCompletedTask",
      "hasTask",
      "hasNoActiveTask",
    ]),
    filteredTasks() {
      if (this.selectedTab === FILTER_TABS.all) {
        return this.tasks;
      } else {
        const isCompleted = this.selectedTab === FILTER_TABS.completed;
        return this.tasks.filter(task => task.completed === isCompleted);
      }
    },
  },
  methods: {
    ...mapActions([ADD_TASK, TOGGLE_TASK, DELETE_TASK, CLEAR_TASKS]),
    addTask(name) {
      this[ADD_TASK]({ name });
    },
    handleToggleAllChange(e) {
      const active = e.target.checked;
      this[TOGGLE_TASK]({ active });
    },
    removeTask(id) {
      this[DELETE_TASK]({ id });
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    clearCompletedTasks() {
      this[CLEAR_TASKS]();
    },
  },
};
</script>
