import { defineStore } from "pinia";
import { getCategoryAPI } from '../apis/layout'
import { ref } from 'vue'
export const useCategoryStore = defineStore('category', () => {
    let categoryList = ref([])
    const getCategory = async () => {
        const res = await getCategoryAPI()
        categoryList.value = res.result
    }
    console.log(categoryList);

    return {
        categoryList,
        getCategory
    }
})