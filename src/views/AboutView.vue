<template>
  <div class="flex gap-2">
    <el-image
      :src="store.state.user.avatar_url"
      fit="fit"
      class="h-60 w-60 rounded-full"
      lazy
    >
      <div slot="error" class="image-slot">
        <img src="@/assets/empty.jpg" />
      </div>
    </el-image>
    <span class="text-xl font-semibold"> {{ $route.query.login }}</span>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router/composables";
import { apiUserGet } from "@/utils/api";
import store from "@/store";

const route = useRoute();

onBeforeMount(async () => {
  store.commit("clearUser");

  const result = apiUserGet(route.query.login);
  store.commit("setUser", result);
});
</script>
