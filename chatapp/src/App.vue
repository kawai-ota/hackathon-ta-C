<script setup>
import { provide, ref } from "vue"

// #region reactive state
const userName = ref("")
const user = ref( { name : "", id : ""});
// #endregion

// #region global variable
provide("userName", userName)
provide("user", user);
// #endregion
</script>

<template>
  <router-view />
</template>

<style scoped>
</style>

