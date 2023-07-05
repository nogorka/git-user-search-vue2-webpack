<template>
  <div class="flex gap-4">
    <el-image
      :src="store.state.user.avatar_url"
      class="h-[250px] w-[250px] rounded-full flex-none"
      lazy
    >
      <div slot="error" class="image-slot">
        <img :src="empty" />
      </div>
    </el-image>

    <div class="flex flex-col flex-grow">
      <span class="text-xl font-semibold"> {{ store.state.user.name }}</span>
      <a :href="store.state.user.html_url">
        <span class=""> {{ $route.query.login }}</span>
      </a>

      <div class="flex gap-2">
        <span class="text-sm text-slate-800">
          {{ store.state.user.following }} following
        </span>
        <span class="text-sm text-slate-800">
          {{ store.state.user.followers }} followers
        </span>
      </div>

      <span v-show="store.state.user.company" class="text-sm text-slate-800">
        Компания: {{ store.state.user.company }}
      </span>
      <span v-show="store.state.user.bio" class="text-sm text-slate-800">
        Био: {{ store.state.user.bio }}
      </span>
      <span class="text-sm text-slate-800"> Учасник с {{ memberSince }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import store from "@/store";
import empty from "@/assets/empty.png";

const memberSince = computed(() =>
  new Date(store.state.user.created_at).toLocaleString("ru", {
    month: "short",
    year: "numeric",
  })
);
</script>
