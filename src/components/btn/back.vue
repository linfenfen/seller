<template>
	<div class='back' @click='back'>
		返回
	</div>
</template>
<script>
export default{
	methods: {
		back () {
			history.back()
		}
	}
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
.back
	position:fixed
	top:20px
	left:10px
	width:40px
	height:40px
	font-size:1.2rem
	line-height: 40px
	text-align:center
	color:#fff
	border-radius: 50%
	z-index:51
	background-color:rgba(189, 184, 184,0.58)
</style>