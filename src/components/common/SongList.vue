<template>
    <ul class="song-list">
        <li class="item" v-for="(item) in songs" :key="item" @click="addOne(item)">
            <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{handle(item)}}</p>
            </div>
        </li>
    </ul>
</template>

<script setup> 
import { onMounted, ref } from "vue"
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps({
    songs: {
        type: Array,
        default: []
    }
})

function handle(item){
    return item.ar.map((nameobj) => {
        return nameobj.name
    }).join("-")
}

function addOne(item){
    store.dispatch('addOnePlay', [item])
}
</script>

<style lang="scss" scoped>
.song-list {
    .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        font-size: $font-size-medium;
        .content {
            padding: 0 20px;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                text-align: left;
                @include no-wrap();
                color: $color-text-ll;
            }
            .desc {
                text-align: left;
                @include no-wrap();
                margin-top: 4px;
                color: $color-text-d;
            }
        }
    }
}
</style>