import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  },
  getters: {
    isSaved: (state) => (date) => {
      const filtertodos = state.todos.filter(todo => todo.date === date);
      return filtertodos.length > 0;
    }
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    SET_YEAR(state, year) {
      state.year = year
    },
    SET_MONTH(state, month) {
      state.month = month
    },
    SET_DAY(state, day) {
      state.day = day
    },
    Toggle_Completed(state, { id, completed }) {
      const todo = state.todos.find(todo => todo.id === id);
      todo.completed = completed;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    Toggle_Delete(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    Toggle_Edit(state, { id, content }) {
      const todo = state.todos.find(todo => todo.id === id);
      todo.content = content;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    CLEAR_COMPLETED(state, date) {
      state.todos = state.todos.filter(todo => !(todo.completed && todo.date === date));
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    ALL_COMPLETED(state, date) {
      state.todos.forEach(todo => {
        if (todo.date === date) {
          todo.completed = true;
        }
      });
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
      localStorage.setItem('todos', JSON.stringify(state.todos));
  },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    updateDate({ commit }, { year, month, day }) {
      commit('SET_YEAR', year);
      commit('SET_MONTH', month);
      commit('SET_DAY', day);
    },
    toggleCompleted({ commit }, { id, completed }) {
      commit('Toggle_Completed', { id, completed })
    },
    toggleDelete({ commit }, id) {
      commit('Toggle_Delete', id)
    },
    editContent({ commit }, { id, content }) {
      commit('Toggle_Edit', { id, content })
    },
    clearCompleted({ commit }, date) {
      commit('CLEAR_COMPLETED', date);
    },
    allCompleted({ commit }, date) {
      commit('ALL_COMPLETED', date);
    },
    updateOrder(context, payload) {
      const todos = context.state.todos;

      // 查找并更新这两个待办事项的顺序
      todos.forEach(todo => {
        if (todo.id === payload.draggingTodoId) {
          todo.order = payload.draggingTodoOrder;
        } else if (todo.id === payload.targetTodoId) {
          todo.order = payload.targetTodoOrder;
        }
      });

      // 将更新后的待办事项提交到状态中
      context.commit('SET_TODOS', todos);
    }
  }
});

