<template>
  <div class="login-wrap">
    <div class="login-form">
      <el-form
        ref="ruleFormRef"
        label-position="right"
        label-width="80px"
        :model="formState"
        status-icon
        :rules="rules"
      >
        <el-form-item label="用户名:" prop="userName">
          <el-input v-model="formState.userName" placeholder="Please input userName"> </el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="passWord">
          <el-input
            type="password"
            v-model="formState.passWord"
            placeholder="Please input password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <p>
            还没有账号？
            <el-link>点此注册</el-link>
          </p>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm"> 登陆</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useUsers } from '@/stores/user'
import router from '@/router'
import { api } from "@/utils/api";
const counterStore=useCounterStore()
counterStore.increment()
console.log(counterStore.count)
const ruleFormRef = ref()

interface userInfo {
  userName: String
  passWord: String
}

const formState: userInfo = reactive({
  userName: '',
  passWord: ''
})
const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the userName'))
  } else {
    if (formState.userName !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (formState.passWord !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const rules = reactive({
  userName: [{ validator: validateName, trigger: 'blur', required: true }],
  passWord: [{ validator: validatePass, trigger: 'blur', required: true }]
})
const users = useUsers()
const submitForm = () => {
  ruleFormRef.value.validate(async (valid: any) => {
    if (valid) {
      const setSessionStorage = (token:string)=>{
        sessionStorage.setItem('token', token)
      }
      // 模拟登陆后拿到token
      const [e, r] = await api.getUserToken()
      r?.data?.token&&setSessionStorage(r.data.token)
      console.log(e, r);
      // 勾选记住我可以存在localstorage
      await router.push('/dashboard')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style scoped lang="scss"></style>
