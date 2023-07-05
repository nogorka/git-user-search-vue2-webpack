<template>
  <div class="flex flex-col gap-2">
    <UserAbout />

    <span class="text-lg font-semibold">
      Репозитории {{ store.state.user.public_repos }}
    </span>
    <RepoCard
      v-for="repo in store.state.reposList"
      :key="repo.id"
      :repo="repo"
      class="flex flex-col p-2 bg-slate-100 rounded-lg"
    />
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router/composables";
import store from "@/store";
import RepoCard from "@/components/RepoCard.vue";
import UserAbout from "@/components/UserAbout.vue";

const route = useRoute();

onBeforeMount(async () => {
  store.dispatch("loadUser", route.params.login);
  store.dispatch("loadUserRepos", route.params.login);
});
</script>
