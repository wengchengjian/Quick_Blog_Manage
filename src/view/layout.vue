<template>
  <el-row :gutter="20">
    <el-col span="3">
      <admin-menu
        :data-source="menuRoot.children"
        @select="handleSelect"
      ></admin-menu>
    </el-col>
    <el-col :span="21" class="main-content">
      <el-row>
        <el-col>
          <admin-header
            :selectMenu="menuSelect"
            :selectTags="tagSelect"
            @tab-click="handleClickTag"
            @tab-remove="handleRemoveTag"
            :selectTag="selectTag"
          ></admin-header>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <admin-content :pages="tagSelect"></admin-content>
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
import { defineComponent, reactive, onMounted, ref } from 'vue';
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
    const tagSelect = ref<string[]>([]);
    const selectTag = ref<string>('');
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
        const children = res.filter((child) => child.parentId === item.menuId);
        //确定当前菜单的子菜单
        item.children = children;
      });

      //确定最外层的主菜单
      menuRoot.children = res.filter((child) => child.parentId === 0);
    };

    const handleClickTag = (tab: string) => {
      // router.push({ name: tab });
    };
    const handleRemoveTag = (tab: string) => {
      const index = tagSelect.value.indexOf(tab);
      tagSelect.value.splice(index, 1);
      console.log(tagSelect.value);
    };

    const handleSelect = (value: RouteRecordRaw[], path: string) => {
      // 记录面包屑菜单
      menuSelect.value = value;
      // 记录tags
      const item = value.find((item) => item.path === path);
      if (item) {
        const name = item.name as string;
        if (name) {
          //如果缓存中还没有
          if (!tagSelect.value.includes(name)) {
            tagSelect.value.push(name);
          }
          // else {
          //   //  删除缓存
          //   const index = tagSelect.value.indexOf(name);
          //   tagSelect.value.splice(index, 1);
          //   // 重新加载缓存
          //   tagSelect.value.push(name);
          // }
        }
      }
    };
    return {
      menuRoot,
      handleSelect,
      menuSelect,
      tagSelect,
      handleClickTag,
      handleRemoveTag,
    };
  },
});
</script>

<style lang="scss"></style>
