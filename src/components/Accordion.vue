<template>
    <div class="accordionBox">
        <div class="accordion_top" @click="openAcc">
            <template v-if="!hasAccTitleSlot">{{state.title}} 1</template>
            <slot name="acc_title" v-else></slot>
        </div>
        <div class="accordion_cons">
            <div class="acc_content">
                <template v-if="!hasAccContentSlot">{{ state.content }}</template>
                <slot name="acc_con" v-else></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive, useSlots } from 'vue';
const slots = useSlots();
const props = defineProps(
    {
        itemTitle: String,
        itemContent: String
    });

const hasAccTitleSlot = computed(() => !!slots.acc_title);
const hasAccContentSlot = computed(() => !!slots.acc_con);
const state = reactive({
    title: computed(() => props.itemTitle),
    content: computed(() => props.itemContent)
   
});
const openAcc = (event) => {
    const parEle = event.currentTarget.parentElement;
    if (parEle.classList.contains('open')) {
        parEle.classList.remove('open');
    } else {
        parEle.classList.add('open');
    }
};


</script>