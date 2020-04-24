import Vue from 'vue'
import request from '@/api/request'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request
          .post('/auth/login', userInfo)
          .then(res => {
            Vue.ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', res.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        request
          .get('/user/info')
          .then(res => {
            commit('SET_ROLES', res.role)
            commit('SET_INFO', res)

            commit('SET_NAME', { name: res.name, welcome: welcome() })
            commit('SET_AVATAR', res.avatar)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
        request
          .post('logout')
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
          .finally(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            Vue.ls.remove(ACCESS_TOKEN)
          })
      })
    }
  }
}

export default user
