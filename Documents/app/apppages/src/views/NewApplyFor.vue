<template>
	<div id="NewApplyFor">
		<div class="header">
            <div>
                <span class="left" @click="webHistory"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span @click="webClose"><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>新建调班申请</p>
            <div>
                <a @click="messageBox">确认</a>
            </div>
        </div>
        <ul class="margin_ul">
            <li>
                <span>调班时间</span>
                <p @click.stop="openPicker('startTime')">
                    <mt-datetime-picker
                        type="datetime"
                        ref="picker"
                        @confirm="handleConfirm"
                        @cancel="closeConfirm"
                        :startDate="startDate"
                    >
                    </mt-datetime-picker>
                    {{startTime}}
                    <a v-if="startTime == undefined">请选择</a>
                </p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
            <li>
                <span>值班类型</span>
                <p @click="pickerShow">
                    {{pickerType}}
                    <a v-if="pickerType == undefined">请选择</a>
                </p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
            <li>
                <span>详细地点</span>
                <p>
                    <input type="text" placeholder="请输入" v-model="siteStr">
                </p>
            </li>
        </ul>
        <ul>
            <li>
                <span>被调人</span>
                <p @click="theJumpPage('SelectApplyFor')">
                    <a v-if="receive == undefined">请选择</a>
                    <a v-else>{{receive.name}}</a>
                </p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
            <li>
                <span>被调时间</span>
                <p @click.stop="openPicker('endTime')">
                    <mt-datetime-picker
                        type="datetime"
                        ref="picker"
                        @confirm="handleConfirm"
                        @cancel="closeConfirm"
                        :startDate="startDate"
                    >
                    </mt-datetime-picker>
                    {{endTime}}
                    <a v-if="endTime == undefined">请选择</a>
                </p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
        </ul>
        <ul>
            <li>
                <span>指定审核人</span>
                <p @click="theJumpPage('Nominator')">
                    <a v-if="audit == undefined">请选择</a>
                    <a v-else>{{audit.name}}</a>
                </p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
        </ul>
        <div class="picker_div" v-if="pickerDiv">
            <div>
                <mt-picker :slots="slots" :show-toolbar="true" @change="onValuesChange">
                    <a @click="cancelPicker" class="cancel">取消</a>
                    <a @click="handlePicker" class="sure">确认</a>
                </mt-picker>
            </div>
        </div>

	</div>


    
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
import { DatetimePicker , Picker , MessageBox} from 'mint-ui';
import moment from 'moment'
import Vue from "vue";

Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'NewApplyFor',
    data(){
        return {
            startTime:this.$store.state.startTime,
            endTime:this.$store.state.endTime,
            startDate: new Date(),
            timeIndex:"",
            siteStr:this.$store.state.siteStr,
            audit:this.$store.state.audit,
            receive:this.$store.state.receive,
            slots:[{values: ["班级考勤","值班查宿","楼层巡查","区域巡查"]}],
            pickerDiv:false,
            pickerTypeStr:"",
            pickerType:this.$store.state.pickerType,
        }
    },
    components:{
        // 组件实例化
    },
 
    mounted(){
    },
    created(){
		// document.title = "值班交接";
    	document.body.style.background = "#f8f8f8";
        const that = this;
        // that.common.setingTtitle('值班交接')
    },
    methods: {
        //开启时间选择器
        openPicker (str) {
            
            this.timeIndex = str
            this.$refs.picker.open()
        },
        //点击确定按钮
        handleConfirm (data) {
            let date = moment(data).format('YYYY-MM-DD HH:MM')
            if(this.timeIndex == "startTime")
            {
                this.startTime = date
            }
            else
            {
                this.endTime = date
            }
            const that = this;
            Vue.nextTick(function () {
                that.$refs.picker.close();
            });
            
        },

        //点击取消按钮
        closeConfirm(){
            const that = this;
            Vue.nextTick(function () {
                that.$refs.picker.close();
            });
        },


        onValuesChange(picker, values) {
            if (values[0] > values[1]) {
                console.log(picker.setSlotValue(1, values[0]))
            }
            this.pickerTypeStr = values[0]
        },
        messageBox(){
            const that = this;
            MessageBox.confirm('', { 
                message: '立即提交申请', 
                title: '', 
            }).then(action => {
                var startTime = that.startTime;
                var endTime = that.endTime;
                var siteStr = that.siteStr;
                var audit = that.audit;
                var receive = that.receive;
                var pickerType = that.pickerType;
                var pickerTypeStr = "";
                




                if(startTime != undefined && endTime != undefined && siteStr != undefined && audit != undefined && receive != undefined && pickerType != undefined)
                {

                    startTime = startTime.split(' ')[0];
                    endTime = endTime.split(' ')[0];
                    switch (pickerType) {
                        case "区域巡查":
                            pickerTypeStr = 0;
                            break;
                        case "楼层巡查":
                            pickerTypeStr = 1;
                            break;
                        case "班级考勤":
                            pickerTypeStr = 2;
                            break;  
                        case "值班查宿":
                            pickerTypeStr = 3;
                            break;  
                        default:
                            break;
                    }

                    const formData = {
                        account_id:sessionStorage.account_id,
                        applytime:startTime,
                        applytype:pickerTypeStr,
                        applyaddress:siteStr,
                        receive_id:receive.account_id,
                        receive_name:receive.name,
                        receive_time:endTime,
                        audit_id:audit.account_id,
                        audit_name:audit.name,
                    };

                    that.$http.post('/api/shiftApply',formData,{
                        headers: {
                            accessToken:sessionStorage.accessToken,
                            schoolId:sessionStorage.schoolId,
                            "Content-Type":"application/json"
                        }
                    })
                    .then(response=>{
                        MessageBox.alert('', { 
                            message: response.data.errorMsg, 
                            title: '', 
                        }).then(action => {

                            if(response.data.status == 200)
                            {
                                history.go(-1) 
                            }
                        })
                        
                        console.log(response)
                    })  
                    .catch(function(error) {
                        console.log(error);
                    });
                }
                else
                {
                    MessageBox.alert('', { 
                        message: '请填写完整资料', 
                        title: '', 
                    })
                }
            });
        },

        webClose(){
            closeWeb()
        },
        webHistory(){
            history.go(-1) 
        },

        pickerShow(){
            this.pickerDiv = true;
        },
        cancelPicker(){
            this.pickerDiv = false;
        },
        handlePicker(){
            this.pickerType = this.pickerTypeStr 
            this.pickerDiv = false;
        },
        theJumpPage(str){
            const that = this;
          
            if(that.startTime != undefined)
            {
                that.$store.state.startTime = that.startTime;
                that.$store.state.pickerType = that.pickerType;
                that.$store.state.endTime = that.endTime;
                that.$store.state.siteStr = that.siteStr;
                that.$router.push({
                    name: str
                });
            }
            else
            {
                MessageBox.alert('', { 
                    message: '请选择调班时间', 
                    title: '', 
                })
            }
            
        }

    },
}
</script>

<style lang="scss" scoped="">
/*@import ''*/ 
#NewApplyFor{
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
    .margin_ul{
        padding-top:1.08rem;
    }
    ul{
        padding-top: .2rem;
        li{
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 .32rem;
            height: .96rem;
            border-bottom: 1px solid #E4E9EC;
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
                a{
                    color: #999999;
                }
                input{
                    width: 100%;
                    height: 100%;
                    text-align: right;
                }
            }
            em{
                font-style: normal;
                width: .5rem;
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
            textarea{
                width: 100%;
                height: 2rem;
                font-size: .32rem;
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
                flex-wrap: wrap;
                li{
                    width: 1.6rem;
                    border: 1px solid #e0e0e0;
                    height: 1.6rem;
                    margin-right: .5rem;
                    position: relative;
                    margin-bottom: .2rem;
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
    .picker_div{
        position: fixed;
        top: 0;
        background: rgba(0, 0, 0, .5);
        width: 100%;
        height: 100%;
        div{
            background: #fff;
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    }
}

</style>

<style lang="scss">
.picker{
    .picker-toolbar{
        display: flex;
        justify-content:space-between;
        align-items: center;
        border-bottom:1px solid #ddd;
        padding:0 .32rem;
        a{
            font-size: .36rem;
            &.sure{
                color:#03A9F4;
            }
        }
    }
}
</style>

