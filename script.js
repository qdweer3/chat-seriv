// script.js

let currentUser = null;

function togglePage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    if (user.username === 'admin') {
      currentUser = username;
      togglePage('chatPage');
      updateBadge();
      updateOnlineUsers(users);
      updateButtons(); // Call the updateButtons function here
    } else {
      alert('You do not have permission to access this page.');
    }
  } else {
    alert('Invalid username or password.');
  }
}

function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  if (username && password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, createdAt: new Date().getTime() });
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = username;
    togglePage('chatPage');
    updateBadge();
    updateOnlineUsers(users);
    updateButtons(); // Call the updateButtons function here
  } else {
    alert('Please enter username and password.');
  }
}

function appendToFile(filename, data) {
  const fs = require('fs');
  fs.appendFileSync(filename, data);
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.setAttribute('id', `message_${Date.now()}`); // Generate unique ID for each message
    messageElement.innerHTML = `<strong>${currentUser}</strong>: ${message}`;
    chatMessages.appendChild(messageElement);
    messageInput.value = '';
    updateBadge(); // Update badge after sending message
  }
}

function isNewAccount() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === currentUser);
  if (user) {
    const accountAge = (new Date().getTime() - user.createdAt) / (1000 * 60 * 60 * 24); // Account age in days
    return accountAge <= 3; // Return true if account is less than or equal to 3 days old
  }
  return false;
}

function updateBadge() {
  const badge = document.getElementById('newAccountBadge');
  if (badge) {
    if (isNewAccount()) {
      badge.style.display = 'inline-block'; // Show badge if account is new
    } else {
      badge.style.display = 'none'; // Hide badge if account is older than 3 days
    }
  }
}

function logout() {
  currentUser = null;
  togglePage('loginPage');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Function to update online users list
function updateOnlineUsers(users) {
  const onlineUsersList = document.getElementById('onlineUsers');
  onlineUsersList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.username;
    onlineUsersList.appendChild(li);
  });
}

function updateButtons() {
  const banButton = document.getElementById('banButton');
  const muteButton = document.getElementById('muteButton');

  // Check if the current user is the admin
  if (currentUser === 'admin') {
    banButton.style.display = 'inline-block';
    muteButton.style.display = 'inline-block';
  } else {
    banButton.style.display = 'none';
    muteButton.style.display = 'none';
  }
}
