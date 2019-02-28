<template>
	<div id="ChangeShift">
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
            <span @click="messageBox">撤销</span>
        </div>


        <div class="agreeOrNot">
			<div class="agreeOrNotList">
				<span><img src="../assets/images/icon_pitchOn2.png" alt=""></span>
				<div class="agreeOrNotListLeft">
					<div class="tle">
						<a>后勤处</a>
                        <b><em>(张天天)</em></b>
						<i class="col3">已驳回</i>
					</div>
					<div class="details">
						<p>我有其他安排</p>
						<time>2017/08/07 10:00</time>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
import { MessageBox} from 'mint-ui';

export default {
	
    name: 'ChangeShift',
    data(){
        return {
            data:''
        }
    },
    components:{
        // 组件实例化
    },
    watch:{
        
       
    },
    mounted(){
        const that = this;
        
        
    },
    created(){
        document.body.style.background = "#F8F8F8";
        const that = this;
        that.$http.get('/api/getApplyDetail/'+that.$store.state.id ,{
            headers: {
                accessToken:sessionStorage.accessToken,
                schoolId:sessionStorage.schoolId,
                "Content-Type":"application/json"
            }
        })
        .then(response=>{
            that.data = response.data.rows
            console.log(response)
        })  
        .catch(function(error) {
            console.log(error);
        });
        
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
#ChangeShift{
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
        position: fixed;
        bottom: 0;
        width: 100%;
        height: .96rem;
        border-top: 1px solid #E4E9EC;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        font-size: .32rem;
        color: #03A9F4;
    }
    .agreeOrNot {
    overflow: hidden;
    .agreeOrNotList {
      border-bottom: 1px solid #f8f8f8;
      background: #fff;
      position: relative;
      margin-top: 0.2rem;
      span {
        position: absolute;
        width: 0.28rem;
        height: 0.28rem;
        top: 0.36rem;
        left: 0.55rem;
      }
      .agreeOrNotListLeft {
        padding-right: 0.36rem;
        margin-left: 0.68rem;
        padding-bottom: .2rem;
        border-left: 1px solid #e0e0e0;
        overflow: hidden;
        overflow: hidden;
        .tle {
          display: flex;
          align-items: center;
          height: 1rem;
          padding-left: 0.34rem;
          a {
            font-size: 0.32rem;
            color: rgba(51, 51, 51, 0.87);
            padding-right: 0.2rem;
            em {
              font-style: normal;
            }
          }
          b {
            font-size: 0.28rem;
            color: rgba(102, 102, 102, 0.87);
            flex: 1;
            font-weight: normal;
            em {
              font-style: normal;
            }
          }
          i {
            font-size: 0.32rem;
            color: #62c095;
            font-style: normal;
            &.col1{
                color: #999999;
            }
            &.col2{
                color: #6D81AA;
            }
            &.col3{
                color: #F34343;
            }
          }
        }
        .details {
          margin-left: 0.16rem;
          background: #f8f8f8;
          padding: 0.18rem 0.24rem;
          p {
            font-size: 0.3rem;
            color: rgba(51, 51, 51, 0.87);
          }
          time {
            font-size: 0.26rem;
            color: rgba(153, 153, 153, 0.87);
          }
        }
      }
    }
  }
}
  
  

</style>   