<template>
  <div class="container">
    <el-form
      ref="formRef"
      :model="form"
      label-width="120px"
      :rules="rules"
      class="login-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> 登录 </el-button>
        <el-button type="primary" @click="resetForm"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/user';
type IState = {
  username: string;
  password: string;
};

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const formRef = ref<any>(null);
    const form = reactive<IState>({ username: '', password: '' });

    const submitForm = async () => {
      if (formRef) {
        await formRef.value.validate();
        const { username, password } = form;
        await login(username, password);
        //跳转到后台首页
        await router.push({ path: '/admin' });
      }
    };

    const resetForm = () => {
      if (formRef) {
        formRef.resetFields();
      }
    };
    return {
      form,
      submitForm,
      resetForm,
      formRef,
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          // {
          //   min: 8,
          //   max: 16,
          //   message: '用户名至少8个字符，最多16个字符',
          //   trigger: 'blur',
          // },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          // {
          //   min: 8,
          //   max: 16,
          //   message: '密码至少8个字符，最多20个字符',
          //   trigger: 'blur',
          // },
        ],
      },
    };
  },
});
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  .login-form {
    width: 400px;
  }
}
</style>
