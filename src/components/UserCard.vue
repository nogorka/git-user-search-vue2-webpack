<template>
  <div
    class="flex gap-2 p-1 bg-slate-50 rounded-lg cursor-pointer"
    @click="onUserClick"
  >
    <el-image class="rounded-lg h-20 w-20" :src="user.avatar_url" lazy />
    <span>{{ user.login }}</span>
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
