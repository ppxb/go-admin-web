<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useUserStore } from '~/store/modules/user'
import { useMessage } from '~/composables/use-message'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const { message } = useMessage()

const loginForm = reactive({
  username: '',
  password: ''
})
const loadingRef = ref(false)

const handleSubmit = async () => {
  if (!loginForm.username.trim() || !loginForm.password.trim()) {
    message.error('用户名或密码不能为空', 2)
    return
  }
  loadingRef.value = true
  const isLogin = await userStore.login(loginForm)
  loadingRef.value = false
  if (isLogin) {
    await userStore.setMenus()
    setTimeout(() => router.replace((route.query.redirect as string) ?? '/'))
  }
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-between py-16 px-4 bg-muted">
    <div class="i-bxl-tumblr h-16 w-16 text-slate-950/90" />
    <div class="flex flex-col items-center">
      <h1 class="text-center text-4xl font-semibold mb-3 text-muted">欢迎使用 Turbo</h1>
      <span class="text-sm mb-6 text-muted-foreground"
        >登录或者获得账号以开始对您的综合数据进行管理</span
      >
      <a-form class="mb-3" layout="horizontal" :model="loginForm" @submit.prevent="handleSubmit">
        <a-form-item>
          <a-input
            allow-clear
            placeholder="请输入用户名"
            autocomplete="off"
            v-model:value="loginForm.username"
          >
            <template #addonBefore>
              <i class="i-carbon-user-avatar h-5 w-5" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            allow-clear
            type="password"
            placeholder="请输入密码"
            autocomplete="new-password"
            v-model:value="loginForm.password"
          >
            <template #addonBefore>
              <i
                class="i-carbon-ibm-cloud-security-compliance-center-workload-protection h-5 w-5"
              />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" block :loading="loadingRef"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
      <div className="relative mb-4 w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full h-1px border-t bg-slate-900/10 " />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-muted text-muted-foreground"> 或使用以下方式继续 </span>
        </div>
      </div>
      <a-button class="!text-sm flex items-center justify-center" size="large" disabled block>
        <i class="i-carbon-logo-wechat h-5 w-5 mr-2" />
        微信
      </a-button>
    </div>
    <footer
      class="relative z-20 text-sm flex items-center all:transition-300 text-muted-foreground"
    >
      <p>
        由
        <a
          href="https://github.com/ppxb"
          target="_blank"
          rel="noreferrer"
          class="font-medium underline underline-offset-4 text-muted-foreground hover:text-muted"
        >
          无敌小老鼠
        </a>
        构建。本项目源代码已在
        <a
          href="https://github.com/ppxb/go-admin-web"
          target="_blank"
          rel="noreferrer"
          class="font-medium underline underline-offset-4 text-muted-foreground hover:text-muted"
        >
          Github
        </a>
        开源，使用
        <a
          href="https://github.com/ppxb/go-admin-web/blob/main/LICENSE"
          target="_blank"
          rel="noreferrer"
          class="font-medium underline underline-offset-4 text-muted-foreground hover:text-muted"
        >
          Apache
        </a>
        协议。
      </p>
    </footer>
  </div>
</template>

<style scoped>
:deep(.ant-form) {
  --at-apply: w-300px;
}

:deep(.ant-form-item) {
  --at-apply: mb-4;
}
</style>
