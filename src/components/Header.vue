<template>
    <div class="header">
        <span class="icon"></span>
        <h1 class="text">Mr.Z Music Player</h1>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.header{
    height: 44px;
    text-align: center;
    color: $color-theme; // 使用的是variable中的颜色变量
    font-size: 0;
    .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
        width: 30px;
        height: 32px;
        margin-right: 9px;
        @include bg-image("../assets/images/logo"); // 使用的是mixin中的函数
        background-size: cover;
    }
    .text {
        display: inline-block;
        vertical-align: top;
        line-height: 44px;
        font-size: $font-size-large; // 使用的是variable中的字体变量
    }
}
</style>