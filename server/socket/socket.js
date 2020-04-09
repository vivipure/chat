

const { addUser, removeUser, getUser, getUsersInRoom } = require('../users');
const GroupChat = require('../model/groupChat')

module.exports =  function ws(io) {
  // io 实例 连接客户端
    io.on('connect', (socket) => {
        console.log('有用户连接了',socket.id)
        // 加入房间 
        socket.on('join', ({ name, room }, callback) => {
          // 添加用户
          const { error, user } = addUser({ id: socket.id, name, room });
          if(error) return callback(error);

          socket.join(user.room);
          // 给该连接用户发送信息
          socket.emit('message', { sender: 'system', content: `${user.name}, 欢迎来到${user.room}.`,chatTime: new Date()})
          // 给其他用户广播信息
          socket.broadcast.to(user.room).emit('message', { 
                  sender: 'system',
                  content: `${user.name} 来到了房间`,
                  chatTime: new Date()
           })
          //  发送房间信息
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
          callback();
        });
        //  用户发送消息
        socket.on('sendMessage', async (message) => {
          const user = getUser(socket.id)
          let date = new Date()
          io.to(user.room).emit('message', { sender: user.name, content: message,chatTime: date});
          // 聊天记录
          let chat = new GroupChat({
            sender: user.name,
            content: message,
            groupId: user.room,
            chatTime: date
          })
          await chat.save()
        });

        // 断开连接
        socket.on('disconnect', () => {
          console.log('有位衰仔离开了房间')
          const user = removeUser(socket.id)
          if(user) {
            io.to(user.room).emit('message', { sender: 'system', content: `${user.name} 离开了房间.`,chatTime: new Date() });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
          }
        })
      });
}

// todo:
// 用户离开房间对信息进行推送