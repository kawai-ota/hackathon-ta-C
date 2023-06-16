<script setup>
import { inject } from "vue"

const message = inject("message")
</script>

<template>
  <div>{{ message }}</div>
</template>