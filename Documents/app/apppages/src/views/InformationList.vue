<template>
	<div id="InformationList">
		<div class="menu" v-if="menu.length > 1">
			<ul>
				<li v-for="(item, index) in menu" :class="index == menuIndex ?  user.userRole=='teacher' ? 'activeT': 'activeS' :''" @click="informationListFn(item.messageType,index)">
					<span>{{item.name}}</span>
					<em></em>
				</li>
			</ul>
		</div>
		<div class="placeholder" v-if="menu.length > 1"></div>
		<div class="information">
			<div class="list" v-for="(item, index) in informationList">
				<div class="listImg">
					<img v-if="user.userRole=='teacher'" src="../assets/images/icon_informationB.png" alt="">
					<img v-else src="../assets/images/icon_informationG.png" alt="">
				</div>
				<div class="content">
					<div>
						<a>{{item.messageName}}</a>
						<time>{{item.createDate}}</time>
					</div>
					<p @click="skipPage(index)">{{item.messageTitle}}</p>
				</div>
			</div>
		</div>

		<!-- <el-table
	    v-loading="loading"
	    style="width: 100%"
	    element-loading-background="#fff"
	    element-loading-spinner="el-icon-loading"
	    element-loading-text="拼命加载中"></el-table> -->
	    <div class="loding" v-if="loading">
	    	<div class="lodingText" v-if="loading2">
	    		<i class="el-icon-loading" :class=" user.userRole=='teacher' ? 'activeT': 'activeS' "></i>
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
import Cookies from "js-cookie";
export default {
  name: "InformationList",
  data() {
    return {
      user: {
        userId: "",
        userRole: ""
      },
      url: this.$store.state.userDataUrl,
      menuIndex: 0,
      menuId: null,
      menu: [],
      pageNum: 1,
      pageSize: 5,
      informationList: [],
      informationListTotal: 0,
      loading: true,
      loading2: true,
      withoutData: false,
    };
  },
  components: {
    // 组件实例化
  },
  created() {
    // var qs=require('qs');
    document.title = "消息中心";
    document.body.style.background = "#fff";
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
        if (that.informationList.length < that.informationListTotal) {
          that.pageNum++;
          that.informationListPushFn();
        } else if (that.informationList.length == that.informationListTotal) {
          that.loading2 = false;
        }
      }
    };
    that.common.setingTtitle("消息中心")

  },
  mounted() {
    //存储角色信息
    const that = this;
    sessionStorage.setItem("userId", this.$route.query.userId);
    sessionStorage.setItem("userRole", this.$route.query.userRole);
    this.user = this.$route.query;
    that
      .$http({
        method: "GET",
        url: that.url + "api/uc/v0.1/messageCenter/category",
        headers: {
          accessToken: sessionStorage.userId
        }
      })
      .then(function(response) {

		if(response.data.length != 0)
		{
	        that.menu = response.data;
	        that.menuId = that.menu[0].messageType;
	        that.menuIndex = 0;
	        that.informationListFn(that.menuId, that.menuIndex);
        }
        else
        {
      		that.loading = false;
      		that.withoutData = true;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    informationListFn: function(id, index) {
      var that = this;
      that.menuIndex = index;
      that.menuId = id;
      that.informationList = [];
      that.pageNum = 1;
      that.loading = true;
      that.loading2 = true;
      that
        .$http({
          method: "GET",
          url: that.url + "api/uc/v0.1/messageCenter",
          headers: {
            accessToken: sessionStorage.userId
          },
          params: {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            messageType: that.menuId
          }
        })
        .then(function(response) {
        	console.log(response.data.total)
          if(response.data.total > 0)
          {
          	console.log(111)
	          that.informationListTotal = response.data.total;
	          that.informationList = response.data.rows;
	          if (that.informationList.length < that.informationListTotal) {
	            that.loading = false;
	          } else if (that.informationList.length == that.informationListTotal) {
	            if (that.informationList.length < 5) {
	              that.loading = false;
	            }
	            that.loading2 = false;
	          }

          }
          else
          {
          	that.loading = false;
      		that.withoutData = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    informationListPushFn: function(id) {
      var that = this;
      that.loading = true;
      that
        .$http({
          method: "GET",
          url: that.url + "api/uc/v0.1/messageCenter",
          headers: {
            accessToken: sessionStorage.userId
          },
          params: {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            messageType: that.menuId
          }
        })
        .then(function(response) {
          if (that.informationList.length <= that.informationListTotal) {
            that.informationList = that.informationList.concat(
              response.data.rows
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    skipPage: function(index) {
      const that = this;
      console.log(that.informationList[index]);

      if (that.informationList[index].messageName == "寝室巡查") {
        if (that.informationList[index].personal == 0) {
          that.$router.push({
            name: "InformationDetails",
            query: {
              roomId: that.informationList[index].businessId,
              date: that.informationList[index].createDate,
              titles: that.informationList[index].messageName
            }
          });
        } else if (that.informationList[index].personal == 1) {
          that.$router.push({
            name: "Patrol",
            query: {
              roomId: that.informationList[index].businessId,
              date: that.informationList[index].createDate,
              personal: that.informationList[index].personal
            }
          });
        }
      } else if (
        that.informationList[index].messageName == "教师请假" ||
        that.informationList[index].messageName == "学生请假"
      ) {
        that.$router.push({
          name: "AskForLeave",
          query: {
            leaveId: that.informationList[index].businessId,
            messageType: that.informationList[index].messageType
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped="">
@import '../assets/scss/common.scss'; 
.menu {
  overflow-x: scroll;
  width: 100%;
  border-bottom: 0.1rem solid #f8f8f8;
  position: fixed;
  background: #fff;
  ul {
    display: flex;
    font-size: 0.3rem;
    color: #111212;
    white-space: nowrap;
    height: 0.88rem;
    align-items: center;
    li {
      padding: 0 0.3rem;
      position: relative;
      height: 0.88rem;
      line-height: 0.88rem;
      flex: 1;
      text-align: center;
      em {
        width: 0.2rem;
        height: 2px;
        border-radius: 2px;
        margin: 0.1rem auto 0;
        position: absolute;
        left: 50%;
        margin-left: -0.1rem;
        bottom: 0;
        display: none;
      }
      &.activeT {
        color: #03a9f4;
        em {
          display: block;
          background: #03a9f4;
        }
      }
      &.activeS {
        color: #62c095;
        em {
          display: block;
          background: #62c095;
        }
      }
    }
  }
}
.placeholder {
  height: 0.88rem;
}


.information {
  display: flex;
  flex-direction: column;
  background: #fff;
  .list {
    padding: 0.32rem;
    border-bottom: 1px solid #f8f8f8;
    display: flex;
    .listImg {
      width: 1rem;
    }
    .content {
      margin-left: 0.32rem;
      flex: 1;
      div {
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        a {
          font-size: 0.26rem;
          color: #7e8785;
        }
        time {
          font-size: 0.24rem;
          color: #b6b6b6;
        }
      }
      p {
        padding: 0.24rem 0.32rem;
        background: #f2f5f5;
        border-radius: 8px;
        font-size: 0.32rem;
        color: #111212;
        margin-top: 0.4rem;
      }
    }
  }
}
</style>
