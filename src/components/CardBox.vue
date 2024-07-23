<template>
    <div class="card" :style="`flex-basis:${state.cardWidth}px`">
        <div class="titlebox img" v-if="state.cardTitle">
            <h1 class="pagetitle" >
                {{state.cardTitle}}
                <span class="subtext">{{state.cardSubtext}}</span>
            </h1>
            <slot name="btnArea"></slot>
        </div>
        <slot name="cardContent"  />
    </div>
</template>
<script setup>
import { computed, reactive } from 'vue';
const props = defineProps({
    cardWidth: Number,
    cardTitle: String,
    cardSubtext: String
});
const state = reactive({
    cardTitle: computed(() => props.cardTitle),
    cardWidth: computed(() => props.cardWidth),
    cardSubtext: computed(() => props.cardSubtext)
});
</script>