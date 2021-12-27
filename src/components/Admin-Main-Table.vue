<template>
  <admin-base-table
    :table-ref="elementRef"
    :adapter="adapter"
    :columns="columns"
    :tableRowClassName="tableRowClassName"
    :selective="selective"
    :index="index"
    @selection-change="handleSelectionChange"
  >
    <template #header="{ headerRef }">
      <el-form :inline="true" class="demo-form-inline">
        <slot name="header" :headerRef="headerRef"></slot>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="onReset(headerRef)">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSave">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-popconfirm
            icon-color="red"
            :icon="InfoFilled"
            title="你确定删除选中的项吗?"
            cancel-button-text="取消"
            confirm-button-text="确定"
            @confirm="handleConfirmBatchDelete"
          >
            <template #reference>
              <el-button type="danger">批量删除</el-button>
            </template>
          </el-popconfirm>
        </el-form-item>
        <slot name="others" :headerRef="headerRef"></slot>
      </el-form>
    </template>
    <template v-slot:[item.prop]="{ scope }" v-for="item in columns">
      <slot
        v-if="item.slot"
        :name="scope.column.property"
        :row="scope.row"
        :index="scope.$index"
      >
      </slot>
      <span v-else class="no-wrap-text">{{
        scope.row[scope.column.property]
      }}</span>
    </template>
    <template #operation="{ scope }">
      <slot name="operation" :scope="scope"></slot>
    </template>
  </admin-base-table>
</template>

<script lang="ts">
import { InfoFilled } from '@element-plus/icons-vue';
import { defineComponent, PropType, ref, onMounted } from 'vue';
import AdminBaseTable, { ColumnType } from '@/components/Admin-Base-Table.vue';
export default defineComponent({
  name: 'AdminMainTable',
  components: {
    AdminBaseTable,
  },
  emits: ['add-item', 'batch-delete'],
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
  setup({ tableRef }, { emit }) {
    const elementRef = ref<any>({});
    const onSubmit = async () => {
      await elementRef.value.refresh();
    };
    const selectedRows = ref<any>();
    const onReset = async (ref: any) => {
      //TODO 待优化
      Object.keys(ref).forEach((key) => {
        ref[key] = null;
      });
      await elementRef.value.refresh();
    };
    onMounted(() => {
      if (tableRef) {
        //挂载ref
        tableRef.refresh = elementRef.value.refresh;
      }
      console.log(tableRef);
    });
    const onSave = () => {
      console.log('main-table-ref', elementRef.value);
      emit('add-item');
    };
    const onDelete = (val: any) => {
      emit('batch-delete', val);
    };
    const handleSelectionChange = (val: any) => {
      console.log('批量选中的项:', val);
      selectedRows.value = val;
    };
    const handleConfirmBatchDelete = () => {
      onDelete(selectedRows.value);
    };
    return {
      onSubmit,
      onReset,
      onDelete,
      onSave,
      InfoFilled,
      elementRef,
      handleConfirmBatchDelete,
      handleSelectionChange,
    };
  },
});
</script>

<style lang="scss">
.no-wrap-text {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
