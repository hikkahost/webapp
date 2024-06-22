<template>
    <div class="fixed inset-0 z-50 tg-secondary-bg" :style="{display: computeStyle}">
        <div class="flex flex-col items-center justify-center h-screen">
            <div class="animate-pulse">
                <Icon name="ph:moon-duotone" size="40" class="tg-loader" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let props = defineProps<{
    loaded: boolean
}>()

import { computed } from 'vue'

const computeStyle = computed(() => {
    return props.loaded ? 'none' : 'block'
})
</script>