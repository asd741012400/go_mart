<template>
	<div id="dome">
		<!-- <p @click.stop="openPicker">
        <mt-datetime-picker
            type="datetime"
            ref="picker"
            @confirm="handleConfirm"
            @cancel="closeConfirm"
           >
        </mt-datetime-picker>
        {{dateTime}}
        <a v-if="dateTime == ''">请选择（必填)</a>
    </p> -->
    <p @click="abcd">显示</p>
    <mt-picker
      :slots="slots" 
      @change="onValuesChange" 
      :class=" show ? 'active': 'aaa'"
      :showToolbar="true"
    >
      <mt-button @click="handleConfirm" class="sure">确认</mt-button>
    </mt-picker>
    <button @click="aaa">确定</button>
	</div>
</template>

<script>
import { open_sweep , open_album } from "../components/js/public.js";

export default {
  name: "Patrol",
  data() {
    return {
      startDate: new Date(),
      dateTime:'',
      show:false,
      slots: [
        {
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
        }
      ]
    };
  },
  components: {
    // 组件实例化
  },
  created() {
    document.title = "寝室巡查";
    const that = this;

    window.callbackCode = that.callbackCode
  },
  methods: {
    callbackCode(obj){
      this.$alert(obj, {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    callbackImgs(obj){
      this.$alert(obj, {
        confirmButtonText: '确定',
      });
    },
    abcd(){
      this.show = !this.show ;
      console.log(this.show )
    },
    aaa(){
      open_sweep()
    },

    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      console.log(values)
    },
    //开启时间选择器
      openPicker () {
          this.$refs.picker.open()
      },
      //点击确定按钮
        handleConfirm (data) {
            let date = moment(data).format('YYYY.MM.DD HH:MM')
            this.dateTime = date
            const that = this;
            Vue.nextTick(function () {
                that.$refs.picker.close();
            });
            
        },

        //点击取消按钮
        closeConfirm(){
            const that = this;
            Vue.nextTick(function () {
                that.$refs.picker.close();
            });
        },
      handleConfirm () {
          this.currentTags = this.$refs.picker.getValues()[0]
          this.popupVisible = false
      }
  }
};
</script>

<style lang="scss" scoped="">
#dome{
  background: rgb(233, 233, 233);
  .mt-datetime-picker{
    background: red;
  }
  
  .picker{
    position: fixed;
    bottom: 0;
    width: 100%;
    &.active{
      display: block;
    }

    display: none;

  }
  button{
    width: 2rem;
    height: .8rem;
    line-height: .8rem;
    background: red;
    color: #fff;
  }
}
</style>
