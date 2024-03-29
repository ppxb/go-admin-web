<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

import { useUserStore } from '~/store/modules/user'
import { to } from '~/utils/await-to'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formInline = reactive({
  username: 'admin',
  password: '123'
})
const loadingRef = ref(false)

const handleSubmit = async () => {
  if (!formInline.username.trim() || !formInline.password.trim()) {
    return message.warning('用户名或密码不能为空')
  }

  loadingRef.value = true
  const [err] = await to(userStore.login(formInline))
  if (err) {
    message.error(err.message)
  } else {
    message.success('登录成功')
    setTimeout(() => router.replace((route.query.redirect as string) ?? '/'))
  }
  loadingRef.value = false
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-between py-12 bg-muted">
    <div class="i-carbon:logo-slack h-12 w-12 text-muted" />
    <div class="flex flex-col items-center">
      <h1 class="text-4xl font-semibold text-muted mb-2">
        欢迎使用 <span class="font-bold">Turbo OA</span>
      </h1>
      <span class="text-sm mb-8 text-muted-foreground"
        >登录或者获得账号以开始使用自动化工作流系统
      </span>
      <a-form
        class="w-320px mb-2"
        layout="horizontal"
        :model="formInline"
        @submit.prevent="handleSubmit"
      >
        <a-form-item>
          <a-input
            allow-clear
            placeholder="请输入用户名"
            autocomplete="new-username"
            v-model:value="formInline.username"
          >
            <template #addonBefore>
              <i class="i-ic:outline-account-circle h-5 w-5" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            allow-clear
            type="password"
            placeholder="请输入密码"
            autocomplete="new-password"
            v-model:value="formInline.password"
          >
            <template #addonBefore>
              <i class="i-ic:round-crisis-alert h-5 w-5" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            class="!text-sm"
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loadingRef"
          >
            登录
          </a-button>
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
      <a-button
        class="!w-320px !text-sm flex items-center justify-center"
        size="large"
        disabled
        block
      >
        <i class="i-carbon-logo-wechat h-5 w-5 mr-2" />
        微信
      </a-button>
    </div>
    <footer
      class="relative z-20 text-sm flex items-center all:transition-300 text-muted-foreground"
    >
      <p>
        由
        <a href="https://github.com/ppxb" target="_blank" rel="noreferrer" class="custom-link">
          无敌小老鼠
        </a>
        构建。本项目源代码已在
        <a
          href="https://github.com/ppxb/go-admin-web"
          target="_blank"
          rel="noreferrer"
          class="custom-link"
        >
          Github
        </a>
        开源，使用
        <a
          href="https://github.com/ppxb/go-admin-web/blob/main/LICENSE"
          target="_blank"
          rel="noreferrer"
          class="custom-link"
        >
          Apache
        </a>
        协议。
      </p>
    </footer>
  </div>
</template>

<style scoped>
:deep(.ant-form-item) {
  --at-apply: mb-4;
}
</style>
