<template>
    <div class="recommend" v-loading="loading">
        <MyScroll class="recommend-content" :probeType="probeType" >
            <div>
                <!-- 轮播 -->
                <div class="slide-banner">
                    <div class="banner-wrapper">
                        <my-slider v-if="sliders.length" :sliders="sliders"></my-slider>
                    </div>
                </div>
                <!-- 歌单推荐 -->
                <div class="recommend-list">
                    <h2 class="list-title">热门歌单推荐</h2>
                    <ul>
                        <li class="recommend-item" v-for="item in albums" :key="item.id">
                            <div class="icon">
                                <img v-img-lazy="item.coverImgUrl" width="60" alt="">
                            </div>
                            <div class="text">
                                <p class="name">{{ item.name }}</p>
                                <p class="description">{{ item.description }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </MyScroll>
    </div>
</template>

<script setup>
import MyScroll from '@/components/common/Scroll'
import MySlider from '@/components/common/Slider'
import { computed, onMounted,ref } from 'vue'
import { getSlider, getRecommendAlbum } from '@/service/getRecommend'

const sliders = ref([])
const albums = ref([])
// 为true
const loading = computed(()=> !sliders.value.length || !albums.value.length)
const probeType = 2

onMounted(async ()=>{
    // 获取轮播数据
    const result = await getSlider()
    sliders.value = result.banners

    // 获取热门歌单
    const albumsResult = await getRecommendAlbum()
    albums.value = albumsResult.playlists
})
</script>

<style lang="scss" scoped>
.recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
    .recommend-content {
        height: 100%;
        overflow: hidden;
        .recommend-list {
            .list-title {
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-theme;
            }
            .recommend-item {
                display: flex;
                box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px 20px;
                .icon {
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }
                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: $font-size-medium;
                }
                .name {
                    margin-bottom: 10px;
                    color: $color-text-ll;
                }
                .description {
                    @include no-wrap();
                    color: $color-text-d;
                }
            }
        }
    }
}
</style>