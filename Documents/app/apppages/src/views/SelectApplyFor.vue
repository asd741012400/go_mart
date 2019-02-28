<template>
	<div id="SelectApplyFor">
        <div class="header">
            <div>
                <span class="left" @click="webHistory"><img src="../assets/images/icon_ruturn.png" alt=""></span>
                <span @click="webClose"><img src="../assets/images/icon_close2.png" alt=""></span>
            </div>
            <p>选择被调人</p>
            <div>
                <a @click="affirmSelect">确认</a>
            </div>
        </div>
        <!-- <div class="search">
            <div>
                <i><img src="../assets/images/icon_search.png" alt=""></i>
                <input type="search" placeholder="搜索" v-model="searchText" @keyup="searchFun">
            </div>
        </div> -->
        <ul>
            <li v-for="(item, index) in evaluatingList" @click="selectFigure(index)"> 
                <div class="menuTle">
                    <a v-if="item.state == 0"><img src="../assets/images/icon_pitchOn5.png" alt=""></a>
                    <a v-else><img src="../assets/images/icon_pitchOn4.png" alt=""></a>
                    <span><img :src="item.photo" alt=""></span>
                    <b>{{item.name}}</b>
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
                <p>未找到相关信息</p>
            </div>
        </div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
import { MessageBox} from 'mint-ui';

export default {
	
    name: 'SelectApplyFor',
    data(){
        return {
            evaluatingUrl:this.$store.state.lianhezongdao,
			evaluatingList:[],
            evaluatingListTotal: 0,
			pageNum: 1,
			pageSize:8,
			loading: false,
            loading2: false,
            withoutData: false,	
            timer:this.$store.state.startTime
        }
    },
    components:{
        // 组件实例化
    },

    mounted(){
      
        this.timer = this.timer.split(' ')[0];
        this.$store.state.receive = undefined;
        this.appEvaluationInfoList()
        
    },
    created(){
		document.body.style.background = "#f8f8f8";
		var qs=require('qs');
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

                if (that.evaluatingList.length < that.evaluatingListTotal) {
					that.pageNum++;
                    that.appEvaluationInfoListFn();
                } else if (that.evaluatingList.length == that.evaluatingListTotal) {
                    that.loading2 = false;
                }
            }
		};
    },
    methods: {
		appEvaluationInfoList(){
			const qs=require('qs');
			const that = this;
            that.informationList = [];
            that.pageNum = 1;
            that.loading = true;
            that.loading2 = true;
			that.withoutData = false;
			const formData = {
                // account_id:sessionStorage.account_id,
                account_id:"2249548551117622208",
				pageNum:that.pageNum,
                pageSize:that.pageSize,
                applytime:that.timer
			};
			that.$http.post('/api/getUserList',formData,{
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId,
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                if(response.data.total > 0)
                {
                    that.evaluatingListTotal = response.data.total;
                    
                    that.evaluatingList = response.data.rows;

                    for (let index = 0; index < that.evaluatingList.length; index++) {
                        const element = that.evaluatingList[index];
                        element.state = 0;
                        
                    }

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
                    that.evaluatingListTotal = response.data.total;
                    that.evaluatingList = response.data.rows;
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
                account_id:sessionStorage.account_id,
				pageIndex:that.pageNum,
                pageSize:that.pageSize,
                applytime:that.timer
			};
			that.$http.post('/api/getUserList',formData,{
                headers: {
                    accessToken:sessionStorage.accessToken,
                    schoolId:sessionStorage.schoolId,
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                if (that.evaluatingList.length <= that.evaluatingListTotal) {
                    that.evaluatingList = that.evaluatingList.concat(
                        response.data.rows
                    );
                    for (let index = 0; index < that.evaluatingList.length; index++) {
                        const element = that.evaluatingList[index];
                        element.state = 0;
                    }
                }
            })  
            .catch(function(error) {
                console.log(error);
            });
        },


        webClose(){
            closeWeb()
        },
        webHistory(){
            history.go(-1) 
        },
        selectFigure(index){
            const that = this;
            for (let index = 0; index < that.evaluatingList.length; index++) {
                const element = that.evaluatingList[index];
                element.state = 0;
            }
            that.evaluatingList[index].state = 1;
            that.$set(that.evaluatingList , index ,that.evaluatingList[index])
        },
        affirmSelect(){
            const that = this;
            for (let index = 0; index < that.evaluatingList.length; index++) {
                const element = that.evaluatingList[index];
                if(element.state == 1)
                {
                    that.$store.state.receive = element;
                }
            }

            if(that.$store.state.receive == undefined)
            {
                MessageBox.alert('', { 
                    message: '请选择被调人', 
                    title: '', 
                })
            }
            else
            {
                history.go(-1) 
            }
        }

        


    },
}
</script>

<style lang="scss" scoped="">
@import '../assets/scss/common.scss'; 
#SelectApplyFor{
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 .32rem;
        height: .88rem;
        position: fixed;
        top: 0;
        width: 100%;
        background: #fff;
        div{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                width: .48rem;
                overflow: hidden;
            }
            .left{
                margin-right: .32rem;
            }
            a{
                width: 1.28rem;
                font-size: .32rem;
                color: #03A9F4;
                text-align: right;
            }
        }
        p{
            flex: 1;
            text-align: center;
            font-size: .36rem;
            font-weight: bold;
            color: #333333;
        }
    }
    .search{
        background: #F8F8F8;
        overflow: hidden;
        height: .88rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: .88rem;
        width: 100%;
        div{
            background: #fff;
            border-radius: 5px;
            display: flex;
            height: .6rem;
            width: 7.18rem;
            align-items: center;
            i{
                width: .32rem;
                height: .32rem;
                margin-right: .14rem;
                margin-left: .34rem;
            }
            input{
                height: .6rem;
                flex: 1;
                font-size: .28rem;
            }
        }
    }
    ul{
        padding-top:1.08rem;
        li{
            .menuTle{
                height: 1.2rem;
                background: #fff;
                padding: 0 .32rem;
                display: flex;
                align-items: center;
                border-bottom:1px solid #EEEEEE;
                a{
                    width: .36rem;
                    height: .36rem;
                    margin-right: .48rem;
                }
                span{
                    width: .8rem;
                    height: .8rem;
                    text-align: center;
                    font-size: .32rem;
                    color: #FFFFFF;
                    background: #03A9F4;
                    border-radius: 50%;
                    margin-right: .32rem;
                    overflow: hidden;
                }
                b{
                    font-weight: normal;
                    font-size: .32rem;
                    color: #333333;
                    flex: 1;
                }
                i{
                    width: .4rem;
                }
            }
            .menuContent{
                display: none;
                p{
                    padding-left: 1.38rem;
                    padding-right: .32rem;
                    display: flex;
                    align-items: center;
                    border-bottom:1px solid #EEEEEE;
                    height: 1.2rem;
                    em{
                        width: .74rem;
                        height: .74rem;
                        text-align: center;
                        line-height: .74rem;
                        font-size: .32rem;
                        color: #FFFFFF;
                        background: #99CAE0;
                        border-radius: 50%;
                        margin-right: .32rem;
                        font-style: normal;
                    }
                    strong{
                        font-weight: normal;
                        font-size: .32rem;
                        color: #333333;
                        flex: 1;
                    }
                }
            }
            &.active{
                .menuTle{
                    i{
                        transform: rotate(90deg);
                    }
                }
                .menuContent{
                    display: block;
                }
            }
        }
    }
}
  
  

</style>   