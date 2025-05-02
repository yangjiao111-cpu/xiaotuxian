import httpInstance from "@/utils/http";
export function getGoodsDeatilAPI(id) {
    return httpInstance({
        url: '/goods',
        params: {
            id
        }
    })
}
export function getHotGoodsAPI({ id, type = "1", limit = 3 }) {
    return httpInstance({
        url: '/goods/hot',
        params: {
            id,
            type,
            limit
        }
    })
}