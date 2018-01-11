<template>
	<div class='header'>
		<div class='content-wrapper'>
			<div class='avatar'>
				<img :src='seller.avatar' />
			</div>
			<div class='content'>
				<div class='title'>
					<span class='brand'></span>
					<span class='name'>{{seller.name}}</span>
				</div>
				<div class='description'>
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class='supports' v-if='seller.supports'>
					<span class='icon' :class='classMap[seller.supports[0].type]'></span>
					<span>{{seller.supports[0].description}}</span>
				</div>
				<div class='support-count' v-if='seller.supports' @click='showDetail'>
					<span class='count'>{{seller.supports.length}}个</span>
					<i class='icon-keyboard_arrow_right'></i>
				</div>
			</div>
		</div>
		<div class='board-wrapper' @click='showDetail'>
			<span class='brand'></span>
			<span class='board'>{{seller.bulletin}}</span>
			<i class='icon-keyboard_arrow_right'></i>
		</div>
		<div class='background'>
			<img  width='100%' height='100%' :src='seller.avatar' />
		</div>
		<!--sticky footer-->
		<transition name='fade'>
			<div v-if='detailShow' class='detail'>
				<div class='detail-wrapper clearfix'>
					<div class='detail-main'>
						<h1 class='name'>{{seller.name}}</h1>
						<star :score='seller.score' :size='size'></star>
						<div class='title-wrapper'>
							<span class='line'></span>
							<span class='title'>优惠信息</span>
							<span class='line'></span>
						</div>
						<div class='detail-box' v-if='seller.supports'>
							<div class='detail-content' v-for='support in seller.supports'>
								<span class='icon' :class='classMap[support.type]'></span>
								<span>{{support.description}}</span>
							</div>
						</div>
						<div class='title-wrapper'>
							<span class='line'></span>
							<span class='title'>商家公告</span>
							<span class='line'></span>
						</div>
						<div class='detail-box'>
							<div class='detail-content'>
								<div class='board-content'>{{seller.bulletin}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class='icon-close' @click='closeDetail'></i>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import star from 'components/star/star'
const STAR_SIZE = 48
export default{
  props: {
		seller: {
			type: Object
		}
	},
	components: {
		star
	},
	data () {
		return {
			detailShow: false,
			size: STAR_SIZE
		}
	},
	created () {
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
	},
	methods: {
		showDetail () {
			this.detailShow = true
		},
		closeDetail () {
			this.detailShow = false
		}
	}
}
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin'
.header
	position:relative
	color:#fff
	background-color:rgba(7,17,27,0.5)
	.content-wrapper
		display:flex
		padding:2rem 1rem 1.5rem 2rem
		.avatar img
			width:5.1rem
			heigh:5.1rem
			border-radius:2px
		.content
			flex:1
			position:relative
			margin-left:12px
			font-size:1.2rem
			.title
				display:flex
				align-items:center
				margin:0.1rem 0 0.4rem 0
				.brand
					width:2.5rem
					height:1.4rem
					margin-right:6px
					vertical-align:top
					bg-image('brand')
					background-size:2.5rem 1.4rem
					background-repeat:no-repeat
				.name
					font-size:1.6rem
					line-height:1.6rem
					font-weight:bold
			.description
				margin:0 0 0.6rem 0
				line-height:1.2rem
			.supports
				font-size:1.2rem
				line-height:1.2rem
				.icon
					display:inline-block
					width:1.1rem
					height:1.1rem
					margin-right:4px
					vertical-align:top
					background-size:1.1rem 1.1rem
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
			.support-count
				position:absolute
				right:0
				bottom:0
				padding:0 8px
				line-height:2rem
				border-radius:1rem
				background:rgba(0,0,0,0.2)
				text-align:center
				span
					font-size:1rem
					margin-left:2px
				.icon-keyboard_arrow_right
					font-size:1rem
					vertical-align:middle
	.board-wrapper
		position:relative
		height:2rem
		line-height:2rem
		padding:0 22px 0 12px
		white-space:nowrap
		overflow:hidden
		text-overflow:ellipsis
		background:rgba(7,17,27,0.2)
		.brand
			display:inline-block
			width:1.6rem
			height:1rem
			vertical-align:middle
			bg-image('bulletin')
			background-size:1.6rem 1rem
			background-repeat:no-repeat
		.board
			margin:0 4px
			font-size:1rem
		.icon-keyboard_arrow_right
			position:absolute
			right:12px
			font-size:1rem
			line-height:2rem
	.background
		position:absolute
		top:0
		left:0
		width:100%
		height:100%
		z-index:-1
		filter:blur(10px)
	.fade-enter-active,.fade-leave-active
		transition:opacity 0.5s
	.fade-enter,.fade-leave-to
		opacity:0
	.detail
		position:fixed
		z-index:101
		top:0
		left:0
		width:100%
		height:100%
		overflow:auto
		background:rgba(7,17,27,0.8)
		/*iphone上可显示背景模糊*/
		backdrop-filter:blur(10px)
		.detail-wrapper
			width:100%
			min-height:100%
			.detail-main
				margin:64px 36px 0 36px
				/*必须是padding  这是一定要有的*/
				padding-bottom:64px
				.name
					margin-bottom:12px;
					font-size:1.6rem
					font-weight:700
					text-align:center
				.title-wrapper
					margin:1.2rem 0 2rem 0
					font-size:0
					.title
						display:inline-block
						width:25%
						text-align:center
						font-size:1.4rem
						font-weight:700
					.line
						display:inline-block
						width:37.5%
						height:0
						margin-bottom:5px
						border-bottom:1px solid rgba(255,255,255,0.2)
				.detail-box
					padding: 0 12px
					.detail-content
						font-size:1.2rem
						margin-bottom:12px
						.icon
							display:inline-block
							width:16px
							height:16px
							margin-right:6px
							vertical-align:middle
							background-size:16px 16px
							background-repeat:no-repeat
							&.decrease
								bg-image('decrease_2')
							&.discount
								bg-image('discount_2')
							&.guarantee
								bg-image('guarantee_2')
							&.invoice
								bg-image('invoice_2')
							&.special
								bg-image('special_2')
						&:last-child
							margin-bottom:0
						.board-content
							line-height:24px
		.detail-close
			position:relative
			width:32px
			height:32px
			margin:-64px auto 0
			clear:both
			font-size:32px
			.icon-close
				color:rgba(255,255,255,0.5)
</style>