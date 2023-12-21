<template>
    <div class="todo-info" v-if="filterDateTodos.length > 0">
        <span>{{ uncompletedCount }} items left</span>
        <div class="items">
            <button @click="$emit('filter', 'all')"><img src="@/assets/Images/all.svg">&nbsp;All</button>
            <button @click="$emit('filter', 'active')"><img src="@/assets/Images/active.svg">&nbsp;Active</button>
            <button @click="$emit('filter', 'completed')"><img src="@/assets/Images/completed.svg">&nbsp;Completed</button>
        </div>
        <button v-if="completedCount > 0" @click="clearAll"><img src="@/assets/Images/delete.svg">&nbsp;&nbsp;Clear
            Completed</button>
    </div>
</template>

<script>
export default {
    name: 'TodoInfo',
    props: {
        filtertodos: {
            type: Array,
            required: true,
        },
        filterDateTodos: {
            type: Array,
            required: true,
        },
    },
    computed: {
        uncompletedCount() {
            return this.filterDateTodos.filter(todo => !todo.completed).length;
        },
        completedCount() {
            return this.filterDateTodos.filter(todo => todo.completed).length;
        }
    },
    methods: {
        clearAll() {
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            this.$store.dispatch('clearCompleted',date);
        }
    }
}
</script>

<style lang="scss" scoped>
.todo-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: 'Centaur';
    font-weight: bold;
    color: rgb(255, 172, 75);
    text-shadow: 1px 1px 2px rgba(74, 90, 164, 0.8);

    .items {
        display: flex;
        justify-content: space-evenly;
        width: 250px;
        gap: 5%;
        margin: auto;
    }

    span {
        font-size: 16px;
        line-height: 20px;
        padding: 1%;
        background-color: rgba(255, 255, 255, 0.3);
        border: none;
        border-radius: 10px;
    }

    button {
        display: flex;
        align-items: center;
        padding: 1%;
        font-size: 16px;
        line-height: 20px;
        font-family: 'Centaur';
        font-weight: bold;
        color: rgb(255, 172, 75);
        text-shadow: 1px 1px 2px rgba(74, 90, 164, 0.8);
        background-color: rgba(255, 255, 255, 0.3);
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
}</style>