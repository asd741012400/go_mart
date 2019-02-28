<template>
	<div id="EvaluateDetails">
		<div class="user">
			<div>
				<p>
					<strong>李茂</strong>
					<span>评测人</span>
				</p>
				<em>政教处</em>
			</div>
			<b><img src="http://cs.veducloud.com/api/cs/v0.1/public/8A2365F8362148DB76D75B0BEFF418D7" alt=""></b>
		</div>
		<div class="basicMessage">
			<div class="titles">
				<i></i>
				<p>基本信息</p>
			</div>
			<ul>
				<li>
					<span>评测时间</span>
					<p>2018年12月15日 08：30</p>
				</li>
				<li>
					<span>评测题库</span>
					<p>2020级数控技术应用评测</p>
				</li>
				<li>
					<span>发起部门</span>
					<p>政教处</p>
				</li>
				<li>
					<span>评测类型</span>
					<p>教师互测</p>
				</li>
			</ul>
		</div>

		<div class="EvaluateParticulars">
			<div class="titles">
				<i></i>
				<p>基本信息</p>
				<div>
					<a>总得分：</a>
					<span>90分</span>
				</div>
			</div>
			<div class="topicDetails">
				<h3 @click="topicListChange()">
					<span>展开所有评分项（30题）</span>
					<i :class=" topicListShow ? '' : 'active' "><img src="../assets/images/icon_arrowsB1.png" alt=""></i>
				</h3>
				<div class="topicList" v-if="topicListShow">
					<div class="topicDetailsList">
						<p>1. 设备故障后操作工人应</p>
						<a>格式规范，教学设计合理，层次清楚</a>
						<ul>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
						</ul>
					</div>
					<div class="topicDetailsList">
						<p>1. 设备故障后操作工人应</p>
						<a>格式规范，教学设计合理，层次清楚</a>
						<ul>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
						</ul>
					</div>
					<div class="topicDetailsList">
						<p>1. 设备故障后操作工人应</p>
						<a>格式规范，教学设计合理，层次清楚</a>
						<ul>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
							<li>
								<i><img src="../assets/images/icon_unselected.png" alt=""></i>
								<span>（5分）立即切断电源</span>
							</li>
						</ul>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
    name: 'EvaluateDetails',
    data(){
        return {
        	topicListShow:false
        }
    },
    components:{
        // 组件实例化
    },
  
    mounted(){
    },
    created(){
		document.title = "别人评我详情"
    },
    methods: {
    	topicListChange(){
    		const that = this;
    		that.topicListShow = !that.topicListShow;
    	}
    },
}
</script>

<style lang="scss" scoped="">
/*@import ''*/ 

#EvaluateDetails{
	.user{
		height: 2.24rem;
		border-bottom: 1px solid #F2F5F5;
		display: flex;
		align-items:center;
		padding: 0 .32rem;
		div{
			flex:1;
			p{
				display: flex;
				align-items:center;
				justify-content: flex-start;
				strong{
					font-size: .48rem;
					color: #333333;
				}
				span{
					font-size: .24rem;
					color: #03A9F4;
					margin-left: .18rem;
					border:1px solid #03A9F4;
					border-radius: 4px;
					padding: 0 .12rem;
				}
			}
			em{
				display: block;
				font-style: normal;
				font-size: .28rem;
				color: #999999;
				padding-top: .32rem;
			}
		}
		b{
			width: 1.28rem;
			height: 1.28rem;
			border-radius: 50%;
			overflow: hidden;
		}
	}

	.basicMessage{
		padding: 0 .32rem;
		.titles{
			display: flex;
			align-items:center;
			height: .96rem;
			margin-top: .4rem;
			i{
				width: .08rem;
				height: .32rem;
				background: #03A9F4;
				margin-right: .16rem;
			}
			p{
				font-size: .36rem;
				color: #333333;
				font-weight: bold;
				flex:1;
			}
		}
		ul{
			li{
				display: flex;
				font-size: .32rem;
				height: .96rem;
				align-items:center;
				border-bottom: 1px solid #F2F5F5;
				span{
					width: 2rem;
					color: rgba(51,51,51,0.87);
				}
				p{
					color: rgba(102,102,102,0.87);
					flex:1;
				}
			}
		}
	}
	.EvaluateParticulars{
		padding: 0 .32rem;
		.titles{
			display: flex;
			align-items:center;
			height: 1.5rem;
			i{
				width: .08rem;
				height: .32rem;
				background: #03A9F4;
				margin-right: .16rem;
			}
			p{
				font-size: .36rem;
				color: #333333;
				font-weight: bold;
				flex:1;
			}
			div{
				display: flex;
				align-items:center;
				a{
					font-size: .32rem;
					color: #333333;
				}
				span{
					font-size: .36rem;
					color: rgb(228,65,79);
				}
			}
		}
		.topicDetails{

			h3{
				display: flex;
				font-weight: normal;
				align-items:center;
				span{
					font-size: .32rem;
					color: #03A9F4;
				}
				i{
					width: .28rem;
					&.active{
						transform: rotate(180deg)
					}
				}
			}
			.topicList{
				.topicDetailsList{
					padding: .32rem 0;
					border-bottom:1px solid #F2F5F5;
					p{
						font-size: .36rem;
						color: #333333;
					}
					a{
						font-size: .28rem;
						color: #999999;
					}
					ul{
						padding-top: .1rem;
						li{
							display: flex;
							align-items:center;
							height: .8rem;
							i{
								width: .44rem;
								height: .44rem;
							}
							span{
								font-size: .3rem;
								color: #333333;
							}
						}
					}
				}
			}
		}
		
	}	
}

</style>