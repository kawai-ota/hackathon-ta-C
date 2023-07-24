export default (io, socket) => {
  // 自クライアントに接続イベント（enteringMyselfEvent）を送信する
  socket.on("enterMyselfEvent", (data) => {
    socket.emit("enterMyselfEvent", data)
  })
  // 自クライアント以外に接続イベント（enterOtherEvent）を送信する
  socket.on("enterOtherEvent", (data) => {
    socket.broadcast.emit("enterOtherEvent", data)
  })

  // メッセージ入力イベント（sendMessageEvent）を受信する
  socket.on("sendMessageEvent", (data) => {
    if (!data) {
      return
    }
    console.log("クライアントの入力値：" + data)
    // 全クライアントが受信するメッセージ表示イベント（receiveMessageEvent）を送信する
    io.sockets.emit("receiveMessageEvent", data)
  })
}