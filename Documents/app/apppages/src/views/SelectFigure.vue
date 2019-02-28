<template>
	<div id="SelectFigure">
		<ul>
			<li>
				<span><img src="http://cs.veducloud.com/api/cs/v0.1/public/8A2365F8362148DB76D75B0BEFF418D7" alt=""></span>
				<p>李茂</p>
				<a>政教处</a>
				<i><img src="../assets/images/icon_pitchOn3.png" alt=""></i>
				<i><img src="../assets/images/icon_unselected2.png" alt=""></i>
			</li>
		</ul>

		<div class="save">
			<span class="resetBtn">重置</span>
			<span class="saveBtn">保存</span>
		</div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
    name: 'SelectFigure',
    data(){
        return {
        }
    },
    components:{
        // 组件实例化
    },
   
    mounted(){
    },
    created(){
		document.title = "选择人员";
        this.common.setingTtitle("选择人员")
    },
    methods: {
   
    },
}
</script>

<style lang="scss" scoped="">
/*@import ''*/ 
#SelectFigure{
	ul{
		padding: 0 .32rem 1.4rem;
		display: flex;
		flex-wrap:wrap;
		overflow: hidden;
		li{
			margin-top: .3rem;
			padding: 0 .42rem;
			position: relative;
			span{
				width: 1.3rem;
				margin: 0 auto;
				height: 1.3rem;
				display: block;
				overflow: hidden;
				border-radius: 50%;
			}
			p{
				font-size: .32rem;
				color: #666666;
				text-align: center;
			}
			a{
				display: block;
				text-align: center;
				font-size: .24rem;
				color: #999999;
			}
			i{
				position: absolute;
				top: 0;
				right: 0;
				width: .44rem;
				height: .44rem;
			}
		}
	}

	.save{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1rem;
		background: #fff;
		box-shadow: -1px 0 10px #e0e0e0;
		display: flex;
		justify-content:flex-end;
		align-items:center;
		span{
			width: 1.2rem;
			height: .6rem;
			text-align: center;
			line-height: .6rem;
			font-size: .32rem;
			border-radius: 4px;
			&.saveBtn{
				background: #15B4F1;
				border: 1px solid #15B4F1;
				color: #fff;
				margin-right: .32rem;
			}
			&.resetBtn{
				border: 1px solid #E2E2E2;
				color: #B2B2B2;
				margin-right: .14rem;
			}
		}
	}
}


</style>