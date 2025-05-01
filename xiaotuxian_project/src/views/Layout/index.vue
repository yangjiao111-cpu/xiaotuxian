<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { onMounted } from "vue";
onMounted(() => {
  let categoryStore = useCategoryStore();
  categoryStore.getCategory();
});
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key破坏复用机制 强制销毁重建 -->
  <!-- <router-view :key="$route.fullPath"></router-view> -->
  <router-view></router-view>
  <LayoutFooter />
</template>
