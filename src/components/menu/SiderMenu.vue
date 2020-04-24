<template>
  <el-menu router style="width: 200px">
    <template v-for="item in menus">
      <el-menu-item v-if="!item.children" :index="item.path" :key="item.meta.index">
        <i class="el-icon-document"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <sub-menu v-else :menu-info="item" :key="item.meta.index" />
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import SubMenu from './SubMenu.vue'

export default {
  name: 'SiderMenu',
  components: {
    SubMenu
  },
  data() {
    return {
      menus: []
    }
  },
  computed: {
    ...mapState({
      mainMenu: state => state.permission.addRouters
    })
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
  }
}
</script>
