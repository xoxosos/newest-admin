<template>
  <div class="login-wrap">
    <transition name="fade">
      <a-form
        ref="ruleFormRef"
        :label-col="{ span: 8 }"
        :model="formState"
        :wrapper-col="{ span: 16 }"
        class="login-form"
        name="normal_login"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-from-item>
          <h1 class="title">Welcome</h1>
        </a-from-item>
        <a-form-item
          :rules="[{ required: true, message: 'Please input your userAccount!' }]"
          label="userAccount"
          name="userAccount"
        >
          <a-input v-model:value="formState.userAccount" size="large">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :rules="[{ required: true, message: 'Please input your password!' }]"
          label="Password"
          name="password"
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
          <a-button :disabled="disabled" block size="large" type="primary" @click="submitForm">
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
  userAccount: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  userAccount: '',
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
  return !(formState.userAccount && formState.password)
})
const validateName = (_rule: any, value: any) => {
  if (value === '') {
    return Promise.reject('Please input the userAccount')
  } else {
    if (formState.userAccount !== '') {
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
  userAccount: [{ validator: validateName, trigger: 'blur', required: true }],
  passWord: [{ validator: validatePass, trigger: 'blur', required: true }]
})
const users = useUsers()
const submitForm = async () => {
  const setSessionStorage = (token: string) => {
    sessionStorage.setItem('token', token)
  }
  // 模拟登陆后拿到token
  const param = {
    password: formState.password,
    userAccount: formState.userAccount
  }
  const [e, r] = await api.getUserToken(param)
  const token = r?.data?.token as string
  token && setSessionStorage(token)
  console.log(e, r)
  // 勾选记住我可以存在localstorage
  router.push('/user-manage')
  console.log('success')
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
