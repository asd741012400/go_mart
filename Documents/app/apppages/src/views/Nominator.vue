<template>
	<div id="Nominator">
        <div class="header">
            <div>
                <span class="left" @click="webHistory"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span @click="webClose"><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>指定审核人</p>
            <div>
                <a>　</a>
            </div>
        </div>
        <ul>
            <li v-for="(item, index) in evaluatingList" @click="affirmSelect(index)">
                <span><img :src="item.photo" alt=""></span>
                <p>{{item.name}}</p>
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
	
    name: 'Nominator',
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
            timer:this.$store.state.startTime
        }
    },
    components:{
        // 组件实例化
    },

    mounted(){
        this.timer = this.timer.split(' ')[0];
        this.appEvaluationInfoList()
    },
    created(){
        document.body.style.background = "#f8f8f8";
		var qs=require('qs');
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
                // account_id:sessionStorage.account_id,
                account_id:"2249548551117622208",
				pageNum:that.pageNum,
                pageSize:that.pageSize,
                applytime:that.timer
			};
			that.$http.post('/api/getauduitList',formData,{
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

                    for (let index = 0; index < that.evaluatingList.length; index++) {
                        const element = that.evaluatingList[index];
                        element.state = 0;
                        
                    }

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
				pageIndex:that.pageNum,
                pageSize:that.pageSize,
                applytime:that.timer
			};
			that.$http.post('/api/getauduitList',formData,{
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
                    for (let index = 0; index < that.evaluatingList.length; index++) {
                        const element = that.evaluatingList[index];
                        element.state = 0;
                    }
                }
            })  
            .catch(function(error) {
                console.log(error);
            });
        },


        webClose(){
            closeWeb()
        },
        webHistory(){
            history.go(-1) 
        },

        affirmSelect(index){
            const that = this;
            that.$store.state.audit = that.evaluatingList[index];
            history.go(-1) 
        }
    },
}
</script>

<style lang="scss" scoped="">
@import '../assets/scss/common.scss'; 
#Nominator{
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
                height: .48rem;
                border-radius: 50%;
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
    ul{
        padding-top: .88rem;
        li{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background: #fff;
            margin-top: .2rem;
            padding: 0 .32rem;
            height: 1.44rem;
            span{
                width: .8rem;
                overflow: hidden;
            }
            p{
                flex: 1;
                font-size: .32rem;
                color: #333333;
                padding-left: .32rem;
            }
        }
    }
}
  
  

</style>   