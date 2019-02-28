<template>
	<div id="ExamineAndApproveEditTwo">
        <div class="header">
            <div>
                <span class="left"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>接班详情</p>
            <div>
                <span class="left"></span>
                <span><a href=""><img src="../assets/images/icon_cellphone.png" alt=""></a></span>
            </div>
        </div>
        <div class="user">
            <p>
                <span>交班人</span>
                <a>王洋</a>
            </p>
            <p>
                <span>交班时间</span>
                <a>2018/08/07 22:00</a>
            </p>
        </div>
        <ul>
            <li>
                <span>值班班级</span>
                <p>2018级电子商务4班</p>
            </li>
            <li>
                <span>值班宿舍</span>
                <p>2018级电子商务4班</p>
            </li>
            <li>
                <span>值班楼层</span>
                <p>2018级电子商务4班</p>
            </li>
            <li>
                <span>值班区域</span>
                <p>2018级电子商务4班</p>
            </li>
        </ul>
        <div class="remark">
            <span>备注信息</span>
            <p>该班在我值班期间，迟到4人，旷课2人。并且整个班级的课堂秩序较乱</p>
        </div>
        <div class="images">
            <h4>附加图片</h4>
            <div>
                <p><img src="../assets/images/img1.png" alt=""></p>
                <p><img src="../assets/images/img1.png" alt=""></p>
                <p><img src="../assets/images/img1.png" alt=""></p>
                <p><img src="../assets/images/img1.png" alt=""></p>
                <p><img src="../assets/images/img1.png" alt=""></p>
            </div>
        </div>

	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
	
    name: 'ExamineAndApproveEditTwo',
    data(){
        return {
           
        }
    },
    components:{
        // 组件实例化
    },
    watch:{
        
       
    },
    mounted(){
       
    },
    created(){
        document.body.style.background = "#F8F8F8";
        

        
    },
    methods: {

    
    },
}
</script>

<style lang="scss" scoped="">
#ExamineAndApproveEditTwo{
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 .32rem;
        height: .88rem;
        position: fixed;
        top: 0;
        width: 100%;
        background: #fff;
        z-index: 999;
        div{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                width: .48rem;
                overflow: hidden;
            }
            .left{
                margin-right: .32rem;
            }
        }
        p{
            flex: 1;
            text-align: center;
            font-size: .36rem;
            font-weight: bold;
            color: #333333;
        }
    }
    .user{
        padding-top: .88rem;
        position: relative;
        z-index: 100;
        p{
            height: .96rem;
            display: flex;
            align-items: center;
            background: #fff;
            border-bottom:1px solid #ddd; 
            padding: 0 .32rem;
            font-size: .32rem;
            color: #333333;
            span{
                width: 1.76rem;
            }
        }
        div{
            position: absolute;
            right: .32rem;
            top: .88rem;
            width: 2rem;
        }
    }
    ul{
        padding-top: .2rem;
        li{
            height: .96rem;
            display: flex;
            align-items: center;
            background: #fff;
            border-bottom:1px solid #ddd; 
            padding: 0 .32rem;
            font-size: .32rem;
            color: #333333;
            span{
                width: 1.76rem;
            }
        }
    }
    .remark{
        display: flex;
        align-items: center;
        padding: .24rem .32rem;
        background: #fff;
        font-size: .32rem;
        color: #333333;
        margin-top: .2rem;
        span{
            width: 1.76rem;
        }
        p{
            flex: 1;
        }
    }
    .images{
        margin-top:.2rem;
        background: #fff;
        padding: 0 .32rem 1rem;
        h4{
            font-size: .24rem;
            color: #999999;
            padding: .32rem 0;
            font-weight: normal;
        } 
        div{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            p{
                width: 2.1rem;
                height: 2.1rem;
                margin-bottom: .2rem;
                margin-right: .2rem;
                &:nth-of-type(3n){
                    margin-right: 0;
                }
            }
        }
    }
    .seal_underway{
        height: .96rem;
        background: #fff;
        line-height: .96rem;
        text-align: center;
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #ddd;
        font-size: .32rem;
        color: #03A9F4;
    }
}
  
  

</style>   