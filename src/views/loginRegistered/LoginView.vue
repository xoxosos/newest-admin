<template>
  <div class="login-wrap">
    <transition name="fade">
      <a-form
        ref="ruleFormRef"
        :model="formState"
        name="normal_login"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-from-item>
          <h1 class="title">Welcome</h1>
        </a-from-item>
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" size="large">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" size="large">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button block :disabled="disabled" type="primary" size="large" @click="submitForm">
            Log in
          </a-button>
          Or
          <a href="">register now!</a>
        </a-form-item>
      </a-form>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useCounterStore } from '@/stores/counter'
import { useUsers } from '@/stores/user'
import { api } from '@/utils/api'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { computed, reactive, ref } from 'vue'
const counterStore = useCounterStore()
counterStore.increment()
console.log(counterStore.count)
const ruleFormRef = ref()

interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})
const onFinish = (values: any) => {
  console.log('Success:', values)
  submitForm()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
const validateName = (_rule: any, value: any) => {
  if (value === '') {
    return Promise.reject('Please input the userName')
  } else {
    if (formState.username !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateFields('checkPass', () => null)
    }
    return Promise.resolve()
  }
}
const validatePass = (_rule: any, value: any) => {
  if (value === '') {
    return Promise.reject('Please input the password')
  } else {
    if (formState.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateFields('checkPass', () => null)
    }
    return Promise.resolve()
  }
}
const rules = reactive({
  userName: [{ validator: validateName, trigger: 'blur', required: true }],
  passWord: [{ validator: validatePass, trigger: 'blur', required: true }]
})
const users = useUsers()
const submitForm = async () => {
  const setSessionStorage = (token: string) => {
    sessionStorage.setItem('token', token)
  }
  // 模拟登陆后拿到token
  const [e, r] = await api.getUserToken()
  r?.data?.token && setSessionStorage(r.data.token)
  console.log(e, r)
  // 勾选记住我可以存在localstorage
  await router.push('/dashboard')
}
const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss" scoped>
.login-form {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7ecec;
  transition: background-color 0.5s;
}

.login-form:hover {
  background-color: #f7e8e8;
}

.login-form a-form-item {
  margin-top: 50px;
}
.login-form a-input {
  width: 200px;
}

.login-form a-button {
  margin-top: 50px;
  transition: background-color 0.5s, color 0.5s;
}

.login-form a-button:hover {
  background-color: #40a9ff;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
:deep(.ant-row) {
  align-items: center;
}
</style>
