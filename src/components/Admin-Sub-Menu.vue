<template>
  <template v-for="item in dataSource">
    <el-sub-menu v-if="item.type === 0" :index="item.url">
      <template #title>
        <i :class="`iconfont ${item.icon}`"></i>
        <span>{{ item.name }}</span>
      </template>
      <admin-sub-menu
        v-if="item.children.length !== 0"
        :data-source="item.children"
      ></admin-sub-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="item.url">
      <template #title>
        <i :class="`iconfont ${item.icon}`"></i>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from 'vue';
import { ElMenuItem, ElSubMenu } from 'element-plus';
import { MenuItem } from '@/types/menu';

export default defineComponent({
  name: 'AdminSubMenu',
  components: {
    ElMenuItem,
    ElSubMenu,
  },
  props: {
    dataSource: {
      type: Array as PropType<MenuItem[]>,
    },
  },
  setup() {
    onMounted(() => {
    });
    return {};
  },
});
</script>

<style></style>
