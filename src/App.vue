<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios'
var AUTH_TOKEN = 'NWE1NmZkNjllODljZTkwMDEwNzQxOTY0'
var instance = axios.create({
})
// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
instance.defaults.headers.post['Content-Type'] = 'application/json'
const ERR_OK = 0
export default {
	created () {
		this.$nextTick(() => {
			if (localStorage.getItem('goods')) {
				axios.get('/test/api/company/cpos/shops/59842dbde89ce90012774cd3/categories/all/products/all').then((res) => {
					if (res.data.code === ERR_OK) {
						localStorage.setItem('goods', JSON.stringify(res.data.data))
					}
				})
			}
		})
	}
}
</script>
<style lang='stylus' scoped>
@import './common/stylus/mixin.styl'
#app
  position:absolute
  top:0
  left:0
  right:0
  bottom:0
  overflow:hidden
</style>
