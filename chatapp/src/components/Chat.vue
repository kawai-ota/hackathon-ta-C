<script setup>
import { inject, ref, reactive, onMounted } from "vue"
import io from "socket.io-client"

// #region global state
const userName = inject("userName")
const user = inject("user");
// #endregion

// #region local variable
const socket = io()
// #endregion

// #region reactive variable
const chatContent = ref("")
const chatList = reactive([])
const loginUsers = reactive([]); //ログインしているユーザー(自身も含む)
// #endregion

// #region lifecycle
onMounted(() => {
  registSocketEvent()
})
// #endregion

// #region browser event handler
// 投稿メッセージをサーバに送信する
const onPublish = () => {
  const message = `${userName.value} さん: ${chatContent.value}`;
  // 入力欄を初期化

  chatContent.value = "";
  socket.emit("publishEvent", message);
  return false
}

// 退室メッセージをサーバに送信する
const onExit = () => {
  const message = `${userName.value}さんが退出しました`;
  socket.emit("exitEvent", message);
  doLogout();
}

// メモを画面上に表示する
const onMemo = () => {
  const memoMessage = `${userName.value}さんのメモ:${chatContent.value}`;

  // メモの内容を表示
  chatList.push(memoMessage);

  // 入力欄を初期化
  chatContent.value = "";

  return false
}
// #endregion

// #region socket event handler
// サーバから受信した入室メッセージ画面上に表示する
const onReceiveEnter = (data) => {
  chatList.push(data);
}

// サーバから受信した退室メッセージを受け取り画面上に表示する
const onReceiveExit = (data) => {
  chatList.push(data);
}

// サーバから受信した投稿メッセージを画面上に表示する
const onReceivePublish = (data) => {
  chatList.push(data);
}
// #endregion

// #region local methods

const doLogout = () => {
  socket.emit("logoutEvent", user.value); 
}

// イベント登録をまとめる
const registSocketEvent = () => {
  // 入室イベントを受け取ったら実行
  socket.on("enterEvent", (data) => {
    onReceiveEnter(data);
  })

  socket.on("enterOtherEvent", (data) => {
    onReceiveEnter(data);
  })

  // 退室イベントを受け取ったら実行
  socket.on("exitEvent", (data) => {
    onReceiveExit(data);
  })

  // 投稿イベントを受け取ったら実行
  socket.on("publishEvent", (data) => {
    onReceivePublish(data);
  })

  //<------Users周りのイベント領域------

  socket.on("refleshUsers", (users) => {
    loginUsers.splice(0, loginUsers.length, ...users);
  })


  //------Users周りのイベント領域------>
}

// #endregion

socket.emit("enterEvent", "あなたが入室しました");
</script>

<template>
  <div class="mx-auto my-5 px-4">
    <h1 class="text-h3 font-weight-medium">Vue.js Chat チャットルーム</h1>
    <div class="mt-10">
      <p>ログインユーザ：{{ userName }}さん</p>
      <textarea v-model="chatContent" variant="outlined" placeholder="投稿文を入力してください" rows="4" class="area"></textarea>
      <div class="mt-5">
        <button class="button-normal" @click="onPublish">投稿</button>
        <button class="button-normal util-ml-8px" @click="onMemo">メモ</button>
      </div>
      <div class="mt-5" v-if="chatList.length !== 0">
        <ul>
          <li class="item mt-4" v-for="(chat, i) in chatList.reverse()" :key="i">{{ chat }}</li>
        </ul>
      </div>
    </div>
    <router-link to="/" class="link">
      <button type="button" class="button-normal button-exit" @click="onExit">退室する</button>
    </router-link>

    <!-- ログインユーザーのテスト用 -->
    <div class="mt-5" v-if="loginUsers.length !== 0">
      <p>ログイン中のユーザー</p>
      <ul>
        <li class="item mt-4" v-for="(user, i) in loginUsers" :key="i">{{ user }}</li>
      </ul>
    </div>
    <!-- ログインユーザーのテスト用 end -->

  </div>
</template>

<style scoped>
.link {
  text-decoration: none;
}

.area {
  width: 500px;
  border: 1px solid #000;
  margin-top: 8px;
}

.item {
  display: block;
}

.util-ml-8px {
  margin-left: 8px;
}

.button-exit {
  color: #000;
  margin-top: 8px;
}
</style>
