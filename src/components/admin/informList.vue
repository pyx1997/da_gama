<template>
    <div class="wrap flex-col">
        <div class="container">
            <div class="tab borderB-sCA7">
                <div class="tabText borderB-main color-sCA8">公告列表</div>
            </div>
            <div class="list">
                <div class="item borderB-sCA7" v-for="(item,index) in informList" :key="index" @click="clickItem">
                    <div class="top row-jb-ac">
                        <div class="title color-sCA8">{{item.title}}</div>
                        <div class="date color-sCA6 flex-row">
                            <div>发布人：{{item.author}}</div> &nbsp;&nbsp;
                            <div>发布日期：{{item.date}}</div>
                        </div>
                    </div>
                    <div class="informContent color-sCA4">{{item.content}}</div>
                </div>
            </div>
            <div class="pageBox row-je">
                <el-pagination class="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=limit
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=total>
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            limit: 10,
            total: 20,
            current: 1,
            informList: [
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                {title: '公告标题',author: 'XXX', date: '2020-04-28',content: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
            ]
        }
    },
    methods: {
        clickItem() {
            this.$router.push('/index/admin/informDetail')
        },
        // 当每页显示条数改变时
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
            this.limit = val
            this.current = 1
            // this.getList()
        },
        // 当前页码改变
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.current = val
            // this.getList()
        },
    }
}
</script>
<style scoped>
.tab {
    margin-bottom: 30px;
}
.pageBox {
    height: 50px;
    overflow: hidden;
    padding-top: 20px;
}
.tabText {
    width: 100px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    border-bottom-width: 4px !important;
}
.container {
    width: 94%;
    flex: 1;
    overflow: auto;
}
.top {
    margin-bottom: 10px;
}
.title {
    font-size: 16px;
    font-weight: bold;
}
.date {
    font-size: 14px;
}
.date div {
    margin-right: 10px;
}
.list {
    max-height: 400px;
    overflow: auto;
}
.item {
    padding-bottom: 14px;
    border-bottom-style: dashed !important; 
    cursor: pointer;
    margin-bottom: 14px;
}
.informContent {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
}
</style>