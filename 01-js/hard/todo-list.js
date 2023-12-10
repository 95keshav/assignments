/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.clear();
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(index) {
    if (this.isTaskIndex(index)) {
      // splice(start index,delete count)
      this.todos.splice(index, 1);
    }
  }

  update(index, nTodo) {
    if (this.isTaskIndex(index)) {
      if (nTodo.localeCompare("Invalid Task") != 0) {
        this.todos[index] = nTodo;
      }
    }
  }

  getAll() {
    return this.todos;
  }

  get(index) {
    if (this.isTaskIndex(index)) {
      return this.todos[index];
    } else {
      return null;
    }
  }

  clear() {
    this.todos = [];
  }

  isTaskIndex(index) {
    if (index < this.todos.length) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Todo;
