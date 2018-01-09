<template>
<div>
	<div class='goods'>
		<div class="menu-wrapper"  ref='menuwrapper'>
			<ul>
				<li class='menu-item' 
					:class='curIndex===index?"active":""' 
					v-for='(item,index) in goods'
					@click='jump(index)'>
					<span class='text border-1px'>
						<span v-if='item.type>0' class='icon' :class='classMap[item.type]' ></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodswrapper'>
			<ul>
				<li v-for='(item,index) in goods' 
					class='food-list' 
					ref='foodlist' 
					:data-index='index'>
					<h2 class='title'>{{item.name}}</h2>
					<ul>
						<li v-for='food in item.foods' 
							class='food-item border-1px'>
							<div class='desc-wrapper' @click='select(item.name, food.name)'>
								<div class='icon'>
									<img :src='food.image' width='60' height='60' />
								</div>
								<div class='content'>
									<h2 class='name'>{{food.name}}</h2>
									<p class='desc'>{{food.description}}</p>
									<div class='extra'>
										<span>月售 {{food.sellCount}} 份</span>
										<span>好评率 {{food.rating}}%</span>
									</div>
									<div class='price'>
										<span class='nowPrice'>￥{{food.price}}</span>
										<span class='oldPrice' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
									</div>
								</div>
							</div>
							<div class='add-wrapper'>
								<cartcontrol :food='food' :good='item' />
							</div>
						</li>
					</ul>	
				</li>
			</ul>
		</div>
	</div>
	<div class='cartcar-wrapper'>
		  <cartcar :goods='goods' :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></cartcar>
		</div>
	<!-- <detail-food :food='selectFood'></detail-food> -->
</div>
</template>
<script>
import axios from 'axios'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import cartcar from 'components/cartcar/cartcar'
import detailFood from 'components/detailFood/detailFood'
const URL = '/api/goods'
const ERR_OK = 0
export default {
	props: {
		seller: {
			type: Object
		}
	},
	components: {
		cartcontrol,
		cartcar,
		detailFood
	},
	data () {
		return {
			goods: [],
			curIndex: 0,
			listHeight: [],
			// 用于记录menu是否可以滚动
			targetIndex: -1
		}
	},
	created () {
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
		if (localStorage.getItem('goods')) {
			this.goods = JSON.parse(localStorage.getItem('goods'))
			this.$nextTick(() => {
				this.curHeight()
				const domFood = this.$refs.foodswrapper
				domFood.addEventListener('scroll', this.scroll)
			})
		} else {
			axios.get(URL).then((res) => {
				if (res.data.errno === ERR_OK) {
					this.goods = res.data.data
					this.$nextTick(() => {
						this.curHeight()
						const domFood = this.$refs.foodswrapper
						domFood.addEventListener('scroll', this.scroll)
					})
					localStorage.setItem('goods', JSON.stringify(this.goods))
				}
			})
		}
	},
	destoryed () {
		const domFood = this.$refs.foodswrapper
		domFood.removeEventListener('scroll', this.scroll)
	},
	methods: {
		curHeight () {
			const items = this.$refs.foodlist
			this.listHeight['H0'] = 0
			for (let i = 0, len = items.length; i < len; i++) {
				// 对50取整
				const height = Math.floor((items[i].clientHeight + items[i].offsetTop) / 50) * 50
				const offsetTop = Math.floor(items[i].offsetTop / 50) * 50
				const index = parseInt(items[i].dataset.index) + 1
				this.listHeight['H' + height] = index
				this.listHeight['H' + (offsetTop - 50)] = index - 2
			}
		},
		scroll () {
			// 滚动时检测scroll的值， 若有相等的， 则当前curIndex改动
			const domFood = this.$refs.foodswrapper
			const domMenu = this.$refs.menuwrapper
			const scrollTop = Math.floor(domFood.scrollTop / 50) * 50
			const index = this.listHeight['H' + scrollTop]
			if (index >= 0 && index !== this.curIndex) {
				this.curIndex = index
				if (this.targetIndex === index) {
					this.targetIndex = -1
				} else if (this.targetIndex === -1) {
					domMenu.scrollTop = 0
				}
			}
		},
		jump (index) {
			const items = this.$refs.foodlist
			const domFood = this.$refs.foodswrapper
			this.targetIndex = index
			domFood.scrollTop = items[index].offsetTop
		},
		select (goodName, foodName) {
			goodName = encodeURI(goodName)
			foodName = encodeURI(foodName)
			this.$router.push({name: 'food', params: {'goodName': goodName, 'foodName': foodName}})
		}
	}
}
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin'
::-webkit-scrollbar
	width:0px
.goods
	display:flex
	position:absolute
	top:174px
	bottom:48px
	width:100%
	.menu-wrapper
		flex:0 0 22%
		background:#f3f5f7
		overflow:auto
		.menu-item
			display:table
			width:100%
			height:54px
			.text
				display:table-cell
				padding:0 6px
				font-size:1.2rem
				line-height:1.2rem
				text-align:center
				vertical-align:middle
				border-1px(rgba(7,17,27,0.2))
				.icon
					display:inline-block
					width:12px
					height:12px
					margin-right:4px
					vertical-align:top
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
			&.active
				background-color:#fff
	.foods-wrapper
		flex:1
		overflow:auto
		.food-list
			.title
				font-size:1.2rem
				line-height:26px
				padding:0 14px
				border-left:3px solid  #d9dde1
				color:rgb(147,153,159)
				background:#f3f5f7
			.food-item
				position:relative
				margin:10px 10px 0 10px
				padding-bottom:10px
				border-1px(rgba(7,17,27,0.1))
				.desc-wrapper
					display:flex
					flex:1
					.icon
						flex:0 0 60px
						margin-right:10px
					.content
						margin-top:2px
						.name
							font-size:1.4rem
							margin-bottom:8px
						.desc
							font-size:1rem
							line-height:1.2rem
							color:rgb(147,153,159)
						.extra
							font-size:1rem
							margin-top:8px
							color:rgb(147,153,159)
						.price
							display:flex
							align-items:center
							font-size:0
							.nowPrice
								font-size:1.6rem
								font-weight:700
								line-height:2rem
								margin-right:8px
								color:red
							.oldPrice
								font-size:1rem
								font-weight:700
								text-decoration:line-through
				.add-wrapper
					position:absolute
					bottom:4px
					right:0
					z-index:2
					text-align:right
				&:last-child
					border-none()
.cartcar-wrapper
	position:absolute
	width:100%
	bottom:0
	z-index:100
</style>