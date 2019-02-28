import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  userDataUrl: "http://uc.veducloud.com/",
  userDataUrl2: "http://eschool.veducloud.com/",
  userDataUrl3: "http://bpm.veducloud.com/",
  // eschool:"http://192.168.1.100:9119/",
  // veducloud:"http://192.168.1.100:9110/",
  // eschool:"http://2p278401s7.imwork.net/",
  eschool:"http://eschool.veducloud.com/",
  veducloud:"http://uc.veducloud.com/",
  evaluating:"http://cpapi.quku199.com/",
  lianhezongdao:"http://27.14.90.211:93/"

};

export const mutations = {};

export default new Vuex.Store({
  state,
  mutations
});
