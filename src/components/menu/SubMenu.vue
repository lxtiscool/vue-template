<template functional>
  <el-submenu :index="props.menuInfo.meta.index" :key="props.menuInfo.meta.index">
    <template slot="title">
      <i class="el-icon-document"></i>
      <span slot="title">{{ props.menuInfo.meta.title }}</span>
    </template>
    <template v-for="item in props.menuInfo.children">
      <el-menu-item :index="item.path" v-if="!item.children" :key="item.meta.index">
        <i class="el-icon-document"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
      <sub-menu v-else :menu-info="item" :key="item.meta.index"></sub-menu>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'SubMenu',
  prop: {
    menuInfo: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style></style>
