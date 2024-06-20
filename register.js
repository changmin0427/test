const users = JSON.parse(localStorage.getItem('users')) || {};

function registerUser(username, password) {
    if (users[username]) {
        alert("이미 존재하는 ID입니다.");
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert("사용자 등록이 완료되었습니다.");
        window.location.href = "login.html"; // 등록 후 로그인 페이지로 이동
    }
}

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    registerUser(newUsername, newPassword);
});
