<template>
    <div class="wrap">
        <div class="first" ref="first">
            <img src="@/assets/img/home/first2.jpg">
            <!-- <img src="@/assets/img/home/ship.png" alt="" class="ship"> -->
            <img src="@/assets/img/home/u20.png" class="img1">
            <div class="text color-sCA1">
                <div>
                    <p>Mature:</p>
                    <p>A qualified team built with mature mind making our teammates strong and cohesive.</p>
                </div>
                <div>
                    <p>Responsible:</p>
                    <p>To be responsible to every client and partner and set up long term relationship.</p>
                </div>
                <div>
                    <p>Fast:</p>
                    <p>Fast action in daily to win more market share.</p>
                </div>
            </div>
        </div>
        <div class="second">
            <!-- <img src="@/assets/img/home/middle_bg_u2.jpg" alt="" class="img"> -->
            <img src="@/assets/img/home/box.png" alt="" class="boxImg">
            <div class="imgBox color-sCA1">
                <img src="@/assets/img/home/flow_u3.png" alt="" class="img1">
                <div class="book" @click="clickBook">BOOK(MRF)</div>
                <div class="mbc">CONFIRMATION(MBC)</div>
                <div class="si">SI(MIN)</div>
                <div class="vgm">VGM(VGM)</div>
            </div>
            
        </div>
        <div class="three">
            <!-- <img src="@/assets/img/home/bottom_u0.png" alt=""> -->
            <div class="items color-sCA1 row-jc">
                <div class="item row-ac" @click="clickInform">
                    <img src="@/assets/img/home/u29.svg" alt="">
                    <span>通知公告</span>
                </div>
                <div class="item row-ac">
                    <img src="@/assets/img/home/u26.svg" alt="">
                    <span>文案查询</span>
                </div>
                <div class="item row-ac">
                    <img src="@/assets/img/home/u27.svg" alt="">
                    <span>办事指南</span>
                </div>
                <div class="item row-ac">
                    <img src="@/assets/img/home/u28.svg" alt="">
                    <span>意见反馈</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../bus'
export default {
    data() {
        return {
            now: 0
        }
    },
    mounted() {
        window.addEventListener('mousewheel',this.handleScroll,false)
        let height = this.$refs.first.offsetHeight;
        // console.log("height:",height)
    },
    methods: {
        handleScroll (e) {
            var direction = e.deltaY > 0 ? 'down' : 'up'// 该语句可以用来判断滚轮是向上滑动还是向下
            // if(direction == 'down') {
            //     this.down()
            // }else {
            //     this.up()
            // }
            // console.log("direction:",direction)
        },
        clickBook() {
            bus.$emit('changeNav',1)
            // this.$router.push('/index/book/bookIndex')
        },
        clickInform() {
            this.$router.push('/index/admin/informList')
            // bus.$emit('changeNav',4)
            // this.$router.push('/index/admin/adminIndex')
        },
        down() {
            if(this.now == 2) {
                return
            }else {
                this.now = this.now + 1
                this.$refs.first.style.top = (-parseInt(this.$refs.first.offsetHeight))*this.now + 'px';
            }
        },
        up() {
            if(this.now == 0) {
                return
            }else {
                this.now = this.now - 1
                this.$refs.first.style.top = (-parseInt(this.$refs.first.offsetHeight))*this.now + 'px';
            }
        }
    }
}
</script>
<style scoped>
/* .first {
    width: 100%;
    height: 100%;
    background: url('../../assets/img/home/first.jpg');
    background-size: 100% 100%;
} */
.first,
.second,
.three{
    position: relative;
    /* height: 100%; */
    overflow: hidden;
    /* width: 100%;
    height: 100%;
    background: url('../../assets/img/home/top_u4.png') no-repeat;
    background-size: 100% 100%;
    background-position: top center; */
}
.first img,
.second img,
.three img {
    width: 100%;
    margin: 0 auto;
    vertical-align: middle;
}
.first{
    
    height: 100%;
    overflow: hidden;
    background-size: 100%;
    /* background: url('../../assets/img/home/first2.jpg'); */
}
.second {
    height: 100%;
    overflow: hidden;
    background: url('../../assets/img/home/secondBg.jpg');
    background-size: cover;
}
.first .ship {
    position: absolute;
    right: 3rem;
    bottom: 2rem;
    width: 5.6rem;
}
.first .img1 {
    position: absolute;
    left: 1rem;
    top: 1rem;
    width: 5.4rem;
}
.text p {
    line-height: 18px;
}
.text div {
    margin-bottom: 20px;
}
.first .text {
    position: absolute;
    bottom: 20px;
    left: 88px;
    font-weight: 700;
    font-size: 16px;
    font-family: 'Baskerville Old Face Bold', 'Baskerville Old Face Normal', 'Baskerville Old Face', sans-serif;
}
/* .second {
    background: url('../../assets/img/home/middle_bg_u2.jpg');
    background-size: 100% auto;
    background-position: left bottom;
} */
.second .img1 {
    position: absolute;
    width: 100%;
}
.second .boxImg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 8rem;
}
.second .imgBox {
    position: absolute;
    /* margin: 0 auto; */
    margin-left: -541px;
    width: 1082px;
    height: 298px;
    top: 80px;
    left: 50%;
    /* width: 100%; */
    background: url('../../assets/img/home/flow_u3.png') no-repeat;
    background-size: 100% 100%;
    font-size: 13px;
    font-family: 'Calibri Bold', 'Calibri Regular', 'Calibri', sans-serif;
    font-weight: 700;
}
.second .imgBox div:hover {
    text-decoration: underline
}
.item img {
    width: 50px;
    height: 50px;
}
.three .items {
    margin-top: 160px;
    /* position: absolute;
    left: 148px;
    top: 40px; */
}
.three .item {
    position: relative;
    cursor: pointer;
    margin-right: 50px;
    
    /* margin-bottom: 30px; */
} 
.three .item:hover {
    top: -10px;
    font-weight: bold;
}
.three .item:hover img {
    
    width: 55px;
}
.three {
    height: 100%;
    overflow: hidden;
    background: url('../../assets/img/home/bottom_u0.png');
    background-size: 100%;
    background-position: left bottom;
}
.item span {
    margin-left: 10px;
    font-size: 16px;
}

.book,
.si,
.mbc,
.vgm {
    position: absolute;
    letter-spacing: 1px;
    height: 100px;
    cursor: pointer;
}
.book {
    left: 29%;
    top: 70px;
}
.mbc {
    left: 37%;
    top: 110px;
    line-height: 200px;
}
.si {
    left: 53%;
    top: 70px;
}
.vgm {
    left: 64%;
    top: 110px;
    line-height: 200px;
}
</style>