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
    <a-form-item class="item-form" label="邮箱" name="email">
      <a-input v-model:value="formState.email" size="large">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
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
        注册
      </a-button>
      <span style="width: 15px"></span>
      <a-button :loading="loading" block size="large" type="danger" @click="changeType('login')">
        返回
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
  email: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  email: ''
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
  return !(formState.username && formState.password && formState.email)
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
const validateEmail = (_rule: any, value: any) => {
  if (value === '') {
    return Promise.reject('请输入邮箱')
  } else {
    if (formState.password !== '') {
      if (!ruleFormRef.value) return
    }
    return Promise.resolve()
  }
}
const rules = reactive({
  username: [{ validator: validateName, trigger: 'blur', required: true }],
  password: [{ validator: validatePass, trigger: 'blur', required: true }],
  email: [{ validator: validateEmail, trigger: 'blur', required: true }]
})
const useAuth = useAuthStore()
const loading = ref(false)
const submitForm = async () => {
  // 登陆
  loading.value = true
  ;(await useAuth.register(formState)) && changeType()
  loading.value = false
}

const resetForm = () => {
  ruleFormRef?.value?.resetFields()
}
</script>

<style lang="less" scoped></style>
