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

<script setup>
import { reactive } from "vue";
import store from "@/store";
import router from "@/router/index";

const form = reactive({
  input: "",
  filter: 0,
});

const options = [
  { id: 0, order: "", label: "По умолчанию (best match)" },
  { id: 1, order: "desc", label: "По убыванию репозиториев" },
  { id: 2, order: "asc", label: "По возрастанию репозиториев" },
];

const getParams = () => {
  return {
    per_page: 35,
    q: form.input || "",
    sort: form.filter !== 0 ? "repositories" : "",
    order: options[form.filter].order,
  };
};

const submit = () => {
  store.commit("clearLinkList");
  store.commit("setUserList", {});

  const params = getParams();

  if (params.q === "") {
    router.replace({ query: null });
  } else {
    const searchParams = new URLSearchParams(params).toString();
    store.dispatch("loadSearchUsers", searchParams);
    router.push({ name: "search", query: params });
  }
};
</script>
