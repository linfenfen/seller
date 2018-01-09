<template>
	<div class='cartcar'>
		<div class='car' @click='showcar'>
			<span class='icon-shopping_cart' :class='totalCount>0?"active":""'></span>
			<span v-show='totalCount>0' class='totalCount'>{{totalCount}}</span>
		</div>
		<div class='money' @click='showcar'>
			<span class='totalMoney border-1px' :class='totalCount>0?"active":""'>￥{{totalMoney}}</span>
			<span class='sendMoney'>另需配送费￥{{deliveryPrice}}元</span>
		</div>
		<div class='btnbuy'>
			<span v-if='totalMoney<=0'>￥{{minPrice}}元起送</span>
			<span v-else-if='(minPrice-totalMoney)>0'>还差￥{{minPrice - totalMoney}}元起送</span>
			<span class='buy' v-else @click='goAccount'>开始结算</span>
		</div>
		<transition name='fade'>
			<div class='showcart' :class='showFlag?"show":""'>
				<div class='title'>
					<span class='left'>购物车</span>
					<span class='right' @click='deleteSelect'>清空</span>
				</div>
				<div class='totalfood-wrapper'>
					<ul>
						<li v-for='item in allGood'>
							<ul>
								<li  class='item border-1px' v-for='food in item.foods' v-if='food.count'>
									<div class='left'>
										<span class='name'>{{food.name}}</span>
										<span class='price'>￥{{food.price * food.count}}</span>
									</div>
									<div class='right'>
										<cartcontrol :food='food' :good='item'></cartcontrol>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name='showcontrol'>
			<div class='background' v-show='showFlag' @click='showcar'></div>
		</transition>
	</div>
</template>
<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
export default {
	props: {
		goods: {
			type: Array,
			default () {
				return []
			}
		},
		minPrice: {
			type: Number,
			default: 0
		},
		deliveryPrice: {
			type: Number,
			default: 0
		}
	},
	components: {
		cartcontrol
	},
	data () {
		return {
			showFlag: false
		}
	},
	computed: {
		totalMoney () {
			let totalMoney = 0
			this.goods.forEach(good => {
				good.foods.forEach(food => {
					if (food.count) {
					totalMoney += food.price * food.count
					}
				})
			})
			return totalMoney
		},
		totalCount () {
			let totalCount = 0
			this.goods.forEach(good => {
				good.foods.forEach(food => {
					if (food.count) {
					totalCount += food.count
				}
				})
			})
			return totalCount
		},
		allGood () {
			return this.goods.filter(good => {
				return good.count !== undefined && good.count > 0
			})
		}
	},
	methods: {
		showcar () {
			if (this.totalCount > 0) {
				this.showFlag = !this.showFlag
			}
		},
		deleteSelect () {
			this.goods.forEach(good => {
				good.foods.forEach(food => {
					if (food.count) {
						food.count = 0
					}
				})
			})
		},
		goAccount () {
			this.$router.push({name: 'account'})
		}
	},
	watch: {
		totalCount (value) {
			if (value <= 0) {
				this.showFlag = false
			}
			localStorage.setItem('goods', JSON.stringify(this.goods))
		}
	}
}
</script>
<style lang='stylus'>
@import '../../common/stylus/mixin'
::-webkit-scrollbar
	width:0px
.cartcar
	position:relative
	height:48px
	background:#141d27
	.car
		position:absolute
		width:44px
		left:15px
		bottom:5px
		padding:6px
		background:#141d27
		border-radius:50%
		z-index:10
		.icon-shopping_cart
			display:inline-block
			padding:10px
			box-sizing:border-box
			font-size:24px
			background:rgba(255,255,255,0.2)
			color:rgba(255,255,255,0.4)
			border-radius:50%
			&.active
				color:rgb(255,255,255)
				background:rgb(0,160,220)
		.totalCount
			position:absolute
			top:0
			right:0
			width:24px
			font-size:9px
			font-weight:700
			line-height:12px
			text-align:center
			border-radius:8px
			color:rgb(255,255,255)
			background:rgb(240,20,20)
			box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
	.money
		margin-left:75px
		font-size:0
		span
			display:inline-block
			line-height:24px
			margin:6px 0
			padding:6px 0
			color:rgba(255,255,255,0.4)
			&.totalMoney
				font-size:1.6rem
				font-weight:700
				padding-right:3%
				border-1px-right(rgba(255,255,255,0.1))
				&.active
					color:#fff
			&.sendMoney
				font-size:1rem
				padding-left:3%
				font-weight:200
	.btnbuy
		position:absolute
		right:0
		top:0
		width:30%
		height:100%
		span
			display:inline-block
			width:100%
			padding:12px 0
			box-sizing:border-box
			font-size:1.2rem
			font-weight:700
			color:rgba(255,255,255,0.4)
			text-align:center
			line-height:24px
			background:rgba(255,255,255,0.2)
		.buy
			background:green
			color:#fff
	.showcart
		position:absolute
		bottom:48px
		width:100%
		max-height:300px
		z-index:-1
		transition:transform 0.5s
		transform:translateY(300px)
		&.show
			transform:translateY(0)
		.title
			padding:0 16px
			background:#f3f5f7
			border-bottom:1px solid rgba(7,17,27,0.1)
			font-size:0
			span
				display:inline-block
				line-height:40px
				&.left
					width:80%
					font-size:1.4rem
					color:rgb(7,17,27)
				&.right
					width:20%
					text-align:right
					font-size:1.2rem
					color:rgb(0,160,220)
		.totalfood-wrapper
			max-height:260px
			background:#fff
			padding:0 18px
			box-sizing:border-box
			overflow-y:auto
			.item
				display:flex
				justify-content:space-between
				font-size:0
				height:2rem
				line-height:2rem
				padding:12px 0
				border-1px(rgba(7,17,27,0.1))
				.left
					display:flex
					flex:1
					justify-content:space-between
					margin-right:10px
					.name
						font-size:1.4rem
					.price
						font-size:1.6rem
						font-weight:700
						color:rgb(240,20,20)
						line-height:2rem
		&:last-child
			border-none()
	.background
		position:fixed
		top:0
		bottom:0
		left:0
		right:0
		z-index:-2
		background:rgba(7,17,27,0.6)
		/*iphone上可显示背景模糊*/
		backdrop-filter:blur(10px)
	.showcontrol-enter-active,.showcontrol-leave-active
		transition:opacity 0.5s
	.showcontrol-enter,.showcontrol-leave-to
		opacity:0
	.fade-enter-active,.fade-leave-active
		transition:transform 0.5s
	.fade-enter,.fade-leave-to
		transform:translateY(50px)
</style>