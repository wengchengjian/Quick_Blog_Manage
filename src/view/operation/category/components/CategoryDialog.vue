<template>
  <el-dialog
    :title="title"
    v-model="data.dialogVisible"
    destroy-on-close
    width="30%"
  >
    <el-form
      ref="tagFormRef"
      :model="data"
      :rules="rules"
      class="form-container"
    >
      <el-form-item label="分类名称" prop="category.name">
        <el-input v-model="data.category.name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类" prop="category.parentId">
        <category-select v-model="data.category.parentId"> </category-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" v-loading="data.loading" @click="onSave"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect, Ref } from 'vue';
import { updateCategoryById, saveCategoyByParent } from '@/api/category';
import CategorySelect from '@/components/Category-Select.vue';
export type CategoryStatus = {
  category: {
    id?: number;
    name: string;
    parentId: number;
  };
  loading: boolean;
  dialogVisible: boolean;
  action: string;
};

export default defineComponent({
  name: 'TagDialog',
  props: {
    tableRef: {
      type: Object,
      required: true,
    },

    data: {
      type: Object as PropType<CategoryStatus>,
      required: true,
    },
  },
  emits: ['close'],
  components: { CategorySelect },
  setup({ tableRef, data }, { emit }) {
    let confirm: Ref<Function | null> = ref(null);

    const title = ref('新增标签');

    
    watchEffect(() => {
      if (data.action === 'edit') {
        title.value = '编辑标签';
        confirm.value = updateCategoryById;
      } else {
        title.value = '新增标签';
        confirm.value = saveCategoyByParent;
      }
    });

    const tagFormRef = ref<any>(null);
    const rules = {
      category: {
        name: [
          {
            required: true,
            min: 2,
            message: '分类名至少两个字符',
          },
        ],
      },
    };
    const onSave = async () => {
      data.loading = true;
      if (tagFormRef) {
        try {
          await tagFormRef.value.validate();
          await (confirm.value as Function)({ ...data.category });

          // 关闭loading效果
          data.loading = false;
          //关闭弹窗
          emit('close');
          //刷新数据
          await tableRef.refresh();
        } catch (err) {
          data.loading = false;
        }
      }
    };
    const onCancel = () => {
      emit('close');
    };

    return {
      onSave,
      onCancel,
      rules,
      title,
      tagFormRef,
    };
  },
});
</script>

<style></style>
