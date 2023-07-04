<template>
  <main class="h-full">
    <div v-if="store.state.userData?.total_count" class="flex flex-col gap-2">
      <div class="flex justify-between">
        <span>Найдено: {{ store.state.userData?.total_count }}</span>

        <el-pagination
          layout="prev, pager, next"
          :page-size="35"
          :total="store.state.userData?.total_count"
          :hide-on-single-page="true"
          @prev-click="onPrevClick"
          @next-click="onNextClick"
          @current-change="onCurrentChange"
        >
        </el-pagination>
      </div>

      <div class="grid gap-4 grid-cols-5">
        <UserCard
          v-for="user in store.state.userData?.items"
          :key="user.id"
          :user="user"
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
import sendRequest from "@/utils/request";
import UserCard from "@/components/UserCard.vue";

const onPrevClick = () => {
  onPaginationClick(store.state.paginationLinkList.prev);
};
const onNextClick = () => {
  onPaginationClick(store.state.paginationLinkList.next);
};

const onCurrentChange = (pageNumber) => {
  const url = new URL(store.state.paginationLinkList.last);
  url.searchParams.set("page", pageNumber);
  onPaginationClick(url.toString());
};

const onPaginationClick = async (url) => {
  if (url) {
    const data = await sendRequest(url);
    store.commit("setUserData", data);
  }
};
</script>
