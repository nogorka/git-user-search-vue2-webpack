<template>
  <main class="h-full">
    <div v-if="store.state.userList?.total_count" class="flex flex-col gap-2">
      <div class="flex justify-between">
        <span>Найдено: {{ store.state.userList?.total_count }}</span>

        <el-pagination
          layout="prev, pager, next"
          :page-size="35"
          :total="store.state.userList?.total_count"
          :hide-on-single-page="true"
          @prev-click="onPaginationClick"
          @next-click="onPaginationClick"
          @current-change="onPaginationClick"
        >
        </el-pagination>
      </div>

      <div class="grid grid-cols-5 gap-4">
        <UserCard
          v-for="user in store.state.userList?.items"
          :key="user.id"
          :user="user"
          class="max-w-[300px] min-w-[200px]"
        >
        </UserCard>
      </div>
    </div>
    <div v-else>
      <span class="flex justify-center"> Нет данных </span>
    </div>
  </main>
</template>

<script setup>
import store from "@/store";
import UserCard from "@/components/UserCard.vue";

const onPaginationClick = async (pageNumber) => {
  const url = new URL(store.state.paginationLinkList.last);
  url.searchParams.set("page", pageNumber);

  if (url) store.dispatch("loadSearchUsers", url.searchParams);
};
</script>
