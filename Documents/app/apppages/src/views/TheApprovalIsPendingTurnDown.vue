<template>
	<div id="TheApprovalIsPendingTurnDown">
        <div class="header">
            <div>
                <span class="left"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>审批驳回</p>
            <div>
                <a>　</a>
            </div>
        </div>
        <div class="message">
            <span>驳回理由</span>
            <p>
                <textarea placeholder="请填写（100字以内，非必填）"></textarea>
            </p>
        </div>
        <div class="sub_btn" @click="messageBox">提交</div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
import { MessageBox} from 'mint-ui';

export default {
	
    name: 'TheApprovalIsPendingTurnDown',
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
                message: '驳回该交接班', 
                title: '', 
            }).then(action => {
                console.log(123)
            });
          
        }
    },
}
</script>

<style lang="scss" scoped="">
#TheApprovalIsPendingTurnDown{
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
    .message{
        padding: .3rem .32rem;
        background: #fff;
        margin-top: 1.08rem;
        display: flex;
        span{
            width: 2rem;
            font-size: .32rem;
            color: #333333;
        }
        p{
            height: 2.8rem;
            flex: 1;
            textarea{
                width: 100%;
                height: 100%;
                border: 0;
            }
        }
    }
    .sub_btn{
        margin: 1.1rem .32rem 0;
        background: #03A9F4;
        color: #fff;
        text-align: center;
        line-height: .84rem;
        border-radius: 4px;
        font-size: .32rem;
    }
}
  
  

</style>   