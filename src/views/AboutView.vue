<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <el-image
        :src="store.state.user.avatar_url"
        fit="fit"
        class="h-60 w-60 rounded-full"
        lazy
      >
        <div slot="error" class="image-slot">
          <img src="@/assets/empty.png" />
        </div>
      </el-image>
      <div class="flex flex-col">
        <span class="text-xl font-semibold"> {{ $store.state.user.name }}</span>
        <a :href="store.state.user.html_url">
          <span class=""> {{ $route.query.login }}</span>
        </a>

        <div class="flex gap-2">
          <span class="text-sm text-slate-800">
            {{ $store.state.user.following }} following
          </span>
          <span class="text-sm text-slate-800">
            {{ $store.state.user.followers }} followers
          </span>
        </div>

        <span v-show="$store.state.user.company" class="text-sm text-slate-800">
          Компания: {{ $store.state.user.company }}
        </span>
        <span v-show="$store.state.user.bio" class="text-sm text-slate-800">
          Био: {{ $store.state.user.bio }}
        </span>
        <span class="text-sm text-slate-800"> Учасник с {{ memberSince }}</span>
      </div>
    </div>

    <span class="text-lg font-semibold">
      Репозитории {{ $store.state.user.public_repos }}
    </span>
    <pre>{{ store.state.user }}</pre>
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router/composables";
import store from "@/store";

const route = useRoute();

onBeforeMount(async () => {
  store.dispatch("loadUser", route.query.login);
  store.dispatch("loadUserRepos", route.query.login);
});

const memberSince = computed(() =>
  new Date(store.state.user.created_at).toLocaleString("ru", {
    month: "short",
    year: "numeric",
  })
);
</script>
