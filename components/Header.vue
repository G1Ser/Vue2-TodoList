<template>
    <header class="header">
        <h1>Tod<img src="@/assets/Images/图标.svg"><span>List</span></h1>
        <div class="notion">
            <img src="@/assets/Images/提示.svg" @click="showHelp">
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    methods:{
        showHelp(){
            this.$emit('toggleShade')
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    gap: 2%;
    height: 20%;
    padding-top: 4%;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 80px;
        font-family: 'centaur';
        color: rgb(176, 100, 123);
        text-shadow: 5px 5px 10px rgba(164, 170, 220, 0.5), 5px 5px 10px rgba(137, 190, 241, 0.5);
        filter: blur(1px)
    }

    .notion {
        filter: blur(0.8px);
        cursor: pointer;
    }
}
</style>