<template>
  <a-form
    ref="ruleFormRef"
    :model="formState"
    :rules="rules"
    class="login-form login-form-enter-active login-form-leave-active"
    name="normal_login"
    v-bind="layout"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    @validate="handleValidate"
  >
    <a-from-item>
      <h1 class="title">Welcome</h1>
    </a-from-item>
    <a-form-item class="item-form" label="用户名" name="username">
      <a-input v-model:value="formState.username" size="large">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item class="item-form" label="密码" name="password">
      <a-input-password v-model:value="formState.password" size="large">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item class="item-form" label="验证码" name="code">
      <a-input v-model:value="formState.code" size="large"></a-input>
      <a-tooltip placement="right">
        <template #title>
          <span>点击刷新</span>
        </template>
        <canvas
          ref="canvasRef"
          style="height: 45px; width: 100px; cursor: pointer"
          @click="refreshCode"
        ></canvas>
      </a-tooltip>
    </a-form-item>
    <a-form-item>
      <a-form-item name="remember" no-style>
        <a-checkbox v-model:checked="formState.remember" style="margin-left: 53px"
          >记住密码
        </a-checkbox>
      </a-form-item>
      <a-typography-link class="login-form-forgot" underline @click="changeType"
        >点我注册</a-typography-link
      >
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        :disabled="disabled"
        :loading="loading"
        block
        html-type="submit"
        size="large"
        type="primary"
      >
        登录
      </a-button>
      <span style="width: 15px"></span>
      <a-button :loading="loading" block size="large" type="danger" @click="resetForm"
        >重置
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
const { changeType } = inject<any>('changeType')
const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}
const ruleFormRef = ref<FormInstance>()

interface FormState {
  username: string
  password: string
  remember: boolean
  code: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
  code: ''
})
const handleValidate = (...args: any[]) => {
  console.log(args)
}
const onFinish = (values: any) => {
  console.log('Success:', values)
  submitForm()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password && formState.code)
})
const validateName = (_rule: any, value: any) => {
  if (value === '') {
    return Promise.reject('请输入帐号')
  } else {
    if (formState.username !== '') {
      if (!ruleFormRef.value) return
    }
    return Promise.resolve()
  }
}
const validatePass = (_rule: any, value: any) => {
  if (value === '') {
    return Promise.reject('请输入密码')
  } else {
    if (formState.password !== '') {
      if (!ruleFormRef.value) return
    }
    return Promise.resolve()
  }
}
const validateCode = (_rule: any, value: any) => {
  if (value === '') {
    return Promise.reject('请输入验证码')
  } else {
    if (formState.code !== '') {
      // const [e, r] = await api.getVerifiCode()
      if (code.value.toUpperCase() !== formState.code.toUpperCase()) {
        return Promise.reject('验证码错误')
      }
      if (!ruleFormRef.value) return
    }
    return Promise.resolve()
  }
}
const rules = reactive({
  username: [{ validator: validateName, trigger: 'blur', required: true }],
  password: [{ validator: validatePass, trigger: 'blur', required: true }],
  code: [{ validator: validateCode, trigger: 'blur', required: true }]
})
const useAuth = useAuthStore()
const loading = ref(false)
const submitForm = async () => {
  // 登陆
  loading.value = true
  await useAuth.login(formState)
  loading.value = false
}

const resetForm = () => {
  ruleFormRef?.value?.resetFields()
}

type Code = string

const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const CODE_LENGTH = 4
const COLORS = ['#000', '#333', '#666', '#999', '#ccc', '#eee']
const PI_OVER_4 = Math.PI / 4

let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null
const code = ref<Code>('')
const userInput = ref<Code>('')
const canvasRef = ref<HTMLCanvasElement>()

function refreshCode() {
  if (!ctx) return

  // 生成随机字符串
  let newCode = ''
  for (let i = 0; i < CODE_LENGTH; i++) {
    newCode += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
  }
  code.value = newCode

  // 绘制字符
  const { width, height } = canvas
  ctx.clearRect(0, 0, width, height)
  ctx.font = '50px sans-serif'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = getRandomColor()
  for (let i = 0; i < CODE_LENGTH; i++) {
    const char = newCode.charAt(i)
    const x = (i + 1) * (width / (CODE_LENGTH + 1))
    const y = height / 1.5
    const angle = (Math.random() - 0.5) * PI_OVER_4
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillText(char, 0, 0)
    ctx.restore()
  }

  // 绘制干扰线
  for (let i = 0; i < 10; i++) {
    const x1 = Math.random() * width
    const y1 = Math.random() * height
    const x2 = Math.random() * width
    const y2 = Math.random() * height
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = getRandomColor()
    ctx.stroke()
  }
}

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

onMounted(() => {
  canvas = canvasRef.value as HTMLCanvasElement
  ctx = canvas.getContext('2d')
  refreshCode()
  // 从localstorage中获取上次的登录信息
  const historyForm = JSON.parse(localStorage.getItem('__persist__auth') as string)
  if (historyForm) {
    const { remember, username, password } = historyForm
    if (remember) {
      formState.username = username
      formState.password = password
    }
  }
})
</script>

<style lang="less" scoped></style>
