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
      <el-form-item label="标签">
        <el-input
          v-model="headerRef.name"
          placeholder="请输入标签名"
        ></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="headerRef.type">
          <el-option
            v-for="item in TypeOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>

    <template #type="{ row, index }">
      <el-tag>{{ MODULE_TEXT_EUNM[row['type']] }}</el-tag>
    </template>

    <template #operation="{ scope }">
      <span class="admin-action" @click="onEdit(scope.row)">编辑</span>
      <el-popconfirm
        icon-color="red"
        :icon="InfoFilled"
        title="你确定删除该标签吗?"
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
  <tag-dialog
    :table-ref="tableRef"
    :data="tagStatus"
    @close="tagStatus.dialogVisible = false"
  >
  </tag-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from 'vue';
import AdminMainTable from '@/components/Admin-Main-Table.vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { ColumnType } from '@/components/Admin-Base-Table.vue';
import { queryTagList, deleteTagByLink } from '@/api/tag';
import { Tag } from '@/types/tag';
import { MODULE_TEXT_EUNM } from '@/constants/enums';
import TagDialog, { TagStatus } from './components/TagDialog.vue';
export type ArticleListFormRequest = {
  name?: string;
  type?: number;
  pageNum?: number;
  pageSize?: number;
};

export default defineComponent({
  name: 'Tag',
  components: {
    AdminMainTable,
    TagDialog,
  },
  setup() {
    const tableRef = ref<any>({});

    const tagStatus = reactive<TagStatus>({
      tag: {
        name: '',
        type: 0,
      },
      loading: false,
      dialogVisible: false,
      action: 'save',
    });

    const TypeOptions = ref([
      {
        label: '全部',
        value: -1,
      },
      {
        label: '文章',
        value: 0,
      },
      {
        label: '图书',
        value: 1,
      },
      {
        label: '读书笔记',
        value: 2,
      },
    ]);
    const adapter = async ({
      name,
      type,
      pageNum,
      pageSize,
    }: ArticleListFormRequest) => {
      const res = await queryTagList({
        name,
        type,
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
      tagStatus.dialogVisible = true;

      tagStatus.tag = {
        id: undefined,
        name: '',
        type: 0,
      };
      tagStatus.action = 'save';
      tagStatus.loading = false;
    };
    const onEdit = (val: Tag) => {
      // 打开弹窗
      tagStatus.dialogVisible = true;

      tagStatus.action = 'edit';
      tagStatus.tag = { ...val };
      tagStatus.loading = false;
    };
    const onBatchDelete = async (val: Tag[]) => {
      console.log('批量删除', val);

      const ids = val.map((item) => item.id);

      await deleteTagByLink(ids);
      //刷新数据
      await tableRef.value.refresh();
    };
    const onDelete = async (val: Tag) => {
      console.log('确认删除标签:', val);
      await deleteTagByLink([val.id]);
      //刷新数据
      await tableRef.value.refresh();
    };

    const columns: ColumnType[] = [
      {
        label: '标签',
        prop: 'name',
      },
      {
        label: '类型',
        prop: 'type',
        slot: true,
      },
    ];

    return {
      adapter,
      columns,
      TypeOptions,
      MODULE_TEXT_EUNM,
      onBatchDelete,
      tableRef,
      onDelete,
      InfoFilled,
      onEdit,
      onSave,
      tagStatus,
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
