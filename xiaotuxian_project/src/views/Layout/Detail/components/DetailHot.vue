<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getHotGoodsAPI } from "@/apis/detail";
const route = useRoute();
const hotList = ref([]);
const props = defineProps({
  hotType: {
    type: Number,
  },
});
const title = props.hotType === 1 ? "24小时热榜" : "周热榜";
const reqData = ref({
  id: route.params.id,
  type: props.hotType,
  limit: 3,
});
const getHotList = async (reqData) => {
  const res = await getHotGoodsAPI(reqData);
  hotList.value = res.result;
};
onMounted(() => {
  getHotList(reqData.value);
});
</script>


<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink
      :to="`/detail/${item.id}`"
      class="goods-item"
      v-for="item in hotList"
      :key="item.id"
    >
      <img v-img-lazy="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>