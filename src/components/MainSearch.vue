<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
  >
    <template #suffix>
      <el-icon>
        <Search />
      </el-icon>
    </template>
  </el-autocomplete>
  <el-button type="primary" @click="dialogFormVisible = true">
    新增
    <el-icon class="el-icon--right">
      <Plus />
    </el-icon>
  </el-button>
  <el-dialog v-model="dialogFormVisible" style="width: 30%" title="Shipping address">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item :label-width="formLabelWidth" label="用户名" prop="userName">
        <el-input
          v-model="form.userName"
          autocomplete="off"
          placeholder="Please select a zone"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="密码" prop="passWord">
        <el-input
          v-model="form.passWord"
          autocomplete="off"
          placeholder="Please select a zone"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          autocomplete="off"
          placeholder="Please select a zone"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="gender" prop="gender">
        <el-select v-model="form.gender" placeholder="Please select a zone">
          <el-option :value="1" label="男" />
          <el-option :value="0" label="女" />
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="gender" prop="gender">
        <el-switch v-model="form.status" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import useRules from '@/hooks/reg'

const emit = defineEmits<{
  (event: 'initData'): void
  // (event: 'update', id: number): void
}>()
const formRef = ref()
const state = ref('')
const dialogFormVisible = ref(false)

const submit = async () => {
  try {
    const valid = await formRef.value.validate()
    if (valid) {
      // 重新请求数据 刷新用户列表
      emit('initData')
      dialogFormVisible.value = false
    }
  } catch (e) {
    throw (`error:${JSON.stringify(e)}`)
  } finally {
    console.log(form)
  }
}

const formLabelWidth = '140px'
const form = reactive({
  userName: '',
  passWord: '',
  email: '',
  phone: '',
  gender: 0,
  status: true,
  birthday: '',
  age: '',
  idCard: ''
})
const rules = {
  userName: [useRules('name', true, 'blur', true)],
  passWord: [useRules('true', true, 'blur', true)],
  email: [useRules('email', true, 'blur')],
  mobile: [useRules('phone', true, 'blur')],
  iDCard: [useRules('IDCard', true, 'blur')]
}

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}

let timeout: NodeJS.Timeout
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const handleSelect = (item: LinkItem) => {
  console.log(item)
}

onMounted(() => {
  links.value = loadAll()
})
</script>
<style lang="scss">
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
