<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      @keyup.enter="handleNewTaskEnter"
    >
  </header>
</template>

<script>
export default {
  name: "TodoListHeader",
  methods: {
    handleNewTaskEnter(e) {
      const name = e.target.value;
      e.target.value = null;
      this.$emit("onEnter", name);
    },
  },
};
</script>
