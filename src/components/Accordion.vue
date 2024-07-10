<template>
    <div class="accordionBox">
        <div class="accordion_top" @click="openAcc">{{state.title}}</div>
        <div class="accordion_cons">
            <div class="acc_content">
                <div v-if="state.content">{{state.content }}</div>
                <slot name="acccon" v-if="!state.itemContent" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, computed, reactive } from 'vue';
const props = defineProps(
    {
        itemTitle: String,
        itemContent: String
    });
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