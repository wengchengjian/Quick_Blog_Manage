<template>
  <admin-main-table
    :adapter="adapter"
    :columns="columns"
    index
    selective
    @batch-delete="onBatchDelete"
    @add-item="onSave"
    :table-ref="tableRef"
  >
    <template #header="{ headerRef }">
      <el-form-item label="分类">
        <el-input
          v-model="headerRef.name"
          placeholder="请输入分类名"
        ></el-input>
      </el-form-item>
      <el-form-item label="父级类别">
        <category-select v-model="headerRef.parentId"></category-select>
      </el-form-item>
    </template>

    <template #operation="{ scope }">
      <span class="admin-action" @click="onEdit(scope.row)">编辑</span>
      <el-popconfirm
        icon-color="red"
        :icon="InfoFilled"
        title="你确定删除该分类吗?"
        cancel-button-text="取消"
        confirm-button-text="确定"
        @confirm="onDelete(scope.row)"
      >
        <template #reference>
          <span class="admin-action">删除</span>
        </template>
      </el-popconfirm>
    </template>
  </admin-main-table>
  <category-dialog
    :table-ref="tableRef"
    :data="categoryStatus"
    @close="categoryStatus.dialogVisible = false"
  >
  </category-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import AdminMainTable from '@/components/Admin-Main-Table.vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { ColumnType } from '@/components/Admin-Base-Table.vue';
import { queryCategoryList, deleteBatchById } from '@/api/category';
import { QueryCategoryListRequest, Category } from '@/types/category';
import CategoryDialog, {
  CategoryStatus,
} from './components/CategoryDialog.vue';
import CategorySelect from '@/components/Category-Select.vue';

export default defineComponent({
  name: 'CatrgoryList',
  components: {
    AdminMainTable,
    CategoryDialog,
    CategorySelect,
  },
  setup() {
    const tableRef = ref<any>({});
    const categoryStatus = reactive<CategoryStatus>({
      category: {
        name: '',
        parentId: 0,
      },
      loading: false,
      dialogVisible: false,
      action: 'save',
    });
    const adapter = async ({
      name,
      parentId,
      pageNum,
      pageSize,
    }: QueryCategoryListRequest) => {
      const res = await queryCategoryList({
        name,
        parentId,
        pageNum,
        pageSize,
      });
      return {
        data: res.list,
        page: {
          pageNo: res.currentPage,
          pageSize: res.pageSize,
        },
        sum: {
          totalCount: res.totalCount,
        },
      };
    };
    const onSave = () => {
      categoryStatus.dialogVisible = true;

      categoryStatus.category = {
        id: undefined,
        name: '',
        parentId: 0,
      };
      categoryStatus.action = 'save';
      categoryStatus.loading = false;
    };
    const onEdit = (val: Category) => {
      // 打开弹窗
      categoryStatus.dialogVisible = true;

      categoryStatus.action = 'edit';
      categoryStatus.category = { ...val };
      categoryStatus.loading = false;
    };
    const onBatchDelete = async (val: Category[]) => {
      console.log('批量删除', val);

      const ids = val.map((item) => item.id);

      await deleteBatchById(ids);
      //刷新数据
      await tableRef.value.refresh();
    };
    const onDelete = async (val: Category) => {
      console.log('确认删除分类:', val);
      await deleteBatchById([val.id]);
      //刷新数据
      await tableRef.value.refresh();
    };

    const columns: ColumnType[] = [
      {
        label: '分类',
        prop: 'name',
      },
      {
        label: '父级类型',
        prop: 'parentName',
      },
    ];

    return {
      adapter,
      columns,
      onBatchDelete,
      tableRef,
      onDelete,
      InfoFilled,
      onEdit,
      onSave,
      categoryStatus,
    };
  },
});
</script>

<style lang="scss">
.admin-action {
  margin: 0px 5px;
  text-decoration: underline;
  color: #409eff;
  cursor: pointer;
  &:hover {
    color: #416770;
  }
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
}
</style>
