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
      <el-form-item label="友链名称">
        <el-input
          v-model="headerRef.title"
          placeholder="请输入友链名"
        ></el-input>
      </el-form-item>
    </template>
    <template #avatar="{ row, index }">
      <el-avatar
        :src="`${imagePath + row['avatar']}`"
        size="large"
        shape="circle"
      >
      </el-avatar>
    </template>
    <template #url="{ row, index }">
      <el-link :href="row['url']" type="success">{{ row['url'] }}</el-link>
    </template>
    <template #operation="{ scope }">
      <span class="admin-action" @click="onEdit(scope.row)">编辑</span>
      <el-popconfirm
        icon-color="red"
        :icon="InfoFilled"
        title="你确定删除该友链吗?"
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
  <link-dialog
    :table-ref="tableRef"
    :data="linkStatus"
    @close="linkStatus.dialogVisible = false"
  >
  </link-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import AdminMainTable from '@/components/Admin-Main-Table.vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { ColumnType } from '@/components/Admin-Base-Table.vue';
import { queryLinkListPage, deleteLinkById } from '@/api/link';
import { Link } from '@/types/link';
import { imagePath } from '@/constants/constants';

import LinkDialog, { LinkStatus } from './components/LinkDialog.vue';
export type LinkListFormRequest = {
  title?: string;
  pageNum?: number;
  pageSize?: number;
};

export default defineComponent({
  name: 'Link',
  components: {
    AdminMainTable,
    LinkDialog,
  },
  setup() {
    const tableRef = ref<any>({});

    const linkStatus = reactive<LinkStatus>({
      link: {
        id: undefined,
        title: '',
        url: '',
        avatar: '',
      },
      loading: false,
      dialogVisible: false,
      action: 'save',
    });

    const adapter = async ({
      title,
      pageNum,
      pageSize,
    }: LinkListFormRequest) => {
      const res = await queryLinkListPage({
        title,
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
      linkStatus.dialogVisible = true;

      linkStatus.link = {
        id: undefined,
        title: '',
        url: '',
        avatar: '',
      };
      linkStatus.action = 'save';
      linkStatus.loading = false;
    };
    const onEdit = (val: Link) => {
      // 打开弹窗
      linkStatus.dialogVisible = true;

      linkStatus.action = 'edit';
      linkStatus.link = { ...val };
      linkStatus.loading = false;
    };
    const onBatchDelete = async (val: Link[]) => {
      console.log('批量删除', val);

      const ids = val.map((item) => item.id);

      await deleteLinkById(ids);
      //刷新数据
      await tableRef.value.refresh();
    };
    const onDelete = async (val: Link) => {
      console.log('确认删除友链:', val);
      await deleteLinkById([val.id]);
      //刷新数据
      await tableRef.value.refresh();
    };

    const columns: ColumnType[] = [
      {
        label: '友链名称',
        prop: 'title',
      },
      {
        label: '友链地址',
        prop: 'url',
        slot: true,
      },
      {
        label: '友链头像',
        prop: 'avatar',
        slot: true,
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
      linkStatus,
      imagePath,
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
