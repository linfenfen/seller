<template>
	<div class='cartcar'>
		<div class='cartcar-wrapper'>
			<div class='wrapper'>
				<div class='title'>购物车</div>
				<div class='typedesc' v-if='showFlag'>
					<span class='desc'>购物车里有：{{typedesc}}</span>
					<span class='clear' @click='clearCar'>清空</span>
				</div>
				<div class='none' v-else>暂无选择的商品，快去菜单页挑选吧！</div>
			</div>
			<div class='wrapper' v-for='good in goods' v-if='good.count'>
				<div class='title goodtitle'>{{good.name}}</div>
				<ul>
					<li class='food' v-for='food in good.products' v-if='food.ccount'>
						<div class='left'>
							<div class='name'>{{food.name}}</div>
							<div class='price'>{{food.final_price * food.ccount/100}}</div>
						</div>
						<div class='right'>
							<cartcontrol :food='food' :good='good' @localStorage='localStorage'></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
			<div class='wrapper' v-if='totalMoney'>
				<div class='title'>结算金额</div>
				<div class='totalMoney'>总价为：{{totalMoney/100}}</div>
			</div>
			<div class='account-wrapper' v-if='showFlag'>
					<span class='account' @click='account'>我要买单</span>
			</div>
			<div @click='clearlocalstorage'>清空localstorage</div>
		</div>
		<back></back>
	</div>
</template>
<script>
import back from 'components/btn/back'
import cartcontrol from 'components/cartcontrol/cartcontrol'
export default {
	data () {
		return {
			goods: [],
			typedesc: ''
		}
	},
	components: {
		back,
		cartcontrol
	},
	computed: {
		showFlag () {
			const len = this.goods.length
			let showFlag = false
			let i = (len - 1) >= 0 ? (len - 1) : 0
			while (i--) {
				if (this.goods[i].count && this.goods[i].count > 0) {
					showFlag = true
					break
				}
			}
			return showFlag
		},
		totalMoney () {
			let totalMoney = 0
			this.goods.forEach(good => {
				good.products.forEach(food => {
					if (food.ccount) {
					totalMoney += food.final_price * food.ccount
					}
				})
			})
			return totalMoney
		}
	},
	created () {
		this.$nextTick(() => {
			if (localStorage.getItem('goods')) {
				this.goods = JSON.parse(localStorage.getItem('goods'))
			} else {
				this.$router.push({name: 'goods'})
			}
		})
	},
	methods: {
		clearCar () {
			this.goods.forEach(good => {
				if (good.count) {
					good.count = 0
					good.products.forEach(food => {
						if (food.ccount) {
							food.ccount = 0
						}
					})
				}
			})
			localStorage.setItem('goods', JSON.stringify(this.goods))
		},
		localStorage () {
			localStorage.setItem('goods', JSON.stringify(this.goods))
		},
		account () {
			// 提交到后台的订单 只写了两个变量
			const dataObj = {
				'ref_no': '20180111-881386A1-00001',
				'subtotal': this.totalMoney,
				'items': []
			}
			// 先提交订单，在清除本地数据
			this.goods.forEach(good => {
				if (good.count) {
					good.products.forEach(food => {
						if (food.ccount) {
							dataObj.items.push({
								'name': food.name,
								'product_id': food.id,
								'price': food.final_price,
								'final_price': food.price,
								'count': food.ccount,
								'dutyfree': food.dutyfree
							})
						}
					})
				}
			})
			alert('已提交订单到后厨，请耐心等待...' + JSON.stringify(dataObj))
			this.clearlocalstorage()
		},
		clearlocalstorage () {
			localStorage.clear()
			this.goods = []
		}
	},
	watch: {
		goods: {
			handler () {
				let str = ''
				this.goods.forEach(good => {
					if (good.count) {
						str += good.name + good.count + '个，'
					}
				})
				this.typedesc = str.slice(0, -1)
			},
			deep: true
		}
	}
}
</script>
<style scoped lang='stylus'>
::-webkit-scrollbar
	width:0px
.cartcar
	padding:1rem 0
	height:100%
	text-align:center
	background-color: rgba(60,62,64,0.43)
	.cartcar-wrapper
		overflow-y: auto
		width:100%
		height:100%
		.wrapper
			width:95%
			margin:0 auto 1rem
			padding:0 1rem 1rem
			box-sizing: border-box
			background-color: #fff
			.title
				font-size:1.4rem
				font-weight: bold
				line-height:3rem
				border-bottom:1px solid #f3f5f7
			.none
				padding-top:1rem
				font-size:1.2rem
				font-weight: bold
				line-height:2.5rem
				color:#767f87
			.typedesc
				display: flex
				width:100%
				font-size:1.2rem
				line-height:2rem
				color:blue
				text-align:left
				.desc
					flex:1
				.clear
					text-align: right
					text-decoration: underline
					flex:0 0 4rem
			.goodtitle
				font-size:1.3rem
				line-height:2.5rem
				color:blue
			.food
				display: flex
				justify-content:space-between
				padding-top:0.5rem
				.left
					text-align: left
					.name
						font-size:1.2rem
						line-height: 1.5rem
					.price
						font-size:1.1rem
						line-height: 1.4rem
						color:#c40000
				.right
					box-sizing: border-box
					padding:0.45rem
			.totalMoney
				text-align:left
		.account-wrapper
			margin-bottom:3rem
			.account
				display:inline-block
				width:8rem
				margin-top:0.5rem
				text-align: center
				font-size:1.4rem
				line-height:2.2rem
				border-radius: 1.1rem
				color:#fff
				background-color: rgb(0,180,220)
</style>