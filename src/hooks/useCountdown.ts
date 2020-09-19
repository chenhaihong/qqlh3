import { ref, onBeforeUnmount, onMounted } from 'vue'

export default function useCountdown(time = 10, callback: undefined | (() => void)) {
  const remaining = ref(time)

  let id: number
  const cancle = (): void => {
    id && clearInterval(id)
  }

  onMounted(() => {
    id = setInterval(() => {
      remaining.value--
      if (remaining.value <= 0) {
        id && clearInterval(id)
        callback && callback();
      }
    }, 1000)
  })
  onBeforeUnmount(cancle)


  return [remaining, cancle]
}