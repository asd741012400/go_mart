<template>
  <div class="dome">
    <span @click="changeLanguage">12312312</span>
    <p>{{$t('dome.text')}}</p>
    <p>{{text}}</p>
  </div>
</template>
<script>
export default {
  name:'dome',
  data(){
    return{
      text:this.$t('dome.text2')
    }
  },
  components:{
  },
  methods:{
    changeLanguage () {
      if (this.$i18n.locale == 'en-us') {
        this.$i18n.locale = 'zh-cn'
      } else {
        this.$i18n.locale = 'en-us'
      }
    }
  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    
  },

  // 挂载前状态
  beforeMount(){
  },

  // 挂载结束状态
  mounted(){
  },
  
  // 更新前状态
  beforeUpdate(){
  },

  // 更新完成状态
  updated(){
  },

  // 销毁前状态
  beforeDestroy(){
  },

  // 销毁完成状态
  destroyed(){
  } 
  
}
</script>
<style lang="scss" scoped>
.dome{

}
</style>



    
