<template>
    <div class="barbox">
        <div class="barChart" :id="state.id"><em class="bar" :style="`width:${state.rate}%`"></em></div>
        <em class="datarate">{{state.rate}}%</em>
    </div>
</template>
<script setup>
import { computed, reactive } from 'vue';
const props = defineProps(
    {
        rate: String || Number,
        id: String
    });

const state = reactive({
    rate: computed(() => props.rate),
    id: computed(() => props.id)
});
</script>