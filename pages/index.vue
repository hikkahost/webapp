<template>
  <TgLoader :loaded="loaded" />
  <div>
    <TgSection>
      <TgLine :border="false" class="pt-2">
        <TgIconBox icon="ph:moon-duotone" size="xl" />
      </TgLine>
      <TgLine :border="false">
        <h1 class="text-lg font-medium pt-1">HikkaHost</h1>
      </TgLine>
      <TgLine :border="false">
        <p class="tg-hint leading-none text-xs pb-1">Hosting for Hikka userbot</p>
      </TgLine>
      <TgLine class="pt-2 max-w-80 m-auto" :border="false">
        <TgButton @click="actionPopup('start')" icon="ph:play-duotone">Start</TgButton>
        <TgButton @click="actionPopup('stop')" icon="ph:pause-duotone">Stop</TgButton>
      </TgLine>
      <TgLine class="pb-2 max-w-80 m-auto">
        <TgButton @click="actionPopup('restart')" icon="ph:play-pause-duotone">Restart</TgButton>
      </TgLine>
    </TgSection>

    <TgSection>
      <TgCell title="Subscription time" :description="`Expires at ${expired_date}`">
        <template #icon>
          <TgIconBox icon="ph:clock-duotone" />
        </template>
        <template #right>
          {{ days_left }}
        </template>
      </TgCell>

      <TgCell title="CPU usage" description="Processor load %">
        <template #icon>
          <TgIconBox icon="ph:cpu-duotone" />
        </template>
        <template #right>
          5.45%
        </template>
      </TgCell>

      <TgCell title="RAM usage" description="Memory load %">
        <template #icon>
          <TgIconBox icon="ph:memory-duotone" />
        </template>
        <template #right>
          78.4%
        </template>
      </TgCell>

      <TgCell title="Ping" description="Time to answer">
        <template #icon>
          <TgIconBox icon="ph:ping-pong-duotone" />
        </template>
        <template #right>
          20.13ms
        </template>
      </TgCell>

      <TgCell title="Hikka" description="Hikka web UI">
        <template #icon>
          <TgIconBox icon="ph:app-window-duotone" />
        </template>
        <template #right>
          <TgButton @click="hikkaOpen">Open</TgButton>
        </template>
      </TgCell>

      <TgCell title="Logs" description="All userbot logs">
        <template #icon>
          <TgIconBox icon="ph:bug-beetle-duotone" />
        </template>
        <template #right>
          <TgButton to="/logs">Show</TgButton>
        </template>
      </TgCell>
    </TgSection>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'webapp',
})

import { ref, onMounted, computed } from 'vue'
import type { ValidatorAnswer, InfoAnswer } from '../types/answers';

const loaded = ref(false)
const token = ref('')
const expired_date = ref('2022-12-31')
const port = ref(1000)

const days_left = computed(() => {
  const date = new Date(expired_date.value)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return `${days} days`
})

const actionPopup = (action: string) => {
  loaded.value = false
  setTimeout(() => {
    loaded.value = true
    Telegram.WebApp.showPopup({
      title: 'Action',
      message: `Action ${action} confirmed`,
    })
  }, 1000)
}

const hikkaOpen = () => {
  Telegram.WebApp.openLink(`http://79.137.207.64:${port.value}`)
}

onMounted(async () => {
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

    const info = await $fetch('/api/info', {
      method: 'POST',
      body: {
        token: token.value,
        userId: Telegram.WebApp.initDataUnsafe.user.id,
      }
    }) as InfoAnswer

    port.value = info.answer.host.port
    expired_date.value = info.answer.host.end_date.split('T')[0]

    loaded.value = true
  }

  Telegram.WebApp.BackButton.hide();
})
</script>