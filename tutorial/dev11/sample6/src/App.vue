<script setup>
import { ref, provide } from "vue"

const message = ref("Hello World!")
provide("message", message)

</script>

<template>
  <router-view></router-view>
</template>