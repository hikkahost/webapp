<template>
    <div class="py-4">
        <TgSection title="Logs">
            <pre class="p-3 max-w-[100vw] h-[90vh] overflow-auto">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Nunc et vulputate nunc, ut tincidunt nisl. Etiam ullamcorper blandit tellus, sed efficitur li
bero elementum eu. Praesent efficitur viverra lorem, ac faucibus felis tristique ac. Aenean bibendum, pu
rus in pharetra viverra, massa lectus pulvinar massa, at ullamcorper mauris purus sed sem. Donec sagittis ligula ut accumsan rhoncus. Phasellus metus li
gula, auctor eu augue eget, scelerisque fermentum est. Duis sit amet blandit sem. Vivamus vestibulum, felis non elementum elementum, lorem est mattis risu
s, non consequat diam metus eget mauris. Ut et suscipit elit, sed vehicula magna. Vivamus tempor pulvinar ipsum eu fringilla. Aliquam quis arcu tellus. Fusce
 malesuada purus non nibh aliquam, sed congue dui mattis. Integer ullamcorper tempor augue, vitae ornare massa ullamcorper vel. Aenean orci est, suscipit ac 
 dui eget, viverra tincidunt nibh. Nullam pulvinar diam non risus rhoncus porta.

Curabitur sollicitudin lacus lorem, ut venenatis ante scelerisque eget. Phasellus solli
citudin venenatis nibh. Nam euismod ultricies diam, ut posuere massa. Suspendisse potenti. Praesent et od
io dui. Aliquam sodales metus id pulvinar fringilla. Donec non cursus arcu. Praesent et pretium dui. Sed vestibulum quam ultricies interdum orn
are. Duis vel lectus sem. Sed bibendum egestas urna a lacinia. Quisque ante lacus, blandit eget facilisis id, lacinia convallis neque. Duis congue
 auctor est vitae scelerisque. Curabitur finibus interdum felis, convallis elementum sapien cursus eu. Sed vitae eros vitae erat eleifend pretium eu qu
 is elit. Integer id lorem accumsan, dignissim orci id, efficitur est.

Aliquam dignissim iaculis metus dictum porttitor. Aliquam viverra lacus a
c libero varius, non pretium diam rutrum. Duis pretium dolor non lorem condimentum vestibulum. Donec at p
ulvinar ex. Suspendisse aliquet, libero in vehicula dapibus, enim nibh blandit tortor, vitae interdum ante tellus vel sapien. Donec sollicitudin justo
 a est semper, vel imperdiet sapien volu
 tpat. Nullam nec felis massa. Etiam nulla velit, semper sed augue u
 t, porta consequat tellus. Donec massa magna, egestas ac mattis quis, dapibus laoreet purus. Donec pharetra sit amet diam sed interdum. Aenean non ipsu
 m vel purus aliquam facilisis. Nulla at turpis tristique, posuere sapien vel, semper dui.
            </pre>
        </TgSection>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'webapp',
})

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
    Telegram.WebApp.BackButton.show();

    Telegram.WebApp.onEvent('backButtonClicked', () => {
        router.push('/')
    })
})
</script>