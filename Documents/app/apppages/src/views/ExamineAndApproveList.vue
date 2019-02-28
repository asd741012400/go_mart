<template>
	<div id="ExamineAndApproveList">
        <div class="header">
            <div>
                <span class="left"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>我的交班</p>
            <div>
                <a>　</a>
            </div>
        </div>
        <div class="search">
            <div>
                <i><img src="../assets/images/icon_search.png" alt=""></i>
                <input type="search" placeholder="搜索" v-model="searchText" @keyup="searchFun">
            </div>
        </div>
        <ul>
            <li>
                <div class="menuTle">
                    <span>交</span>
                    <div>
                        <time>10月</time>
                        <p>交班人：张建</p>
                    </div>
                    <i><img src="../assets/images/icon_arrowsR3.png" alt=""></i>
                </div>
            </li>
            <li>
                <div class="menuTle">
                    <span>交</span>
                    <div>
                        <time>10月</time>
                        <p>交班人：张建</p>
                    </div>
                    <i><img src="../assets/images/icon_arrowsR3.png" alt=""></i>
                </div>
            </li>
        </ul>
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
                <p>未找到相关信息</p>
            </div>
        </div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
	
    name: 'ExamineAndApproveList',
    data(){
        return {
            getnVeducloudUrl:this.$store.state.veducloud,
            getnEschoolUrl:this.$store.state.eschool,
            pageNum:1,
            publishOrganizationList:[],
            publishOrganizationListTotal:0,
            loading:false,
            loading2:false,
            withoutData: false,
            searchText:'',
        }
    },
    components:{
        // 组件实例化
    },
    watch:{
        searchText(val, oldVal){//普通的watch监听
            if(val == "")
            {
                this.publishOrganizationListFn()
            }
        },
       
    },
    mounted(){
        const that = this;
        that.publishOrganizationListFn();
    },
    created(){
        document.body.style.background = "#F8F8F8";
        /*var qs=require('qs'); */
        const that = this;
    
        window.onscroll = function() {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
            var windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
            var scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (that.publishOrganizationList.length < that.publishOrganizationListTotal) {
                    that.pageNum++;
                    that.publishOrganizationListPushFn();
                } else if (that.publishOrganizationList.length == that.publishOrganizationListTotal) {
                    that.loading2 = false;
                }
            }
        };

        
    },
    methods: {

        selectedElementsFn(index){
            const that = this;
            const arr = [that.publishOrganizationList[index].name,that.publishOrganizationList[index].groupId]
            if(that.$route.params.pagesUrl == "CompileInform")
            {
                sessionStorage.setItem("sPublishText", arr[0]);
                sessionStorage.setItem("sPublishId", arr[1]);
            }
            else if(that.$route.params.pagesUrl == "AndroidCompileInform")
            {
                sessionStorage.setItem("sPublishText", arr[0]);
                sessionStorage.setItem("sPublishId", arr[1]);
            }
            else if(that.$route.params.pagesUrl == "AddInform")
            {
                sessionStorage.setItem("addPublishText", arr[0]);
                sessionStorage.setItem("addPublishId", arr[1]);
            }
            else if(that.$route.params.pagesUrl == "AndroidAddInform")
            {
                sessionStorage.setItem("addPublishText", arr[0]);
                sessionStorage.setItem("addPublishId", arr[1]);
            }
            
            that.$router.push({
                name: that.$route.params.pagesUrl,
            });
        },
        publishOrganizationListFn: function() {
            var that = this;
            that.publishOrganizationList = [];
            that.pageNum = 1;
            that.loading = true;
            that.loading2 = true;
            that.withoutData = false;
            that
            .$http({
                method: "GET",
                url: that.getnVeducloudUrl + "api/uc/v0.1/groups/org",
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
                    that.publishOrganizationListTotal = response.data.total;
                    response.data.rows.map((item , index) => {
                        item.oneText = item.name.substring(0,1)
                    })
                    that.publishOrganizationList = response.data.rows;
                        // console.log(that.publishOrganizationList)

                    if (that.publishOrganizationList.length < that.publishOrganizationListTotal) {
                        that.loading = false;
                    } else if (that.publishOrganizationList.length == that.publishOrganizationListTotal) {
                        if (that.publishOrganizationList.length < 5) {
                            that.loading = false;
                        }
                        that.loading2 = false;
                    }
                }
                else
                {
                    that.loading = false;
                    that.withoutData = true;
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        },

        publishOrganizationListPushFn: function(id) {
            var that = this;
            that.loading = true;
            that
            .$http({
                method: "GET",
                url: that.getnVeducloudUrl + "api/uc/v0.1/groups/org",
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId
                },
                params: {
                    pageNum: that.pageNum,
                }
            })
            .then(function(response) {
                if (that.publishOrganizationList.length <= that.publishOrganizationListTotal) {
                    response.data.rows.map((item , index) => {
                        item.oneText = item.name.substring(0,1)
                    })
                    that.publishOrganizationList = that.publishOrganizationList.concat(
                        response.data.rows
                    );
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        searchFun(ev){
            const that = this;
            if(ev.keyCode == 13){
                that
                .$http({
                    method: "GET",
                    url: that.getnVeducloudUrl + "api/uc/v0.1/groups/org",
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params: {
                        keyword:that.searchText,
                    }
                })
                .then(function(response) {
                    if(response.data.total > 0)
                    {
                        that.publishOrganizationListTotal = response.data.total;
                        response.data.rows.map((item , index) => {
                            item.oneText = item.name.substring(0,1)
                        })
                        that.publishOrganizationList = response.data.rows;
                            // console.log(that.publishOrganizationList)

                        if (that.publishOrganizationList.length < that.publishOrganizationListTotal) {
                            that.loading = false;
                        } else if (that.publishOrganizationList.length == that.publishOrganizationListTotal) {
                            if (that.publishOrganizationList.length < 5) {
                                that.loading = false;
                            }
                            that.loading2 = false;
                        }
                    }
                    else
                    {
                        that.publishOrganizationList = response.data.rows;
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
#ExamineAndApproveList{
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
    .search{
        background: #F8F8F8;
        overflow: hidden;
        height: .88rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: .88rem;
        width: 100%;
        div{
            background: #fff;
            border-radius: 5px;
            display: flex;
            height: .6rem;
            width: 7.18rem;
            align-items: center;
            i{
                width: .32rem;
                height: .32rem;
                margin-right: .14rem;
                margin-left: .34rem;
            }
            input{
                height: .6rem;
                flex: 1;
                font-size: .28rem;
            }
        }
    }
    ul{
        padding-top: 1.76rem;
        li{
            margin-bottom: .2rem;
            .menuTle{
                height: 1.2rem;
                background: #fff;
                padding: 0 .32rem;
                display: flex;
                align-items: center;
                border-bottom:1px solid #EEEEEE;
                a{
                    width: .36rem;
                    height: .36rem;
                    margin-right: .48rem;
                }
                span{
                    width: .74rem;
                    height: .74rem;
                    text-align: center;
                    line-height: .74rem;
                    font-size: .32rem;
                    color: #FFFFFF;
                    background: #03A9F4;
                    border-radius: 4px;
                    margin-right: .32rem;
                }
                div{
                    flex: 1;
                    time{
                        font-size: .32rem;
                        color: #333;
                    }
                    p{
                        font-size: .26rem;
                        color: #999999;
                    }
                }
                b{
                    font-weight: normal;
                    font-size: .32rem;
                    color: #333333;
                    flex: 1;
                }
                i{
                    width: .4rem;
                }
            }
            .menuContent{
                display: none;
                p{
                    padding-left: 1.38rem;
                    padding-right: .32rem;
                    display: flex;
                    align-items: center;
                    border-bottom:1px solid #EEEEEE;
                    height: 1.2rem;
                    em{
                        width: .74rem;
                        height: .74rem;
                        text-align: center;
                        line-height: .74rem;
                        font-size: .32rem;
                        color: #FFFFFF;
                        background: #99CAE0;
                        border-radius: 50%;
                        margin-right: .32rem;
                        font-style: normal;
                    }
                    strong{
                        font-weight: normal;
                        font-size: .32rem;
                        color: #333333;
                        flex: 1;
                    }
                }
            }
            &.active{
                .menuTle{
                    i{
                        transform: rotate(90deg);
                    }
                }
                .menuContent{
                    display: block;
                }
            }
        }
    }
}
  
  

</style>   