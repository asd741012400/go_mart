<template>
	<div id="AddInform">
        <div class="tle">
            <span>标题</span>
            <p><input type="text" placeholder="请填写（必填）不超过20字" v-model="sInformTle"></p>
        </div>
        <ul class="types publicList">
            <li @click="informPop">
                <span>发布类型</span>
                <p>{{sInformPopText}}<a v-if="sInformPopText == ''">请选择（必填)</a></p>
            </li>
            <li @click="statusPop">
                <span>状态</span>
                <p>{{sStatusPopText}}<a v-if="sStatusPopText == ''">请选择（必填)</a></p>
            </li>
        </ul>
        <ul class="timer publicList">
            <li @click="urgencyPop">
                <span>是否紧急</span>
                <p>{{sUrgencyText}}<a v-if="sUrgencyText == ''">请选择（必填)</a></p>
            </li>
            <li>
                <span>截止时间</span>
                <p @click.stop="openPicker">
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
                    {{dateTime}}
                    <a v-if="dateTime == ''">请选择（必填)</a>
                </p>
            </li>
        </ul>
        <ul class="organization publicList">
            <li @click="skipPages('PublishOrganization')">
                <span>发布组织</span>
                <p>{{sPublishText}}<a v-if="sPublishText == ''">请选择（必填)</a></p>
            </li>
            <li @click="skipPages('AcceptOrganization',1,'接收组织')">
                <span>接收组织</span>
                <!-- <p><input type="text" placeholder="请填写"></p> -->
                <p>
                    <a v-if="sReceptionText == ''">请选择</a>
                    <em v-else>已选择</em>
                </p>
            </li>
            <li @click="skipPages('AcceptOrganization',4,'接收班级')">
                <span>接收班级</span>
                <!-- <p><input type="text" placeholder="请填写"></p> -->
                <p>
                    <a v-if="sClassesText == ''">请选择</a>
                    <em v-else>已选择</em>
                </p>
            </li>
            <li @click="skipPages('AcceptOrganization',3,'接收老师')">
                <span>接收老师</span>
                <!-- <p><input type="text" placeholder="请填写"></p> -->
                <p>
                    <a v-if="sTeachersText == ''">请选择</a>
                    <em v-else>已选择</em>
                </p>
            </li>
            <li @click="skipPages('AcceptOrganization',2,'接收学生')">
                <span>接收学生</span>
                <!-- <p><input type="text" placeholder="请填写"></p> -->
                <p>
                    <a v-if="sStudentsText == ''">请选择</a>
                    <em v-else>已选择</em>
                </p>
            </li>
        </ul>
        <!-- <div class="upload">
            <p>最多可上传3张图片</p>
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
        </div> -->
        <div class="abstract publicContent">
            <span>摘要</span>
            <p><textarea placeholder="需通知接受组织请输入摘要内容，如不需通知可不填写。" v-model="sAbstractText"></textarea></p>
        </div>
        <div class="content publicContent">
            <span>内容</span>
            <p><textarea placeholder="在此输入需要通知或公告的内容" v-model="sContentText"></textarea></p>
        </div>

        <div class="submitBtn" @click="submitBtnFun"><div>提交</div></div>


        <div class="popBg" v-if="sPopBg" @click="PopBg()">
            <div class="popContent" :class="sPublish ? 'center' : 'bottom'">
                 <div class="informPop cancel" v-if="sInformPop" @click.stop="popContent" id="informPop">
                    <div>
                        <a>选择</a>
                        <span @click="informPopText('通知')">通知</span>
                        <b @click="informPopText('公告')">公告</b>
                    </div>
                    <p @click="PopBg()">取消</p>
                </div>
                <div class="statusPop cancel" v-if="sStatusPop" @click.stop="popContent()">
                    <div>
                        <a>选择</a>
                        <span @click="statusPopText('启用')">启用</span>
                        <b @click="statusPopText('停用')">停用</b>
                    </div>
                    <p @click="PopBg()">取消</p>
                </div>
                <div class="urgency cancel" v-if="sUrgency" @click.stop="popContent()">
                    <div>
                        <a>选择</a>
                        <span @click="urgencyText('是')">是</span>
                        <b @click="urgencyText('不是')">不是</b>
                    </div>
                    <p @click="PopBg()">取消</p>
                </div>
                <div class="publish selectPop" v-if="sPublish" @click.stop="popContent()">
                    <p>立即提交并发布</p>
                    <div>
                        <span @click="PopBg()">取消</span>
                        <a @click="submitInform">确定</a>
                    </div>
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

    name: 'AddInform',
    data(){
        return {
            getnEschoolUrl:this.$store.state.eschool,
            sInformTle:"",
            sPopBg:false,
            sInformPop:false,
            sInformPopText:"",
            sStatusPop:false,
            sStatusPopText:"",
            sUrgency:false,
            sUrgencyText:"",
            sPublish:false,
            imgDataUrl: [],
            imgDataFile:[],
            aImg:[],
            imgDataFileIndex:0,
            dateTime: '',
            startDate: new Date(),
            sPublishText:'',
            sPublishId:'',
            sReceptionText:'',
            sClassesText:'',
            sTeachersText:'',
            sStudentsText:'',
            sAbstractText:'',
            sContentText:'',
        }
    },
  
    components:{
        // 组件实例化
    },
   
    mounted(){
    },
    created(){
        document.title="新增通知公告";
        
        document.body.style.background = "#F8F8F8";
        const that = this;
        window.onscroll = null;
        if( that.$route.params.url == "InformList")
        {
            sessionStorage.removeItem('addInformTle');
            sessionStorage.removeItem('addInformPopText');
            sessionStorage.removeItem('addStatusPopText');
            sessionStorage.removeItem('addUrgencyText');
            sessionStorage.removeItem('addDateTime');
            sessionStorage.removeItem('addPublishText');
            sessionStorage.removeItem('addPublishId');
            sessionStorage.removeItem('addReceptionText');
            sessionStorage.removeItem('addClassesText');
            sessionStorage.removeItem('addTeachersText');
            sessionStorage.removeItem('addStudentsText');
            sessionStorage.removeItem('addAbstractText');
            sessionStorage.removeItem('addContentText');
            sessionStorage.removeItem('addImgDataUrl');
            sessionStorage.removeItem('addImgDataFile');
            sessionStorage.removeItem('addAnnouncementId');
            sessionStorage.removeItem("mergeType");
            sessionStorage.removeItem("titleText");

        }
        else
        {
            that.sInformTle = sessionStorage.addInformTle || "";
            that.sInformPopText = sessionStorage.addInformPopText || "";
            that.sStatusPopText = sessionStorage.addStatusPopText || "";
            that.sUrgencyText = sessionStorage.addUrgencyText || "";
            that.dateTime = sessionStorage.addDateTime || "";
            that.sPublishText = sessionStorage.addPublishText || "";
            that.sPublishId = sessionStorage.addPublishId || "";
            that.sReceptionText = sessionStorage.addReceptionText || "";
            that.sClassesText = sessionStorage.addClassesText || "";
            that.sTeachersText = sessionStorage.addTeachersText || "";
            that.sStudentsText = sessionStorage.addStudentsText || "";
            that.sAbstractText = sessionStorage.addAbstractText || "";
            that.sContentText = sessionStorage.addContentText || "";
            that.imgDataUrl = sessionStorage.addImgDataUrl || [];
            that.imgDataFile = sessionStorage.addImgDataFile || [];
            that.announcementId =  sessionStorage.addAnnouncementId || '';
        }
        that.common.setingTtitle('新增通知公告')
        
    },
    methods: {

       

        //发布类型弹窗
        informPop(){
            const that = this;
            that.sInformPop = !that.sInformPop;
            that.sInformPop ? that.sPopBg = true : that.sPopBg = false;
        },

        //状态弹窗
        statusPop(){
            const that = this;
            that.sStatusPop = !that.sStatusPop;
            that.sStatusPop ? that.sPopBg = true : that.sPopBg = false;
        },

        //是否紧急弹窗
        urgencyPop(){
            const that = this;
            that.sUrgency = !that.sUrgency;
            that.sUrgency ? that.sPopBg = true : that.sPopBg = false;
        },
        //弹窗蒙版
        PopBg(){
            const that = this;
            that.sPopBg = false;
            that.sInformPop = false;
            that.sStatusPop = false;
            that.sUrgency = false;
            that.sPublish = false;
        },
        //阻止冒泡
        popContent(e){
            return;
        },
        //发布类型文字赋值
        informPopText(text){
            const that = this;
            that.sInformPopText = text;
            that.sInformPop = !that.sInformPop;
            that.sInformPop ? that.sPopBg = true : that.sPopBg = false;
        },

        //状态文字赋值
        statusPopText(text){
            const that = this;
            that.sStatusPopText = text;
            that.sStatusPop = !that.sStatusPop;
            that.sStatusPop ? that.sPopBg = true : that.sPopBg = false;
        },

        //是否紧急赋值
        urgencyText(text){
            const that = this;
            that.sUrgencyText = text;
            that.sUrgency = !that.sUrgency;
            that.sUrgency ? that.sPopBg = true : that.sPopBg = false;
        },
        
        //上传图片
        addImgs(event){
            let files = document.getElementById("upload").files
            const that = this;
            var num = that.imgDataUrl.length+files.length;
            var image = new FormData()
            if(num <= 3)
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

        //开启时间选择器
        openPicker () {
            this.$refs.picker.open()
        },

        //点击确定按钮
        handleConfirm (data) {
            let date = moment(data).format('YYYY.MM.DD')
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

        //发布/接收阻止跳转页面
        skipPages(pages,mergeType,titleText){
            const that = this;
            sessionStorage.setItem("addInformTle", that.sInformTle);
            sessionStorage.setItem("addInformPopText", that.sInformPopText);
            sessionStorage.setItem("addStatusPopText", that.sStatusPopText);
            sessionStorage.setItem("addUrgencyText", that.sUrgencyText);
            sessionStorage.setItem("addDateTime", that.dateTime);
            sessionStorage.setItem("addPublishText", that.sPublishText);
            sessionStorage.setItem("addPublishId", that.sPublishId);
            sessionStorage.setItem("addReceptionText", that.sReceptionText);
            sessionStorage.setItem("addClassesText", that.sClassesText);
            sessionStorage.setItem("addTeachersText", that.sTeachersText);
            sessionStorage.setItem("addStudentsText", that.sStudentsText);
            sessionStorage.setItem("addAbstractText", that.sAbstractText);
            sessionStorage.setItem("addContentText", that.sContentText);
            sessionStorage.setItem("addAnnouncementId", that.announcementId);
            sessionStorage.setItem("addImgDataUrl", that.imgDataUrl);
            sessionStorage.setItem("addImgDataFile", that.imgDataFile);
            sessionStorage.setItem("mergeType", mergeType);
            sessionStorage.setItem("titleText", titleText);
            that.$router.push({
                name: pages,
                params:{
                    "pagesUrl":"AddInform",
                }
            });

        },

        //点击提交按钮
        submitBtnFun(){
            const that = this;

            if( that.sInformTle != "" && that.sInformTle.length <= 20 )
            {
                if( that.sInformPopText != "" )
                {
                    if( that.sStatusPopText != "" )
                    {
                        if( that.sUrgencyText != "" )
                        {
                            if( that.dateTime != "" )
                            {
                                if( that.sPublishText != "" )
                                {
                                    if( that.sReceptionText != "" ||  that.sClassesText != '' ||  that.sTeachersText != '' ||  that.sStudentsText != '')
                                    {
                                        if( that.sContentText != "" )
                                        {
                                            that.sPublish = !that.sPublish;
                                            that.sPublish ? that.sPopBg = true : that.sPopBg = false;
                                        }
                                        else
                                        {
                                            that.$alert('请填写内容', {
                                                confirmButtonText: '确定',
                                            });
                                        }
                                    }
                                    else
                                    {
                                        that.$alert('接收组织/班级/老师/学生至少选择一项', {
                                            confirmButtonText: '确定',
                                        });
                                    }
                                }
                                else
                                {
                                    that.$alert('请选择发布组织', {
                                        confirmButtonText: '确定',
                                    });
                                }
                            }
                            else
                            {
                                that.$alert('请选择截至时间', {
                                    confirmButtonText: '确定',
                                });
                            }
                        }
                        else
                        {
                            that.$alert('请选择是否紧急', {
                                confirmButtonText: '确定',
                            });
                        }
                    }
                    else
                    {
                        that.$alert('请选择状态', {
                            confirmButtonText: '确定',
                        });
                    }
                }
                else
                {
                    that.$alert('请选择类型', {
                        confirmButtonText: '确定',
                    });
                }
            }
            else
            {
                that.$alert('请填写标题，不能超过20字', {
                    confirmButtonText: '确定',
                });
            }
            
        },

        //确认提交按钮，查看有没有上传图片
        submitInform(){
            
            const that = this;
            const md5=require('md5-node');
            if(that.imgDataUrl.length == 0)
            {
                that.submitData()
            }
            else
            {

                const element = that.imgDataFile[that.imgDataFileIndex];
                var key = element.name.split('.'),
                type = key[key.length - 1];
                key[key.length - 1] = '';
                key = md5(key.join('.') + (new Date().getTime())) + '.' + type ;
                that
                    .$http({
                        method: "GET",
                        url: that.getnEschoolUrl + "api/cms/qiniu/v0.1/open/token",
                        headers: {
                            'Content-Type': 'multipart/form-data',  //之前说的以表单传数据的格式来传递fromdata
                            accessToken:sessionStorage.accessToken,
                            schoolId:sessionStorage.schoolId
                        },
                        params: {
                            key:key
                        }
                    })
                    .then(function(response) {
                        var formData = new FormData();
                        formData.append('file', element);
                        formData.append('token', response.data.uptoken);
                        formData.append('key', key);
                        that.getQiuNiuUrl(formData)
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                
                
            }
            // console.log(that.imgDataUrl.length)
        },

        getQiuNiuUrl(formData,num){
            
            const that = this;
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            }
            that.$http.post('http://upload.qiniu.com/',formData,config)
            .then(response=>{
                that.aImg.push(response.data.key)
                that.imgDataFileIndex = ++that.imgDataFileIndex;
                if(that.imgDataFileIndex < that.imgDataFile.length)
                {
                
                    that.submitInform()
                }
                else
                {
                    that.submitData(that.aImg)
                }
            })  
            .catch(function(error) {
                console.log(error);
            });

        },
        //提交数据
        submitData(img){
            const that = this;
            const qs=require('qs');
            that.sPublish = !that.sPublish;
            that.sPublish ? that.sPopBg = true : that.sPopBg = false;
            var title , content , digest ,type , status , groupId , urgency , urgencyDeadline , receiveGroups , pushStudent , pushTeacher , pushClass ;

            if(img == undefined)
            {
                img = "";
            }
            else
            {
                img = img.join(',')
            }
            
            title = that.sInformTle;
            content = that.sContentText;
            digest = that.sAbstractText;
            groupId = that.sPublishId;
            

    
            if( that.sReceptionText != "" )
            {
                receiveGroups = that.sReceptionText.split(',');
            }
            else
            {
                receiveGroups = []
            }
            if( that.sClassesText != "" )
            {
                pushClass = that.sClassesText.split(',');
            }
            else
            {
                pushClass = []
            }

            if( that.sTeachersText != "" )
            {
                pushTeacher = that.sTeachersText.split(',');
            }
            else
            {
                pushTeacher = []
            }

            if( that.sStudentsText != "" )
            {
                pushStudent = that.sStudentsText.split(',');
            }
            else
            {
                pushStudent = []
            }



            if(that.sInformPopText == "通知")
            {
                type = 1
            }
            else if(that.sInformPopText == "公告")
            {
                type = 2
            }

            if(that.sStatusPopText == "启用")
            {
                status = 1
            }
            else if(that.sStatusPopText == "停用")
            {
                status = 2
            }

            if(that.sUrgencyText == "是")
            {
                urgency = 1
            }
            else if(that.sUrgencyText == "不是")
            {
                urgency = 2
            }

            urgencyDeadline = that.dateTime.split('.');
            urgencyDeadline = urgencyDeadline.join('-')
            
          

            that
                .$http({
                    method: "POST",
                    url: that.getnEschoolUrl + "api/announcement/v0.1/appAnnouncements",
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    data: {
                        "announcementId":"",
                        "title":title,
                        "content":content,
                        "digest":digest,
                        "type":type,
                        "status":status,
                        "groupId":groupId,
                        "urgency":urgency,
                        "urgencyDeadline":urgencyDeadline+" 23:59",
                        "receiveGroups":receiveGroups,
                        "pushClass":pushClass,
                        "pushTeacher":pushTeacher,
                        "pushStudent":pushStudent,
                        "img":img
                    }
                })
                .then(function(response) {
                    that.imgDataFileIndex = 0;

                    that.$alert('提交成功', {
                        confirmButtonText: '确定',
                        callback: action => {
                            that.$router.push({
                                name: "InformList",
                            });
                        }
                    });
                    
                })
                .catch(function(error,a) {
                    that.imgDataFileIndex = 0;
                    that.$alert('提交失败，请刷新重试', {
                        confirmButtonText: '确定',
                    });
                });
           
            
            
        }
    },
}
</script>

<style lang="scss" scoped="">
#AddInform{
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
                em{
                    font-style: normal;
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
            textarea{
                width: 100%;
                height: 2rem;
                font-size: .32rem;
                border: 0;
            }
        }
    }
    .submitBtn{
        height: .96rem;
        margin: .2rem auto;
        text-align: center;
        line-height: .96rem;
        width: 100%;
        color: #fff;
        font-size: .32rem;
        div{
            margin: 0 .32rem;
            background: #409EFF;
            border-radius: 5px;
        }
    }
    .popBg{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.40);
        top: 0;
        left: 0;
        .popContent{
            display: flex;
            justify-content: center;
            position: absolute;
            width: 100%;
            height: 100%;
            &.bottom{
                align-items: flex-end;
            }
            &.center{
                align-items: center;
            }
            .cancel{
                width: 100%;
                div{
                    background: #fff;
                    margin: 0 .32rem;
                    display: flex;
                    flex-direction: column;
                    border-radius:12px; 
                    a{
                        line-height: .9rem;
                        font-size: .26rem;
                        color: #8F8E94;
                        text-align: center;
                    }
                    span{
                        line-height: 1.14rem;
                        font-size: .4rem;
                        color: #0076FF;
                        text-align: center;
                        border-top: 1px solid #EEEEEE;
                    }
                    b{
                        line-height: 1.08rem;
                        font-size: .4rem;
                        color: #0076FF;
                        text-align: center;
                        border-top: 1px solid #EEEEEE;
                        font-weight: normal;
                    }
                }
                p{
                    background: #fff;
                    margin: 0.2rem .32rem;
                    border-radius:12px; 
                    line-height: 1.14rem;
                    font-size: .4rem;
                    color: #0076FF;
                    text-align: center;
                    font-weight: bold;
                }
            }
            .selectPop{
                width: 5.4rem;
                background: #fff;
                border-radius: 13px;
                p{
                    font-size: .34rem;
                    font-weight: bold;
                    text-align: center;
                    padding: .38rem 0;  
                }
                div{
                    border-top: 1px solid #e0e0e0;
                    line-height: .88rem;
                    display: flex;
                    span{
                        flex:1;
                        text-align: center;
                        font-size: .34rem;
                        color: #007AFF;
                        border-right: 1px solid #e0e0e0;
                    }
                    a{
                        flex:1;
                        text-align: center;
                        font-size: .34rem;
                        color: #007AFF;
                    }
                }
            }
            
        }
    }
}
  
  

</style>  

<style>
.el-message-box{
    width: 80%;
}
</style>

