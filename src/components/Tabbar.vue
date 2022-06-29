<template>
    <div class="tab-bar">
        <router-link
        class="tab-item"
        v-for="item in tabs"
        :key="item.path"
        :to="item.path"
        >
        <span class="tab-link">{{ item.name }}</span>
        </router-link>
    </div>
</template>

<script setup>
const tabs = [
  {
    path: "/recommend",
    name: "推荐",
  },
  {
    path: "/singer",
    name: "歌手",
  },
  {
    path: "/toplist",
    name: "排行",
  },
  {
    path: "/search",
    name: "搜索",
  },
];
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }
    // &表示当前元素.tab-item → .tab-item.router-link-active {}
    &.router-link-active {
      // 被选中的路由router-link样式
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>