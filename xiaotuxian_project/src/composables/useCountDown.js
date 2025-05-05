import dayjs from 'dayjs'
import { computed, onUnmounted, ref } from 'vue'
export const useCountDown = () => {
    const time = ref(0)
    const formateTime = computed(() => {
        return dayjs.unix(time.value).format('mm分ss秒')
    })
    let timerId = null
    const start = (currentTime) => {
        time.value = currentTime
        timerId = setInterval(() => {
            currentTime--
            time.value = currentTime
        }, 1000)
    }
    onUnmounted(() => {
        timerId && clearInterval(timerId)
    })
    return {
        time,
        formateTime,
        start
    }
}