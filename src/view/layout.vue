<template>
  <el-row :gutter="20">
    <el-col span="">
      <admin-menu
        :data-source="menuRoot.children"
        @select="handleSelect"
      ></admin-menu>
    </el-col>
    <el-col :span="20" class="main-content">
      <el-row>
        <el-col>
          <admin-header
            :selectMenu="menuSelect"
            :selectTags="tagNameSelect"
            @tab-click="handleClickTag"
            @tab-remove="handleRemoveTag"
          ></admin-header>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <admin-content :pages="tagNameSelect"></admin-content>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <admin-footer></admin-footer>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed } from 'vue';
import AdminMenu from '@/components/Admin-Menu.vue';
import AdminHeader from '@/components/Admin-Header.vue';
import AdminContent from '@/components/Admin-Content.vue';
import AdminFooter from '@/components/Admin-Footer.vue';
import { MenuItem } from '@/types/menu';
import { getCurrentMenu } from '@/api/menu';
import { Menu } from '@/types/menu';
import { RouteRecordRaw, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Layout',
  components: {
    AdminMenu,
    AdminHeader,
    AdminFooter,
    AdminContent,
  },
  setup() {
    const router = useRouter();

    let menuRoot = reactive<MenuItem>({
      menuId: 0,
      children: [],
      type: 0,
      url: '/admin',
      parentId: -1,
      name: 'admin',
      icon: 'icon-default',
    });

    const menuSelect = ref<RouteRecordRaw[]>([]);
    const tagSelect = ref<RouteRecordRaw[]>([]);

    const tagNameSelect = computed(() =>
      tagSelect.value.map((item) => item.name as string)
    );
    onMounted(async () => {
      // 检查是否登录
      const token = localStorage.getItem('self_blog_token');
      if (!token) {
        //token没有则跳转到登录页面
        await router.replace({ path: '/login' }); //TODO 应向后端请求验证该token是否有效，现在暂时没有验证
      } else {
        //初始化菜单
        const menuList = await getCurrentMenu();
        //数据转换
        transFormDataToMenu(menuList);
      }
    });

    //将数据转换为菜单树
    const transFormDataToMenu = (value: Menu[]) => {
      const res: MenuItem[] = value.map((item) => {
        return {
          ...item,
          children: [],
        };
      });

      res.forEach((item) => {
        const children = res.filter((child) => child.parentId === item.id);
        //确定当前菜单的子菜单
        item.children = children;
      });

      //确定最外层的主菜单
      menuRoot.children = res.filter((child) => child.parentId === 0);
    };

    const handleClickTag = (tab: string) => {
      const click = tagSelect.value.find((item) => item.name === tab);
      console.log('click', tagSelect.value, tab);
      if (click) {
        router.push({ path: click.path });
      }
    };
    const handleRemoveTag = (tab: string) => {
      const remove = tagSelect.value.find((item) => item.name === tab);
      if (remove) {
        const index = tagSelect.value.indexOf(remove);
        tagSelect.value.splice(index, 1);
      }
    };

    const handleSelect = (value: RouteRecordRaw[], path: string) => {
      // 记录面包屑菜单
      menuSelect.value = value;
      // 记录tags
      const item = value.find((item) => item.path === path);
      if (item) {
        //如果缓存中还没有
        if (!tagSelect.value.includes(item)) {
          tagSelect.value.push(item);
        }
      }
    };
    return {
      menuRoot,
      handleSelect,
      menuSelect,
      tagSelect,
      handleClickTag,
      tagNameSelect,
      handleRemoveTag,
    };
  },
});
</script>

<style lang="scss">
.max-height-content {
  height: 100%;
}
</style>
