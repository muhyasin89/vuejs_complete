<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <h1 class="">Vue js Todo App</h1>
    <div class="column">
      <todo-list v-bind:todos="todos"></todo-list>
      <create-todo v-on:create-todo="createTodo"></create-todo>
    </div>


  </div>
</template>

<script>
import sweetalert from 'sweetalert';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo,
  },
  data() {
    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false
      },{
        title: 'Todo B',
        project: 'Project B',
        done: true
      },{
        title: 'Todo C',
        project: 'Project C',
        done: false
      },{
        title: 'Todo D',
        project: 'Project D',
        done: false
      }],
    };
  },
  methods: {
    createTodo(newTodo) {
    this.todos.push(newTodo);
    sweetalert('Success!', 'To-Do created!', 'success');
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
