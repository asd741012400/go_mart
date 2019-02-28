<template>
        
	<div id="ReadStatistics">
        <div class="header">
            <div class="readPersonStatistics">
                <div class="sumPerson">
                    <p>总人数：{{readStatisticsNum.viewTotal + readStatisticsNum.notViewTotal}} 人</p>
                    <span>|</span>
                    <p>已阅读：{{readStatisticsNum.viewTotal}} 人</p>
                </div>
                <div class="willBeread">
                    <p>未阅读：<span>{{readStatisticsNum.notViewTotal}} </span> 人</p>
                </div>
            </div>
            <div class="tab">
                <p :class=" viewType == 2 ? 'active' : ''" @click="tabIndexFn(2)">
                    <span>未读</span>
                    <em></em>
                </p>
                <p :class=" viewType == 1 ? 'active' : ''" @click="tabIndexFn(1)">
                    <span>已读</span>
                    <em></em>
                </p>
            </div>
        </div>
        <ul>
            <li v-for="(item, index) in readStatisticsList">
                <b><img :src="item.photo" alt=""></b>
                <div>
                    <h3>{{item.userName}}</h3>
                    <p>{{item.deptOrClass}}</p>
                </div>
                <a v-if="viewType == 2" :href="'tel:'+item.phone"><img src="../assets/images/icon_cellphone.png" alt=""></a>
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
	    		<p>还没有收到消息哦~</p>
	    	</div>
	    </div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
export default {
	
    name: 'ReadStatistics',
    data(){
        return {
            getnEschoolUrl:this.$store.state.eschool,
            pageNum: 1,
			loading: false,
            loading2: false,
            withoutData: false,	
            viewType:1,
            readStatisticsNum:{},
            readStatisticsList:[],
            readStatisticsListTotal:0
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
        document.title="阅读统计";
        document.body.style.background = "#fff";
        const that = this;
        that.readStatisticsListFn()
        that
            .$http({
                method: "GET",
                url: that.getnEschoolUrl+"api/announcement/v0.1/"+this.$route.params.id+"/view/statistic",
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId
                },
            })
            .then(function(response) {
                that.readStatisticsNum = response.data
            })
            .catch(function(error) {
                console.log(error);
            });

        window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
            var windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
            var scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件

            if (scrollTop + windowHeight == scrollHeight) {
                if (that.readStatisticsList.length < that.readStatisticsListTotal) {
                    that.pageNum++;
                    that.getnReadStatisticsListPushFn();
                } else if (that.readStatisticsList.length == that.readStatisticsListTotal) {
                    that.loading2 = false;
                }
            }
        };
        that.common.setingTtitle("阅读统计")


    },
    methods: {
        tabIndexFn(index){
            const that = this;
            that.viewType = index;
            that.pageNum = 1;
            
            window.scrollTo(0,0);
            that.readStatisticsListFn()
        },
        readStatisticsListFn(){
            const that = this;
            that.loading = true;
            that.loading2 = true;
            that.withoutData = false;
            that
                .$http({
                    method: "GET",
                    url: that.getnEschoolUrl+"api/announcement/v0.1/"+this.$route.params.id+"/appView",
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params:{
                        viewType:that.viewType,
                        pageNum: that.pageNum,
                    }
                })
                .then(function(response) {
                    if(response.data.total > 0)
                    {
                        that.readStatisticsListTotal = response.data.total;
                        that.readStatisticsList = response.data.rows;
                        if (that.readStatisticsList.length < that.readStatisticsListTotal) {
                            that.loading = false;
                        } else if (that.readStatisticsList.length == that.readStatisticsListTotal) {
                            if (that.readStatisticsList.length < 8) {
                                that.loading = false;
                            }
                            that.loading2 = false;
                        }

                    }
                    else
                    {
                        that.readStatisticsListTotal = response.data.total;
                        that.readStatisticsList = response.data.rows;
                        that.loading = false;
                        that.withoutData = true;
                    }
                  
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getnReadStatisticsListPushFn(){
            var that = this;
            that.loading = true;
            that.loading2 = true;
            that.withoutData = false;
            that
                .$http({
                    method: "GET",
                    url: that.getnEschoolUrl+"api/announcement/v0.1/"+this.$route.params.id+"/appView",
                    headers: {
                        accessToken:sessionStorage.accessToken,
                        schoolId:sessionStorage.schoolId
                    },
                    params: {
                        pageNum: that.pageNum,
                        viewType:that.viewType,
                    }
                })
                .then(function(response) {
                if (that.readStatisticsList.length <= that.readStatisticsListTotal) {
                    that.readStatisticsList = that.readStatisticsList.concat(
                        response.data.rows
                    );
                }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        
        
    },
}
</script>

<style lang="scss" scoped="">
@import '../assets/scss/common.scss'; 
#ReadStatistics{
    .header{
        position: fixed;
        top: 0;
        width: 100%;
        .readPersonStatistics{
            background: #03A9F4;
            height: 3rem;
            .sumPerson{
                display: flex;
                padding: .6rem .32rem 0;
                color: #fff;
                font-size: .32rem;
                opacity: 0.72;
                span{
                    padding:  0 .48rem;
                }
            }
            .willBeread{
                padding:.4rem .32rem 0;
                font-size: .36rem;
                color: #fff;
                font-weight: bold;
                span{
                    font-weight: normal;
                    font-size: .72rem;
                }
            }
        }
        .tab{
            background: #fff;
            display: flex;
            line-height: .9rem;
            border-bottom: 1px solid #F2F5F5;
            p{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                span{
                    font-size: .3rem;
                    color: #A3B5C7;
                }
                em{
                    width: .52rem;
                    height: 2px;
                    background: #15B4F1;
                    display: none;
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
    }
    ul{
        padding-top: 4.14rem;
        li{
            display: flex;
            align-items: center;
            padding: .34rem .32rem;
            border-bottom: 1px solid #F2F5F5;
            b{
                width: .8rem;
                height: .8rem;
                overflow: hidden;
                border-radius: 50%;
            }
            div{
                padding-left: .32rem;
                flex: 1;
                h3{
                    font-size: .32rem;
                    color: #333333;
                    font-weight: normal;
                }
                p{
                    font-size: .24rem;
                    color: #999999;
                }
            }
            a{
                width: .48rem;
                height: .48rem;
            }
        }
    }
    .withoutData{
        padding-top: 2rem;
    }
}


</style>   