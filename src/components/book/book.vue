<template>
    <div class="flex-row wrap">
        <!-- <div class="aside bgc-sCA3 col-ac">
            <div class="name color-sCA4">订舱</div>
            <div class="aside-item">订舱首页</div>
            <div class="aside-item">订舱单查询</div>
        </div> -->
        <div class="aside color-sCA4">
            <div class="name">订舱</div>
            <div class="aside-item" v-for="(item,index) in asideList" :key="index" :class="{'color-main' : item.selected}" @click="clickAside(index)">{{item.text}}</div>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            asideList: [
                {text: '订舱单列表',path: '/index/book/bookList',selected: true},
                {text: '订舱统计',path: '/index/book/bookIndex',selected: false},
                {text: '订舱录入',path: '/index/book/insertBook',selected: false},
                {text: '录入列表',path: '/index/book/insertList',selected: false},
            ]
        }
    },
    mounted() {
        // var path = localStorage.getItem('path')
        // if(path.search('bookList') != -1) {
        //     this.clickAside(1)
        // }else if(path.search('bookIndex')) {
        //     this.clickAside(0)
        // }
    },
    methods: {
        clickAside(index) {
            if(this.asideList[index].selected) {
                return
            }else {
                this.asideList.forEach((item,idx) => {
                    if(idx === index) {
                        item.selected = true
                    }else {
                        item.selected = false
                    }
                })
                this.$router.push(this.asideList[index].path)
            }
        }
    }
}
</script>
<style scoped>
/* .aside {
    margin-top: 20px;
    width: 260px;
    line-height: 56px;
}
.aside .name {
    width: 100%;
    border-top: 4px solid #1176ea;
    border-bottom: 1px solid #21ace3;
    height: 56px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}
.aside .nav {
    width: 210px;
}
.aside-item {
    height: 56px;
    border-bottom: 1px solid #d4d4d4;
    width: 210px;
    cursor: pointer;
    text-indent: 70px;
} */


</style>