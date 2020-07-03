<template>
    <div class="wrap container">
        <div class="border-sCA7 echartsBox barBox flex-col">
            <!-- <div class="title color-sCA4">前日业务员订舱 TOP 10</div> -->
            <div class="barBoxInside">
                <pie></pie>
            </div>
        </div>
    </div>
</template>
<script>
import pie from './pie'
export default {
    data() {
        return {
            
        }
    },
    components: {pie},
    methods: {
        
    }
}
</script>
<style scoped>
.container {
    overflow: auto;
}
.echartsBox {
    padding: 10px;
    width: 900px;
    border-radius: 4px;
    margin: 10px 0 20px;
    box-sizing: border-box;
}
.echartsBox .title {
    font-size: 14px;
    font-weight: 650;
}
.barBox {
    height: 450px;
}
.barBoxInside {
    flex: 1;
    overflow: hidden;
}
</style>