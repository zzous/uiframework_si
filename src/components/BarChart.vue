<template>
    <div class="ui-chart">
        <div class="ui-bar-chart">
            <div class="ui-bar-y">
                <strong class="unit">(횟수)</strong>
                <ul class="ui-bar-y-unit">
                    <li v-for="(item, index) in state.unit" :key="index">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="ui-bar-x">
                <ul class="ui-bar-x-unit" :id="state.chartId" >
                    <li v-for="(item, index) in state.chartBar" :key="index"  >
                        <span class="bar" :style="barStyle(item.rate)" @click="onClickBar($event,index)"></span>
                        <span class="x-value">{{item.name}}</span>
                        <span class="bar-tooltip">
                            <span class="t-title">{{ item.name }}</span>
                            <span class="t-countbox">
                                <em>{{item.name}}</em>
                                <em class="t-count">{{item.rate}}건</em>
                            </span>
                            <strong class="t-sales-num">{{item.rate}}원</strong>
                            <span class="t-date">{{item.date}}{{item.time}}</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive } from 'vue';
const props = defineProps(
    {
        unit: Array,
        chartBar: Array,
        chartId: String,
        chartColor: String
    });
const state = reactive({
    chartBar: computed(() => props.chartBar),
    unit: computed(() => props.unit),
    chartId: computed(() => props.chartId),
    chartColor: computed(() => props.chartColor)
   
});
/**
    * 그래프 맥스 값
    * @description 그래프의 상한선 지정
    * 
*/
const maxValue = () => {
    const value = Math.max(...state.unit);
    const num = valueGap();
    return state.unit[0] === 0 ? value + num[1] : value;
};
/**
    * @valueGap
    * 그래프 범례 차이 필요시 사용
*/
const valueGap = () => {
    return state.unit.map((value, index) => {
        if (index === 0) return null;
        return  value - state.unit[index - 1];
    }).slice(1);
};
/**
    * 그래프 스타일
    * @description 해당 값/그래프 맥스 값을 백분율로, 컬러지정
    * @params rate 
    * 
*/
const barStyle = (rate) => {
    const hight = maxValue();
    return {
        backgroundColor: `#${state.chartColor}`,
        height: ((rate / hight) * 100) > 100 ? '100%' : `${((rate / hight) * 100)}%`
    };
};
/**
    * 툴팁
    * @description 마우스 클릭 위치 계산하여 툴팁 위치 설정
    * @params target, index
*/
const onClickBar = (target, index) => {
    const toolTip = document.querySelectorAll(`#${state.chartId} > li`)[index];
    const barTooltip = document.querySelectorAll(`#${state.chartId} > li > .bar-tooltip`);
    for (const child of barTooltip) {
        child.style.opacity = 0;
        child.style.top = 0;
        child.style.left = 0;
        child.style.marginTop = -10 + 'px';
    }
    for (const child of toolTip.children) {
        if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('bar-tooltip')) {
            child.style.opacity = 1;
            child.style.top = (target.clientY - child.getBoundingClientRect().height) + 'px';
            child.style.left = (target.clientX) + 'px';
            child.style.marginTop = 0 + 'px';
        }
    }
};

</script>