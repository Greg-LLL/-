const modalConfig = {
  header: {
    newTitle: '新建部门',
    editTitle: '新建部门'
  },
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称',
      initialValue: '采购部'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: [
        { label: '财务部', value: '111' },
        { label: '保安部', value: '112' }
      ]
    }
  ]
}

export default modalConfig
