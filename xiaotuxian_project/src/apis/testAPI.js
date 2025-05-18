import httpInstance from "@/utils/http";
export function getCategory() {
    console.log('getCategory函数被调用了');

    return httpInstance({
        url: 'home/category/head'
    })
}