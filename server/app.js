const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const groupRoute = require('./routes/group')
const config = require('./config')
const ws = require('./socket/socket')


mongoose.connect(config.DB_CONNECT, {
  useNewUrlParser: true
}, () => {
  console.log('连接数据库成功')
})


const app = express();
const server = http.createServer(app);
const io = socketio(server);



app.use(express.json())
app.use(cors())

// 用户路由
app.use('/api/user', authRoute)
// 群组路由
app.use('/api/group', groupRoute)


// 根路由
app.get('/', (req, res) => {
    res.send({response: "Server is up and running."}).status(200)
})

//  socket 程序
ws(io)


server.listen(process.env.PORT || 52000, () => console.log(`Server has started.`));