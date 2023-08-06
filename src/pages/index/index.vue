<template>
  <view>
    <WeappTailwindcss></WeappTailwindcss>
    <view class="flex justify-center w-full">
      <view class="w-20" hover-class="none" hover-stop-propagation="false">
        <u-button type="primary" @click="increment">提交</u-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import WeappTailwindcss from '@/components/WeappTailwindcss.vue'
import { useCounterStore } from '@/stores/counter'

const useCounter = useCounterStore()
const { count } = $(storeToRefs(useCounter))

const { increment } = useCounter

watchEffect(() => {
  console.log(count)
})
</script>
