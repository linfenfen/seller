<template>
	<div>
		<div v-if='!food.collect' class='collect' @click='collectFood'>
			收藏
		</div>
		<div v-else class='collect like'  @click='decollectFood'>
			已收藏
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default {
	props: {
		food: {
			type: Object
		}
	},
	data () {
		return {
			like: 0
		}
	},
	methods: {
		collectFood () {
			if (this.food.collect === undefined) {
				Vue.set(this.food, 'collect', 1)
			} else {
				this.food.collect = 1
			}
			this.$emit('setItem')
		},
		decollectFood () {
			this.food.collect = 0
			this.$emit('setItem')
		}
	}
}
</script>
<style lang='stylus'>
.collect
	position:absolute
	bottom:10px
	right:10px
	width:4.5rem
	text-align: center
	font-size:1.2rem
	line-height:2rem
	border-radius: 1rem
	color:#fff
	background-color: rgba(7,17,27,0.68)
	&.like
		background-color: #c40000
</style>