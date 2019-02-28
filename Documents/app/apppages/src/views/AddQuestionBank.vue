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
					<p class="select" @click="selectFigureFn(index)">
						<em>选择评测人员</em>
						<i><img src="../assets/images/icon_arrowsB1.png" alt=""></i>
					</p>
					<div class="pitchOn">
						<div>
							<p v-for="(itemName, indexs) in aProblemTeacherlist[index]">
								<b><img :src="itemName.photo" alt=""></b>
								<a>{{itemName.name}}</a>
							</p>
						</div>
					</div>
				</li>
			</ul>
			<div class="count">
				<p>总评测人：{{teacherlist.length}}人</p>
				<span>未评测人：{{differenceValue}}人</span>
			</div>
		</div>
		<div class="switchTheTopic">
			<span class="upOneLevel" @click="upQuestion">
				<i v-if="index == 0"><img src="../assets/images/icon_arrowsLeft1.png" alt=""></i>
				<i v-else><img src="../assets/images/icon_arrowsLeft2.png" alt=""></i>
				<a :class=" index == 0 ? 'active': ''">上一题</a>
			</span>
			<p>{{index+1}}/{{questionBanList.length}}</p>	
			<span class="nextLevel" v-if="submitBtnShow" @click="nextQuestion"> 
				<a :class="index == questionBanList.length-1 ? 'active' : ''">下一题</a>
        <i v-if="index == questionBanList.length-1"><img src="../assets/images/icon_arrowsRight1.png" alt=""></i>
				<i v-else><img src="../assets/images/icon_arrowsRight2.png" alt=""></i>
			</span>
			<span class="submitBtn" v-else @click="submitData"><a>提交</a></span>
		</div>

		<div class="submitSucceed" v-if="submitSucceedShow">
			<div>
				<p>
					<span><img src="../assets/images/icon_submitSucceed.png" alt=""></span>
					<a>提交成功</a>
				</p>
			</div>
		</div>


    <div class="selectFigure" v-if="selectFigure">
      <ul>
        <li 
          v-for="(item, index) of teacherlist" 
          @click="pitchOnFigure(index)" 
          v-if="item.aProblemIndex == undefined ||  item.aProblemIndex == aProblemIndex"
        >
          <span><img :src="item.photo" alt=""></span>
          <p>{{item.name}}</p>
          <a>{{item.deptname}}</a>
          <i v-if="item.state"><img src="../assets/images/icon_pitchOn3.png" alt=""></i>
          <i v-else><img src="../assets/images/icon_unselected2.png" alt=""></i>
        </li>
      </ul>

      <div class="save">
        <!-- <span class="resetBtn" @click="resetFn">重置</span> -->
        <span class="saveBtn" @click="saveBtnFn">保存</span>
      </div>
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

    that.answer();
    that.common.setingTtitle('评测题库')


  },
  methods: {

    
    // 提交数据
    submitData(){
      const that = this;
      if( that.differenceValue == 0 )
      {
        // 添加最后一题数据到数组中
        that.alwaysQuestion[that.index] = {};
        that.alwaysQuestion[that.index].aProblem = that.aProblem;
        that.alwaysQuestion[that.index].aProblemTeacherlist = that.aProblemTeacherlist;
        that.alwaysQuestion[that.index].teacherlist = JSON.parse(JSON.stringify(that.teacherlist));
        // that.differenceValue = that.teacherlist.length;

        // 数据重组
        let optionidList = [];
        let optionidListIndex = 0;

        // 获取每一道题目
        that.alwaysQuestion.map((item , index) => {
          let elementOptionlist = item.aProblem.optionlist;
          let elementAProblemTeacherlist = item.aProblemTeacherlist;

          // 获取每一道题目下列选项进行拼装
          elementOptionlist.map((itemName , idx) => {

            let optionid = {
              optionid : itemName.optionid,
              teacherlist:[]
            }
            let teacherlists = []
            optionidList.push(optionid)

            // 判断下列选项是否有人选中
            if(elementAProblemTeacherlist[idx] == undefined)
            {
              optionidList[optionidListIndex].teacherlist = [];
            }
            else
            {
              // 便利每一个选项下列选中的老师，添加进提交数组
              elementAProblemTeacherlist[idx].map((itemNames , indexs) => {
                let teacherlistText = {
                  accountid : itemNames.account_id
                }
                teacherlists.push(teacherlistText)
              })

              optionidList[optionidListIndex].teacherlist = teacherlists
            }
            optionidListIndex++;
            
          })
       


        })

        // 数据重组完成，进行提交
			  const qs=require('qs');
        let formData = {
          eid:sessionStorage.id,
          userid:sessionStorage.uid,
          optionlist:optionidList
        }
        let strFormData = {
          str:JSON.stringify(formData)
        };
        that.$http.post(that.questionBankUrl+'api/Questionbank/QuestionTeacherOptionAdd',qs.stringify(strFormData))
          .then(response=>{
            if(response.data.errcode == 0)
            {
              that.$alert('提交成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  that.$router.go(-1);
                }
              });
            }
            else
            {
              that.$alert(response.data.errmsg, '', {
                confirmButtonText: '确定',
                callback: action => {
                  that.$router.go(0);
                }
              });
            }
            

          }) 
          .catch(function(error) {
            that.$alert('提交失败,已刷新请重试', '', {
              confirmButtonText: '确定',
              callback: action => {
                that.$router.go(0);
              }
            });
          });

      }
      else
      {
        that.$alert('还有未测评人', '', {});
      }
    
    },


    // 上一题
    upQuestion(){
      const that = this;
      let differenceValue = 0;
      if(that.index >= 0)
      {
        that.index = --that.index;
        that.aProblemTeacherlist= that.alwaysQuestion[that.index].aProblemTeacherlist;
        that.teacherlist = that.alwaysQuestion[that.index].teacherlist;
        that.aProblemTeacherlist.map((item , index) => {
          if(item != null)
          {
            item.map((item , index) => {
              differenceValue++;
            })
          }
        })
        that.differenceValue = that.teacherlist.length - differenceValue 
        that.aProblemFn()

        if(that.index < that.questionBanList.length-1)
        {
          that.submitBtnShow = true
        }
      }
    },

    // 下一题
    nextQuestion(){
      const that = this;
      let differenceValue = 0;
      if( that.differenceValue == 0 )
      {
        if(that.index < that.questionBanList.length-1)
        {
          that.alwaysQuestion[that.index] = {};
          that.alwaysQuestion[that.index].aProblem = that.aProblem;
          that.alwaysQuestion[that.index].aProblemTeacherlist = JSON.parse(JSON.stringify(that.aProblemTeacherlist));
          that.alwaysQuestion[that.index].teacherlist = JSON.parse(JSON.stringify(that.teacherlist));
          that.index = ++that.index;
          that.aProblemFn();
          that.aProblemTeacherlist= [];
          if(that.alwaysQuestion[that.index] == undefined)
          {
            that.differenceValue = that.teacherlist.length;

            for (var i = 0; i < that.teacherlist.length; i++) {
              const element = that.teacherlist[i];
              element.state = false;
              element.aProblemIndex = undefined;
            }
          }
          else
          {
            for (var i = 0; i < that.teacherlist.length; i++) {
              const element = that.teacherlist[i];
              element.state = that.alwaysQuestion[that.index].teacherlist[i].state;
              element.aProblemIndex = that.alwaysQuestion[that.index].teacherlist[i].aProblemIndex;
            }
            that.aProblemTeacherlist= that.alwaysQuestion[that.index].aProblemTeacherlist;
            that.aProblemTeacherlist.map((item , index) => {
              if(item != null)
              {
                item.map((item , index) => {
                  differenceValue++;
                })
              }
            })
            that.differenceValue = that.teacherlist.length - differenceValue 

          }
          if(that.index >= that.questionBanList.length-1)
          {
            that.submitBtnShow = false
          }
        }
      }
      else
      {
        that.$alert('还有未测评人', '', {});
      }
    },

    // 选择老师
    saveBtnFn(){
      const that = this;
      let differenceValue = 0;
      that.aProblemTeacherlist[that.aProblemIndex] = [];
      
      that.teacherlist.map((item , index) => {
        if(item.state)
        {
          if(item.aProblemIndex == undefined || item.aProblemIndex == that.aProblemIndex)
          {
            item.aProblemIndex = that.aProblemIndex;
            that.aProblemTeacherlist[that.aProblemIndex].push(item)
          }
        }
        else
        {
          item.aProblemIndex = undefined;
        }
      })
      that.selectFigure = false;
      that.aProblemTeacherlist.map((item , index) => {
        if(item != null)
        {
          item.map((item , index) => {
            differenceValue++;
          })
        }
        
      })
      that.differenceValue = that.teacherlist.length - differenceValue 

    },
 
    // 弹出选择老师弹窗
    selectFigureFn(idx){
      const that = this;
      that.selectFigure = true;
      that.aProblemIndex = idx;
    },

    // 选中/取消老师
    pitchOnFigure(idx){
      const that = this;
      if(that.teacherlist[idx].aProblemIndex == undefined || that.teacherlist[idx].aProblemIndex  == that.aProblemIndex)
      {
        that.teacherlist[idx].state = !that.teacherlist[idx].state;
        that.teacherlist.splice(idx , 1 ,that.teacherlist[idx])
      }
    },

    //初始数据
    answer(){
      const that = this;
			const qs=require('qs');
      const formData = {
        id:sessionStorage.id,
        qid:sessionStorage.qid
      };
      console.log("新增")
      that.$http.post(that.questionBankUrl+'api/Questionbank/AppQuestionbankList',qs.stringify(formData))
				.then(response=>{
          that.questionBanList = response.data.data.itemlist
          
          that.teacherlist = response.data.data.teacherlist
          that.teacherlist.map((item , index) => {
            item.state = false
          })
          if(that.questionBanList.length <= 1)
          {
            that.submitBtnShow = false
          }
          that.differenceValue = that.teacherlist.length
          that.titles = response.data.data.q_title
          that.aProblemFn()
				}) 
				.catch(function(error) {
					console.log(error);
        });
        
    },

    aProblemFn(){
      const that = this;
      that.aProblem = that.questionBanList[that.index];
      that.aProblem.optionlist.map((item , index) => {
        item.teacherlist = []
      })
    }



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
                margin: 0 auto;
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
      padding: 0 .32rem 2rem;
      display: flex;
      flex-wrap:wrap;
      align-items: flex-start;
      align-content: flex-start;
      height: 100%;
      overflow-y: scroll;
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