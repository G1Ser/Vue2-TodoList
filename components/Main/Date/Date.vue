<template>
    <div class="date-container">
        <Calendar></Calendar>
    </div>
</template>

<script>
import Calendar from './Calendar.vue';
export default {
    name: 'Date',
    components: {
        Calendar
    },
}
</script>

<style lang="scss" scoped>
.date-container {
    height: 100%;
    padding: 10px;
    color: #fff;
    border-radius: 20px;
    backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 3px 3px 10px rgba(137, 190, 241, 0.3);
}
</style>