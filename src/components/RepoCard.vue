<template>
  <div>
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
</template>

<script setup>
import MaterialSymbolsStar from "@/components/icons/star.vue";
import MaterialSymbolsVisibilityRounded from "@/components/icons/eye.vue";

defineProps({
  repo: {
    type: Object,
    default: () => {},
  },
});
</script>
