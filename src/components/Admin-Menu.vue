<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-blog"
    active-text-color="#ffd04b"
    background-color="#545c64"
    :collapse-transition="true"
    text-color="#fff"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <admin-sub-menu :data-source="dataSource"></admin-sub-menu>
    <el-menu-item @click="handleCollapse" class="collapse-control">
      <i class="iconfont" v-if="isCollapse">&#xe744;</i>
      <i class="iconfont" v-else>&#xe745;</i>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Menu } from '@/types/menu';
import AdminSubMenu from '@/components/Admin-Sub-Menu.vue';
import { MenuItem } from '@/types/menu';

export default defineComponent({
  name: 'AdminMenu',
  emits: ['select'],
  props: {
    dataSource: {
      type: Array as PropType<MenuItem[]>,
    },
  },

  components: {
    AdminSubMenu,
  },
  setup({ dataSource }, { emit }) {
    const activeIndex = ref('');
    const isCollapse = ref(false);
    const router = useRouter();

    watchEffect(() => {
      const route = router.currentRoute.value;
      emit('select', route.matched, route.path);
    });

    const handleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };
    const handleSelect = (index: string, indexPath: string[]) => {
      const path = indexPath.join('');
      // 因为collapse也是由菜单实现,但它并没有index-url,也不需要这个东西，所以需要特殊处理一下
      if (!path) {
        return;
      }
      //拼接跳转路径
      const to = `/admin${path}`;
      router.push({ path: to });
    };
    return {
      activeIndex,
      handleSelect,
      isCollapse,
      handleCollapse,
    };
  },
});
</script>

<style lang="scss">
.collapse-control {
  justify-content: center;
}
</style>
