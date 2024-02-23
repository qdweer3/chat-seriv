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
    currentUser = username;
    togglePage('chatPage');
    updateBadge();
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
    const messageElement = document.createElement('
