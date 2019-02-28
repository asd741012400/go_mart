<template>
	<div id="AppraisalList">
		<div class="tableTitle">
			<p :class=" tabIndex == 0 ? 'active' : ''" @click="tabChange(0)">
				<span>我的评测</span>
				<em></em>
			</p>
			<p :class=" tabIndex == 1 ? 'active' : ''" @click="tabChange(1)">
				<span>他人评我</span>
				<em></em>
			</p>
		</div>
		<ul>
			<li @click="aaaa">
				<div class="name">
					<b><img src="http://cs.veducloud.com/api/cs/v0.1/public/8A2365F8362148DB76D75B0BEFF418D7" alt=""></b>
					<p>
						<span>张小杰</span>
						<em>2018年级办公室</em>
					</p>
					<strong>90</strong>
				</div>
				<div class="date">
					<time>测评时间：2018/05/17  8：30</time>
					<p>
						<span>已评测</span>
						<i><img src="../assets/images/icon_arrowsR2.png" alt=""></i>
					</p>
				</div>
			</li>
		</ul>
		<a class="add" @click="bbbb"><img src="../assets/images/icon_add.png" alt=""></a>
		<div class="loding" v-if="loading">
	    	<div class="lodingText" v-if="loading2">
	    		<i class="el-icon-loading teacher"></i>
	    		<span>拼命加载中...</span>
	    	</div>
	    	<div class="lodingEnd" v-else>
	    		<span>数据加载完毕</span>
	    	</div>
	    </div>
	    <div class="withoutData" v-if="withoutData">
	    	<div>
	    		<span><img src="../assets/images/EvaluatingListDefault.png" alt=""></span>
	    		<p>还没有收到消息哦~</p>
	    	</div>
	    </div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
    name: 'AppraisalList',
    data(){
        return {
			loading: false,
			loading2: true,
			withoutData: false,
			tabIndex:0
        }
    },
    components:{
        // 组件实例化
    },
 
    mounted(){
    },
    created(){
		document.title = "2018学年下学期综合能力测评";
    	document.body.style.background = "#f8f8f8";
		const that = this;
        that.common.setingTtitle('2018学年下学期综合能力测评')
    },
    methods: {
		tabChange(num){
			const that = this;
			that.tabIndex = num;
		},
		aaaa(){
			this.$router.push({
				name: "EvaluateDetails",
			});
		},
		bbbb(){
			this.$router.push({
				name: "QuestionBank",
			});
		},
    },
}
</script>

<style lang="scss" scoped="">
/*@import ''*/ 
@import '../assets/scss/common.scss'; 

#AppraisalList{
	.tableTitle{
		display: flex;
		align-items:center;
		background: #fff;
		p{
			display: flex;
			align-items:center;
    		justify-content: center;
			height: .9rem;
			flex:1;
			position: relative;
			span{
				text-align: center;
				font-size: .3rem;
				color: #A3B5C7;
			}
			em{
				width:.52rem;
				height: 2px;
				position: absolute;
				bottom: 0;
				background: #15B4F1;
				left: 50%;
				margin-left: -.26rem;
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
	ul{
		overflow: hidden;
		li{
			background: #fff;
			padding: .32rem;
			margin-top: .2rem;
			.name{
				display: flex;
				align-items:center;
				b{
					width: .8rem;
					height: .8rem;
					overflow: hidden;
					border-radius: 50%;
					margin-right: .32rem;
				}
				p{
					overflow: hidden;
					flex:1;
					span{
						display: block;
						font-size: .26rem;
						color: #666666;
					}
					em{
						font-style: normal;
						font-size: .24rem;
						display: block;
						color: #999999;
					}
				}
				strong{
					font-size: .32rem;
					color: #FF5022;
					font-weight: normal;
				}
			}
			.date{
				display: flex;
				align-items:center;
				margin-top: .18rem;
				time{
					font-size: .26rem;
					color: #999999;
					flex:1;
				}
				p{
					display: flex;
					align-items:center;
					span{
						font-size: .26rem;
						color: #999999;
						padding-right: .14rem;
					}
					i{
						width: .16rem;
					}
				}
			}
		}
	}
	.add{
		position: fixed;
		width: 1.1rem;
		height: 1.1rem;
		right: .32rem;
		bottom: .3rem;
	}
}

</style>