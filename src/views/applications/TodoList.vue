<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-06-04 16:50:27
 * @Description: 
-->

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import { computed, onMounted, reactive, watch } from 'vue'

interface Todo {
  content?: string
  category?: string
  createdAt?: number
  done?: boolean
}

interface TodoListProps<T> {
  todos: unknown
  name: string
  input_content: string
  input_category: string
}

const todoObject = reactive<TodoListProps<Todo>>({
  todos: [],
  name: '',
  input_content: '',
  input_category: ''
})
const todos_asc = computed(() => {
  return (todoObject.todos as Array<Todo>).sort((a, b) => {
    const createdAtA = a?.createdAt || 0
    const createdAtB = b?.createdAt || 0
    return createdAtB - createdAtA
  })
})
const createTodo = () => {
  if (todoObject.input_content.trim() === '' && todoObject.input_category.trim() === null) {
    return
  }
  ;(todoObject.todos as Array<Todo>).push({
    content: todoObject.input_content,
    category: todoObject.input_category,
    createdAt: Date.now(),
    done: false
  })
  todoObject.input_content = ''
  todoObject.input_category = ''
  console.log('creteTodo')
}
const removeTodo = (todo: string) => {
  todoObject.todos = (todoObject.todos as Array<Todo>).filter((t) => t !== todo)
}
watch(
  () => todoObject.name,
  (name) => {
    localStorage.setItem('name', name)
  }
)
watch(
  () => todoObject.todos,
  (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },
  { deep: true }
)
onMounted(() => {
  todoObject.name = localStorage.getItem('name') || ''
  todoObject.todos = JSON.parse(localStorage.getItem('todos') as string) || []
})
</script>
<template>
  <div style="padding: 20px">
    <a-card class="todoList-card">
      <div class="todoList">
        <section class="greeting">
          <h2 class="title">
            {{ t('menu.todoList') }},<input
              v-model="todoObject.name"
              :placeholder="t('todoList.titlePlaceholder')"
              type="text"
            />
          </h2>
        </section>
        <section class="create-todo">
          <h3>{{ t('todoList.createTodo') }}</h3>
          <form id="new-todo-form" @submit.prevent="createTodo">
            <h4>{{ t('todoList.todoDesc') }}</h4>
            <input
              id="content"
              v-model="todoObject.input_content"
              :placeholder="t('todoList.contentPlaceholder')"
              type="text"
            />
            <h4>{{ t('todoList.pickCategory') }}</h4>
            <div class="options">
              <label>
                <input
                  id="category1"
                  v-model="todoObject.input_category"
                  name="category"
                  type="radio"
                  value="business"
                />
                <span class="bubble business"></span>
                <div>{{ t('todoList.business') }}</div>
              </label>
              <label>
                <input
                  id="category2"
                  v-model="todoObject.input_category"
                  name="category"
                  type="radio"
                  value="personal"
                />
                <span class="bubble personal"></span>
                <div>{{ t('todoList.personal') }}</div>
              </label>
            </div>
            <input :value="t('todoList.add')" type="submit" />
          </form>
        </section>
        <section class="todo-list">
          <h3>{{ t('todoList.list') }}</h3>
          <div id="todo-list" class="list">
            <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
              <label>
                <input v-model="todo.done" type="checkbox" />
                <span
                  :class="`bubble ${todo.category == 'business' ? 'business' : 'personal'}`"
                ></span>
              </label>
              <div class="todo-content">
                <input v-model="todo.content" type="text" />
              </div>
              <div class="actions">
                <button class="delete" @click="removeTodo(todo)">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </a-card>
  </div>
</template>
<style lang="less" scoped>
@import './style/index.less';

.todoList-card {
  :deep(.ant-card-body) {
    height: calc(100vh - 150px);
    overflow-y: auto;
    background-color: var(--fixed-bg);
  }
}
</style>
