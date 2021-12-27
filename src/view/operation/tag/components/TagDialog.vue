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
      <el-form-item label="标签名称" prop="tag.name">
        <el-input v-model="data.tag.name"></el-input>
      </el-form-item>
      <el-form-item label="标签名称" prop="tag.type">
        <el-select v-model="data.tag.type">
          <el-option
            v-for="(item, index) in MODULE_TEXT_EUNM"
            :key="item"
            :value="index"
            :label="item"
          ></el-option>
        </el-select>
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
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  watchEffect,
  Ref,
} from 'vue';
import { MODULE_EUNM, MODULE_TEXT_EUNM } from '@/constants/enums';
import { saveTagByLink, updateTagById } from '@/api/tag';

export type TagStatus = {
  tag: {
    id?: number;
    name: string;
    type: number;
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
      type: Object as PropType<TagStatus>,
      required: true,
    },
  },
  emits: ['close'],
  setup({ tableRef, data }, { emit }) {
    let confirm: Ref<Function | null> = ref(null);

    const title = ref('新增标签');

    watchEffect(() => {
      if (data.action === 'edit') {
        title.value = '编辑标签';
        confirm.value = updateTagById;
      } else {
        title.value = '新增标签';
        confirm.value = saveTagByLink;
      }
    });

    const tagFormRef = ref<any>(null);
    const rules = {
      tag: {
        name: [
          {
            required: true,
            min: 2,
            message: '标签名至少两个字符',
          },
        ],
      },
    };
    const onSave = async () => {
      data.loading = true;
      if (tagFormRef) {
        try {
          await tagFormRef.value.validate();
          await (confirm.value as Function)({ ...data.tag });

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
      MODULE_EUNM,
      MODULE_TEXT_EUNM,
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
