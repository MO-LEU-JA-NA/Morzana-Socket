const io = require('socket.io')(3000)

var messages = {
    
}

io.on('connection', (socket) => {
    console.log('connect ', socket.id)
    socket.on('join', (data) => {
        socket.join('room' + data)
        socket.roomid = data
        if (!messages[data])
            messages[data] = []
        socket.emit('last', messages[data])
    })
    socket.on('leave', (data) => {
        socket.leaveAll()
    })
    socket.on('message', (data) => {
        if (!socket.roomid)
            return socket.emit('error', 'not joined')
        messages[socket.roomid].push(data)
        socket.to(socket.rooms[0]).broadcast.emit('message', data)
    })
})