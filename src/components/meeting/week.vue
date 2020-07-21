<template>
    <div class="wrap row-jc container">
        <div class="table col-ac">
            <div class="thead fontSizeB color-sCA8 flex-row">
                <div class="time">时间</div>
                <div class="week">周一</div>
                <div class="week">周二</div>
                <div class="week">周三</div>
                <div class="week">周四</div>
                <div class="week">周五</div>
            </div>
            <div class="tbody">
                <div class="flex-row fontSizeB color-sCA1 item" v-for="(item,index) in list" :key="index">
                    <div class="time color-sCA8">{{item.time}}</div>
                    <div class="week" :class="[item.data[0].state == 0 ? 'bgc-green2': 'bgc-red2']">{{item.data[0].depart}}</div>
                    
                    <div class="week" :class="[item.data[1].state == 0 ? 'bgc-green2': 'bgc-red2']">{{item.data[1].depart}}</div>
                    <div class="week" :class="[item.data[2].state == 0 ? 'bgc-green2': 'bgc-red2']">{{item.data[2].depart}}</div>
                    <div class="week" :class="[item.data[3].state == 0 ? 'bgc-green2': 'bgc-red2']">{{item.data[3].depart}}</div>
                    <div class="week" :class="[item.data[4].state == 0 ? 'bgc-green2': 'bgc-red2']">{{item.data[4].depart}}</div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    time: '09:00 ~ 09:30',
                    data: [
                        {week: '周一',state: 0,depart: '空闲'},
                        {week: '周二',state: 0,depart: '空闲'},
                        {week: '周三',state: 0,depart: '空闲'},
                        {week: '周四',state: 0,depart: '空闲'},
                        {week: '周五',state: 0,depart: '空闲'}
                    ]
                },
                {
                    time: '09:30 ~ 10:00',
                    data: [
                        {week: '周一',state: 0,depart: '空闲'},
                        {week: '周二',state: 0,depart: '空闲'},
                        {week: '周三',state: 0,depart: '空闲'},
                        {week: '周四',state: 0,depart: '空闲'},
                        {week: '周五',state: 0,depart: '空闲'}
                    ]
                },
                {
                    time: '10:00 ~ 10:30',
                    data: [
                        {week: '周一',state: 1,depart: 'IT'},
                        {week: '周二',state: 1,depart: 'IT'},
                        {week: '周三',state: 1,depart: 'IT'},
                        {week: '周四',state: 1,depart: 'IT'},
                        {week: '周五',state: 1,depart: 'IT'},
                    ]
                }
            ]
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
.table {
    width: 90%;
}
.thead {
    line-height: 30px;
    text-align: center;
    border: 1px solid #333;
}
.tbody {
    line-height: 40px;
    text-align: center;
    border: 1px solid #333;
}
.week {
    width: 120px;
    border-left: 1px solid #333
}
.time {
    width: 200px;
}
.depart {
    width: 100px
}
.tbody .item {
    border-bottom: 1px solid #333;
}
.applicat {
    width: 100px;
}
.user {
    flex: 1;
}
</style>