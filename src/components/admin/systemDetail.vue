<template>
    <div class="wrap">
        <div class="container flex-col">
            <div class="tab borderB-sCA7 row-jb-ac">
                <div class="tabText borderB-main color-sCA8">{{name}}</div>
                <!-- <i class="download el-icon-download color-sCA8" title="下载原文件" @click="download"></i> -->
            </div>
            <div class="imgBox">
                <iframe :src="fileName" frameborder="0" width="100%" height="96%"></iframe>
                <!-- <img :src="imgSrc"/> -->
            </div>
        </div>
        
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgSrc: '',
            name: '',
            fileName: ''
        }
    },
    created() {
        this.imgSrc = this.$route.params.img
        // this.imgSrc = require('../../assets/img/periodical/periodical'+(this.$route.query.index+1)+'.jpg')
        this.name = this.$route.params.name
        this.fileName = 'http://192.168.53.250/download/admin/system/pdf/'+this.$route.params.fileName
        // this.file = 'http://192.168.53.250/download/admin/system/'+this.$route.params.file
        // console.log("file2:",this.file)
    },
    methods: {
        // download() {
        //     window.location.href=this.file
        // }
    }
}
</script>
<style scoped>
.tab {
    margin-bottom: 30px;
}
.tabText {
    /* width: 100px; */
    padding: 0 10px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    border-bottom-width: 4px !important;
}
.container {
    width: 94%;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
}
.imgBox {
    width: 100%;
    flex: 1;
    overflow: auto;
}
.imgBox img{
    width: 100%;
}
.download {
    padding-right: 40px;
    font-size: 24px;
    cursor: pointer;
    text-decoration: none;
}
</style>