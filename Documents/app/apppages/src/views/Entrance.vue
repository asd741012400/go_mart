<template>
	<div id="Entrance">
        <div class="loading" v-if="aaa">
            <i class="el-icon-loading activeT"></i>
            <p>正在跳转页面，请稍后</p>
        </div>
       <div v-else>请再次点击返回按钮，返回到APP</div>
	</div>
</template>

<script>
//import xxx from 'xxx.vue'  //引入组建
//import 'xxxx'  //引入JS
export default {
	
    name: 'Entrance',
    data(){
        return {
            aaa:true
        }
    },
    components:{
        // 组件实例化
    },
    mounted(){
    },
    created(){
    	document.title="";
        document.body.style.background = "#fff";
        const that = this;
        if(that.$route.query.accessToken)
        {
            sessionStorage.setItem("accessToken", this.$route.query.accessToken);
            sessionStorage.setItem("schoolId", this.$route.query.schoolId);
        }

        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(sessionStorage.androidIos == undefined)
        {
            that.aaa = true;
            sessionStorage.setItem("androidIos", true);
            if (isAndroid) {
                that.$router.push({
                    name: "AndroidInformList",
                });
            }
            if (isIOS) {
                that.$router.push({
                    name: "InformList",
                });

            }
        }
        else
        {
            that.aaa = false
        }
        
    },
    methods: {


        
    },
}
</script>

<style lang="scss" scoped="">
#Entrance{
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    // height: 100%;
    .loading{
        display: flex;
        i{
            font-size: .36rem;
        }
    }
}


</style>   