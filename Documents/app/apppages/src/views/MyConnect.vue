<template>
	<div id="MyConnect">
		<div class="header">
            <div>
                <span class="left"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>我的交班</p>
            <div>
                <a @click="messageBox">提交</a>
            </div>
        </div>
        <ul class="margin_ul">
            <li>
                <span>交班时间</span>
                <p @click.stop="openPicker">
                    <mt-datetime-picker
                        type="datetime"
                        ref="picker"
                        @confirm="handleConfirm"
                        @cancel="closeConfirm"
                    >
                    </mt-datetime-picker>
                    {{dateTime}}
                    <a v-if="dateTime == ''">请选择</a>
                </p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
            <li>
                <span>接班人</span>
                <p>
                   
                    <a>请选择</a>
                </p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
        </ul>
        <ul>
            <li>
                <span>值班班级</span>
                <p><a>请选择</a></p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
            <li>
                <span>值班宿舍</span>
                <p><a>请选择</a></p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
            <li>
                <span>值班楼层</span>
                <p><a>请选择</a></p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
            <li>
                <span>值班区域</span>
                <p><a>请选择</a></p>
                <em><img src="../assets/images/icon_arrowsR3.png" alt=""></em>
            </li>
        </ul>

        <div class="publicContent">
            <span>备注信息</span>
            <p><textarea placeholder="一切正常，无异常情况…"></textarea></p>
        </div>

        <div class="upload">
            <p>最多可上传6张图片</p>
            <div class="uploadContent">
                <ul>
                    <li v-if="imgDataUrl.length>0" v-for='(item ,index ) in imgDataUrl'>
                        <span><img :src="item" alt=""></span>
                        <i @click="removeImgs(index)"><img src="../assets/images/icon_close.png" alt=""></i>
                    </li>
                </ul>
                <div v-show="imgDataUrl.length>=3 ? false : true">
                    +
                    <input id="upload" name="files" type="file" accept="image/*" multiple  @change='addImgs($event)' />
                </div>
            </div>
        </div>
        <div class="picker_div">
            <div>
                <mt-picker :slots="slots" :show-toolbar="true" >
                    <a @click="handleConfirm" class="cancel">取消</a>
                    <a @click="handleConfirm" class="sure">确认</a>
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
    name: 'MyConnect',
    data(){
        return {
            dateTime:"",
            startDate: new Date(),
            imgDataUrl:[],
            slots:[{values: ['年假', '事假', '病假', '婚假', '其他']}]
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
        openPicker () {
            this.$refs.picker.open()
        },
        //点击确定按钮
        handleConfirm (data) {
            let date = moment(data).format('YYYY.MM.DD HH:MM')
            this.dateTime = date
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


         //上传图片
        addImgs(event){
            let files = document.getElementById("upload").files
            const that = this;
            var num = that.imgDataUrl.length+files.length;
            var image = new FormData()
            if(num <= 6)
            {
                for (let index = 0; index < files.length; index++) {
                    that.getObjectURL(files[index])
                }
            }
            else
            {
                alert("最多可上传3张图片")
            }
        },

         //图片转换格式
        getObjectURL (file) {
            let that = this;
            var reader = new FileReader();

            reader.readAsDataURL(file)
            reader.onloadend = function(e){
                that.imgDataUrl.push(this.result)
                that.imgDataFile.push(file)
            }
        },

        //删除图片
        removeImgs(index){
            const that = this;
            that.imgDataUrl.splice(index,1)
            that.imgDataFile.splice(index,1)
            // console.log(index)
        },

        onValuesChange(picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
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
/*@import ''*/ 
#MyConnect{
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
        margin-top:1.08rem;
    }
    ul{
        margin-top: .2rem;
        li{
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 .32rem;
            height: .96rem;
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
        display: none;
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

