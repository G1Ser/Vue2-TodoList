<template>
    <div class="data-container">
        <div class="add-todo">
            <img src="@/assets/Images/all.svg" @click="checkAll" />
            <input class="add" placeholder="Press Enter ⏎ to add a todo" v-model.trim.lazy="content"
                @keyup.enter="addtodo" />
        </div>
        <transition-group name="list" class="todo-list">
            <TodoItem v-for="todo in sortedTodos" :key="todo.id" :todo="todo" @dragStart="dragStart($event, todo)"
                @dragOver="dragOver($event)" @drop="drop($event, todo)"></TodoItem>
        </transition-group>
        <div class="info-list">
            <TodoInfo :filtertodos="filtertodos" :filterDateTodos="filterDateTodos" @filter="filterlist"></TodoInfo>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import TodoInfo from './TodoInfo.vue';
export default {
    name: "TodoList",
    components: {
        TodoItem,
        TodoInfo
    },
    data() {
        return {
            content: '',
            filtertype: "all",
            draggingTodo: null
        }
    },
    computed: {
        filtertodos() {
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            switch (this.filtertype) {
                case "all":
                    return this.$store.state.todos.filter(todo => todo.date === date);
                    break;
                case "active":
                    return this.$store.state.todos.filter(todo => todo.date === date && todo.completed === false);
                    break;
                case "completed":
                    return this.$store.state.todos.filter(todo => todo.date === date && todo.completed === true);
                    break;
            }
        },
        filterDateTodos() {
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            return this.$store.state.todos.filter(todo => todo.date === date);
        },
        sortedTodos() {
            return this.filtertodos.sort((a, b) => {
                return b.order - a.order;
            });
        }
    },
    methods: {
        addtodo() {
            if (this.content === "") {
                alert("请输入内容");
                return;
            }
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            const todo = {
                id: Date.now(),
                content: this.content,
                completed: false,
                date: date,
                order: Date.now()
            };
            //检查是否已经存在相同内容和日期的待办事项
            const exists = this.$store.state.todos.some(todo => todo.content === this.content && todo.date === date)
            if (exists) {
                alert("该事项已存在");
                return;
            }
            this.$store.dispatch('addTodo', todo);
            this.content = ''
        },
        filterlist(filtertype) {
            this.filtertype = filtertype;
        },
        checkAll() {
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            this.$store.dispatch('allCompleted', date);
        },
        dragStart(event,todo) {
            this.draggingTodo = todo;
        },
        dragOver(event) {
            event.preventDefault(); // 需要阻止默认行为以允许放置
        },
        drop(event, targetTodo) {
            event.preventDefault();

            // 交换 draggingTodo 和 targetTodo 的 'order' 值
            const tempOrder = this.draggingTodo.order;
            this.draggingTodo.order = targetTodo.order;
            targetTodo.order = tempOrder;

            // 向 store 发送一个动作以更新状态
            this.$store.dispatch('updateOrder', {
                draggingTodoId: this.draggingTodo.id,
                draggingTodoOrder: this.draggingTodo.order,
                targetTodoId: targetTodo.id,
                targetTodoOrder: targetTodo.order
            });

            // 拖放完成后清除 draggingTodo
            this.draggingTodo = null;
        }

    }
}
</script>

<style lang="scss" scoped>
.data-container {
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 100%;
    padding-top: 3.5%;
    padding-bottom: 2%;
    padding-left: 2%;
    padding-right: 2%;
    border-radius: 20px;
    backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 3px 3px 10px rgba(137, 190, 241, 0.3);

    .add-todo {
        display: flex;
        width: 100%;
        height: 40px;
        padding: 1% 2%;
        margin-bottom: 1%;
        background-color: rgba(255, 255, 255, 0.3);
        border: none;
        outline: none;
        border-radius: 10px;

        img {
            margin-right: 1%;
            cursor: pointer;
        }

        .add {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.01);
            font-family: 'Centaur';
            font-weight: bold;
            color: rgb(255, 172, 75);
            text-shadow: 1px 1px 2px rgba(74, 90, 164, 0.8);
            border: none;
            outline: none;
        }
    }

    .todo-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 99%;
        height: 80%;
        padding: 1% 0;
        margin-bottom: 1%;
        overflow: hidden;

        &::-webkit-scrollbar {
            width: 1%;
        }

        &:hover {
            overflow-y: auto;
        }
    }

    .list-move {
        transition: all 0.3s ease;
    }


}
</style>