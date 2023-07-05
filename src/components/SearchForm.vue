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
import { reactive } from "vue";
import store from "@/store";
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

const params = reactive({ per_page: 35, q: "" });
const setParams = () => {
  params.q = form.input;
  if (form.filter !== 0) params.sort = "repositories";
  if (form.filter === 1) params.order = "desc";
  if (form.filter === 2) params.order = "asc";
};

// move to store action
const submit = async () => {
  setParams();

  store.commit("clearLinkList");
  store.commit("setUserList", {});

  if (params.q === "") {
    await router.replace({ query: null });
  } else {
    const searchParams = new URLSearchParams(params).toString();
    store.dispatch("loadSearchUsers", searchParams);
    await router.push({ name: "search", query: params });
  }
};
</script>
