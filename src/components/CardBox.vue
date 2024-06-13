<template>
    <div class="card" :style="`flex-basis:${cardWidth}px`">
        <div class="titlebox img">
            <h1 class="pagetitle">{{cardTitle}}</h1>
            <slot name="btnArea"></slot>
        </div>
        <slot name="cardContent"  />
    </div>
</template>
<script setup>
import { getCurrentInstance, computed, reactive } from 'vue';
const props = defineProps(
    {
        cardWidth: Number,
        cardTitle: String
    });
const state = reactive({
    cardTitle: computed(() => props.cardTitle),
    cardWidth: computed(() => props.cardWidth)
   
});


</script>