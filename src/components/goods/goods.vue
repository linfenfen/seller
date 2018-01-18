<template>
<div>
	<div class='goods'>
		<div class="menu-wrapper"  ref='menuwrapper'>
			<ul>
				<li class='menu-item' 
					:class='curIndex===index?"active":""' 
					v-for='(good,index) in goods'
					@click='jump(index)'>
					<span class='text border-1px'>
						<span v-if='good.type>0' class='icon' :class='classMap[good.type]' ></span>{{good.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodswrapper'>
			<ul>
				<li v-for='(good,index) in goods' 
					class='food-list' 
					ref='foodlist' 
					:data-index='index'>
					<h2 class='title'>{{good.name}}</h2>
					<ul>
						<li v-for='food in good.products' 
							class='food-item border-1px'>
							<div class='desc-wrapper' @click='select(good.name, food.name)'>
								<div class='icon'>
									<img :src='food.thumb' width='60' height='60' />
								</div>
								<div class='content'>
									<h2 class='name'>{{food.name}}</h2>
									<p class='desc'>{{food.description}}</p>
									<div class='extra'>
										<span>月售 {{food.discount}} 份</span>
										<span>好评率 {{food.rating}}%</span>
									</div>
									<div class='price'>
										<span class='nowPrice'>{{food.final_price / 100}}</span>
										<span class='oldPrice' v-show='food.final_price'>{{food.final_price / 100}}</span>
									</div>
								</div>
							</div>
							<div class='add-wrapper'>
								<cartcontrol :food='food' :good='good' />
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
import cartcontrol from 'components/cartcontrol/cartcontrol'
import cartcar from 'components/cartcar/cartcar'
import detailFood from 'components/detailFood/detailFood'
import axios from 'axios'
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
			targetIndex: -1,
			targetHeight: -1
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
			// const url = '/test/api/company/cpos/shops/59842dbde89ce90012774cd3/categories/all/products/all' 开发环境下
			const url = 'http://101.200.48.175/good.php'
			axios.get(url).then((res) => {
				if (res.data.code === ERR_OK) {
					this.goods = res.data.data
					localStorage.setItem('goods', JSON.stringify(res.data.data))
					this.$nextTick(() => {
						this.curHeight()
						const domFood = this.$refs.foodswrapper
						domFood.addEventListener('scroll', this.scroll)
					})
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
			const domScoll = Math.floor(domFood.scrollTop)
			const scrollTop = Math.floor(domFood.scrollTop / 50) * 50
			const index = this.listHeight['H' + scrollTop]
			if (this.curHeight !== -1) {
				// 处理因最后的菜单太小 导致的点击左侧菜单右侧跳转 但不激活左侧的问题
				if (this.curHeight === domScoll) {
					this.curIndex = this.targetIndex
					this.targetIndex = -1
					this.curHeight = -1
				}
			} else if (index >= 0 && index !== this.curIndex) {
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
			const scrollTop = Math.floor(domFood.scrollTop)
			const scrollHeight = Math.floor(domFood.scrollHeight - domFood.clientHeight)
			const offsetTop = items[index].offsetTop
			if (scrollTop === scrollHeight && offsetTop > scrollTop) {
				// 右侧菜单到底  但是由于末尾菜单高度不足 导致不激活左侧菜单
				this.curIndex = index
			} else if (scrollTop < scrollHeight && offsetTop > scrollTop) {
				this.curHeight = scrollHeight
				this.targetIndex = index
				domFood.scrollTop = offsetTop
			} else {
				this.targetIndex = index
				domFood.scrollTop = offsetTop
			}
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
	top:14.1rem
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