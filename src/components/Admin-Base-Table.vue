<template>
  <div>
    <div>
      <slot name="header" :headerRef="headerRef"></slot>
    </div>
    <el-table
      v-loading="isLoading"
      :data="requestRes.data"
      size="medium"
      border
      highlight-current-row
      @current-change="handleCurrentChange"
      :row-class-name="tableRowClassName ?? commStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="selective" type="selection" width="55" />
      <el-table-column v-if="index" type="index" width="55" />

      <el-table-column
        v-for="(item, index) in columns"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :sortable="item.sortable"
        align="center"
        min-width="200"
      >
        <template #default="scope">
          <slot :name="scope.column.property" :scope="scope"> </slot>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template #default="scope">
          <slot name="operation" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="requestRes.sum?.totalCount"
      v-model:currentPage="currentPage"
      :page-size="currentPageSize"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  watchEffect,
  onMounted,
  reactive,
} from 'vue';
export type AdapterResType = {
  data?: any[];
  page?: {
    pageNo: number;
    pageSize: number;
  };
  sum?: {
    totalCount?: number;
  };
};

export type ColumnType = {
  label: string;
  prop: string;
  fixed?: string | boolean;
  sortable?: boolean;
  slot?: boolean;
};
export default defineComponent({
  name: 'AdminBaseTable',
  props: {
    adapter: {
      type: Function,
      required: true,
    },
    columns: {
      type: Array as PropType<ColumnType[]>,
      required: true,
    },
    tableRowClassName: {
      type: Function,
      required: false,
    },
    selective: {
      type: Boolean,
      required: false,
      default: false,
    },
    index: {
      type: Boolean,
      required: false,
      default: false,
    },
    tableRef: {
      type: Object,
      required: false,
    },
  },
  emits: ['selection-change'],
  setup({ adapter, tableRef }, { emit }) {
    //向外暴露出一个表头引用，每一个组件都必须要向其注册一个值作为request参数
    const headerRef = reactive<any>({});
    const isLoading = ref(true);
    const defaultData: AdapterResType = {
      data: [],
      page: {
        pageNo: 1,
        pageSize: 10,
      },
      sum: {
        totalCount: 0,
      },
    };
    let requestRes = ref<AdapterResType>(defaultData);

    const pageSizes = [10, 20, 30, 40, 50];
    const currentRow = ref<number | null>();
    const currentPage = ref<number>(1);
    const currentPageSize = ref<number>(10);

    const commStyle = 'commonRowStyle';

    // 接口参数
    let request = {};

    const refresh = async () => {
      isLoading.value = true;
      requestRes.value =
        ((await adapter(request)) as AdapterResType) ?? defaultData;
      isLoading.value = false;
    };
    onMounted(() => {
      if (tableRef) {
        tableRef.refresh = refresh;
      }
    });
    watchEffect(
      () => {
        request = {
          ...headerRef,
        };
      },
      {
        flush: 'sync',
      }
    );
    watchEffect(async () => {
      request = {
        ...request,
        pageNum: currentPage.value,
        pageSize: currentPageSize.value,
      };
      console.log(
        `current page: ${currentPage.value} PageSize: ${currentPageSize.value}`
      );
      await refresh();
    });

    const handleCurrentChange = (val: any) => {};
    const handleSizeChange = async (val: number) => {
      currentPageSize.value = val;
    };

    const handleSelectionChange = (value: any) => {
      emit('selection-change', value);
    };

    return {
      requestRes,
      commStyle,
      handleCurrentChange,
      handleSizeChange,
      currentPageSize,
      pageSizes,
      headerRef,
      isLoading,
      currentPage,
      handleSelectionChange,
    };
  },
});
</script>

<style lang="scss">
.el-table .commonRowStyle {
  --el-table-tr-bg-color: #fff;
}
</style>
