<template>
	<div id="AcceptOrganization">
        <div class="search">
            <div>
                <i><img src="../assets/images/icon_search.png" alt=""></i>
                <input type="search" placeholder="搜索" v-model="searchText" @keyup="searchFun">
            </div>
        </div>
        <ul v-if="mergeType == 1" :class=" AcceptOrganizationList.length != 0 ? 'active' : ''">
            <li v-for="(item, index) in AcceptOrganizationList" @click="selectedElementsFn(index)">
                <div class="menuTle">
                    <a v-if="item.state == 0"><img src="../assets/images/icon_pitchOn5.png" alt=""></a>
                    <a v-else><img src="../assets/images/icon_pitchOn4.png" alt=""></a>
                    <span>{{item.oneText}}</span>
                    <b>{{item.name}}</b>
                    <i><img src="../assets/images/icon_arrowsR3.png" alt=""></i>
                </div>
            </li>
        </ul>
        <ul v-else-if="mergeType == 2" :class=" AcceptOrganizationList.length != 0 ? 'active' : ''">
            <li v-for="(item, index) in AcceptOrganizationList" @click="selectedElementsFn(index)">
                <div class="menuTle">
                    <a v-if="item.state == 0"><img src="../assets/images/icon_pitchOn5.png" alt=""></a>
                    <a v-else><img src="../assets/images/icon_pitchOn4.png" alt=""></a>
                    <span>{{item.oneText}}</span>
                    <b>{{item.name}}</b>
                    <i><img src="../assets/images/icon_arrowsR3.png" alt=""></i>
                </div>
            </li>
        </ul>
        <ul v-else-if="mergeType == 3" :class=" AcceptOrganizationList.length != 0 ? 'active' : ''">
            <li v-for="(item, index) in AcceptOrganizationList" @click="selectedElementsFn(index)">
                <div class="menuTle">
                    <a v-if="item.state == 0"><img src="../assets/images/icon_pitchOn5.png" alt=""></a>
                    <a v-else><img src="../assets/images/icon_pitchOn4.png" alt=""></a>
                    <span>{{item.oneText}}</span>
                    <b>{{item.name}}</b>
                    <i><img src="../assets/images/icon_arrowsR3.png" alt=""></i>
                </div>
            </li>
        </ul>
        <ul v-else-if="mergeType == 4" :class=" AcceptOrganizationList.length != 0 ? 'active' : ''">
            <li v-for="(item, index) in AcceptOrganizationList" @click="selectedElementsFn(index)">
                <div class="menuTle">
                    <a v-if="item.state == 0"><img src="../assets/images/icon_pitchOn5.png" alt=""></a>
                    <a v-else><img src="../assets/images/icon_pitchOn4.png" alt=""></a>
                    <span>{{item.oneText}}</span>
                    <b>{{item.className}}</b>
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
        <div class="submitBtn" @click="submitBtnFn" v-if="btnShow"><div>提交</div></div>

	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
	
    name: 'AcceptOrganization',
    data(){
        return {
            getnVeducloudUrl:this.$store.state.veducloud,
            getnEschoolUrl:this.$store.state.eschool,
            pageNum:1,
            AcceptOrganizationList:[],
            AcceptOrganizationListTotal:0,
            loading:false,
            loading2:false,
            withoutData: false,
            searchText:"",
            pagesUrl:"",
            btnShow:true,
        }
    },
    components:{
        // 组件实例化
    },
    watch:{
        searchText(val, oldVal){//普通的watch监听
            if(val == "")
            {
                this.acceptOrganizationListFn()
            }
        },
       
    },
    mounted(){
        
    },
    created(){
        const titleText = "选择"+sessionStorage.titleText;
        document.title = titleText;
        
        document.body.style.background = "#F8F8F8";

        const that = this;
        that.mergeType = sessionStorage.mergeType;
        that.acceptOrganizationListFn();
        window.onscroll = function() {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
            var windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
            var scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (that.AcceptOrganizationList.length < that.AcceptOrganizationListTotal) {
                    that.pageNum++;
                    if(that.searchText == "")
                    {
                        that.acceptOrganizationListPushFn();
                    }
                    else
                    {
                        that.searchPushFun();
                    }
                } else if (that.AcceptOrganizationList.length == that.AcceptOrganizationListTotal) {
                    that.loading2 = false;
                    setTimeout(function() {
                        that.loading = false;
                    },1000)
                }
            }
        };
        that.common.setingTtitle(titleText)

    },
    methods: {
        
        submitBtnFn(){
            const that = this;
            var arr = [];
            //发布/接收阻止跳转页面
            if( that.mergeType == 1 )
            {
                that.AcceptOrganizationList.map( (item , index) => {
                    if(item.state == 1)
                    {
                        arr.push(item.groupId)
                    }
                })
                sessionStorage.setItem("addReceptionText", arr);
                sessionStorage.setItem("sReceptionText", arr);
            }
            else if( that.mergeType == 2 )
            {
                that.AcceptOrganizationList.map( (item , index) => {
                    if(item.state == 1)
                    {
                        arr.push(item.accountId)
                    }
                })
                sessionStorage.setItem("addStudentsText", arr);
                sessionStorage.setItem("sStudentsText", arr);
            }
            else if( that.mergeType == 3 )
            {
                that.AcceptOrganizationList.map( (item , index) => {
                    if(item.state == 1)
                    {
                        arr.push(item.accountId)
                    }
                })
                sessionStorage.setItem("addTeachersText", arr);
                sessionStorage.setItem("sTeachersText", arr);
            }
            else if( that.mergeType == 4 )
            {
                that.AcceptOrganizationList.map( (item , index) => {
                    if(item.state == 1)
                    {
                        arr.push(item.classId)
                    }
                })
                sessionStorage.setItem("addClassesText", arr);
                sessionStorage.setItem("sClassesText", arr);
            }
            

            that.$router.push({
                name: that.$route.params.pagesUrl,
            });
        },
        selectedElementsFn(index){
            const that = this;
            if(that.AcceptOrganizationList[index].state != 1)
            {
                that.AcceptOrganizationList[index].state = 1;
            }
            else
            {
                that.AcceptOrganizationList[index].state = 0;
            }
            
        },
        acceptOrganizationListFn: function() {
            var that = this;
            that.AcceptOrganizationList = [];
            that.pageNum = 1;
            that.loading = true;
            that.loading2 = true;
            that.withoutData = false;
            that
            .$http({
                method: "GET",
                url: that.getnVeducloudUrl + "api/uc/v0.1/merge",
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId
                },
                params: {
                    pageNum: that.pageNum,
                    mergeType:that.mergeType
                }
            })
            .then(function(response) {
                if(response.data.total > 0)
                {
                    that.AcceptOrganizationListTotal = response.data.total;
                    if( that.mergeType == 1 || that.mergeType == 3 || that.mergeType == 2 )
                    {
                        response.data.rows.map((item , index) => {
                            item.oneText = item.name.substring(0,1);
                            item.state = 0
                        })
                    }
                    else if( that.mergeType == 4)
                    {
                        response.data.rows.map((item , index) => {
                            item.oneText = item.className.substring(0,1);
                            item.state = 0
                        })
                    }
                    
                    that.AcceptOrganizationList = response.data.rows;

                    if (that.AcceptOrganizationList.length < that.AcceptOrganizationListTotal) {
                        that.loading = false;
                    } else if (that.AcceptOrganizationList.length == that.AcceptOrganizationListTotal) {
                        if (that.AcceptOrganizationList.length < 5) {
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

        acceptOrganizationListPushFn: function(id) {
            var that = this;
            that.loading = true;
            that
            .$http({
                method: "GET",
                url: that.getnVeducloudUrl + "api/uc/v0.1/merge",
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId
                },
                params: {
                    pageNum: that.pageNum,
                    mergeType:that.mergeType
                }
            })
            .then(function(response) {
                if (that.AcceptOrganizationList.length <= that.AcceptOrganizationListTotal) {

                    if( that.mergeType == 1 || that.mergeType == 3 || that.mergeType == 2 )
                    {
                        response.data.rows.map((item , index) => {
                            item.oneText = item.name.substring(0,1);
                            item.state = 0
                        })
                    }
                    else if( that.mergeType == 4)
                    {
                        response.data.rows.map((item , index) => {
                            item.oneText = item.className.substring(0,1);
                            item.state = 0
                        })
                    }
                    
                    that.AcceptOrganizationList = that.AcceptOrganizationList.concat(
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
            that.AcceptOrganizationList = [];
            that.pageNum = 1;
            that.loading = true;
            that.loading2 = true;
            that.withoutData = false;
            if(ev.keyCode == 13){
                that
                .$http({
                    method: "GET",
                    url: that.getnVeducloudUrl  + "api/uc/v0.1/merge",
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params: {
                        keyword:that.searchText,
                        mergeType:that.mergeType,
                        pageNum: that.pageNum,
                    }
                })
                .then(function(response) {
                    if(response.data.total > 0)
                    {
                        that.AcceptOrganizationListTotal = response.data.total;
                        if( that.mergeType == 1 || that.mergeType == 3 || that.mergeType == 2 )
                        {
                            response.data.rows.map((item , index) => {
                                item.oneText = item.name.substring(0,1);
                                item.state = 0
                            })
                        }
                        else if( that.mergeType == 4)
                        {
                            response.data.rows.map((item , index) => {
                                item.oneText = item.className.substring(0,1);
                                item.state = 0
                            })
                        }
                        that.AcceptOrganizationList = response.data.rows;

                        if (that.AcceptOrganizationList.length < that.AcceptOrganizationListTotal) {
                            that.loading = false;
                        } else if (that.AcceptOrganizationList.length == that.AcceptOrganizationListTotal) {
                            if (that.AcceptOrganizationList.length < 5) {
                                that.loading = false;
                            }
                            that.loading2 = false;
                        }
                    }
                    else
                    {
                        that.btnShow = false;
                        that.loading = false;
                        that.withoutData = true;
                        that.AcceptOrganizationList = response.data.rows;
                        that.AcceptOrganizationListTotal = response.data.total;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        },
        searchPushFun(ev){
            const that = this;
            that.loading = true;
            if(ev.keyCode == 13){
                that
                .$http({
                    method: "GET",
                    url: that.getnVeducloudUrl  + "api/uc/v0.1/merge",
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params: {
                        keyword:that.searchText,
                        mergeType:that.mergeType,
                        pageNum: that.pageNum,
                    }
                })
                .then(function(response) {
                    if (that.AcceptOrganizationList.length <= that.AcceptOrganizationListTotal) {
                        if( that.mergeType == 1 || that.mergeType == 3 || that.mergeType == 2 )
                        {
                            response.data.rows.map((item , index) => {
                                item.oneText = item.name.substring(0,1);
                                item.state = 0
                            })
                        }
                        else if( that.mergeType == 4)
                        {
                            response.data.rows.map((item , index) => {
                                item.oneText = item.className.substring(0,1);
                                item.state = 0
                            })
                        }
                        that.AcceptOrganizationList = that.AcceptOrganizationList.concat(
                            response.data.rows
                        );
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        }
    },
}
</script>

<style lang="scss" scoped="">
@import '../assets/scss/common.scss'; 
#AcceptOrganization{
    .search{
        background: #F8F8F8;
        overflow: hidden;
        height: .88rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
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
        padding: .88rem 0 0 0;
        &.active{
            padding: .88rem 0;
        }
        li{
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
                    border-radius: 50%;
                    margin-right: .32rem;
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
           
        }
    }
    .submitBtn{
        height: .88rem;
        text-align: center;
        line-height: .88rem;
        width: 100%;
        color: #fff;
        font-size: .32rem;
        position: fixed;
        bottom: 0;
        div{
            background: #409EFF;
        }
    }
    .loding{
        border: 0;
    }
}
  

  

</style>   