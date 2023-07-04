<template>
  <div id="app">
    <header class="flex flex-col">
      <div class="flex gap-2 justify-center">
        <SearchBox />
      </div>
      <el-divider />
    </header>

    <router-view />
  </div>
</template>

<script setup>
import SearchBox from "./components/SearchForm.vue";
</script>
