<template>
  <div class="home-container">
    <h1>角色选择页面</h1>
    <p>选择一个角色——然后开启聊天！</p>
    <button @click="importChars">导入</button>
    <br />
    <div class="role-container">
      <div class="role" v-for="char in charList" :key="char.id">
        <img :src="char.image" alt="Character Image" />
        <h3>{{ char.name }}</h3>
        <div class="role-btns">
          <button @click="startChat(char)">开始聊天</button>
          <button @click="deleteChar(char)">删除角色</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
// import { renderTemplate } from '../scripts/template.mjs';
import { getCharDetails, getCharList } from '../scripts/chars.mjs';

export default {
  name: 'HomePage',
  setup() {
    const charList = ref([]);

    const importChars = () => {
      // TODO: 导入角色逻辑
      console.log('导入角色');
    };

    const startChat = (char) => {
      console.log(`开始与 ${char.name} 聊天`);
      window.location = `/shells/chat/new?charname=${char.name}`;
    };

    const deleteChar = (char) => {
      console.log(`删除角色 ${char.name}`);
      // TODO: 发送删除角色请求
    };

    const displayCharList = async () => {
      const charListData = await getCharList();
      charList.value = [];

      for (const char of charListData) {
        const charDetails = await getCharDetails(char);
        charList.value.push(charDetails);
      }
    };

    onMounted(() => {
      displayCharList(); // 组件挂载时加载角色列表
    });

    return {
      charList,
      importChars,
      startChat,
      deleteChar,
    };
  },
};
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.role-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.role {
  margin: 20px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.role img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.role-btns {
  margin-top: 10px;
}

.role-btns button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.role-btns button:hover {
  background-color: #f0f0f0;
}
</style>
