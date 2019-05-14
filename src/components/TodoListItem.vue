<template>
  <li
    :class="{ completed: task.completed, editing: task.editing }"
    @dblclick="handleTaskDblClick"
  >
    <div class="view">
      <input
        :checked="task.completed"
        class="toggle"
        type="checkbox"
        @click="toggleTaskStatus"
      >
      <label>{{ task.name }}</label>
      <button
        class="destroy"
        @click="$emit('onRemove')"
      />
    </div>
    <input
      v-model="task.name"
      :class="{ active: task.editing }"
      class="edit"
      @blur="updateTaskName"
      @keyup.enter="updateTaskName"
    >
  </li>
</template>

<script>
import { mapActions } from "vuex";

import { UPDATE_TASKS } from "../store/actions.type.js";

export default {
  name: "TodoListItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions([UPDATE_TASKS]),
    handleTaskDblClick() {
      this.task.editing = true;
      this.$nextTick().then(() => {
        const editInput = this.$el.querySelector(".edit.active");
        editInput && editInput.focus();
      });
    },
    toggleTaskStatus() {
      this.task.completed = !this.task.completed;
      this[UPDATE_TASKS]();
    },
    updateTaskName() {
      this.task.editing = false;
      this[UPDATE_TASKS]();
    },
  },
};
</script>
