<template>
    <footer class="footer">
        <h1>© 2023 Chauncey's Personal Project. All rights reserved.</h1>
    </footer>
</template>

<script>
export default {
    name:'Footer'
}
</script>

<style lang="scss" scoped>
.footer{
    height: 5%;
    padding-bottom: 1%;
    text-align: center;
    h1{
        font-size: 20px;
        font-family: "centaur";
        color: rgb(176,100,123);
        text-shadow: 5px 5px 10px rgba(164,170,220,0.5);
        filter: blur(0.5px)
    }
}
</style>