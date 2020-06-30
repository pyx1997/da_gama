<template>
    <div class="wrap">
        <div class="container flex-col">
            <div class="tab borderB-sCA7 row-jb-ac">
                <div class="tabText borderB-main color-sCA8">{{title}}</div>
                <!-- <i class="download el-icon-download color-sCA8" title="下载原文件" @click="download"></i> -->
            </div>
            <div class="section">
                <div class="list row-jb">
                    <div class="item color-sCA4 row-ac" v-for="(item,index) in list" :key="index" @click="clickItem(item)">
                        <i class="el-icon-document"></i>
                        <div>{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            list: ''
        }
    },
    created() {
        // console.log('list')
        if(this.$route.params.list && this.$route.params.name) {
            this.title = this.$route.params.name
            this.list = this.$route.params.list
        }else {
            this.title = JSON.parse(localStorage.getItem('questionItem')).name
            this.list = JSON.parse(localStorage.getItem('questionItem')).list
        }
        
        // console.log(this.title,this.list)
    },
    methods: {
        clickItem(item) {
            localStorage.setItem('question',JSON.stringify(item))
            this.$router.push({
                name: 'questionDetail',
                params: {
                    item: item
                }
            })
        }
    }
}
</script>
<style scoped>
.container {
    width: 94%;
    height: 100%;
    box-sizing: border-box;
}
.section {
    flex: 1;
    overflow: auto;
}
.list {
    margin-top: 20px;
    width: 100%;
    flex-wrap: wrap;
}
.item {
    margin-bottom: 20px;
    width: 48%;
    cursor: pointer;
}
.item:hover {
    font-weight: bold;
}
.item i {
    font-size: 20px;
    padding: 0 10px;
}
.item div {
    flex: 1;
    font-size: 14px;
}
</style>