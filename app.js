const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// 간단한 사용자 데이터 예시
const users = [];

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // static 파일 경로 설정

// 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/signup', (req, res) => {
    const { username, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        res.send('비밀번호가 일치하지 않습니다.');
    } else {
        users.push({ username, password });
        res.redirect('/login.html');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.redirect('/'); // 로그인 성공 시 index.html (투두리스트 화면)으로 이동
    } else {
        res.send('로그인 실패: 사용자 이름 또는 비밀번호가 잘못되었습니다.');
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
