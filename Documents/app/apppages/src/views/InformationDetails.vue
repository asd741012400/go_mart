<template>
	<div id="InformationDetails">
		<div class="titles">
			<p>【{{dormNo}}】</p>
			<time>{{date}}</time>
		</div>
		<div class="echartsData">
			<div class="echarts" id="echarts"></div>
			<div class="tle">
				<span>正常考勤/应到人数</span>
				<p>{{studentsNum - students.length}}/{{studentsNum}}</p>	
			</div>
			<div class="tab">
				<div v-for="(item, index) in statusAndCounts">
					<span>{{item.count}}</span>
					<p>{{item.status}}</p>
				</div>
			</div>	
		</div>
		<div class="abnormity">
			<div class="tle">
				<p>异常考勤详细</p>
				<span>{{students.length}}人</span>
			</div>
			<ul>
				<li v-for="(item, index) in students" v-if="students.length > 0">
					<span><img :src="item.portrait" alt=""></span>
					<p class="name">{{item.name}}</p>
					<em>{{item.className}}</em>
					<i>{{item.status}}</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: "InformationDetails",
  data() {
    return {
      url: this.$store.state.userDataUrl2,
      date: null,
      dormNo: null,
      students: [],
      studentsNum: 0,
      statusAndCounts:[]
    };
  },
  components: {
    // 组件实例化
  },
  created() {
    // var qs=require('qs');
    const that = this;
    document.body.style.background = "#f8f8f8";
    that.getInformationDetailsData();
    document.title = that.$route.query.titles;
    that.common.setingTtitle(that.$route.query.titles)
  },
  mounted() {
  },
  methods: {
    getInformationDetailsData: function(res) {
      var that = this;
      console.log(that.$route.query);
      var roomId = that.$route.query.roomId;
      that
        .$http({
          method: "GET",
          url:
            that.url +
            "api/dormitory/v0.1/patrol/resultdetail/roomIds/" +
            roomId +
            "/messageCenter?date=" +
            that.$route.query.date,
          headers: {
            accessToken: sessionStorage.userId
          }
        })
        .then(function(response) {
          that.date = response.data.date;
          that.dormNo = response.data.dormNo;
          that.students = response.data.students;
          that.studentsNum = response.data.total;
          that.statusAndCounts = response.data.statusAndCounts;

          that.drawLine(response.data);


        })
        .catch(function(error) {
          console.log(error);
        });
    },
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("echarts"));
      // 绘制图表
      var normal = data.total - data.students.length;
      var vacant = data.students.length;
      console.log(normal)
      console.log(vacant)
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: data.dormNo,
            type: "pie",
            radius: ["60%", "70%"],
            center: ["50%", "120"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: normal, name: "正常考勤", itemStyle: { color: "#4A90E2" } },
              { value: vacant, name: "缺寝", itemStyle: { color: "#E0E0E0" } }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped="">
.titles {
  background: #fff;
  line-height: 0.96rem;
  p {
    font-size: 0.32rem;
    color: #333333;
    padding: 0 0.32rem;
    border-bottom: 1px solid #e0e0e0;
  }
  time {
    display: block;
    padding: 0 0.32rem;
    font-size: 0.3rem;
    color: #666666;
  }
}
.echartsData {
  height: 5.94rem;
  background: #fff;
  position: relative;
  .tle {
    position: absolute;
    top: 110px;
    text-align: center;
    width: 100%;
    p {
      font-size: 0.4rem;
      color: #4a4a4a;
      letter-spacing: 0.04rem;
    }
    span {
      font-size: 0.24rem;
      color: #bcbcbc;
    }
  }
  .echarts {
    margin-top: 0.2rem;
    height: 4.7rem;
  }
  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
      flex: 1;
      span {
        font-size: 0.4rem;
        color: #6a6a6a;
      }
      p {
        font-size: 0.28rem;
        color: #a7a7a7;
      }
    }
  }
}
.abnormity {
  .tle {
    height: 0.6rem;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    p {
      font-size: 0.26rem;
      color: #999999;
      flex: 1;
    }
    span {
      font-size: 0.28rem;
      color: #6c6c6c;
    }
  }
  ul {
    li {
      margin-bottom: 0.16rem;
      background: #fff;
      padding: 0.2rem 0.3rem;
      display: flex;
      align-items: center;
      span {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
      }
      p {
        margin-left: 0.32rem;
        font-size: 0.32rem;
        color: #666666;
      }
      em {
        font-style: normal;
        padding-left: 0.24rem;
        font-size: 0.24rem;
        color: rgba(102, 102, 102, 0.87);
        flex: 1;
      }
      i {
        font-style: normal;
        font-size: 0.32rem;
        color: #f5a623;
      }
    }
  }
}
</style>
