<template>
	<div id="ExamineInform">
        <div class="tle">
            <span>标题</span>
            <p>{{sInformTle}}</p>
        </div>
        <ul class="types publicList">
            <li>
                <span>发布类型</span>
                <p>{{sInformPopText}}</p>
            </li>
            <li>
                <span>状态</span>
                <p>{{sStatusPopText}}</p>
            </li>
        </ul>
        <ul class="timer publicList">
            <li>
                <span>是否紧急</span>
                <p>{{sUrgencyText}}</p>
            </li>
            <li>
                <span>截至时间</span>
                <p>{{dateTime}}</p>
            </li>
        </ul>
        <ul class="organization publicList">
            <li>
                <span>发布组织</span>
                <p>{{sPublishText[0]}}</p>
            </li>
            <li>
                <span>接收组织</span>
                <!-- <p><input type="text" placeholder="请填写"></p> -->
                <p>已选择</p>
            </li>
        </ul>
        


        <div class="abstract publicContent">
            <span>摘要</span>
            <p>{{sAbstractText}}</p>
        </div>
        <div class="content">
            <span>内容已被后台编辑，不能查看</span>
        </div>


	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
import { DatetimePicker } from 'mint-ui';
import moment from 'moment'
import Vue from "vue";

Vue.component(DatetimePicker.name, DatetimePicker);
export default {
	
    name: 'ExamineInform',
    data(){
        return {
            getnEschoolUrl:this.$store.state.eschool,
            sInformTle:'',
            sInformPopText:'',
            sStatusPopText:'',
            sUrgencyText:'',
            dateTime:'',
            sPublishText:'',
            sReceptionText:[],
            sAbstractText:"",
        }
    },
    components:{
        // 组件实例化
    },
    mounted(){
    },
    created(){
        document.title="查看通知公告";
        document.body.style.background = "#F8F8F8";
        const that = this;
        that
            .$http({
                method: "GET",
                url: that.getnEschoolUrl + "api/announcement/v0.1/announcements/"+sessionStorage.compileId+"/detail ",
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId
                },
            })
            .then(function(response) {
                console.log(response)
                that.sInformTle = response.data.title;

                if(response.data.type == 1)
                {
                    that.sInformPopText = "通知"
                }
                else if(response.data.type == 2){
                    that.sInformPopText = "公告"
                }

                if(response.data.status == 1)
                {
                    that.sStatusPopText = "启用"
                }
                else if(response.data.status == 2){
                    that.sStatusPopText = "停用"
                }

                if(response.data.urgency == 1)
                {
                    that.sUrgencyText = "是"
                }
                else if(response.data.urgency == 2){
                    that.sUrgencyText = "不是"
                }
                that.dateTime = response.data.urgencyDeadline;
                that.sPublishText = [];
                that.sPublishText.push(response.data.name)
                that.sPublishText.push(response.data.groupId)
                that.sReceptionText = [];
                for (let index = 0; index < response.data.receiveGroups.length; index++) {
                    const element = response.data.receiveGroups[index];
                    that.sReceptionText.push(element.groupId)
                }
                that.sAbstractText = response.data.digest;
            })
            .catch(function(error) {
                console.log(error);
            });
        that.common.setingTtitle('查看通知公告')

    },
    methods: {

    },
}
</script>

<style lang="scss" scoped="">
#ExamineInform{
    .tle{
        background: #fff;
        padding:  0 .32rem;
        height: .96rem;
        display: flex;
        align-items: center;
        margin-top: .2rem;
        span{
            font-size: .32rem;
            width: 2rem;
            color: #333333;
        }
        p{
            flex: 1;
            overflow: hidden;
            input{
                font-size: .32rem;
                width: 100%;
                line-height: .6rem;
            }
        }
    }
    .publicList{
        margin-top: .2rem;
        li{
            padding:  0 .32rem;
            height: .96rem;
            background: #fff url('../assets/images/icon_arrowsR3.png') right .32rem center/.4rem no-repeat;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            align-items: center;
            span{
                font-size: .32rem;
                width: 2rem;
                color: #333333;
            }
            p{
                flex: 1;
                font-size: .32rem;
                overflow: hidden;
                color: #333333;
                text-align: right;
                padding-right: .48rem;
                input{
                    font-size: .32rem;
                    width: 100%;
                    text-align: right;
                    background: none;
                    line-height: .6rem;
                }
                a{
                    color: #999999;
                }
            }
            &:last-of-type{
                border: 0;
            }
        }
    }
    .upload{
        margin-top: .2rem;
        padding: 0 .32rem .32rem;
        background: #fff;
        p{
            font-size: .24rem;
            padding: .32rem 0 .12rem;
            color: #999999;
        }  
        .uploadContent{
            overflow: hidden;
            ul{
                float: left;
                display: flex;
                padding-top: .2rem;
                li{
                    width: 1.6rem;
                    border: 1px solid #e0e0e0;
                    height: 1.6rem;
                    margin-right: .5rem;
                    position: relative;
                    span{
                        overflow: hidden;
                        img{
                            height: 100%;
                        }
                    }
                    i{
                        position: absolute;
                        right: -.2rem;
                        top: -.2rem;
                        width: .4rem;
                        height: .4rem;
                    }
                    
                    
                }
            }
            div{
                float: left;
                width: 1.6rem;
                height: 1.6rem;
                margin-top: .2rem;
                border: 2px dashed #e0e0e0;
                box-sizing: border-box;
                line-height: 1.4rem;
                text-align: center;
                font-size: .72rem;
                color: #e0e0e0;
                position: relative;
                input{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    opacity: 0;
                }
            }
        }
        
    }
    .publicContent{
        margin-top: .2rem;
        padding: .3rem .32rem;
        background: #fff;
        display: flex;
        span{
            width: 2rem;
            font-size: .32rem;
            color: #333333;
        }
        p{
            flex: 1;
            font-size: .32rem;
            height: 2rem;
            
        }
    }
    .content{
        margin-top: .2rem;
        padding: .3rem .32rem;
        background: #fff;
    }
        
    
}
  
  

</style>  


