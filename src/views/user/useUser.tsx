import { api } from '@/utils/api'
import { computed } from 'vue'

interface recordProps {
  commentId: number

  [key: string]: string | number
}

const useUser = (init: Function) => {
  const clean = (ref: any) => {
    ref.value.resetFields()
  }
  const getFn = {
    apply: api.approvalComment,
    confuse: api.approvalComment,
    delete: api.deleteComment
  }

  const handleOperation = async (type: string, record: recordProps): Promise<void> => {
    const { commentId } = record
    switch (type) {
      case 'apply':
        getFn[type]({ commentId, approvalFlag: '2' }).then(([e, r]) => {
          r?.code === 200 && init()
        })
        break
      case 'confuse':
        await getFn[type]({ commentId, approvalFlag: '3' }).then(([e, r]) => {
          r?.code === 200 && init()
        })
        break
      default:
        await getFn['delete']({ commentId }).then(([e, r]) => {
          r?.code === 200 && init()
        })
        break
    }
  }
  return { handleOperation, clean }
}
export default useUser
