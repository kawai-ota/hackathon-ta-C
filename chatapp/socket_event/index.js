export default (io, socket) => {
    // 入室メッセージをクライアントに送信する
    socket.on("enterEvent", (data) => {
        // io.sockets.emit("enterEvent", data)
        socket.emit("enterEvent", data);
    })

    socket.on("enterOtherEvent", (data) => {
        socket.broadcast.emit("enterOtherEvent", data);
    })

    // 退室メッセージをクライアントに送信する
    socket.on("exitEvent", (data) => {
        io.sockets.emit("exitEvent", data)
    })

    // 投稿メッセージを送信する
    socket.on("publishEvent", (data) => {
        io.sockets.emit("publishEvent", data)
    })
}