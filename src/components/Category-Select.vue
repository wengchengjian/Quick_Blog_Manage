<template>
  <el-select
    v-model="input"
    clearable
    placeholder="请选择类型"
    filterable
    remote
    :loading="loading"
    :remote-method="queryCategoryBySearch"
    autocomplete
    @focus="queryCategoryBySearch(input)"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.name"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { watchEffect, defineComponent, ref, onMounted } from 'vue';
import { queryCategoryListByName, queryCategoryById } from '@/api/category';
import { Category } from '@/types/category';
export default defineComponent({
  name: 'CategorySelect',
  props: {
    modelValue: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  emits: ['update:modelValue'],
  setup({ modelValue }, { emit }) {
    const loading = ref(false);
    const options = ref<Category[]>([]);
    const input = ref('');

    onMounted(async () => {
      if (modelValue !== -1 && modelValue !== 0) {
        const data = await queryCategoryById(modelValue);
        input.value = data.name;
      }
    });

    watchEffect(() => {
      const val = options.value.find((item) => item.name == input.value);
      emit('update:modelValue', val ? val.id : -1);
    });
    const queryCategoryBySearch = async (name: string) => {
      loading.value = true;
      const data = await queryCategoryListByName({ name });
      options.value = data;
      loading.value = false;
    };
    return { queryCategoryBySearch, loading, options, input };
  },
});
</script>

<style></style>
