// <---region local variable----

//ログインしているユーザ一覧
const loginUsers = [];

// ---region local variable---->

// <---region local methods----
//[判定関数] userの入力値が正しいか
const valifyUser = ( user ) => {
    if ( typeof user.name !== "string" ) return false;
    if ( typeof user.id !== "number" ) return false;

    if ( user.name === "" ) return false;
    if ( user.id === "" ) return false;

    return true;
}

//[判定関数] user1とuser2が同じユーザーか
const isSameUser = ( user1, user2 ) => {
    if ( user1.name !== user2.name ) return false;
    return user1.id === user2.id;
}

//[判定関数] userがユニークか
const isUniqueUser = ( user ) => {

    const sameUsers = loginUsers.filter( (arrayUser ) => {
        return isSameUser(user, arrayUser);
    });

    return sameUsers.length === 0;
}
// ---region local methods------->


const refleshUsersEmit = (io) => {
    io.sockets.emit("refleshUsers", loginUsers);
} 

export default (io, socket) => {

    //ログインイベント
    socket.on("loginEvent", (user) => {
        const result = valifyUser(user) && isUniqueUser(user);
        if ( result === true ) {
            loginUsers.push(user);
            refleshUsersEmit(io);
        }

        socket.emit("loginEvent", result);
    })

    // 入室メッセージをクライアントに送信する
    socket.on("enterEvent", (data) => {
        // io.sockets.emit("enterEvent", data)
        socket.emit("enterEvent", data);
        refleshUsersEmit(io);
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

    //ログアウトイベント
    socket.on("logoutEvent", (user) => {
        if ( valifyUser(user !== true) ) return;

        const outUserIndex = loginUsers.findIndex( (ele) => isSameUser(ele, user));
        loginUsers.splice(outUserIndex, 1);
        refleshUsersEmit(io);
    })

    //テスト用のイベント
    socket.on("testEvent", (data) => {
        console.log("TestEvent");
        console.log("socketid =", socket.id);

        socket.join(data);
    });
}