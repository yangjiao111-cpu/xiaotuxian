import httpInstance from "@/utils/http";
//获取banner
export function getBannerAPI(params = {}) {
    // 默认为1，商品为2
    const { distributionSite = '1' } = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite
        }
    })
}
export function getNewsAPI() {
    return httpInstance({
        url: '/home/new'
    })
}
export function getHotAPI() {
    return httpInstance({
        url: '/home/hot'
    })
}
export function getGoodsAPI() {
    return httpInstance({
        url: '/home/goods'
    })
}