const KEY = "todoList";

// Fake for create unique id
let count = 0;

const TodoService = {
  fetch() {
    const tasks = JSON.parse(localStorage.getItem(KEY)) || [];
    const length = tasks.length;
    count = length > 0 ? tasks[length - 1].id : 0;
    count++;
    return tasks;
  },
  update(tasks) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(KEY, JSON.stringify(tasks));
        resolve(tasks);
      } catch (error) {
        reject(error);
      }
    });
  },
  add(tasks, name) {
    tasks.push({ id: count, name, completed: false, editing: false });
    count++;
    return this.update(tasks);
  },
  toggle(tasks, active) {
    tasks.forEach(task => (task.completed = active));
    return this.update(tasks);
  },
  delete(tasks, id) {
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    return this.update(tasks);
  },
  clear(tasks) {
    const activeTasks = tasks.filter(task => task.completed === false);
    return this.update(activeTasks);
  },
};

export default TodoService;
