<template>
	<div id="Patrol" :style="{height:wHeight+'px'}">
		<div class="patrolCentent">
			<div class="basic">
				<span><img :src="data.portrait" alt=""></span>
				<ul>
					<li><b>{{data.name}}</b></li>
					<li><p>{{data.className}}</p></li>
				</ul>
			</div>
			<div class="specific">
				<time>{{data.date}}</time>
				<span>{{data.dormNo}}</span>
				<p>今日的寝室巡查结果</p>
				<div>{{data.status}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "Patrol",
  data() {
    return {
      wHeight: 0,
      url: this.$store.state.userDataUrl2,
      data: {}
    };
  },
  components: {
    // 组件实例化
  },
  created() {
    document.title = "寝室巡查";
    const that = this;
    that.wHeight = document.documentElement.clientHeight - 20;

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
        },
        params: {
          personal: that.$route.query.personal
        }
      })
      .then(function(response) {
        that.data = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    that.common.setingTtitle("寝室巡查")

  },
  methods: {}
};
</script>

<style lang="scss" scoped="">
#Patrol {
  background: url(../assets/images/push_bg.png) center top/100% no-repeat;
  margin-top: 0.2rem;
  .patrolCentent {
    width: 6.84rem;
    margin: 0 auto;
    .basic {
      display: flex;
      align-items: center;
      height: 3rem;
      span {
        width: 1rem;
        height: 1rem;
        overflow: hidden;
        border-radius: 50%;
        margin-left: 0.4rem;
      }
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 0.2rem;
        li {
          width: 100%;
          b {
            font-size: 0.32rem;
            float: left;
            color: #333333;
          }
          p {
            font-size: 0.28rem;
            color: #7e8785;
          }
        }
      }
    }
    .specific {
      width: 4rem;
      margin: 1rem auto 0;
      display: flex;
      font-size: 0.32rem;
      flex-direction: column;
      line-height: 0.6rem;
      time {
        color: #333333;
      }
      span {
        color: #7e8785;
      }
      p {
        color: #666666;
      }
      div {
        font-size: 0.44rem;
        color: #f6b140;
      }
    }
  }
}
</style>
