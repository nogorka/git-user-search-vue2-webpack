<template>
  <div class="grid gap-4 grid-cols-5">
    <div
      v-for="user in store.state.userData?.items"
      :key="user.id"
      class="flex gap-2 p-1 bg-slate-50 rounded-lg"
    >
      <el-image class="rounded-lg h-20 w-20" :src="user.avatar_url" lazy />
      <span>{{ user.login }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserList",
};
</script>

<script setup>
import store from "@/store";
</script>
