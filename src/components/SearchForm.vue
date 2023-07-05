<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item>
      <el-input
        type="text"
        v-model="form.input"
        placeholder="Введите имя автора"
        @change="submit"
        @keyup.enter="submit"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-select v-model="form.filter" @change="submit">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SearchForm",
};
</script>

<script setup>
import { reactive, ref } from "vue";
import store from "@/store";
import { requestWithHeaders } from "@/utils/request";
import router from "@/router/index";

const form = reactive({
  input: "",
  filter: 0,
});

const options = [
  { id: 0, label: "По умолчанию (best match)" },
  { id: 1, label: "По убыванию репозиториев" },
  { id: 2, label: "По возрастанию репозиториев" },
];

const params = ref({ per_page: 35, q: "" });
const setParams = () => {
  params.value.q = form.input;
  if (form.filter !== 0) params.value.sort = "repositories";
  if (form.filter === 1) params.value.order = "desc";
  if (form.filter === 2) params.value.order = "asc";
};

// move to store action
const submit = async () => {
  setParams();
  const queryParams = new URLSearchParams(params.value).toString();

  store.commit("clearLinkList");
  if (params.value.q === "") {
    store.commit("setUserList", {});
    await router.replace({ query: null });
  } else {
    await router.push({ name: "search", query: params.value });

    const data = await requestWithHeaders(queryParams);
    store.commit("setUserList", data);
  }
};
</script>
