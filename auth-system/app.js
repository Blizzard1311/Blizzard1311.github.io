// 用户数据存储键名
const USER_STORAGE_KEY = 'analytics_users';
// 会话存储键名 
const SESSION_KEY = 'active_session';

// 链接映射配置
const LINK_MAP = {
  dep: 'https://blizzard1311.github.io/dataanalysis_dep.html',
  member: 'https://blizzard1311.github.io/Member_Beh_dataanalysis.html',
  rate: 'https://blizzard1311.github.io/penetration_rate.html'
};

// 初始化用户存储
let users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || [];

// 表单切换功能
function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

// 处理注册表单提交
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (password !== confirm) {
    alert('两次输入的密码不一致');
    return;
  }

  if (users.some(user => user.username === username)) {
    alert('用户名已存在');
    return;
  }

  users.push({
    username,
    password: btoa(password) // Base64编码存储
  });
  
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  alert('注册成功，请登录');
  showLogin();
});

// 处理登录表单提交 
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  const user = users.find(user => 
    user.username === username && 
    user.password === btoa(password)
  );

  if (user) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  } else {
    alert('用户名或密码错误');
  }
});

// 链接跳转功能
function openLink(type) {
  window.open(LINK_MAP[type], '_blank');
}

// 检查会话状态
window.onload = () => {
  if (sessionStorage.getItem(SESSION_KEY)) {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  }
};
