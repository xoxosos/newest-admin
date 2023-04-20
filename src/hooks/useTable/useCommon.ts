/*
 * @Author: LinRenJie
 * @Date: 2022-08-16 10:00:43
 * @LastEditTime: 2022-10-31 16:14:55
 * @Description:通用的一些方法
 * @FilePath: \rmp-frontend\src\hooks\common.js
 * @Email: xoxosos666@gmail.com
 */
import { reactive, ref } from 'vue'

interface props {
  pageSize: number
  current: number
}

export const useCommon = () => {
  // Misc
  const tableHeight = ref(1000)
  const loading = ref(false)
  const sortedInfo = reactive({
    sortField: '',
    order: 'descend'
  })
  /**
   * 默认分页
   * @description:table 分页
   * @return {*}
   */
  const pagination = reactive({
    hideOnSinglePage: false,
    current: 1, // 分页的索引
    total: 0,
    pageSize: 10, // 每页中显示10条数据
    showSizeChanger: true, // 不设置每页的数据条数
    size: 'small',
    pageSizeOptions: ['10', '20', '50', '100'], // 每页中显示的数据
    showTotal: (total: number) => {
      return '共' + ' ' + total + ' ' + '条'
    } // 分页中显示总的数据
  })
  /**
   * 自定义分页
   * @param hideOnSinglePage 只有一页数据是否隐藏分页器
   * @param pageSize 默认分页条数
   * @returns {*} pagination
   */
  const customPagination = ({ hideOnSinglePage = true, pageSize = 10 }) => {
    pagination.hideOnSinglePage = hideOnSinglePage
    pagination.pageSize = pageSize
    return pagination
  }

  /**
   * @description: table 排序
   * @param {*} pageSize
   * @param {*} current
   * @param {*} _filters
   * @param {*} sorter
   * @param {*} requestData
   * @return {*}
   */
  const tableSort = (
    { pageSize, current }: props,
    _filters: any,
    sorter: { field: string },
    requestData = () => {}
  ) => {
    pagination.current = current
    pagination.pageSize = pageSize
    sortedInfo.sortField = sorter.field
    requestData()
  }
  const search = (searchText: any, list: { value: any }, filterList: { value: any[] }) => {
    list.value = filterList.value.filter((item) => {
      return item.value.includes(searchText) && item
    })
  }
  return {
    search,
    pagination,
    tableSort,
    tableHeight,
    sortedInfo,
    loading,
    customPagination
  }
}
