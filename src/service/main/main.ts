import hyRequest from '..'

// 获取全部角色列表
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

// 获取部门
export function getEntireDepartment() {
  return hyRequest.post({
    url: '/department/list'
  })
}
