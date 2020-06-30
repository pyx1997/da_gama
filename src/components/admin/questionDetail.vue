<template>
    <div class="wrap">
        <div class="container flex-col">
            <div class="tab borderB-sCA7 row-jb-ac">
                <div class="tabText color-sCA8 borderB-main">{{title}}</div>
            </div>
            <div class="section">
                <img :src="imgSrc">
            </div>
        </div>
    </div>
</template>
<script>
var name
var list
var self
export default {
    data() {
        return {
            title: '',
            imgSrc: ''
        }
    },
    created() {
        // console.log('item:',JSON.parse(localStorage.getItem('question')))
        if(this.$route.params.item) {
            this.title = this.$route.params.item.title
            this.imgSrc = 'http://192.168.53.250/download/IT/question/'+this.$route.params.item.img
        }else {
            this.title = JSON.parse(localStorage.getItem('question')).title
            this.imgSrc = 'http://192.168.53.250/download/IT/question/'+JSON.parse(localStorage.getItem('question')).img
        }
        
        
    },
    methods: {
        
    }
}
</script>
<style scoped>
.container {
    width: 94%;
    height: 100%;
    box-sizing: border-box
}
.section {
    padding-top: 20px;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
}
.section img {
    width: 100%;
}
</style>