<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="pages">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type MatchPattern = string | RegExp | string[] | RegExp[];

export default defineComponent({
  props: {
    pages: {
      type: Array as PropType<MatchPattern>,
      require: true,
    },
  },
  setup() {},
});
</script>

<style></style>
