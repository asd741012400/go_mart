<template>
	<div id="EvaluatingList">
		<ul>
			<li v-for="(item, index) in evaluatingList" @click="theJumpPage(index)">
				<b><img :src="item.iconurl" alt=""></b>
				<div>
					<p>{{item.title}}</p>
					<time>时间段：{{item.sdate}}-{{item.edate}}</time>
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
	    		<p>还没有收到消息哦~</p>
	    	</div>
	    </div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
	
    name: 'EvaluatingList',
    data(){
        return {
			evaluatingUrl:this.$store.state.evaluating,
			evaluatingList:[],
            evaluatingListTotal: 0,
			pageNum: 1,
			pageSize:8,
			loading: false,
            loading2: false,
            withoutData: false,	
        }
    },
    components:{
        // 组件实例化
    },
   
    mounted(){
		this.appEvaluationInfoList()
    },
    created(){
		document.title="通用测评";
    	document.body.style.background = "#f8f8f8";
		var qs=require('qs');
		const that = this; 

		sessionStorage.setItem("uid", this.$route.query.uid);
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
		that.common.setingTtitle('通用测评2222')

    },
    methods: {
		theJumpPage(index){
			const that = this;
			sessionStorage.setItem("id", that.evaluatingList[index].id);
			sessionStorage.setItem("qid", that.evaluatingList[index].qid);
			that.loading = true;
            that.loading2 = true;
			that.withoutData = false;
			if(that.evaluatingList[index].isEvaluation)
			{
				that.$router.push({
					name: "InquireQuestionBank",
				});
			}
			else
			{
				that.$router.push({
					name: "AddQuestionBank",
				});
			}
			
			
		},
		appEvaluationInfoList(){
			const qs=require('qs');
			const that = this;
            that.informationList = [];
            that.pageNum = 1;
            that.loading = true;
            that.loading2 = true;
			that.withoutData = false;
			const formData = {
				uid:sessionStorage.uid,
				pageNum:that.pageNum,
				pageSize:that.pageSize,
				schoolId:sessionStorage.schoolId
			};
			that.$http.post(that.evaluatingUrl+'api/Questionbank/AppEvaluationInfoList',qs.stringify(formData))
				.then(response=>{
					if(response.data.datacount > 0)
                    {
                        that.evaluatingListTotal = response.data.datacount;
                        that.evaluatingList = response.data.data;
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
                        that.evaluatingListTotal = response.data.datacount;
                        that.evaluatingList = response.data.data;
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
				uid:sessionStorage.uid,
				pageNum:that.pageNum,
				pageSize:that.pageSize,
				schoolId:sessionStorage.schoolId
			};
			that.$http.post(that.evaluatingUrl+'api/Questionbank/AppEvaluationInfoList',qs.stringify(formData))
				.then(response=>{
					if (that.evaluatingList.length <= that.evaluatingListTotal) {
						that.evaluatingList = that.evaluatingList.concat(
							response.data.data
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
#EvaluatingList{
	ul{
		li{
			background: url(../assets/images/icon_arrowsR2.png) right .32rem center /.16rem no-repeat #fff;
			height: 1.56rem;
			display: flex;
			align-items:center;
			padding: 0 0.32rem;
			margin-top: .2rem;
			b{
				width: .96rem;
				height: .92rem;
			}
			div{
				flex:1;
				padding-left: .32rem;
				p{
					width: 100%;
					font-size: .32rem;
					color: #333333;
					margin-bottom: .1rem;
					overflow: hidden;
					height: .4rem;
					text-overflow:ellipsis;
					white-space: nowrap;
					width: 5rem;
				}
				time{
					font-size: .24rem;
					color: #999999;
				}
			}
		}
	}
  }


</style>   