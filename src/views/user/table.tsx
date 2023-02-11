import { computed } from 'vue'

const columns = computed(() => {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 120,
      fixed: 'left' as 'left'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      fixed: 'left' as 'left'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 100,
      customRender({ text }: { text: string }) {
        return <span>{text === '1' ? '男' : '女'}</span>
      }
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      width: 120
    },
    {
      title: '电话号码',
      dataIndex: 'mobile',
      width: 120
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 150
    },

    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      width: 60
    }
  ]
})
export default columns
