import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export function useCategory() {
    const route = new useRoute();
    const categoryData = ref({});
    const getCategoryData = async (id = route.params.id) => {
        const res = await getCategoryAPI(id);
        categoryData.value = res.result;
    };
    onMounted(() => {
        getCategoryData();
    });
    onBeforeRouteUpdate((to) => {
        getCategoryData(to.params.id);
    });
    return {
        categoryData
    }
}