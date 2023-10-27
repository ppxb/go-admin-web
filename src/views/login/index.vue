<script lang="ts" setup>
import { reactive } from 'vue'

const loginForm = reactive({
  username: '',
  password: ''
})

const handleSubmit = () => {
  if (!loginForm.username.trim() || !loginForm.password.trim()) return
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <div class="flex items-center mb-4">
      <h1>后台管理系统</h1>
    </div>
    <a-form layout="horizontal" :model="loginForm" @submit.prevent="handleSubmit">
      <a-form-item>
        <a-input
          size="large"
          placeholder="请输入用户名"
          autocomplete="off"
          v-model:value="loginForm.username"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
          v-model:value="loginForm.password"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" size="large" block>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
:deep(.ant-form) {
  --at-apply: w-300px;
}
</style>
