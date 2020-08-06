import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      home:{num:13884,merchants:443,designer:313,user:866},
      userData:[],//所有用户数据
      personData:'',//个人数据
      count:0,
  },


  mutations: {
      getPresonData(state,payload){
          // console.log(payload)
          state.personData = payload
          //时间戳转成正常日期
          state.personData.registerTime = new Date(parseInt(  state.personData.registerTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
      },

      getUserData(state,payload){
          // console.log(payload)
          state.count = payload.count;
          state.userData = payload.userData

          state.userData.forEach(item=>{
              item.registerTime = new Date(parseInt( item.registerTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
          })
          // console.log(state.userData)
      }
  },

  actions: {
      //获取个人数据
      getPower(context){
          const token = JSON.parse(localStorage.getItem('token')||[])
          const newToken = 'Bearer ' + token   //Bearer后加一个空格
          axios({
              url:'/api/existLogin',
              method:'post',
              headers:{
                  'Authorization':newToken
              }
          })
              .then(res=>{
                  context.commit('getPresonData',res.data.userData)
              })
      },

      //获取所有用户数据
      getData(context,payload){
          axios({
              url:'/api/getUserData',
              method:'get',
              params:{
                  _page:payload.pageNum,
                  _limit:payload.limit
              }
          }).then(res => {
              context.commit('getUserData',res.data)
              // console.log(res.data)
          })
      }
  },
  modules: {
  }
})
