<template>
    <!-- 当singerList不为空时，加载动画 -->
    <div class="singer" v-loading="loading">
        <MySingerList 
        :singerList="singerList" 
        :arrStr="arrStrUpperCase"
        @select="getSinger"></MySingerList>
        <router-view v-slot="{ Component }">
            <transition name="slide" appear="">
                <component :is="Component" :detailObj="singerDetail" />
            </transition>
        </router-view>
    </div>
    
</template>

<script setup>
import MySingerList from '@/components/SingerList'
import { computed, onMounted, ref } from "vue";
import {getSingerList} from '@/service/singer'
import MyStorage from '@/assets/js/Storage-api'
import {useRouter} from 'vue-router'


const router = useRouter()

let singerList = ref([])

const singerDetail = ref({})
const loading = computed(()=> !singerList.value.length)
// 创建26个大写字母的数组
const arrStrUpperCase = computed(()=> {
    let arr = ["热"]
    for(let i = 65; i < 91; i++){
        arr.push(String.fromCharCode(i))
    }
    return arr
})

function getSinger(item){
    singerDetail.value = {
        picUrl: item.picUrl,
        id: item.id,
        name: item.name
    }
    MyStorage.setLocal("__singerDetail__", singerDetail.value)
    // 路由跳转
    router.push({
        path: `/singer/${item.id}`
    })
}

onMounted(async ()=>{
    let storageArr = MyStorage.getLocal("__singerList__", [])
    if(storageArr.length){
        singerList.value = storageArr
    } else{
        const result = await getSingerList(arrStrUpperCase.value)
        singerList.value = result
        MyStorage.setLocal("__singerList__", result)
    }
})
</script>

<style lang="scss" scoped>
.singer{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}
</style>