<template>
    <TgLoader :loaded="loaded" />
    <div class="py-4">
        <TgSection title="Logs (reversed lines)">
            <pre class="p-3 max-w-[100vw] h-[90vh] overflow-auto font-mono" id="logsArea">{{ logs.split('\n').reverse().join('\n') }}</pre>
        </TgSection>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'webapp',
})

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { LogsAnswer, ValidatorAnswer } from '../types/answers';
const router = useRouter()

const loaded = ref(false)
const logs = ref('')
const token = ref('')

onMounted(async () => {
    Telegram.WebApp.BackButton.show();

    Telegram.WebApp.onEvent('backButtonClicked', () => {
        router.push('/')
    })

    const validate = await $fetch('/api/validate', {
        method: 'POST',
        body: {
            initData: Telegram.WebApp.initData,
            hash: Telegram.WebApp.initDataUnsafe.hash,
        }
    }) as ValidatorAnswer

    if (!validate.ok) {
        Telegram.WebApp.showPopup({
            title: 'Error',
            message: validate.error,
        })
    } else {
        token.value = validate.token
        const req = await $fetch('/api/logs', {
            method: 'POST',
            body: {
                token: token.value,
                userId: Telegram.WebApp.initDataUnsafe.user.id
            }
        }) as LogsAnswer;

        logs.value = req.answer.logs;
        loaded.value = true
    }
})
</script>