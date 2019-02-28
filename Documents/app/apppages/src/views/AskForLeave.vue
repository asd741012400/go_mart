<template>
	<div id="AskForLeave">
		<ul>
			<li>
				<span><b><img :src="userData.avatar" alt=""></b></span>
				<p>{{userData.name}}</p>
			</li>
			<!-- 学生 -->
			<li v-if="messageType == 2">
				<span>班级</span>
				<p>{{userData.belongDept}}</p>
			</li>
			<li v-if="messageType == 2">
				<span>学号</span>
				<p>{{userData.num}}</p>
			</li>
			<li v-if="messageType == 2">
				<span>请假类型</span>
				<p>{{userData.types}}</p>
			</li>
			<li v-if="messageType == 2">
				<span>请假事由</span>
				<p>{{userData.reason}}</p>
			</li>
			<li v-if="messageType == 2">
				<span>是否出校</span>
				<p>{{userData.isOutSchool}}</p>
			</li>
      

			<!-- 教师 -->
			<li v-if="messageType == 3">
				<span>部门</span>
				<p>{{userData.belongDept}}</p>
			</li>
			<li v-if="messageType == 3">
				<span>工号</span>
				<p>{{userData.num}}</p>
			</li>
			<li v-if="messageType == 3">
				<span>请假类型</span>
				<p>{{userData.types}}</p>
			</li>
      


			<li>
				<span>开始时间</span>
				<p>{{userData.startTime}}</p>
			</li>
			<li>
				<span>结束时间</span>
				<p>{{userData.endTime}}</p>
			</li>
			<li>
				<span>请假时长</span>
				<p>{{userData.duration}}</p>
			</li>
			<li>
				<span>请假理由</span>
				<p>{{userData.reason}}</p>
			</li>


      <li v-if="messageType == 2 && userData.attachment != ''">
        <span>请假证明</span>
        <div>
          <p>
            <b><img :src="userData.attachment" alt=""></b>
          </p>
        </div>
      </li>

      <li v-if="messageType == 3 && attachment != ''">
        <span>上传附件</span>
        <div>
          <p>
            <b v-for="(item , index) in attachment"><img :src="item.attachermentUrl" alt=""></b>
          </p>
        </div>
      </li>

		</ul>
		<div class="status"><img :src="finalResultUrl" alt=""></div>
		<div class="classSwitching" v-if="messageType == 3">
			<div class="classSwitchingList" v-for="(item , index) in coursesList">
				<h3>调课明细{{index+1}}</h3>
				<div class="classSwitchingListDetails">
					<div>
						<p class="name">{{item.teacherLeaveName}}</p>
						<p class="hour">{{item.coursesDate}}{{item.coursesSection}}</p>
						<p class="subject">{{item.coursesName}}</p>
					</div>
					<div>
						<p class="name">{{item.substituteTeacherName}}</p>
						<p class="hour">{{item.substituteCoursesDate}}{{item.substituteCoursesSection}}</p>
						<p class="subject">{{item.substituteCoursesName}}</p>
					</div>
					<span><img src="../assets/images/icon_transform.jpg" alt=""></span>

				</div>
			</div>
		</div>
		<div class="agreeOrNot">
			<div class="agreeOrNotList" v-for="(item, index) in approvalNode">
				<span v-if="userRole == 'teacher'"><img src="../assets/images/icon_pitchOn2.png" alt=""></span>
				<span v-else><img src="../assets/images/icon_pitchOn1.png" alt=""></span>
				<div class="agreeOrNotListLeft">
					<div class="tle">
						<a v-if="item.nodeName == '调课人'">{{item.nodeName}}</a>
						<a v-else>
              <em v-if="item.deptName != '' || item.name != ''">{{item.deptName}}</em>
              <em v-else>{{item.nodeName}}</em>
            </a>

						<b v-if="item.nodeName == '调课人'">
              <em v-if="item.deptName != '' || item.name != ''">({{item.deptName}}-{{item.name}})</em>
            </b>
						<b v-else>
              <em v-if="item.name != ''">({{item.name}})</em>
            </b>
           <!--  <a>{{item.nodeName}}</a>
            <b>
              <em v-if="item.deptName != '' || item.name != ''">({{item.deptName}}-{{item.name}})</em>
            </b> -->
            

						<i :class="userRole == 'teacher' ? 'teacher' : '' ">{{item.result}}</i>
					</div>
					<div class="details" v-if="item.reason != ''">
						<p>{{item.reason}}</p>
						<time>{{item.approvalTime}}</time>
					</div>
				</div>
				<div class="blank" v-if="item.reason != ''"></div>
			</div>
		</div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS

export default {
  name: "AskForLeave",
  data() {
    return {
      url: this.$store.state.userDataUrl3,
      finalResultUrl: "",
      userId: sessionStorage.userId,
      userRole: sessionStorage.userRole,
      messageType: 0,
      coursesList: [],
      userData: [],
      attachment: [],
      approvalNode: []
    };
  },
  components: {
    // 组件实例化
  },
  mounted() {
    const that = this;
    that.messageType = that.$route.query.messageType;
    if (that.messageType == "3") {
      that
        .$http({
          method: "GET",
          url:
            that.url +
            "api/leave/teacher/v0.1/detailIds/" +
            that.$route.query.leaveId,
          headers: {
            accessToken: that.userId
          }
        })
        .then(function(response) {
          // console.log(response);

          that.userData = response.data.leaveInfo;
          that.attachment = response.data.attachments;
          that.userData.types = that.TeacherLeaveTypeEnum(that.userData.type);
          that.finalResultUrl = that.finalResult(that.userData.finalResult);

          that.coursesList = response.data.leaveInfo.courses;
          that.coursesList.map((item, index) => {
            item.coursesSection = that.courseSectionEnum(item.coursesSection);
            item.substituteCoursesSection = that.courseSectionEnum(
              item.substituteCoursesSection
            );
          });

          that.approvalNode = response.data.approvalNodes;
          that.approvalNode.map((item, index) => {
            item.result = that.TeacherLeaveApprovalResultEnum(item.result);
          });

          // console.log(that.approvalNode);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (that.messageType == "2") {
      that
        .$http({
          method: "GET",
          url:
            that.url + "api/leave/v0.2/detailIds/" + that.$route.query.leaveId,
          headers: {
            accessToken: that.userId
          }
        })
        .then(function(response) {
          that.userData = response.data.leaveInfo;
          that.userData.types = that.TeacherLeaveTypeEnum(that.userData.type);
          that.userData.isOutSchool = that.IsOutSchEnum(
            that.userData.isOutSchool
          );
          that.finalResultUrl = that.finalResult(that.userData.finalResult);

          that.approvalNode = response.data.approvalNodes;
          that.approvalNode.map((item, index) => {
            item.result = that.TeacherLeaveApprovalResultEnum(item.result);
          });
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    // var qs=require('qs');
    document.title = "请假详情";
    document.body.style.background = "#F8F8F8";
    const that = this;
    that.common.setingTtitle('请假详情')
  },
  methods: {
    courseSectionEnum: num => {
      switch (num) {
        case 1:
          return "第一节";
          break;
        case 2:
          return "第二节";
          break;
        case 3:
          return "第三节";
          break;
        case 4:
          return "第四节";
          break;
        case 5:
          return "第五节";
          break;
        case 6:
          return "第六节";
          break;
        case 7:
          return "第七节";
          break;
        case 8:
          return "第八节";
          break;
        case 9:
          return "第九节";
          break;
        case 10:
          return "第十节";
          break;
        case 11:
          return "第十一节";
          break;
        case 12:
          return "第十二节";
          break;
        default:
          console.log("错误");
      }
    },

    TeacherLeaveTypeEnum: num => {
      switch (num) {
        case 1:
          return "公事";
          break;
        case 2:
          return "事假";
          break;
        case 3:
          return "病假";
          break;
        case 4:
          return "产假";
          break;
        case 5:
          return "婚假";
          break;
        case 6:
          return "丧假";
          break;
        case 7:
          return "年假";
          break;
        case 8:
          return "调休";
          break;
        case 9:
          return "探亲假";
          break;
        default:
          console.log("错误");
      }
    },

    TeacherLeaveApprovalResultEnum: num => {
      switch (num) {
        case 0:
          return "无状态";
          break;
        case 1:
          return "已同意";
          break;
        case 2:
          return "拒绝";
          break;
        case 3:
          return "审批中";
          break;
        default:
          console.log("错误");
      }
    },

    finalResult: num => {
      switch (num) {
        case 1: //正在处理
          return require("../assets/images/seal_proceed.png");
          break;
        case 2: //审核完成
          return require("../assets/images/seal_accomplish.png");
          break;
        case 3: //驳回
          return require("../assets/images/seal_reject.png");
          break;
        case 4: //撤回
          return require("../assets/images/seal_revocation.png");
          break;
        case 5: //过期
          return require("../assets/images/seal_pastDue.png");
          break;
        case 6: //学生出校
          return require("../assets/images/seal_get_out.png");
          break;
        case 7: //超时未出校
          return require("../assets/images/seal_accomplish.png");
          break;
        case 8: //超时未返校
          return require("../assets/images/seal_overtime.png");
          break;
        case 9: //学生返校
          return require("../assets/images/seal_return.png");
          break;
        case 10: //学生超时返校
          return require("../assets/images/seal_return.png");
          break;
        default:
          console.log("错误");
      }
    },

    IsOutSchEnum: num => {
      switch (num) {
        case 1:
          return "要出校";
          break;
        case 2:
          return "不出校";
          break;
          break;
        default:
          console.log("错误");
      }
    }
  }
};
</script>

<style lang="scss" scoped="">
/*@import ''*/
#AskForLeave {
  position: relative;
  ul {
    background: #fff;
    li {
      border-bottom: 1px solid #f8f8f8;
      display: flex;
      align-items: center;
      padding: 0.2rem 0.3rem;
      font-size: 0.32rem;
      color: rgba(51, 51, 51, 0.87);
      span {
        width: 1.84rem;
        overflow: hidden;
        b {
          display: block;
          width: 1.04rem;
          height: 1.04rem;
          overflow: hidden;
          border-radius: 50%;
        }
      }
      div {
        flex: 1;
        p {
          display: flex;
          overflow: hidden;
          width: 5rem;
          b {
            margin-right: 0.1rem;
            width: 1.6rem;
            height: 1.6rem;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .status {
    position: absolute;
    right: 0.32rem;
    top: 0.22rem;
    width: 2rem;
    height: 2rem;
    img {
      width: 100%;
    }
  }
  .classSwitching {
    .classSwitchingList {
      margin-top: 0.2rem;
      background: #fff;
      h3 {
        padding: 0 0.32rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
        color: #8798a4;
        font-weight: normal;
        border-bottom: 1px dashed #e0e0e0;
      }
      .classSwitchingListDetails {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.28rem;
        span {
          position: absolute;
          width: 0.4rem;
          height: 0.48rem;
          top: 0;
        }
        div {
          flex: 1;
          height: 100%;
          text-align: center;
          font-size: 0.3rem;
          color: #333333;
          line-height: 0.68rem;
          padding-bottom: 0.14rem;
          &:nth-of-type(1) {
            border-right: 1px solid #e0e0e0;
          }
        }
      }
    }
  }
  .agreeOrNot {
    overflow: hidden;
    .agreeOrNotList {
      border-bottom: 1px solid #f8f8f8;
      background: #fff;
      position: relative;
      margin-top: 0.2rem;
      span {
        position: absolute;
        width: 0.28rem;
        height: 0.28rem;
        top: 0.36rem;
        left: 0.55rem;
      }
      .agreeOrNotListLeft {
        padding-right: 0.36rem;
        margin-left: 0.68rem;
        border-left: 1px solid #e0e0e0;
        overflow: hidden;
        overflow: hidden;
        .tle {
          display: flex;
          align-items: center;
          height: 1rem;
          padding-left: 0.34rem;
          a {
            font-size: 0.32rem;
            color: rgba(51, 51, 51, 0.87);
            padding-right: 0.2rem;
            em {
              font-style: normal;
            }
          }
          b {
            font-size: 0.28rem;
            color: rgba(102, 102, 102, 0.87);
            flex: 1;
            font-weight: normal;
            em {
              font-style: normal;
            }
          }
          i {
            font-size: 0.32rem;
            color: #62c095;
            font-style: normal;
            &.teacher {
              color: #03a9f4;
            }
          }
        }
        .details {
          margin-left: 0.16rem;
          background: #f8f8f8;
          padding: 0.18rem 0.24rem;
          p {
            font-size: 0.3rem;
            color: rgba(51, 51, 51, 0.87);
          }
          time {
            font-size: 0.26rem;
            color: rgba(153, 153, 153, 0.87);
          }
        }
      }
      .blank {
        height: 0.28rem;
        width: 100%;
      }
    }
  }
}
</style>
