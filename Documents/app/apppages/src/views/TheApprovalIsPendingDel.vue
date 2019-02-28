<template>
	<div id="TheApprovalIsPendingDel">
        <div class="header">
            <div>
                <span class="left"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>调班详情</p>
            <div>
                <a>　</a>
            </div>
        </div>
        <ul class="marg">
            <li  class="headPortrait">
                <span><b><img src="../assets/images/headPortrait.png" alt=""></b></span>
                <p>彭桂英</p>
            </li>
            <li>
                <span>调班时间</span>
                <p>10/17 12:00</p>
            </li>
            <li>
                <span>值班类型</span>
                <p>区域巡查</p>
            </li>
            <li>
                <span>详细地点</span>
                <p>学校后花园</p>
            </li>
        </ul>
        <ul>
            <li>
                <span>被调人</span>
                <p>张天天</p>
            </li>
            <li>
                <span>被调时间</span>
                <p>10/17 12:00</p>
            </li>
        </ul>
        <div class="seal">
            <span><img src="../assets/images/seal_backout.png" alt=""></span>
            <!-- <span><img src="../assets/images/seal_complete.png" alt=""></span>
            <span><img src="../assets/images/seal_turn_down.png" alt=""></span>
            <span><img src="../assets/images/seal_underway.png" alt=""></span>
            <span><img src="../assets/images/seal_past_due.png" alt=""></span> -->
        </div>

        <div class="click_btn">
            <p>驳回</p>
            <p @click="messageBox">同意</p>
        </div>


       
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
import { MessageBox} from 'mint-ui';

export default {
	
    name: 'TheApprovalIsPendingDel',
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

       messageBox(){
            MessageBox.confirm('', { 
                message: '立即撤销', 
                title: '', 
            }).then(action => {
                console.log(123)
            });
          
        }
    },
}
</script>

<style lang="scss" scoped="">
#TheApprovalIsPendingDel{
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 .32rem;
        height: .88rem;
        position: fixed;
        top: 0;
        width: 100%;
        border-bottom: 1px solid #E4E9EC;
        background: #fff;
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
            a{
                width: 1.28rem;
                font-size: .32rem;
                color: #03A9F4;
                text-align: right;
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
    .marg{
        padding-top: .88rem;
    }
    ul{
        margin-bottom: .2rem;
        li{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 .32rem;
            height: .96rem;
            background: #fff;
            border-bottom: 1px solid #E4E9EC;
            font-size: .32rem;
            color: #333333;
            span{
                width: 1.76rem;
            }
            p{
                flex: 1;
            }
        }
        .headPortrait{
            height: 1.6rem;
            span{
                b{
                    display: block;
                    width: .96rem;
                    overflow: hidden;
                    border-radius: 50%;
                    height: .96rem;
                }
            }
        }
    }
    .seal{
        position: absolute;
        top: .88rem;
        width: 2rem;
        right: .32rem;
    }
    .click_btn{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        font-size: .32rem;
        color: #03A9F4;
        height: .96rem;
        border-top: 1px solid #ddd;
        p{
            flex: 1;
            text-align: center;
        }
    }
}
  
  

</style>   