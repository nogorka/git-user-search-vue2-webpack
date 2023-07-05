<template>
  <div
    class="flex gap-2 p-1 bg-slate-100 rounded-lg cursor-pointer"
    @click="onUserClick"
  >
    <el-image
      class="rounded-lg h-20 w-20 flex-none"
      :src="user.avatar_url"
      lazy
    >
      <div slot="error" class="image-slot">
        <img :src="empty" />
      </div>
    </el-image>
    <span class="flex-shrink line-clamp-1">
      {{ user.login }}
    </span>
  </div>
</template>

<script setup>
import empty from "@/assets/empty.png";
import router from "@/router";

const props = defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const onUserClick = () => {
  router.push({
    name: "user",
    params: { id: props.user.id },
    query: { login: props.user.login },
  });
};
</script>
