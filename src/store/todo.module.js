import { SET_TASKS } from "./mutations.type";
import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASKS,
  TOGGLE_TASK,
  DELETE_TASK,
  CLEAR_TASKS,
} from "./actions.type";
import TodoService from "../services/todo.service";

export default {
  state: {
    tasks: [],
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    activeTaskCount(state) {
      return state.tasks.reduce((counter, task) => {
        if (!task.completed) ++counter;
        return counter;
      }, 0);
    },
    hasTask: state => state.tasks.length > 0,
    hasCompletedTask: state =>
      state.tasks.some(task => task.completed === true),
    hasNoActiveTask: state =>
      state.tasks.every(task => task.completed === true),
  },
  mutations: {
    [SET_TASKS](state, { tasks }) {
      state.tasks = tasks;
    },
  },
  actions: {
    [FETCH_TASKS]({ commit }) {
      const tasks = TodoService.fetch();
      commit(SET_TASKS, { tasks });
    },
    [ADD_TASK]({ commit, state }, { name }) {
      TodoService.add(state.tasks, name)
        .then(tasks => commit(SET_TASKS, { tasks }))
        .catch(error => alert(error));
    },
    [UPDATE_TASKS]({ commit, state }) {
      TodoService.update(state.tasks)
        .then(tasks => commit(SET_TASKS, { tasks }))
        .catch(error => alert(error));
    },
    [TOGGLE_TASK]({ commit, state }, { active }) {
      TodoService.toggle(state.tasks, active)
        .then(tasks => commit(SET_TASKS, { tasks }))
        .catch(error => alert(error));
    },
    [DELETE_TASK]({ commit, state }, { id }) {
      TodoService.delete(state.tasks, id)
        .then(tasks => commit(SET_TASKS, { tasks }))
        .catch(error => alert(error));
    },
    [CLEAR_TASKS]({ commit, state }) {
      TodoService.clear(state.tasks)
        .then(tasks => commit(SET_TASKS, { tasks }))
        .catch(error => alert(error));
    },
  },
};
