<template>
  <div id="app">
    <header class="flex flex-col">
      <div class="flex gap-2 justify-center">
        <SearchForm />
      </div>
      <el-divider />
    </header>

    <router-view />
  </div>
</template>

<script setup>
import SearchForm from "./components/SearchForm.vue";
</script>
