<template>
    <div class="donut-box">
        <div class="ui-donut">
            <div class="chart-donut"  :style="computedGradient()">
                <div class="ui-donut-in" v-if="state.totalValue">
                    <div class="in-text">
                        <span>Total Value</span>
                        <strong>{{ state.totalValue }}</strong>
                    </div>
                </div>
            </div>
        </div>
        <div class="donnt-regend">
            <ul>
                <li v-for="(item, index) in state.donetlegend" :key="index">
                    <em class="regend-icon" :style="`background-color:#${state.colors[index]}`"></em>
                    <span class="regend-name">{{ item.name }}</span>
                    <span class="regend-num">{{ item.num }}EA</span>
                    <span class="regend-rate">{{ item.rate }}%</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive, onMounted } from 'vue';
const props = defineProps(
    {
        donetlegend: Array,
        colors: Array,
        totalValue: Number
    });
const state = reactive({
    donetlegend: computed(() => props.donetlegend),
    totalValue: computed(() => props.totalValue),
    colors: computed(() => props.colors),
    values: null
   
});
onMounted(() => {
    state.values = state.donetlegend.map(item => parseInt(item.rate, 10));
    console.log(state.values);
});
/**
    * 그래프 맥스 값
    * @description 그래프의 상한선 지정
    * 
*/
const total = () => {
    const rates = state.donetlegend.map(item => parseInt(item.rate, 10));
    return rates.reduce((a, b) => a + b, 0);
};
/**
    * 그래프 색상 지정 
    * @description 해당값 /그래프 맥스 값 *360 = 시작값, 끝값 지정
    * 
*/
const computedGradient = () => {
    const rates = state.donetlegend.map(item => parseInt(item.rate, 10));
    let currentAngle = state.totalValue ?  1 : 0;
    const segments = rates.map((value, index) => {
        const startAngle = currentAngle;
        const segmentAngle = (value / total()) * 360;
        currentAngle += state.totalValue ? segmentAngle + 1 : segmentAngle;
        return state.totalValue ? `#fff ${startAngle - 1}deg ${startAngle}deg, #${state.colors[index]} ${startAngle + 1}deg ${currentAngle - 1}deg, #fff ${currentAngle - 1}deg ${currentAngle}deg` :
            ` #${state.colors[index]} ${startAngle}deg ${currentAngle}deg, #fff ${currentAngle}deg ${currentAngle}deg`;
    });
    return {
        background: `conic-gradient(${segments.join(', ')})`
    };
};


</script>