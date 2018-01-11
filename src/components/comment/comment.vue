<template>
	<div class='comment' v-if='comment.length'>
		<ul class='navbar'>
			<li class='item' :class='nowSelect === -1 ?"active":""' @click='changeComment(-1)'>全部 {{comment.length}}</li>
			<li class='item' :class='nowSelect === 0 ?"active":""' @click='changeComment(0)'>推荐 {{goodComment.length}}</li>
			<li class='item' :class='nowSelect === 1 ?"active":""' @click='changeComment(1)'>吐槽 {{badComment.length}}</li>
		</ul>
		<div class='comment-detail'>
			<ul>
				<li class='rating border-1px' v-for='rating in nowComment'>
					<div class='title'>
						<span class='username'>{{rating.username}}</span>
						<span class='ratetime'>{{rating.rateTime | formatDateTime}}</span>
					</div>
					<div class='ratescore'>
						<star :size=24 :score=4.2></star>
						<span class='sendtime'>20分钟送达</span>
					</div>
					<p class='ratetext' v-if='rating.text'>{{rating.text}}</p>
					<p class='ratetext' v-else>默认评价</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import star from 'components/star/star'
export default {
	props: {
		comment: {
			type: Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {
			nowSelect: -1
		}
	},
	components: {
		star
	},
	computed: {
		goodComment () {
			return this.comment.filter(rating => rating.rateType === 0)
		},
		badComment () {
			return this.comment.filter(rating => rating.rateType === 1)
		},
		nowComment () {
			let comment = this.comment
			if (this.nowSelect === 0) {
				comment = this.goodComment
			} else if (this.nowSelect === 1) {
				comment = this.badComment
			}
			return comment
		}
	},
	methods: {
		changeComment (type) {
			this.nowSelect = type
		}
	},
	filters: {
		formatDateTime (value) {
			const date = new Date(value)
			let y = date.getFullYear()
			let m = date.getMonth() + 1
			m = m < 10 ? ('0' + m) : m
			let d = date.getDate()
			d = d < 10 ? ('0' + d) : d
			let h = date.getHours()
			let minute = date.getMinutes()
			minute = minute < 10 ? ('0' + minute) : minute
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute
		}
	}
}
</script>
<style scoped lang='stylus'>
@import '../../common/stylus/mixin'
.navbar
	display:flex
	height:30px
	line-height:30px
	.item
		flex:1
		border-right:1px solid #fff
		text-align:center
		font-size:1.6rem
		color:#fff
		background-color:#00b4dc
		&.active
			color:#000
			background-color:rgba(199,193,193,0.43)
	&:last-child
		border:0
.comment-detail
	.rating
		padding:10px
		border-1px(rgba(7,17,27,0.1))
		.title
			font-size:0
			display:flex
			justify-content:space-between
			.username
				font-size:1.2rem
			.ratetime
				font-size:1rem
				color:rgb(77,85,93)
		.ratescore
			display:flex
			padding:10px 0
			.sendtime
				margin-left:5px
				font-size:1rem
				color:rgb(77,85,93)
		.ratetext
			font-size:1.4rem
</style>