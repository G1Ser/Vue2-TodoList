<template>
    <div class="clock">
        {{ currentTime }}
    </div>
</template>
  
<script>
export default {
    name: 'Clock',
    data() {
        return {
            currentTime: this.getCurrentTime(),
        };
    },
    methods: {
        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        },
    },
    mounted() {
        setInterval(() => {
            this.currentTime = this.getCurrentTime();
        }, 1000);
    },
};
</script>
  
<style lang="scss" scoped>
.clock {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
    font-family: 'Ly';
}
</style>
  