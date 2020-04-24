<template>
  <el-container>
    <el-aside width="200" style="min-height: 100vh">
      <SiderMenu />
    </el-aside>
    <el-container>
      <el-header style="text-align: left"> </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        footer
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import SiderMenu from '@/components/menu/SiderMenu.vue'

export default {
  components: {
    SiderMenu
  }
}
</script>

<style>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
  margin-left: -20px;
}

.trigger:hover {
  background-color: #cccccc;
}
</style>
