// 管理用户数据现关
import { defineStore } from "pinia";
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore = defineStore('user', () => {
    // 定义管理用户的state
    const userInfo = ref({})
    const cartStore = useCartStore()
    // 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // 登录时将本地购物车合并到服务器
        await mergeCartAPI(cartStore.cartList.map((item) => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateNewList()
    }
    // 退出时清除用户信息
    const clearUserInfo = () => {
        // 清空用户信息
        userInfo.value = {}
        // 清空购物车
        cartStore.clearCart()
    }
    // 以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true // 启用持久化
})