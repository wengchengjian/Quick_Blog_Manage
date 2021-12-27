<template>
  <div class="admin-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in selectMenu" :to="{ path: item.path }">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown trigger="click" @command="handleCommand">
      <el-avatar
        shape="circle"
        :size="50"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F70%2F3d%2F48%2F703d488a5803985d1d6f8123384108ee.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642575263&t=d1743c6993301dda0aa4a56b1f55efdf"
      >
      </el-avatar>
      <template #dropdown>
        <el-dropdown-item :icon="User" command="self">
          个人中心
        </el-dropdown-item>
        <el-dropdown-item :icon="Crop" command="select">
          切换用户
        </el-dropdown-item>
        <el-dropdown-item :icon="TopRight" command="logout">
          登出
        </el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
  <div class="admin-tags">
    <el-tabs
      v-model="selectRoute"
      @tab-click="handleClickTag"
      @tab-remove="handleRemoveTag"
      type="card"
    >
      <el-tab-pane
        v-for="item in selectTags"
        :key="item"
        :name="item"
        :label="item"
        closable
        lazy
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { ElBreadcrumb, ElBreadcrumbItem, ElTabs } from 'element-plus';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { User, Crop, TopRight } from '@element-plus/icons-vue';
import { logout } from '@/api/user';
export default defineComponent({
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem,
  },
  emits: ['tab-click', 'tab-remove'],
  props: {
    selectMenu: {
      type: Array as PropType<RouteRecordRaw[]>,
      required: true,
    },
    selectTags: {
      type: Array as PropType<String[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();

    const selectRoute = ref<string>('');

    watchEffect(() => {
      selectRoute.value = router.currentRoute.value.name as string;
    });

    const handleClickTag = (tab: any) => {
      emit('tab-click', tab.paneName);
    };
    const handleRemoveTag = (tab: string) => {
      emit('tab-remove', tab);
    };
    const handleCommand = async (command: string) => {
      switch (command) {
        case 'logout':
          await logout();
          //重新加载页面
          location.reload();
          break;
        case 'self':
          router.push({ path: '/admin/sys/user/self' });
          break;
        case 'select':
          router.push({ path: '/admin/sys/setting' });
          break;
      }
      console.log(`click on item ${command}`);
    };

    return {
      User,
      Crop,
      TopRight,
      handleCommand,
      handleClickTag,
      handleRemoveTag,
      selectRoute,
    };
  },
});
</script>

<style lang="scss">
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
}
</style>
