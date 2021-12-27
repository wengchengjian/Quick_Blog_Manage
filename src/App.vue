<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ElConfigProvider } from 'element-plus';
import { defineComponent } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider,
  },
  setup() {
    //  国际化配置
    return {
      locale: zhCn,
    };
  },
});
</script>

<style></style>
