<template>
    <div :class="['titlebox', {img:state.imgIcon}]">
        <h1 class="pagetitle">
            {{ state.pageTitle }}
            <em class="subdec">{{ state.subdec }}</em>
            <slot name="ToolTip"></slot>
        </h1>
        <div class="titleright flex">
            <slot name="btnArea"></slot>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive } from 'vue';
const props = defineProps({
    imgIcon: Boolean,
    pageTitle: String,
    subdec: [Number, String]
});
const state = reactive({
    pageTitle: computed(() => props.pageTitle),
    imgIcon: computed(() => props.imgIcon),
    subdec: computed(() => props.subdec)
});
</script>