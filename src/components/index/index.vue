<template>
    <div class="wrap flex-col">
        <!-- <icon name="beer"></icon> -->
        <div class="nav bgc-sCA2 color-sCA1 row-ac">
            <img src="@/assets/img/mrf.png" class="logo"/>
            <div v-for="(item,index) in navList" :key="index" class="nav-list bgc-sCA2" @click="clickNavItem(index)" :class="{'selected' : item.selected}">
                <div class="nav-item">{{item.text}}</div>
                <!-- <div class="underline bgc-main" v-if="item.selected"></div> -->
            </div>
        </div>
        <div class="section">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import bus from '../bus'
export default {
    data() {
        return {
            navList: [
                {text: '首页',selected: true,path: '/index/home'},
                // {text: '船期',selected: false,path: '/index/sailSchedule/hplSchedule'},
                {text: '订舱',selected: false,path: '/index/book/bookList'},
                {text: '商务',selected: false,path: '/index/commerce/statistics'},
                {text: '补料',selected: false,path: '/index/blank'},
                {text: 'VGM',selected: false,path: '/index/blank'},
                {text: '行政',selected: false,path: '/index/admin/itIndex'},
                {text: '财务',selected: false,path: '/index/blank'},
                {text: '论坛',selected: false,path: '/index/forum'},
                {text: 'wait4U',selected: false,path: '/index/blank'},
                {text: 'Help',selected: false,path: '/index/blank'},
            ]
        }
    },
    created() {
        bus.$on('changeNav',(index) => {
            this.clickNavItem(index)
        })
    },
    mounted() {
        var path = localStorage.getItem('path')
        if(path.search('/home') != -1) {
            this.clickNavItem(0)
        }else if(path.search('/sailSchedule') != -1) {
            this.clickNavItem(1)
        }else if(path.search('/book') != -1) {
            this.clickNavItem(1)
        }else if(path.search('/admin') != -1) {
            this.clickNavItem(5)
        }else if(path.search('/commerce') != -1) {
            this.clickNavItem(2)
            // this.$router.push('/index/commerce/statistics')
            // this.clickNavItem(4)
        }else {
            this.clickNavItem(3)
        }
        // this.$saveFile('https://www.baidu.com/link?url=xLrZ0Twpo1_QC4AgcDKG17U-iIa0FY7doZHUl6zgwTTOh55niOuE0g7IgkZvnT4AhlrbPqawmM5MOSDvsifKMoqbbaB9Yb-E4rM0rzlt6ei&amp;wd=&amp;eqid=9922bc6c000064cd000000065eeb3ab4')
    },
    methods: {
        clickNavItem(index) {
            if(this.navList[index].selected) {
                return
            }else {
                this.navList.forEach((item,idx) => {
                    if(idx === index) {
                        item.selected = true
                    }else {
                        item.selected = false
                    }
                })
                this.$router.push(this.navList[index].path)
            }
        },
        fun(num) {
            var n = 0
            for(var i = 1; i <= num; i++) {
                if(i.toString().indexOf(1) !== -1) {
                    var arr = i.toString().split('');
                    arr.forEach((item,index) => {
                        if(item == 1) {
                            n++
                        }
                    })
                }
            }
            return n 
        }
    }
}
</script>
<style scoped>
.wrap {
    width: 100%;
    height: 100%;
}
.nav {
    width: 100%;
    height: 50px;
}
.logo {
    height: 50px;
}
.nav-list {
    position: relative;
    height: 50px;
    line-height: 50px;
    /* margin-left: 46px; */
    padding: 0 24px;
}
.selected {
    background: rgba(0,100,182,0.2)
}
.nav-list:hover {
    background: rgba(0,100,182,0.2)
}
.nav-item {
    /* width: 100px; */
    /* padding: 0 4px; */
    width: 56px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
}
.underline {
    position: absolute;
    bottom: 0px;
    /* left: -2px; */
    width: 100%;
    height: 3px;
    border-radius: 2px;

}
.section {
    width: 100%;
    flex: 1;
    overflow: auto;
}
</style>