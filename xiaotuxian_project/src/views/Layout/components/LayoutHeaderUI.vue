<style scoped>
</style>
<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
      <RouterLink active-class="active" :to="`/category/${item.id}`">
        {{ item.name }}
      </RouterLink>
    </li>
  </ul>
</template>