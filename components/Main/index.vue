<template>
    <main class="main">
        <div class="left">
            <Date></Date>
        </div>
        <div class="right">
            <TodoList></TodoList>
        </div>
    </main>
</template>

<script>
import Date from './Date/Date.vue'
import TodoList from './TodoList/TodoList.vue'
export default {
    name: 'MainTodo',
    components: {
        Date,
        TodoList
    },
}
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    gap: 2%;
    width: 100%;
    height: 75%;

    .left{
        padding-left: 2%;
        padding-top: 1%;
        padding-bottom: 1%;
        width: 50%;
    }
    .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 2%;
        padding-bottom: 2%;
        padding-right: 5%;
        width: 50%
    }
}
</style>