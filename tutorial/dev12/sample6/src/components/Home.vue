<script setup>
import { inject } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const message = inject("message")
const onClick = () => {
  router.push({ name: "hello" })
}
</script>

<template>
  <h1>Sample6</h1>
  <p>{{ message }}</p>
  <button type="button" @click="onClick" >クリック</button>
</template>