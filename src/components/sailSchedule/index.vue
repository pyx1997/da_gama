<template>
    <div class="flex-row wrap">
        <!-- <div class="aside bgc-sCA3 col-ac">
            <div class="name color-sCA4">订舱</div>
            <div class="aside-item">订舱首页</div>
            <div class="aside-item">订舱单查询</div>
        </div> -->
        <div class="aside color-sCA4">
            <div class="name">船期</div>
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
                {text: 'HPL船期',path: '/index/sailSchedule/hplSchedule',selected: true},
                {text: '兴港船期',path: '/index/sailSchedule/nbSchedule',selected: false}
            ]
        }
    },
    mounted() {
        
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


</style>