<template>
        
	<div id="InformList">
        <div class="tabTop">
            <div class="tabTitle">
                <p :class=" tabIndex == 0 ? 'active' : ''" @click="tabIndexFn(0)">
                    <a>我发布的</a>
                    <span></span>
                </p>
                <p :class=" tabIndex == 1 ? 'active' : ''" @click="tabIndexFn(1)">
                    <a>我收到的</a>
                    <span></span>
                </p>
            </div>
            <div class="search">
                <div>
                    <i><img src="../assets/images/icon_search.png" alt=""></i>
                    <input type="search" placeholder="输入标题进行搜索" @keyup="searchFun" v-model="searchText">
                </div>
            </div>
        </div>
 

        <div class="tabContent">
            <ul>
                <li v-for="(item, index) in informationList">
                    <i @click="readStatisticsPages(item.id)">
                        <span v-if="item.type == 1">通知</span>
                        <span v-else>公告</span>
                        <b v-if="tabIndex == 0"><img src="../assets/images/icon_statistics.png" alt=""></b>
                    </i>
                    <div @click="compilePages(index)" class="tabContentDiv">
                        <h3>
                            <span>{{item.title}}</span>
                            <img src="../assets/images/icon_urgent.png" alt="" v-if="item.urgencyMark == 1">
                        </h3>
                        <p>
                            <span v-if="tabIndex == 0">{{item.name}}</span>
                            <span v-else>{{item.publisherName}}</span>
                            <b v-if="tabIndex == 0">{{item.newCreateDate}}</b>
                            <b v-else>{{item.createDateTime}}</b>
                            <a v-if="tabIndex == 0">{{item.readCount}}浏览量</a>
                            <a v-else>{{item.readCount}}阅读</a>
                        </p>
                        <div v-if="tabIndex == 1">
                            <span v-if="item.photo == ''"><img src="http://192.168.1.100:9113/api/cs/v0.1/public/8A2365F8362148DB76D75B0BEFF418D7" alt=""></span>
                            <span v-else><img :src="item.photo" alt=""></span>
                            <a v-if="item.name == ''">系统管理员</a>
                            <a>{{item.name}}</a>
                            <b v-if="item.department != ''">·</b>
                            <a>{{item.department}}</a>
                        </div>
                    </div>
                    <em><img src="../assets/images/out_of_service.png" alt="" v-if="item.status == 2"></em>
                </li>
            </ul>
            
        </div>  
        <div class="loding" v-if="loading">
	    	<div class="lodingText" v-if="loading2">
	    		<i class="el-icon-loading activeT"></i>
	    		<span>拼命加载中...</span>
	    	</div>
	    	<div class="lodingEnd" v-else>
	    		<span>数据加载完毕</span>
	    	</div>
	    </div>
	    <div class="withoutData" v-if="withoutData">
	    	<div>
	    		<span><img src="../assets/images/withoutData.png" alt=""></span>
	    		<p>还没有收到消息哦~</p>
	    	</div>
	    </div>
        <div class="addInform" @click="addPages" v-if="tabIndex == 0"><img src="../assets/images/add_inform.png" alt=""></div> 

	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
export default {
	
    name: 'InformList',
    data(){
        return {
            getnEschoolUrl:this.$store.state.eschool,
            tabIndex:0, 
            pageNum: 1,
            informationList: [],
            informationListTotal: 0,
            loading: false,
            loading2: false,
            withoutData: false,
            searchText:"",
        }
    },
    components:{
        // 组件实例化
    },
    watch:{
        searchText(val, oldVal){//普通的watch监听
            if(val == "")
            {
                this.pageNum = 1;
                this.getnMyFormListFn(this.tabIndex);
            }
        },
       
    },

   
    mounted(){
        const that = this;
        
        that.getnMyFormListFn(that.tabIndex);
    },
    created(){
        document.title="通知公告";
        
        document.body.style.background = "#fff";
        const that = this;
        let t = 0;
        if(that.$route.query.accessToken)
        {
            sessionStorage.setItem("accessToken", this.$route.query.accessToken);
            sessionStorage.setItem("schoolId", this.$route.query.schoolId);
        }
        if(sessionStorage.tabIndex != undefined)
        {
            that.tabIndex = sessionStorage.tabIndex
        }
        window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
            var windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
            var scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件

            if (scrollTop + windowHeight == scrollHeight) {
                if (that.informationList.length < that.informationListTotal) {
                    that.pageNum++;
                    that.getnMyFormListPushFn(that.tabIndex);
                } else if (that.informationList.length == that.informationListTotal) {
                    that.loading2 = false;
                }
            }
        };

        that.common.setingTtitle("通知公告")

    },
    methods: {


        //获取我发布的
        getnMyFormListFn(index){
            var that = this;
            that.informationList = [];
            that.pageNum = 1;
            that.loading = true;
            that.loading2 = true;
            that.withoutData = false;
            let url;

            if(index == 0)
            {
                url = that.getnEschoolUrl + "api/announcement/v0.1/getAppAnnouncements";
            }
            else if(index == 1)
            {
                url = that.getnEschoolUrl + "api/announcement/v0.1/list";
            }
            that
                .$http({
                    method: "GET",
                    url: url,
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params: {
                        pageNum: that.pageNum,
                    }
                })
                .then(function(response) {
                    if(response.data.total > 0)
                    {
                        that.informationListTotal = response.data.total;
                        that.informationList = response.data.rows;
                        if (that.informationList.length < that.informationListTotal) {
                            that.loading = false;
                        } else if (that.informationList.length == that.informationListTotal) {
                            if (that.informationList.length < 8) {
                                that.loading = false;
                            }
                            that.loading2 = false;
                        }

                    }
                    else
                    {
                        that.informationListTotal = response.data.total;
                        that.informationList = response.data.rows;
                        that.loading = false;
                        that.withoutData = true;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        getnMyFormListPushFn: function(index) {
            var that = this;
            var url;
            that.loading = true;
            that.loading2 = true;
            that.withoutData = false;
            let data = {};
            if(index == 0)
            {
                if( that.searchText == "" )
                {

                    url = that.getnEschoolUrl + "api/announcement/v0.1/getAppAnnouncements";
                    data = {
                        pageNum: that.pageNum,
                    }
                }
                else
                {
                    data = {
                        title:that.searchText,
                        pageNum: that.pageNum,
                        pageSize: 8,
                    }
                    url = that.getnEschoolUrl + "api/announcement/v0.1/announcements"
                }

            }
            else if(index == 1)
            {
                if( that.searchText == "" )
                {
                    data = {
                        pageNum: that.pageNum,
                    }
                    url = that.getnEschoolUrl + "api/announcement/v0.1/list";
                }
                else
                {
                    data = {
                        title:that.searchText,
                        pageNum: that.pageNum,
                        pageSize: 8,
                    }
                    searchUrl = that.getnEschoolUrl + "api/announcement/v0.1/likeList";
                }
                
            }

            that
                .$http({
                    method: "GET",
                    url: url,
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params: data
                })
                .then(function(response) {
                if (that.informationList.length <= that.informationListTotal) {
                    that.informationList = that.informationList.concat(
                        response.data.rows
                    );
                }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        tabIndexFn(index){
            const that = this;
            that.tabIndex = index;
            that.searchText = "";
            window.scrollTo(0,0);
            that.getnMyFormListFn(index)
        },

        //跳转编辑页面
        compilePages(index){
            const that = this;
            that.loading =false
            sessionStorage.setItem("tabIndex", that.tabIndex);
            if(that.tabIndex == 0)
            {
                sessionStorage.setItem("compileId", that.informationList[index].id);

                if(that.informationList[index].updateStatus == 1)
                {
                    that.$router.push({
                        name: "ExamineInform",
                        params:{
                            id : that.informationList[index].id
                        }
                    });
                }
                else
                {

                    that.$router.push({
                        name: "CompileInform",
                        params:{
                            id : that.informationList[index].id
                        }
                    });
                }
                
            }
            else
            {
                that
                    .$http({
                        method: "GET",
                        url: that.getnEschoolUrl+"api/announcement/v0.1/announcements/"+that.informationList[index].id+"/detail",
                        headers: {
                            accessToken:sessionStorage.accessToken,
                            schoolId:sessionStorage.schoolId
                        },
                    })
                    .then(function(response) {
                        window.location.href = that.informationList[index].contentUrl
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
            
        },

        // 跳转统计页面
        readStatisticsPages(id){
            const that = this;
            that.loading =false
            sessionStorage.setItem("tabIndex", that.tabIndex);
            that.$router.push({
                name: "ReadStatistics",
                params:{
                    id : id
                }
            });
        },

        //跳转新增页面
        addPages(){
            const that = this;
            that.loading =false;
            sessionStorage.setItem("tabIndex", that.tabIndex);
            that.$router.push({
                name: "AddInform",
                params:{
                    url : "InformList"
                }
            });
        },
        searchFun(ev){
            const that = this;
            that.pageNum = 1;
            let searchUrl;
            if(ev.keyCode == 13){
                
                if(that.tabIndex == 0)
                {
                    searchUrl = that.getnEschoolUrl + "api/announcement/v0.1/announcements";

                }
                else
                {
                    searchUrl = that.getnEschoolUrl + "api/announcement/v0.1/likeList";
                }
               
                

                that
                .$http({
                    method: "GET",
                    url: searchUrl,
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params: {
                        title:that.searchText,
                        pageNum: that.pageNum,
                        pageSize: 8,
                    }
                })
                .then(function(response) {
                    if(response.data.total > 0)
                    {
                        that.informationListTotal = response.data.total;
                        that.informationList = response.data.rows;
                        if (that.informationList.length < that.informationListTotal) {
                            that.loading = false;
                        } else if (that.informationList.length == that.informationListTotal) {
                            if (that.informationList.length < 8) {
                                that.loading = false;
                            }
                                that.loading2 = false;
                        }

                    }
                    else
                    {
                        that.informationListTotal = response.data.total;
                        that.informationList = response.data.rows;
                        that.loading = false;
                        that.withoutData = true;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        },
    },
}
</script>

<style lang="scss" scoped="">
@import '../assets/scss/common.scss'; 
#InformList{
    .tabTop{
        height: 1.7rem;        
        width: 100%;
        background: #fff;
        z-index: 9999; 
        position: fixed;
        top: 0;
        .tabTitle{
            display: flex;
            height: .82rem;
            line-height: .82rem;
            justify-content: center;
            p{
                flex: 1;
                text-align: center;
                font-size: .36rem;
                color: #A3B5C7;
                span{
                    width: .74rem;
                    height: 2px;
                    display: none;
                    background:  #15B4F1;
                    margin: 0 auto;
                }
                &.active{
                    color: #03A9F4;
                    span{
                        display: block;
                    }
                }
            }
        }
        .search{
            background: #F8F8F8;
            overflow: hidden;
            height: .88rem;
            display: flex;
            align-items: center;
            justify-content: center;
            div{
                background: #fff;
                border-radius: 5px;
                display: flex;
                height: .6rem;
                width: 7.18rem;
                align-items: center;
                justify-content: center;
                i{
                    width: .32rem;
                    height: .32rem;
                    margin-right: .14rem;
                }
                input{
                    height: .6rem;
                    width: 2.5rem;
                    font-size: .28rem;
                }
            }
        }
    }
    .tabContent{
        padding-top: 1.7rem;
        ul{
            background: #f8f8f8;
            overflow: hidden;
            li{
                display: flex;
                position: relative;
                background: #fff;
                padding:.32rem 0 .32rem .32rem;
                margin-bottom:.2rem;
                i{
                    span{
                        width: .76rem;
                        height: .38rem;
                        border: 1px solid #15B4F1;
                        text-align: center;
                        line-height: .38rem;
                        color: #15B4F1;
                        font-style: normal;
                        font-size: .28rem;
                        border-radius: 1px;
                        display: block;
                    }
                    b{
                        display: block;
                        width: .32rem;
                        height: .32rem;
                        margin-top: .3rem;
                    }
                    
                }
                div.tabContentDiv{
                    flex: 1;
                    padding-left: .5rem;
                    position: relative;
                    z-index: 999;
                    h3{
                        font-size: .34rem;
                        font-weight: normal;
                        color: #666666;
                        overflow: hidden;
                        margin-bottom: .16rem;
                        padding-right: .32rem;
                        img{
                            width: .32rem;
                            float: none;
                            padding-left: .1rem;
                            margin-top: -.05rem;
                        }
                    }
                    p{
                        font-size: .24rem;
                        color: #999999;
                        padding-right: .32rem;
                        span{
                            padding-right: .1rem;
                        }
                        b{
                            padding-right: .32rem;
                            font-weight: normal;
                        }
                    }
                    div{
                        display: flex;
                        border-top: 1px solid #f8f8ff; 
                        margin-top: .3rem;
                        padding-top: .24rem;
                        align-items: center;
                        span{
                            width: .48rem;
                            height: .48rem;
                            border-radius: 50%;
                            overflow: hidden;
                            margin-right: .16rem;
                        }
                        a{
                            font-size: .28rem;
                            color: #999999;
                        }
                        b{
                            color: #999999;
                            margin: 0 .16rem;
                        }
                    }
                }
                em{
                    position: absolute;
                    right: .16rem;
                    width: 1.6rem;
                    height: 1.6rem;
                    margin-top: -.63rem;
                    top: 50%;
                    z-index: 100;
                }
            }
        }
    }
    .addInform{
        position: fixed;
        bottom: .6rem;
        right: .48rem;
        width: .96rem;
        z-index: 99999;
    }
}


</style>   