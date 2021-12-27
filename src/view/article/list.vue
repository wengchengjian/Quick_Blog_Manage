<template>
  <admin-main-table :adapter="adapter" :columns="columns" index selective>
    <template #header="{ headerRef }">
      <el-form-item label="作者">
        <el-input
          v-model="headerRef.author"
          clearable
          placeholder="请输入作者名"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="Activity zone">
        <el-select v-model="headerRef.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="标题">
        <el-input
          v-model="headerRef.title"
          clearable
          placeholder="请输入文章名"
        ></el-input>
      </el-form-item>

      <el-form-item label="发布">
        <el-select v-model="headerRef.publish" placeholder="请选择">
          <el-option
            v-for="item in publishOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐">
        <el-select v-model="headerRef.recommend">
          <el-option
            v-for="item in recommendOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="置顶">
        <el-select v-model="headerRef.top">
          <el-option
            v-for="item in topOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间范围">
        <el-date-picker
          v-model="headerRef.timeRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-value="defaultTime"
          value-format="YYYY/MM/DD"
        ></el-date-picker>
      </el-form-item>
    </template>

    <template #publish="{ row, index }">
      <el-tag :type="PUBLISH_STATUS_ENUM[row['publish']]">{{
        PUBLISH_TEXT_ENUM[row['publish']]
      }}</el-tag>
    </template>
    <template #recommend="{ row, index }">
      <el-tag :type="RECOMMEND_STATUS_ENUM[row['recommend']]">{{
        RECOMMEND_TEXT_ENUM[row['recommend']]
      }}</el-tag>
    </template>
    <template #top="{ row, index }">
      <el-tag :type="TOP_STATUS_ENUM[row['top']]">{{
        TOP_TEXT_ENUM[row['top']]
      }}</el-tag>
    </template>

    <template #operation="{ scope }">
      <span class="admin-action">编辑</span>
      <span class="admin-action">发布</span>
      <span class="admin-action">删除</span>
    </template>
  </admin-main-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AdminMainTable from '@/components/Admin-Main-Table.vue';
import { ColumnType } from '@/components/Admin-Base-Table.vue';
import { queryArticleList } from '@/api/article';
import moment from 'moment';
import {
  PUBLISH_STATUS_ENUM,
  PUBLISH_TEXT_ENUM,
  RECOMMEND_TEXT_ENUM,
  RECOMMEND_STATUS_ENUM,
  TOP_TEXT_ENUM,
  TOP_STATUS_ENUM,
} from '@/constants/enums';

export type ArticleListFormRequest = {
  author?: string;
  title?: string;
  publish?: boolean;
  recommend?: boolean;
  top?: boolean;
  timeRange?: string[];
  pageNum?: number;
  pageSize?: number;
};

export default defineComponent({
  name: 'ArticleList',
  components: {
    AdminMainTable,
  },
  setup() {
    //  默认查询过去一个月的博客
    const defaultTime = ref([
      new Date(moment().subtract(1, 'months').valueOf()),
      new Date(moment().valueOf()),
    ]);

    const publishOptions = ref([
      {
        label: '全部',
        value: -1,
      },
      {
        label: '已发布',
        value: 0,
      },
      {
        label: '未发布',
        value: 1,
      },
      {
        label: '未审核',
        value: 2,
      },
      {
        label: '审核失败',
        value: 3,
      },
    ]);
    const recommendOptions = ref([
      {
        label: '全部',
        value: -1,
      },
      {
        label: '已推荐',
        value: 0,
      },
      {
        label: '未推荐',
        value: 1,
      },
    ]);

    const topOptions = ref([
      {
        label: '全部',
        value: -1,
      },
      {
        label: '已置顶',
        value: 0,
      },
      {
        label: '未置顶',
        value: 1,
      },
    ]);

    const adapter = async ({
      author,
      title,
      publish,
      recommend,
      top,
      timeRange,
      pageNum,
      pageSize,
    }: ArticleListFormRequest) => {
      console.log(
        '请求参数: ',
        author,
        title,
        publish,
        recommend,
        top,
        timeRange,
        pageNum,
        pageSize
      );

      const startTime = timeRange
        ? timeRange[0]
        : defaultTime.value[0].toLocaleDateString();
      const endTime = timeRange
        ? timeRange[1]
        : defaultTime.value[1].toLocaleDateString();
      const res = await queryArticleList({
        author,
        title,
        publish,
        recommend,
        top,
        startTime,
        endTime,
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

    const columns: ColumnType[] = [
      {
        label: '文章',
        prop: 'title',
      },
      {
        label: '作者',
        prop: 'author',
      },
      {
        label: '描述',
        prop: 'description',
      },
      {
        label: '发布',
        prop: 'publish',
        slot: true,
      },
      {
        label: '推荐',
        prop: 'recommend',
        slot: true,
      },
      {
        label: '置顶',
        prop: 'top',
        slot: true,
      },
    ];
    return {
      adapter,
      columns,
      defaultTime,
      publishOptions,
      recommendOptions,
      topOptions,
      PUBLISH_STATUS_ENUM,
      PUBLISH_TEXT_ENUM,
      RECOMMEND_TEXT_ENUM,
      RECOMMEND_STATUS_ENUM,
      TOP_TEXT_ENUM,
      TOP_STATUS_ENUM,
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
</style>
