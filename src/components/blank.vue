<template>
    <div>
        <!-- <div class="click" @click="click">click</div>
        <div class="box flex-row" :class="[right ? 'box1' : '']">
            <div class="click">1</div>
            <div class="click">2</div>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            right: false
        }
    },
    methods: {
        click() {
            this.right = !this.right
            console.log("box:",this.right)
        }
    }
}
</script>
<style scoped>
.click {
    font-size: 18px;
}
.box {
    background: red;
    position: relative;
    width: 100px;
    height: 100px;
    left: 0;
    top: 0;
    transition: all 1s;
}
.box1 {
    left: 200px !important;
}
</style>