<template>
	<div id="TheApprovalIsPendingList">
		<div class="header">
            <div>
                <span class="left" @click="webClose"><img src="../assets/images/icon_close2.png" alt=""></span>
                <span></span>
            </div>
            <p>调班申请</p>
            <div>
                <a>　</a>
            </div>
        </div>
        <div class="ConnectList_header">
      
            <p :class=" tabType == 0 ? 'active' : ''" @click="tabIndexFn(0)">
                <span>待审批</span>
                <em></em>
            </p>
            <p :class=" tabType == 1 ? 'active' : ''" @click="tabIndexFn(1)">
                <span>已审批</span>
                <em></em>
            </p>
        </div>
        <ul class="connect_deal" v-if="tabType== 0">
            <li v-for="(item, index) in evaluatingList">
                <p>
                    <span>调班人</span>
                    <time>调班时间</time>
                </p>
                <div>
                    <span><img :src="item.receive_headimageurl" alt=""></span>
                    <a>{{item.receive_name}}</a>
                    <time>{{item.receive_time}}</time>
                </div>
            </li>
        </ul>
        <ul class="connect_join" v-else>
            <li>
                <p>
                    <span>调班人</span>
                    <a class="col3">已完成</a>
                </p>
                <div>
                    <span><img src="../assets/images/headPortrait.png" alt=""></span>
                    <a>梁明</a>
                </div>
            </li>
        </ul>


	</div>
    
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
    name: 'TheApprovalIsPendingList',
    data(){
        return {
            evaluatingUrl:this.$store.state.lianhezongdao,
			evaluatingList:[],
            evaluatingListTotal: 0,
			pageNum: 1,
			pageSize:8,
			loading: false,
            loading2: false,
            withoutData: false,	
            tabType:0
        }
    },
    components:{
        // 组件实例化
    },
 
    mounted(){
		this.appEvaluationInfoList()
    },
    created(){
	    document.body.style.background = "#f8f8f8";
		var qs=require('qs');
        const that = this; 
        sessionStorage.setItem("account_id", this.$route.query.account_id);
        sessionStorage.setItem("accessToken", this.$route.query.accessToken);
        sessionStorage.setItem("schoolId", this.$route.query.schoolId);
		window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
            var windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
            var scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件

            if (scrollTop + windowHeight == scrollHeight) {

                if (that.evaluatingList.length < that.evaluatingListTotal) {
					that.pageNum++;
                    that.appEvaluationInfoListFn();
                } else if (that.evaluatingList.length == that.evaluatingListTotal) {
                    that.loading2 = false;
                }
            }
		};
    },
    methods: {
		appEvaluationInfoList(){
			const qs=require('qs');
			const that = this;
            that.informationList = [];
            that.pageNum = 1;
            that.loading = true;
            that.loading2 = true;
			that.withoutData = false;
			const formData = {
                account_id:sessionStorage.account_id,
				pageNum:that.pageNum,
                pageSize:that.pageSize,
                type:that.tabType
			};
			that.$http.post('/api/getExamineApplyList',formData,{
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId,
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                if(response.data.total > 0)
                {
                    that.evaluatingListTotal = response.data.total;
                    that.evaluatingList = response.data.rows;
                    if (that.evaluatingList.length < that.evaluatingListTotal) {
                        that.loading = false;
                    } else if (that.evaluatingList.length == that.evaluatingListTotal) {

                        if (that.evaluatingList.length < 8) {
                            that.loading = false;
                        }
                        that.loading2 = false;
                    }
                }
                else
                {
                    that.evaluatingListTotal = response.data.total;
                    that.evaluatingList = response.data.rows;
                    that.loading = false;
                    that.withoutData = true;
                }
            })  
            .catch(function(error) {
                console.log(error);
            });
		},
		appEvaluationInfoListFn(){
			const that = this;
			that.loading = true;
            that.loading2 = true;
			that.withoutData = false;
			const qs=require('qs');
		
			const formData = {
                account_id:sessionStorage.account_id,
				pageNum:that.pageNum,
                pageSize:that.pageSize,
                type:that.tabType
			};
			that.$http.post('/api/getExamineApplyList',formData,{
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId,
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                if (that.evaluatingList.length <= that.evaluatingListTotal) {
                    that.evaluatingList = that.evaluatingList.concat(
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
            that.tabType = index;
            that.evaluatingList = [];
            window.scrollTo(0,0);
            that.appEvaluationInfoList(index)
        },

        webClose(){
            closeWeb()
        },

        theJumpPage(str){
            const that = this;
            that.$router.push({
                name: str
            });
        }


    },
}
</script>

<style lang="scss" scoped="">
/*@import ''*/ 
#TheApprovalIsPendingList{
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
        li{
            background: #fff;
            padding: .32rem;
            margin-bottom: .2rem;
            p{
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: .24rem;
                color: #999999;
                a{
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
            div{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-top: .32rem;
                font-size: .32rem;
                color: #333;
                span{
                    width: .64rem;
                    height: .64rem;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: .32rem;
                }
                a{
                    flex: 1;
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