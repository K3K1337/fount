<template>
  <div class="redirection">
    <p>Redirecting...</p>
  </div>
</template>

<script>
import { onMounted } from 'vue'; // 从 Vue 中导入 onMounted
import { useRouter } from 'vue-router'; // 从 Vue Router 导入 useRouter

export default {
  name: 'ReDirection',
  setup() {
    const router = useRouter(); // 创建 router 实例

    const checkLoginStatus = () => {
      fetch('/api/check-session', {
        method: 'GET',
        credentials: 'include' // 确保包含 cookie 信息
      })
          .then(response => response.json())
          .then(data => {
            console.log('Login status response:', data); // 打印响应数据
            if (data.isLogin) {
              // 使用 router 进行重定向到主页
              router.push('/home');
            } else {
              // 使用 router 进行重定向到登录页面
              router.push('/login');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Failed to check login status');
            // 在发生错误时使用 router 重定向到登录页面
            router.push('/login');
          });
    };

    onMounted(() => {
      checkLoginStatus(); // 在组件挂载时检查登录状态
    });

    return {}; // 由于没有状态要返回，这里可以返回一个空对象
  }
};
</script>

<style scoped>
.redirection {
  text-align: center;
  margin-top: 20px;
}
</style>

