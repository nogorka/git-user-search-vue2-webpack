<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-4">
      <el-image
        :src="store.state.user.avatar_url"
        fit="fit"
        class="h-[250px] w-[250px] rounded-full flex-none"
        lazy
      >
        <div slot="error" class="image-slot">
          <img src="@/assets/empty.png" />
        </div>
      </el-image>
      <div class="flex flex-col flex-grow">
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
    <div
      v-for="repo in store.state.reposList"
      :key="repo.id"
      class="flex flex-col p-2 bg-slate-100 rounded-lg"
    >
      <a href="">{{ repo.name }}</a>
      <span>{{ repo.description }}</span>

      <div class="flex justify-between">
        <span class="text-sm text-slate-800">{{ repo.language }}</span>
        <div class="flex gap-3">
          <div class="flex">
            <MaterialSymbolsStar />
            <span class="text-sm text-slate-800">
              {{ repo.stargazers_count }}
            </span>
          </div>
          <div class="flex align-middle">
            <MaterialSymbolsVisibilityRounded />
            <span class="text-sm text-slate-800">
              {{ repo.watchers_count }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router/composables";
import store from "@/store";
import MaterialSymbolsStar from "@/components/icons/star.vue";
import MaterialSymbolsVisibilityRounded from "@/components/icons/eye.vue";

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
