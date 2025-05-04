// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 定义state - cartList
    const cartList = ref([])
    // 获取最新购物车列表
    const UpdateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    // 定义action - addCart
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            // 登录之后的购物车逻辑
            await insertCartAPI({ skuId, count })
            UpdateNewList()
        }
        else {
            // 已添加过 - count+1
            // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count += goods.count
            }
            else {
                // 未添加过 - 直接push
                cartList.value.push(goods)
            }
        }
    }
    // 删除cart
    const delCart = async (skuId) => {
        if (isLogin.value) {
            //调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId])
            UpdateNewList()
        }
        else {
            cartList.value = cartList.value.filter((item) => {
                return item.skuId !== skuId
            })
        }
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
        isLogin,
        cartList,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        isAll,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        UpdateNewList
    }
}, {
    persist: true
})