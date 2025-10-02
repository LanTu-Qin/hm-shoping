<template>
    <div class="goodItems">
        <van-card
        :price="item.goods_price_max"
        :desc='"已售"+item.goods_sales+"件"'
        :title="item.goods_name"
        :thumb="item.goods_image"
        :origin-price="item.line_price_max"
        @click="$router.push(`/paodetail/${item.goods_id}`)"
        />
    </div>
</template>

<script>
export default {
  name: 'goodItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .van-card {
        .van-card__desc {
            color:#999
        }
        .van-card__price {
            color:red
        }
        .van-card__origin-price {
            color:#999
        }
    }
</style>
