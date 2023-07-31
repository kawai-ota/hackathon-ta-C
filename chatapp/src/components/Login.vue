<script setup>
import { inject, ref, watch, onMounted } from "vue"
import { useRouter } from "vue-router"
import io from "socket.io-client"

// #region global state
const userName = inject("userName")
const user = inject("user");
// #endregion

// #region local variable
const router = useRouter()
const socket = io()
// #endregion

// #region lifecycle
onMounted(() => {
  registSocketEvent()
})
// #endregion

// #region reactive variable
const inputUserName = ref("");
const inputUserId = ref("");

watch(inputUserName, (inputUserName)=> {
  user.value.name = inputUserName;
});

watch(inputUserId, (inputUserId)=> {
  user.value.id = inputUserId;
})
// #endregion

// #region browser event handler


// 入室メッセージをクライアントに送信する
const onEnter = () => {
  // ユーザー名が入力されているかチェック
  if ( !inputUserName.value ) {
    alert("ユーザー名が入力されていません");
    return;
  }

  socket.emit("loginEvent", (user.value));
  // 入室メッセージを送信
  // socket.emit("enterOtherEvent", `${inputName}さんが入室しました`);

  // 全体で使用するnameに入力されたユーザー名を格納
  // userName.value = inputName;

  // チャット画面へ遷移
  // router.push({ name: "chat" })
}

const registSocketEvent = () => {

  socket.on("loginEvent", (result) => {
    if ( result ) {
      console.log( `${user.value.name} : ${user.value.id}のログインに成功しました`);

      socket.emit("enterOtherEvent", `${user.value.name}さんが入室しました`);
      router.push({ name: "chat" })
    }
    else console.log( `${user.value.name} : ${user.value.id} のログインに失敗しました`);
  })
};

// #endregion
</script>

<template>
  <div class="mx-auto my-5 px-4">
    <h1 class="text-h3 font-weight-medium">Vue.js Chat サンプル</h1>
    
    <!-- テスト用領域 -->
    <div class="mt-10">
      <p>ユーザー名(テスト)</p>
      <input v-model="inputUserName" type="text" class="user-name-text" />
    </div>
    <div class="mt-10">
      <p>ユーザーID(テスト)</p>
      <input v-model="inputUserId" type="number" class="user-id-text" />
    </div>
    <!-- テスト用領域 -->
    <button type="button" @click="onEnter" class="button-normal">入室する</button>
  </div>
</template>

<style scoped>
.user-name-text {
  width: 200px;
  border: 1px solid #888;
  margin-bottom: 16px;
}
.user-id-text {
  width: 200px;
  border: 1px solid #888;
  margin-bottom: 16px;
}
</style>
