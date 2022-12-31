// 正则校验得正则表达式
const patterns: any = {
  name: /^(?:[\u4e00-\u9fa5·]{2,5})$/,
  phone: /^1\d{10}$/,
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  IDCard:
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
}
// 对应正则表达式的提示信息
const patternMsg: any = {
  name: '非正确中文姓名!',
  phone: '请输入正确的电话号码!',
  email: '非正确的邮箱地址!',
  IDCard: '非正确身份证号码!'
}

/**
 *
 * @param param 要用的正则名字
 * @param required 是否必填
 * @param trigger 验证方式
 * @param useDefault 选填
 * @return {} 如果传了useDefault 默认返回一个普通必填rule
 */
const useRules = (
  param: string,
  required: boolean = true,
  trigger: string = 'blur',
  useDefault?: boolean
) => {
  if (useDefault) return { required: true, message: '该项必填', trigger: trigger }
  return {
    required: required,
    pattern: patterns[param],
    message: patternMsg[param],
    trigger: trigger
  }
}

export default useRules
