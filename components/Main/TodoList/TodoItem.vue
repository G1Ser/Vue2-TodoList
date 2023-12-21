<template>
    <div class="todo-item" draggable="true" @dragstart="$emit('dragStart', $event)" @dragover="$emit('dragOver', $event)" @drop="$emit('drop', $event)">
        <input type="checkbox" :checked="todo.completed" @change="Select" />
        <input type="text" v-if="iswitch" v-focus v-model="content" @blur="iswitch = false" @keyup.enter="updatecontent" />
        <label v-else :class="labelstyle" @dblclick="editContent">{{ todo.content }}</label>
        <button @click="deleteTodo"></button>
    </div>
</template>

<script>
export default {
    name: 'TodoItem',
    directives: {
        //指令的名称:{指令的配置对象}
        focus: {
            inserted: function (el) {
                el.focus()
            },
        }
    },
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            iswitch: false
        }
    },
    computed: {
        labelstyle() {
            return this.todo.completed ? "Completed" : ""
        }
    },
    methods: {
        Select(event) {
            this.$store.dispatch('toggleCompleted', { id: this.todo.id, completed: event.target.checked });
        },
        deleteTodo() {
            this.$store.dispatch('toggleDelete', this.todo.id)
        },
        editContent() {
            if (!this.todo.completed) {
                this.iswitch = true,
                    this.content = this.todo.content
            }
        },
        updatecontent(event) {
            if (event.target.value === '') {
                alert("请输入内容");
                return;
            }
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            //检查是否已经存在相同内容和日期的待办事项
            const exists = this.$store.state.todos.some(todo => todo.content === event.target.value && todo.date === date)
            if (exists) {
                alert("该事项已存在");
                return;
            }
            this.$store.dispatch('editContent', {id:this.todo.id,content:event.target.value});
            this.iswitch=false
        }
    }
}
</script>

<style lang="scss" scoped>
.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    padding: 1%;
    margin-bottom: 1%;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);

        button::after {
            content: url('@/assets/Images/删除.svg');
        }
    }

    input[type='checkbox'] {
        width: 40px;
        height: 40px;
        appearance: none;
        cursor: pointer;

        &::after {
            content: url('@/assets/Images/未选中.svg');
        }

        &:checked::after {
            content: url('@/assets/Images/选中.svg');
        }
    }

    input[type='text'] {
        flex: 1;
        margin-left: 1%;
        font-size: 20px;
        box-sizing: border-box;
        padding: 1% 2%;
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 1px 1px 10px rgba(74, 90, 164, 0.8);
        font-family: 'Ly';
        color: rgb(0, 0, 0);
        text-shadow: 1px 1px 2px rgba(74, 90, 164, 0.8);
        border: none;
    }

    label {
        flex: 1;
        margin-left: 1%;
        font-family: 'Ly';
        color: rgb(0, 0, 0);
        text-shadow: 1px 1px 2px rgba(74, 90, 164, 0.8);
        transition: all 0.3s ease;

        &.Completed {
            color: rgb(255, 172, 75);
            font-weight: bold;
            text-decoration: line-through;
        }
    }

    button {
        width: 40px;
        height: 40px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
}
</style>