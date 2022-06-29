<template>
    <div class="singer-detail" >
        <MyMusicList :loading="loading" :picUrl="picUrl" :listTitle="listTitle" :songs="songs"></MyMusicList>
    </div>
</template>

<script setup>
import MyMusicList from '@/components/common/MusicList'
import {getSingerDetail} from '@/service/singer'
import { computed, onMounted, ref } from "vue"
import {useRouter, useRoute} from 'vue-router'
import MyStorage from '@/assets/js/Storage-api'


const loading = ref(true);
const router = useRouter()
const route = useRoute()
const props = defineProps(["detailObj"])

// 背景图片
const picUrl = computed(()=>{
    return computedData.value ? computedData.value.picUrl : ""
})
// 标题
const listTitle = computed(()=>{
    return computedData.value ? computedData.value.name : ""
})
// 歌曲列表
const songs = ref([])

const computedData = computed(() => {
    let result = null;
    const data = props.detailObj;
    if(data.id){
        // 通过props获取成功
        result = data
    }else{
        // props获取失败
        const cached = MyStorage.getLocal("__singerDetail__")
        // 存储的值存在的话，并且cached的id和路由上的id保持一致的
        // route.params.id / 1 转换为数字
        if(cached && cached.id === route.params.id / 1){
            result = cached
        }
    }
    return result
})
onMounted(async ()=>{
    const data = computedData.value
    // props类和本地存储都没有数据
    if(!data){
        // 跳转到当前路由的上一级
        router.push({
            path: route.matched[0].path
        })
    }
    const result = await getSingerDetail(data)
    songs.value = result.hotSongs
    loading.value = false
})
</script>

<style lang="scss" scoped>
.singer-detail {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $color-background;
    z-index: 1;
}
</style>