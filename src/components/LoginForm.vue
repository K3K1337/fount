<template>
  <div class="login-container">
    <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
    </form>
    <p>
      <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'Need an account? Register' : 'Already have an account? Login' }}</a>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LoginForm',
  setup() {
    const username = ref('');
    const password = ref('');
    const isLogin = ref(true);

    const toggleForm = () => {
      isLogin.value = !isLogin.value;
    };

    const handleSubmit = async () => {
      const url = isLogin.value ? '/api/login' : '/api/register';
      const data = { username: username.value, password: password.value };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorDetail = await response.text(); // 获取错误信息
          throw new Error(`Network response was not ok: ${errorDetail}`);
        }

        const result = await response.json();
        console.log('Response:', result); // 调试信息

        if (result.success) {
          window.location.href = '/home';
        } else {
          alert(result.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
      }
    };

    return { username, password, isLogin, toggleForm, handleSubmit };
  }
};
</script>



<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
}
form div {
  margin-bottom: 15px;
}
form label {
  display: block;
  font-weight: bold;
}
form input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
p {
  text-align: center;
}
a {
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
