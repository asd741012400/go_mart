<template>
	<div id="ConnectList">
		<div class="header">
            <div>
                <span class="left"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>值班交接</p>
            <div>
                <span class="left"><img src="../assets/images/icon_screen.png" alt=""></span>
                <span><img src="../assets/images/icon_new.png" alt=""></span>
            </div>
        </div>
        <div class="ConnectList_header">
            <p class="active">
                <span>交班</span>
                <em></em>
            </p>
            <p>
                <span>接班</span>
                <em></em>
            </p>
        </div>
        <ul class="connect_deal">
            <li>
                <b>交</b>
                <div>
                    <time>10月</time>
                    <p>接班人：张晓</p>
                </div>
                <span>已撤销</span>
            </li>
            <li>
                <b>交</b>
                <div>
                    <time>10月</time>
                    <p>接班人：张晓</p>
                </div>
                <span>已撤销</span>
            </li>
            <li>
                <b>交</b>
                <div>
                    <time>10月</time>
                    <p>接班人：张晓</p>
                </div>
                <span>已撤销</span>
            </li>
        </ul>
        <ul class="connect_join">
            <li>
                <b>接</b>
                <div>
                    <time>10月</time>
                    <p>接班人：张晓</p>
                </div>
                <a><img src="../assets/images/icon_arrowsR3.png" alt=""></a>
            </li>
            <li>
                <b>接</b>
                <div>
                    <time>10月</time>
                    <p>接班人：张晓</p>
                </div>
                <a><img src="../assets/images/icon_arrowsR3.png" alt=""></a>
            </li>
            <li>
                <b>接</b>
                <div>
                    <time>10月</time>
                    <p>接班人：张晓</p>
                </div>
                <a><img src="../assets/images/icon_arrowsR3.png" alt=""></a>
            </li>
        </ul>

        <div class="screen_pop_bg" style="display: none;">
            <div class="screen_pop">
                <div class="title">
                    <h3>筛选条件</h3>
                    <span><img src="../assets/images/icon_close2.png" alt=""></span>
                </div>
                <div class="timer">
                    <h4>时间范围</h4>
                    <div>
                        <p @click.stop="openPicker(0)" data-index="0">
                            <mt-datetime-picker
                                type="date"
                                ref="picker"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                @confirm="handleConfirm"
                                @cancel="closeConfirm"
                                :startDate="startDate">
                            </mt-datetime-picker>
                            {{startTime}}
                            <a v-if="startTime == ''">请选择</a>
                        </p>
                        <span></span>
                        <p @click.stop="openPicker(1)"  data-index="1">
                            <mt-datetime-picker
                                type="date"
                                ref="picker"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                @confirm="handleConfirm"
                                @cancel="closeConfirm"
                                :startDate="startDate">
                            </mt-datetime-picker>
                            {{endTime}}
                            <a v-if="endTime == ''">请选择</a>
                        </p>
                    </div>
                </div>
                <div class="status">
                    <h4>交班状态</h4>
                    <div>
                        <p class="active">进行中</p>
                        <p>进行中</p>
                        <p>进行中</p>
                        <p>进行中</p>
                        <p>进行中</p>
                    </div>
                </div>
                <div class="click_btn">
                    <p class="reset_btn">重置</p>
                    <p class="confirm_btn">确定</p>
                </div>
            </div>
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
    name: 'ConnectList',
    data(){
        return {
            startTime:"",
            endTime:"",
            tabTime:"",
            startDate: new Date(),
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
        openPicker (num) {
            this.$refs.picker.open()
            console.log(num)
            this.tabTime = num
        },

        //点击确定按钮
        handleConfirm (data) {
            let date = moment(data).format('YYYY.MM.DD')
            
            this.dateTime = date
            const that = this;
            if(that.tabTime == 0)
            {
                this.startTime = date
            }
            else if(that.tabTime == 1)
            {
                this.endTime = date
            }
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

    },
}
</script>

<style lang="scss" scoped="">
/*@import ''*/ 
#ConnectList{
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
        }
        p{
            flex: 1;
            text-align: center;
            font-size: .36rem;
            font-weight: bold;
            color: #333333;
        }
    }
    .ConnectList_header{
        position: fixed;
        top: .88rem;
        border-top: 1px solid #E4E9EC;
        border-bottom: 1px solid #E4E9EC;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: .96rem;
        background: #fff;
        p{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            height: .96rem;
            span{
                font-size: .32rem;
                color: #A3B5C7;
            }
            em{
                width: .32rem;
                height: 2px;
                background: #03A9F4;
                display: none;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -.16rem;
            }
            &.active{
                span{
                    color: #03A9F4;
                }
                em{
                    display: block;
                }
            }
        }
    }
    ul{
        padding-top: 1.84rem;
        display: none;
        li{
            background: #fff;
            display: flex;
            align-items: center;
            justify-items: center;
            padding: .32rem;
            margin-bottom: .2rem;
            b{
                width: .96rem;
                height: .96rem;
                background: #03A9F4;
                border-radius: 4px;
                font-size: .32rem;
                color: #fff;
                line-height: .96rem;
                text-align: center;
            }
            div{
                margin-left: .32rem;
                color: #999999;
                font-size: .26rem;
                flex: 1;
                time{
                    color: #333333;
                    font-size: .32rem;
                    padding-bottom: .16rem;
                }
                span{
                    font-size: .28rem;
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
            a{
                width: .5rem;
                overflow: hidden;
            }
        }
    }
    .screen_pop_bg{
        position: fixed;
        top: 0;
        width: 100%;
        background:rgba(0,0,0,0.48);
        height: 100%;
        .screen_pop{
            background: #fff;
            .title{
                height: .96rem;
                display: flex;
                align-items: center;
                padding: 0 .32rem;
                justify-content: center;
                h3{
                    flex: 1;
                    font-size: .36rem;
                    color: #333333;
                }
                span{
                    width: .44rem;
                }
            }
            .timer{
                padding: .32rem .32rem 0;
                h4{
                    font-size: .28rem;
                    color: #333333;
                }
                div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: .3rem;
                    p{
                        width: 3.1rem;
                        height: .84rem;
                        border:1px solid #DDDDDD;
                        border-radius: 2px;
                        text-align: center;
                        line-height: .84rem;
                        background: #F8F8F8;
                        font-size: .24rem;
                        color: #999;
                    }
                    span{
                        flex: 1;
                        border-top: 1px solid #ddd;
                        margin: 0 .14rem;
                    }
                }
            }
            .status{
                padding: .46rem .32rem 0;
                h4{
                    font-size: .28rem;
                    color: #333333;
                }
                div{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content:space-between;
                    p{
                        width: 1.52rem;
                        height: .84rem;
                        text-align: center;
                        line-height: .84rem;
                        background: #F8F8F8;
                        border:1px solid #DDDDDD;
                        border-radius: 2px;
                        margin-top: .28rem;
                        color: #999;
                        &.active{
                            border:1px solid #03A9F4;
                            color: #03A9F4;
                        }
                    } 
                }
            }
            .click_btn{
                margin-top: 1rem;
                border-top:1px solid #DDDDDD;
                display: flex;
                align-items: center;
                justify-content: center;
                p{
                    flex: 1;
                    text-align: center;
                    line-height: .88rem;
                    font-size: .36rem;
                    color: #A3B5C7;
                    &.confirm_btn{
                        background: #03A9F4;
                        color: #fff;
                    }
                }
            }
        }
    }
    
}

</style>

<style>
.mint-datetime-picker{
    width: 100%;
}

</style>