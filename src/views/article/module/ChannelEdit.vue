<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article'

const dialogVisible = ref(false)
const form = ref() // from实例

// 控制选框显示
const open = async (data) => {
  dialogVisible.value = true
  formModel.value = { ...data } // 赋值对象相当于重置表单
}

// 暴露方法
defineExpose({
  open
})

// 收集表单
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

// 表单规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

const item = defineEmits(['success'])
// 调用遍及、修改接口
const onsubmit = async () => {
  await form.value.validate() // 在实例调用 validate 再次验证表单
  if (formModel.value.id) {
    await artEditChannelService(formModel.value)
  } else {
    await artAddChannelService(formModel.value)
  }

  dialogVisible.value = false
  item('success')
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      ref="form"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
