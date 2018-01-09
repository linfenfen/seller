<template>
	<div class='commit'>
		<ul class='navbar'>
			<li class='item' :class='nowSelect === -1 ?"active":""' @click='changeRatings(-1)'>全部 {{ratings.length}}</li>
			<li class='item' :class='nowSelect === 0 ?"active":""' @click='changeRatings(0)'>推荐 {{goodRatings.length}}</li>
			<li class='item' :class='nowSelect === 1 ?"active":""' @click='changeRatings(1)'>吐槽 {{badRatings.length}}</li>
		</ul>
		<div class='commit-detail'>
			<ul>
				<li class='rating border-1px' v-for='rating in nowRatings'>
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
		ratings: {
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
		goodRatings () {
			return this.ratings.filter(rating => rating.rateType === 0)
		},
		badRatings () {
			return this.ratings.filter(rating => rating.rateType === 1)
		},
		nowRatings () {
			let ratings = this.ratings
			if (this.nowSelect === 0) {
				ratings = this.goodRatings
			} else if (this.nowSelect === 1) {
				ratings = this.badRatings
			}
			return ratings
		}
	},
	methods: {
		changeRatings (type) {
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
.commit-detail
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