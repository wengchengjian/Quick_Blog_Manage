<template>
  <el-upload
    ref="uploadRef"
    action="http://localhost:3000/api/admin/operation/upload/imgUpload"
    :headers="headers"
    method="POST"
    name="imgFile"
    list-type="picture-card"
    :file-list="filelist"
    :limit="1"
    :multiple="false"
    :before-upload="beforeAvatarUpload"
    :on-success="onSuccess"
  >
    <template #default>
      <el-icon><plus /></el-icon>
    </template>
    <template #file="{ file }">
      <div>
        <img
          class="el-upload-list__item-thumbnail"
          :src="`${imagePath + file.url}`"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove">
            <el-icon><delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img width="100%" :src="`${imagePath + filelist[0].url}`" alt="" />
  </el-dialog>
</template>

<script lang="ts">
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElUpload } from 'element-plus';
import request from '@/utils/request';
import { deleteImgByName } from '@/api/util';
import { ref, defineComponent, watchEffect, computed, onMounted } from 'vue';
import { imagePath } from '@/constants/constants';

export type File = {
  name: string;
  url: string;
};

const allowTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/bmp',
  'image/webp',
];

export default defineComponent({
  name: 'AdminAvatarUpload',
  components: {
    Plus,
    ZoomIn,
    Download,
    Delete,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup({ modelValue }, { emit }) {
    const uploadRef = ref<any>(null);
    const headers = { Authorization: request.getAuth() };

    const dialogVisible = ref(false);

    const filelist = ref<File[]>([]);

    onMounted(() => {
      if (modelValue) {
        filelist.value.push({ name: 'upload', url: modelValue });
      }
    });

    watchEffect(() => {
      if (filelist.value.length > 0) {
        emit('update:modelValue', filelist.value[0].url);
      }
    });

    const files = computed(() => {
      if (uploadRef.value) {
        return uploadRef.value.uploadFiles;
      } else {
        return [];
      }
    });

    const beforeAvatarUpload = (file: any) => {
      const isType = allowTypes.includes(file.type);

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isType) {
        ElMessage.error(`图片不能是${file.type}格式!`);
      }
      if (!isLt2M) {
        ElMessage.error('单张图片大小不能超过2MB!');
      }
      // return isJPG && isLt2M;
      return isType && isLt2M;
    };

    const onSuccess = (res: any, file: any, fileList: any) => {
      const fileName = res.data;
      filelist.value[0].url = fileName;

      console.log('上传res: ', res);
    };

    const handleRemove = async () => {
      files.value.pop();
      console.log('删除图片: ', filelist.value[0].url);
      await deleteImgByName(filelist.value[0].url);
      // 调用接口,删除图片
      filelist.value[0].url = '';
    };
    const handlePictureCardPreview = () => {
      dialogVisible.value = true;
    };

    return {
      uploadRef,
      dialogVisible,
      beforeAvatarUpload,
      handlePictureCardPreview,
      handleRemove,
      headers,
      filelist,
      onSuccess,
      imagePath,
    };
  },
});
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
