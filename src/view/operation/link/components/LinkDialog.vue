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
      <el-form-item label="友链名称" prop="link.title">
        <el-input v-model="data.link.title"></el-input>
      </el-form-item>
      <el-form-item label="友链地址" prop="link.url">
        <el-input v-model="data.link.url"></el-input>
      </el-form-item>
      <el-form-item label="友链头像" prop="link.avatar">
        <admin-avatar-upload v-model="data.link.avatar"> </admin-avatar-upload>
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
import { updateLinkById, saveLinkByLink } from '@/api/link';
import AdminAvatarUpload from '@/components/Admin-Avatar-Upload.vue';

export type LinkStatus = {
  link: {
    id?: number;
    title: string;
    url: string;
    avatar: string;
  };
  loading: boolean;
  dialogVisible: boolean;
  action: string;
};

export default defineComponent({
  name: 'LinkDialog',
  props: {
    tableRef: {
      type: Object,
      required: true,
    },

    data: {
      type: Object as PropType<LinkStatus>,
      required: true,
    },
  },
  emits: ['close'],
  components: {
    AdminAvatarUpload,
  },
  setup({ tableRef, data }, { emit }) {
    let confirm: Ref<Function | null> = ref(null);

    const title = ref('新增友链');

    watchEffect(() => {
      if (data.action === 'edit') {
        title.value = '编辑友链';
        confirm.value = updateLinkById;
      } else {
        title.value = '新增友链';
        confirm.value = saveLinkByLink;
      }
    });

    const tagFormRef = ref<any>(null);
    const rules = {
      link: {
        title: [
          {
            required: true,
            min: 2,
            message: '友链名至少两个字符',
          },
        ],
        url: [
          {
            required: true,
            min: 2,
            message: 'url至少两个字符',
          },
        ],
        avatar: [
          {
            required: true,
            message: '头像不能为空',
          },
        ],
      },
    };
    const onSave = async () => {
      data.loading = true;
      if (tagFormRef) {
        try {
          await tagFormRef.value.validate();
          await (confirm.value as Function)({ ...data.link });

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
