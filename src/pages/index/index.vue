<template>
  <view>
    <WeappTailwindcss></WeappTailwindcss>

    <!-- <t-button size="small" theme="primary" variant="outline">描边按钮</t-button> -->
    <button class="w-40" @click="increment">你好</button>
  </view>
</template>

<script setup lang="ts">
import WeappTailwindcss from '@/components/WeappTailwindcss.vue'
import { useCounterStore } from '@/stores/counter'
// import TButton from '@/components/tdesign/components/button/index.vue'

const useCounter = useCounterStore()
const { count } = $(storeToRefs(useCounter))

const { increment } = useCounter

watchEffect(() => {
  console.log(count)
})
</script>
