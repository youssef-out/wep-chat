var username = "";
var allowedUsers = ["youssef", "ilyass", "yistore"];

function login() {
    var usernameInput = document.getElementById("username");
    var password = document.getElementById("password").value;

    if (allowedUsers.includes(usernameInput.value) && password === "password") {
        username = usernameInput.value;

        var loginContainer = document.querySelector(".login-container");
        var chatContainer = document.getElementById("chat-container");

        loginContainer.style.display = "none";
        chatContainer.style.display = "block";
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
}

function sendMessage() {
    var messageInput = document.getElementById("message");
    var messageText = messageInput.value;
    var chatOutput = document.getElementById("chat-output");

    if (messageText) {
        if (username) {
            var messageElement = document.createElement("div");
            var deleteButton = document.createElement("button"); // زر الحذف
            deleteButton.innerHTML = "حذف";
            deleteButton.onclick = function () {
                chatOutput.removeChild(messageElement);
            };

            messageElement.innerHTML = `<strong>${username}:</strong> ${messageText}`;
            messageElement.appendChild(deleteButton); // إضافة زر الحذف إلى الرسالة
            messageElement.classList.add("message");

            chatOutput.appendChild(messageElement);

            messageInput.value = "";
            chatOutput.scrollTop = chatOutput.scrollHeight;
        } else {
            alert("يرجى تسجيل الدخول أولاً");
        }
    }
}
