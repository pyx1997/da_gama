<template>
    <div class="flex-row wrap">
        <div class="aside color-sCA4">
            <div class="name">行政IT</div>
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
                {text: '行政首页',path: '/index/admin/adminIndex',selected: true},
                {text: 'IT首页',path: '/index/admin/itIndex',selected: false}
            ]
        }
    },
    mounted() {
        
    },
    methods: {
        clickAside(index) {
            // if(this.asideList[index].selected) {
            //     return
            // }else {
                this.asideList.forEach((item,idx) => {
                    if(idx === index) {
                        item.selected = true
                    }else {
                        item.selected = false
                    }
                })
                this.$router.push(this.asideList[index].path)
            // }
        }
    }
}
</script>
<style scoped>


</style>