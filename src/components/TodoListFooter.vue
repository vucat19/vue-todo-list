<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count">
      <strong>{{ itemLeft }}</strong> item left
    </span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li
        v-for="(tab, i) in filterTabs"
        :key="i"
      >
        <a
          :class="{ selected: selectedTab === tab }"
          :href="tabHref(tab)"
          @click="$emit('onTabChange', tab)"
        >{{ tab }}</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      v-show="showClearButton"
      class="clear-completed"
      @click="$emit('onClearButtonClicked')"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
import { FILTER_TABS } from "../constants/todo.js";

export default {
  name: "TodoListFooter",
  props: {
    selectedTab: {
      type: String,
      required: true,
    },
    itemLeft: {
      type: Number,
      required: true,
    },
    showClearButton: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filterTabs: Object.keys(FILTER_TABS).map(k => FILTER_TABS[k]),
    };
  },
  methods: {
    tabHref(tab) {
      return `#/${tab === FILTER_TABS.all ? "" : tab}`;
    },
  },
};
</script>
