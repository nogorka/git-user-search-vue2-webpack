<template>
  <div
    class="flex gap-2 p-1 bg-slate-100 rounded-lg cursor-pointer"
    @click="onUserClick"
  >
    <el-image
      class="rounded-lg h-20 w-20 flex-none"
      :src="user.avatar_url"
      lazy
    />
    <span class="flex-shrink line-clamp-1">
      {{ user.login }}
    </span>
  </div>
</template>
<script>
export default {
  name: "UserCard",
};
</script>
<script setup>
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
