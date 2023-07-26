<script setup>
import { reactive, onMounted } from "vue"
import io from "socket.io-client"

const socket = io()
const messages = reactive([])
const onClick = () => {
  const message = prompt(`
  メッセージを入力してください。
  このメッセージはすべてのクライアントに送信されます。
  `)
  // メッセージ入力イベント（sendMessageEvent）を送信する
  socket.emit("sendMessageEvent",message)
}

onMounted(() => {
  socket.emit("enterMyselfEvent", "あなたが接続しました。")
  socket.emit("enterOtherEvent", "他のクライアントが接続しました。")

  // 自クライアントの接続イベント（enteringMyselfEvent）を受信する
  socket.on("enterMyselfEvent", (data) => {
    // 画面上にメッセージを表示
    messages.unshift(data)
  })

  // 自クライアント以外の接続イベント（enterOtherEvent）を受信する
  socket.on("enterOtherEvent", (data) => {
    // 画面上にメッセージを表示
    messages.unshift(data)
  })

  // メッセージ表示イベント（receiveMessageEvent）を受信する
  socket.on("receiveMessageEvent", (data) => {
    // 画面上にメッセージを表示
    messages.unshift(data)
  })
})
</script>


<template>
  <h1>Sample7</h1>
  <button type="button" @click="onClick">メッセージを入力する</button>
  <ul>
    <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
  </ul>
</template>