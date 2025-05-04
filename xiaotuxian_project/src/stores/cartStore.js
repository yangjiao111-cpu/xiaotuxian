// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
    // 定义state - cartList
    const cartList = ref([])
    // 定义action - addCart
    function addCart(goods) {
        // 已添加过 - count+1
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            item.count += goods.count
        }
        else {
            cartList.value.push(goods)
        }
        // 未添加过 - 直接push
    }
    // 删除cart
    function delCart(skuId) {
        console.log('删除函数背调了');

        cartList.value = cartList.value.filter((item) => {
            return item.skuId !== skuId
        })
    }
    // 计算属性
    // 总的数量 所有项的count之和
    const allCount = computed(
        () => {
            return cartList.value.reduce((pre, nex) => pre + nex.count, 0)
        }
    )
    // 总价 所有项的count*price之和
    const allPrice = computed(
        () => {
            return cartList.value.reduce((pre, nex) => pre + nex.count * nex.price, 0)
        }
    )
    // 单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    // 是否全选
    const isAll = computed(
        () => {
            return cartList.value.every((item) => item.selected)
        }
    )
    //全选功能
    const allCheck = (selected) => {
        cartList.value.map((item) => {
            return item.selected = selected
        })
    }
    // 已选择数量
    const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((pre, nex) => pre + nex.count, 0))
    // 已选择商品价格合计
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((pre, nex) => pre + nex.count * nex.price, 0))
    return {
        cartList,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        isAll,
        addCart,
        delCart,
        singleCheck,
        allCheck
    }
}, {
    persist: true
})