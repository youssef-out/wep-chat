const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

// مصفوفة لتخزين معلومات المستخدمين
const users = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('متصل بموقع الدردشة');

    socket.on('chat message', (msg) => {
        const username = users[socket.id]; // اسم المستخدم
        if (username) {
            io.emit('chat message', { username, msg });
        }
    });

    socket.on('user connected', (username) => {
        users[socket.id] = username; // حفظ اسم المستخدم مع معرف الجلسة
        io.emit('user list', Object.values(users)); // إرسال قائمة المستخدمين للجميع
    });

    socket.on('disconnect', () => {
        delete users[socket.id]; // حذف معلومات المستخدم عند الانفصال
        io.emit('user list', Object.values(users)); // إرسال قائمة المستخدمين المحدثة للجميع
    });
});

server.listen(port, () => {
    console.log(`الخادم يعمل على المنفذ ${port}`);
});
