<template>
  <div class="flex gap-2">
    <el-image
      :src="store.state.user.avatar_url"
      fit="fit"
      class="h-60 w-60 rounded-full"
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
import { request } from "@/utils/request";
import store from "@/store";

const route = useRoute();

onBeforeMount(async () => {
  store.commit("setUser", {});

  const response = await request(
    `https://api.github.com/users/${route.query.login}`
  );
  const jsonData = await response.json();
  store.commit("setUser", jsonData);
});
</script>
