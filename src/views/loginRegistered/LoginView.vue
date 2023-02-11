<template>
  <div class="login-wrap login">
    <div class="login-form login_box">
      <el-form
        ref="ruleFormRef"
        :model="formState"
        :rules="rules"
        class="login_box"
        label-position="right"
        label-width="80px"
        status-icon
        style="height: 350px;padding-top:60px"
      >
        <el-form-item label="用户名:" prop="userName">
          <el-input v-model="formState.userName" placeholder="Please input userName"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="passWord">
          <el-input
            v-model="formState.passWord"
            placeholder="Please input password"
            show-password
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <p>
            还没有账号？
            <el-link>点此注册</el-link>
          </p>
        </el-form-item>
        <el-form-item>
          <a @click="submitForm"> 登陆</a>
          <a @click="resetForm">Reset</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useUsers } from '@/stores/user'
import router from '@/router'
import { api } from "@/utils/api";

const counterStore = useCounterStore()
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
      const setSessionStorage = (token: string) => {
        sessionStorage.setItem('token', token)
      }
      // 模拟登陆后拿到token
      const [e, r] = await api.getUserToken()
      r?.data?.token && setSessionStorage(r.data.token)
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

<style lang="scss" scoped>

.login a {

  /*overflow: hidden;*/
  position: relative;
  padding: 10px 20px;
  color: #03e9f4;
  /*取消a表现原有的下划线*/
  text-decoration: none;
  /*同样加个过渡*/
  transition: all 0.5s;
}

.login a:hover {

  color: #fff;
  border-radius: 5px;
  background-color: #03e9f4;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}

.login a span:first-child {

  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  /*to right 就是往右边 下面的同理*/
  background: linear-gradient(to right, transparent, #03e9f4);
  /*动画 名称 时长 linear是匀速运动 infinite是无限次运动*/
  animation: move1 1s linear infinite;

}

.login a span:nth-child(2) {

  right: 0;
  top: -100%;
  width: 2px;
  height: 100%;
  background: linear-gradient(transparent, #03e6f4);
  /*这里多了个0.25s其实是延迟时间*/
  animation: move2 1s linear 0.25s infinite;
}

.login a span:nth-child(3) {

  right: -100%;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, transparent, #03e9f4);

  animation: move3 1s linear 0.5s infinite;
}

.login a span:last-child {

  left: 0;
  bottom: -100%;
  width: 2px;
  height: 100%;
  background: linear-gradient(#03e9f4, transparent);
  animation: move4 1s linear 0.75s infinite;
}

/*写一下动画 */
@keyframes move1 {

  0% {

    left: -100%;

  }
  50%, 100% {

    left: 100%;
  }
}

@keyframes move2 {

  0% {

    top: -100%;

  }
  50%, 100% {

    top: 100%;
  }
}

@keyframes move3 {

  0% {

    right: -100%;

  }
  50%, 100% {

    right: 100%;
  }
}

@keyframes move4 {

  0% {

    bottom: -100%;

  }
  50%, 100% {

    bottom: 100%;
  }
}

</style>
