<template>
	<div id="QuestionBank">
		<h2>{{titles}}</h2>
		<p class="hint">{{hint}}</p>
		<div class="questionBankContent">
			<h3>{{aProblem.title}}</h3>
			<!-- <a>格式规范，教学设计合理，层次清楚</a> -->
			<ul>
				<li v-for="(item, index) in aProblem.optionlist" >
					<span>（{{item.score}}分）{{item.title}}</span>
					<p class="select">
						<em>选择评测人员</em>
						<i><img src="../assets/images/icon_arrowsB1.png" alt=""></i>
					</p>
					<div class="pitchOn">
						<div>
							<p v-for="(itemName, indexs) in item.teacherlist">
								<b><img :src="itemName.photo" alt=""></b>
								<a>{{itemName.name}}</a>
							</p>
						</div>
					</div>
				</li>
			</ul>
			<!-- <div class="count">
				<p>总评测人：{{teacherlist.length}}人</p>
				<span>未评测人：{{differenceValue}}人</span>
			</div> -->
		</div>
		<div class="switchTheTopic">
			<span class="upOneLevel" @click="upQuestion">
				<i v-if="index == 0"><img src="../assets/images/icon_arrowsLeft1.png" alt=""></i>
				<i v-else><img src="../assets/images/icon_arrowsLeft2.png" alt=""></i>
				<a :class=" index == 0 ? 'active': ''">上一题</a>
			</span>
			<p>{{index+1}}/{{questionBanList.length}}</p>	
			<span class="nextLevel" @click="nextQuestion"> 
				<a :class="index == questionBanList.length-1 ? 'active' : ''">下一题</a>
        <i v-if="index == questionBanList.length-1"><img src="../assets/images/icon_arrowsRight1.png" alt=""></i>
				<i v-else><img src="../assets/images/icon_arrowsRight2.png" alt=""></i>
			</span>
		</div>

	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
  name: "QuestionBank",
  data() {
    return {
      questionBankUrl:this.$store.state.evaluating,
      titles: "",
      hint: "温馨提示：点击选择评测人员可针对不同的人测评",
      submitSucceedShow: false,
      submitBtnShow: true,
      index:0,
      questionBanList:[],
      selectFigure:false,
      aProblem:[],
      aProblemTeacherlist:[],
      aProblemIndex:0,
      teacherlist:[],
      differenceValue:0,
      alwaysQuestion:[],
    };
  },
  components: {
    // 组件实例化
  },

  mounted() {},
  created() {
    document.title = "评测题库";
    const that = this;
    that.examine();
    that.common.setingTtitle("评测题库")
  },
  methods: {
    
    upQuestion(){
      const that = this;
      if(that.index > 0)
      {
        that.index = --that.index;
        that.aProblem = that.questionBanList[that.index];
      }
    },
    nextQuestion(){
      const that = this;
      if(that.index < that.questionBanList.length-1)
      {
        that.index = ++that.index;
        that.aProblem = that.questionBanList[that.index];
      }
      
    },

    examine(){
			const that = this;
			const qs=require('qs');
      const formData = {
        id:sessionStorage.id,
        qid:sessionStorage.qid
			};
      console.log("查询")
      that.$http.post(that.questionBankUrl+'api/Questionbank/AppQuestionbankQuery',qs.stringify(formData))
				.then(response=>{
          that.questionBanList = response.data.data.itemlist
          that.aProblem = that.questionBanList[that.index];
          that.titles = response.data.data.q_title
				})  
				.catch(function(error) {
					console.log(error);
				});

    },





  }
};
</script>

<style lang="scss" scoped="">
/*@import ''*/
#QuestionBank {
  h2 {
    font-size: 0.4rem;
    font-weight: normal;
    color: #333333;
    padding: 0.48rem 0.32rem 0.3rem;
  }
  .hint {
    font-size: 0.28rem;
    color: #8c9bdc;
    padding: 0 0.32rem;
  }
  .questionBankContent {
    padding: 0.64rem 0.32rem 1.4rem;
    h3 {
      font-size: 0.36rem;
      color: #333333;
      font-weight: normal;
    }
    a {
      font-size: 0.28rem;
      color: #999999;
    }
    ul {
      padding: 0.48rem 0 0;
      li {
        padding-bottom: 0.48rem;
        span {
          display: block;
          font-size: 0.3rem;
          color: #333333;
        }
        p.select {
          display: flex;
          align-items: center;
          padding-top: 0.16rem;
          padding-left: 0.2rem;
          em {
            font-style: normal;
            font-size: 0.28rem;
            color: #15b4f1;
          }
          i {
            width: 0.3rem;
            transform: rotate(270deg);
          }
        }
        .pitchOn {
          div {
            display: flex;
            padding-top: 0.3rem;
            flex-wrap: wrap;
            p {
              margin: 0 0.15rem;
              b {
                display: block;
                width: 0.66rem;
                height: 0.66rem;
                border-radius: 50%;
                overflow: hidden;
              }
              a {
                text-align: center;
                display: block;
                font-size: 0.24rem;
                color: #666666;
              }
            }
          }
        }
      }
    }
    .count {
      display: flex;
      color: #f5a623;
      padding-top: 0.64rem;
      padding-left: 0.2rem;
      font-size: 0.28rem;
      p {
        flex: 1;
      }
      span {
        flex: 1;
      }
    }
  }
  .switchTheTopic {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    background: #fff;
    box-shadow: -1px 0 10px #e0e0e0;
    .upOneLevel {
      left: 0.32rem;
      display: flex;
      align-items: center;
      height: 1rem;
      top: 0;
      position: absolute;
      i {
        width: 0.16rem;
      }
      a {
        padding-left: 0.14rem;
        font-size: 0.32rem;
        color: #03a9f4;
        &.active {
          color: #bbbbbb;
        }
      }
    }
    .nextLevel {
      right: 0.32rem;
      display: flex;
      align-items: center;
      position: absolute;
      height: 1rem;
      top: 0;
      i {
        width: 0.16rem;
      }
      a {
        padding-right: 0.14rem;
        font-size: 0.32rem;
        color: #03a9f4;
        &.active {
          color: #bbbbbb;
        }
      }
    }
    .submitBtn {
      position: absolute;
      top: 0;
      right: 0.32rem;
      height: 1rem;
      display: flex;
      align-items: center;
      a {
        width: 1.2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 4px;
        background: #15b4f1;
        color: #fff;
        font-size: 0.32rem;
      }
    }
    p {
      text-align: center;
      font-size: 0.28rem;
      color: #999999;
      line-height: 1rem;
    }
  }
  .submitSucceed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      p {
        width: 2.2rem;
        height: 2.2rem;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          width: 1.04rem;
        }
        a {
          color: #fff;
          font-size: 0.3rem;
          padding-top: 0.18rem;
        }
      }
    }
  }



  .selectFigure{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
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

}
</style>