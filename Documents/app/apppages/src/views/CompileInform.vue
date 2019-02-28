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

        <div class="compileBtn">
            <span @click="compileSave">保存</span>
            <p @click="compileDelete">删除</p>
        </div>

        <div class="popBg" v-if="sPopBg" @click="PopBg()">
            <div class="popContent" :class="sSave || sDelete? 'center' : 'bottom'">
                <div class="informPop cancel" v-if="sInformPop" @click.stop="popContent()">
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
                <div class="save selectPop" v-if="sSave" @click.stop="popContent()">
                    <p>立即保存</p>
                    <div>
                        <span @click="PopBg()">取消</span>
                        <a @click="cpmpileInform">确定</a>
                    </div>
                </div>
                <div class="delete selectPop" v-if="sDelete" @click.stop="popContent()">
                    <p>删除本条通知公告</p>
                    <div>
                        <span @click="PopBg()">取消</span>
                        <a @click="deleteInform">确定</a>
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
            sPublishId:"",
            sReceptionText:'',
            sClassesText:'',
            sTeachersText:'',
            sStudentsText:'',
            sAbstractText:'',
            sContentText:'',
            sSave:false,
            sDelete:false,
            announcementId:""
        }
    },
  
    components:{
        // 组件实例化
    },
    
   
    mounted(){
    },
    created(){
        document.title="编辑通知公告";
        document.body.style.background = "#F8F8F8";
        const that = this;
        window.onscroll = null;
        if(that.$route.params.id)
        {
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

                    sessionStorage.removeItem("sInformTle");
                    sessionStorage.removeItem("sInformPopText");
                    sessionStorage.removeItem("sStatusPopText");
                    sessionStorage.removeItem("sUrgencyText");
                    sessionStorage.removeItem("dateTime");
                    sessionStorage.removeItem("sPublishText");
                    sessionStorage.removeItem("sPublishId");
                    sessionStorage.removeItem("sReceptionText");
                    sessionStorage.removeItem("sClassesText");
                    sessionStorage.removeItem("sTeachersText");
                    sessionStorage.removeItem("sStudentsText");
                    sessionStorage.removeItem("sAbstractText");
                    sessionStorage.removeItem("sContentText");
                    sessionStorage.removeItem("announcementId");
                    sessionStorage.removeItem("imgDataUrl");
                    sessionStorage.removeItem("imgDataFile");
                    sessionStorage.removeItem("mergeType");    
                    sessionStorage.removeItem("titleText")
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
                    that.sPublishText = response.data.name;
                    that.sPublishId = response.data.groupId;

                    
                    that.sReceptionText = [];
                    for (let index = 0; index < response.data.receiveGroups.length; index++) {
                        const element = response.data.receiveGroups[index];
                        that.sReceptionText.push(element.groupId)
                    }
                    that.sClassesText = [];
                    for (let index = 0; index < response.data.pushClass.length; index++) {
                        const element = response.data.pushClass[index];
                        that.sClassesText.push(element.classId)
                    }
                    that.sTeachersText = [];
                    for (let index = 0; index < response.data.pushTeacher.length; index++) {
                        const element = response.data.pushTeacher[index];
                        that.sTeachersText.push(element.accountId)
                    }
                    that.sStudentsText = [];
                    for (let index = 0; index < response.data.pushStudent.length; index++) {
                        const element = response.data.pushStudent[index];
                        that.sStudentsText.push(element.accountId)
                    }
                    that.sAbstractText = response.data.digest;
                    that.sContentText = response.data.content;
                    that.announcementId =  response.data.id;
                })
                .catch(function(error) {
                    console.log(error);
                });

            
            
        }
        else
        {
            that.sInformTle = sessionStorage.sInformTle || "";
            that.sInformPopText = sessionStorage.sInformPopText || "";
            that.sStatusPopText = sessionStorage.sStatusPopText || "";
            that.sUrgencyText = sessionStorage.sUrgencyText || "";
            that.dateTime = sessionStorage.dateTime || "";
            that.sPublishText = sessionStorage.sPublishText || "";
            that.sPublishId = sessionStorage.sPublishId || "";
            that.sReceptionText = sessionStorage.sReceptionText || "";
            that.sClassesText = sessionStorage.sClassesText || "";
            that.sTeachersText = sessionStorage.sTeachersText || "";
            that.sStudentsText = sessionStorage.sStudentsText || "";
            that.sAbstractText = sessionStorage.sAbstractText || "";
            that.sContentText = sessionStorage.sContentText || "";
            that.imgDataUrl = sessionStorage.imgDataUrl || [];
            that.imgDataFile = sessionStorage.imgDataFile || [];
            that.announcementId =  sessionStorage.announcementId || '';
        }
        
        that.common.setingTtitle('编辑通知公告')

        
    },
    methods: {

        submitBtnFun(){
            const that = this;
            that.sSave = false;
            that.sPopBg = false;
            
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
                                            that.submitData()
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

       //删除通知/公告
       deleteInform(){
           const that = this;
           that
                .$http({
                    method: "DELETE",
                    url: that.getnEschoolUrl + "api/announcement/v0.1/announcements/"+sessionStorage.compileId,
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                })
                .then(function(response) {
                    console.log(response)
                    if(response.data.result)
                    {
                        that.$alert('删除成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                that.$router.push({
                                    name: "InformList",
                                });
                            }
                        });
                        
                    }
                    else
                    {
                        that.$alert('删除失败，请刷新重试', {
                            confirmButtonText: '确定',
                        });
                    }
                    
                })
                .catch(function(error) {
                    console.log(error);
                });
       },

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
            that.sSave = false;
            that.sDelete = false;
        },
        //阻止冒泡
        popContent(){
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
            sessionStorage.setItem("sInformTle", that.sInformTle);
            sessionStorage.setItem("sInformPopText", that.sInformPopText);
            sessionStorage.setItem("sStatusPopText", that.sStatusPopText);
            sessionStorage.setItem("sUrgencyText", that.sUrgencyText);
            sessionStorage.setItem("dateTime", that.dateTime);
            sessionStorage.setItem("sPublishText", that.sPublishText);
            sessionStorage.setItem("sPublishId", that.sPublishId);
            sessionStorage.setItem("sReceptionText", that.sReceptionText);
            sessionStorage.setItem("sClassesText", that.sClassesText);
            sessionStorage.setItem("sTeachersText", that.sTeachersText);
            sessionStorage.setItem("sStudentsText", that.sStudentsText);
            sessionStorage.setItem("sAbstractText", that.sAbstractText);
            sessionStorage.setItem("sContentText", that.sContentText);
            sessionStorage.setItem("announcementId", that.announcementId);
            sessionStorage.setItem("imgDataUrl", that.imgDataUrl);
            sessionStorage.setItem("imgDataFile", that.imgDataFile);
            sessionStorage.setItem("mergeType", mergeType);
            sessionStorage.setItem("titleText", titleText);
            that.$router.push({
                name: pages,
                params:{
                    "pagesUrl":"CompileInform",
                }
            });
        },

      
        //确认提交按钮，查看有没有上传图片
        cpmpileInform(){
            
            const that = this;
            const md5=require('md5-node');
            if(that.imgDataUrl.length == 0)
            {
                that.submitBtnFun()
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
                img = '';
            }
            else
            {
                img = img.join(',')
            }
            
            title = that.sInformTle;
            content = that.sContentText;
            digest = that.sAbstractText;
            groupId = that.sPublishId;
            if(typeof that.sReceptionText == "string")
            {
                if(that.sReceptionText.length == 0)
                {
                    receiveGroups = []
                }
                else
                {
                    receiveGroups = that.sReceptionText.split(',');
                }
            }
            else
            {
                receiveGroups = that.sReceptionText
            }
            if(typeof that.sClassesText == "string")
            {
                if(that.sClassesText.length == 0)
                {
                    pushClass = []
                }
                else
                {
                    pushClass = that.sClassesText.split(',');
                }
            }
            else
            {
                pushClass = that.sClassesText
            }

            if(typeof that.sTeachersText == "string")
            {
                if(that.sTeachersText.length == 0)
                {
                    pushTeacher = []
                }
                else
                {
                    pushTeacher = that.sTeachersText.split(',');
                }
            }
            else
            {
                pushTeacher = that.sTeachersText
            }

            if(typeof that.sStudentsText == "string")
            {
                if(that.sStudentsText.length == 0)
                {
                    pushStudent = []
                }
                else
                {
                    pushStudent = that.sStudentsText.split(',');
                }
            }
            else
            {
                pushStudent = that.sReceptionText
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

            console.log(that.announcementId)
            let obj= {
               "announcementId":that.announcementId,
                "title":title,
                "content":content,
                "digest":digest,
                "type":type,
                "status":status,
                "groupId":groupId,
                "urgency":urgency,
                "urgencyDeadline":urgencyDeadline + " 23:59",
                "receiveGroups":receiveGroups,
                "pushClass":pushClass,
                "pushTeacher":pushTeacher,
                "pushStudent":pushStudent,
                "img":img
            };
            
            obj.urgencyDeadline = obj.urgencyDeadline.split(' ')

            obj.urgencyDeadline = obj.urgencyDeadline[0] + " "+ obj.urgencyDeadline[1]
            

            that
                .$http({
                    method: "POST",
                    url: that.getnEschoolUrl + "api/announcement/v0.1/updateAppAnnouncements/" + that.announcementId,
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId,
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data: obj
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
           
            
            
        },
        compileSave:function(){
            const that = this;
            that.sSave = !that.sSave;
            that.sSave ? that.sPopBg = true : that.sPopBg = false;
        },
        compileDelete:function(){
            const that = this;
            that.sDelete = !that.sDelete;
            that.sDelete ? that.sPopBg = true : that.sPopBg = false;
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
    .compileBtn{
        height: .96rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        margin-top: .2rem;
        border-top: 1px solid #e0e0e0;
        font-size: .32rem;
        span{
            flex: 1;
            text-align: center;
            color: #03A9F4;
            border-right: 1px solid #e0e0e0;
        }
        p{
            flex: 1;
            text-align: center;
            color: #999999;
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
            align-items: flex-end;
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

