<template>
    <div :class="['ui-chart', state.chartClass]">
        <div class="ui-bar-chart hor">
            <div class="ui-bar-y">
                <ul class="ui-bar-y-unit" :id="state.chartId">
                    <li v-for="(item, index) in state.chartBar" :key="index">
                        <span class="lb">{{item.name}}</span>
                        <span class="graph"  >
                            <span class="bar" :style="barStyle(item.rate, index)" @mouseover.stop.prevent="onClickBar($event,index)" @mouseout.stop.prevent="onCloseTip"></span>
                        </span>
                        <span class="ratetext">
                            <em class="rateValue" :style="Array.isArray(state.chartColorType) ?`color:#${state.chartColorType[index]}`:`color:#${state.chartColorType}`">{{ item.rate }}%</em>
                        </span>
                        <span class="bar-tooltip">
                            <span class="t-title">{{ item.name }}</span>
                            <span class="t-countbox">
                                <em>{{item.name}}</em>
                                <em class="t-count" :style=" Array.isArray(state.chartColorType) ?`color:#${state.chartColorType[index]}`:`color:#${state.chartColorType}`" >{{item.rate}}%</em>
                            </span>
                            <span class="t-date">{{item.date}}{{item.time}}</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="ui-bar-x">
                <ul class="ui-bar-x-unit">
                    <li v-for="(item, index) in state.unit" :key="index">
                        <span class="x-value">{{ item }}</span>
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
        chartColorType: Array || String,
        chartId: String,
        chartClass: String
    });
const state = reactive({
    chartBar: computed(() => props.chartBar),
    unit: computed(() => props.unit),
    chartId: computed(() => props.chartId),
    chartClass: computed(() => props.chartClass),
    chartColorType: computed(() => props.chartColorType)
   
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
    * 범례별 차이 
*/
const valueGap = () => {
    return state.unit.map((value, index) => {
        if (index === 0) return null;
        return  value - state.unit[index - 1];
    }).slice(1);
};
/**
    * 그래프 스타일
    * 해당 값/그래프 맥스 값을 백분율로 높이 지정
    * 단일,다중 색상지정
    * 데이터가 %가 아닌 건으로 들어오는 경우 width계산식((rate / hight) * 100) > 100 ? '100%' : `${((rate / hight) * 100)}%`
    * @params rate 그래프 비율 값
    * @params index 그래프 순서
    * 
*/
const barStyle = (rate, index) => {
    const hight = maxValue();
    return {
        backgroundColor: Array.isArray(state.chartColorType) ? `#${state.chartColorType[index]}` : `#${state.chartColorType}`,
        width: `${rate}%`
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
            child.style.top = ((target.clientY - child.getBoundingClientRect().height) - 5) + 'px';
            child.style.left = (target.clientX) + 'px';
            child.style.marginTop = 0 + 'px';
            child.style.zIndex = 99;
        }
    }
};
/**
    * 툴팁
    * @description 마우스 클릭 위치 계산하여 툴팁 위치 설정
    * @params target, index
*/
const onCloseTip = () => {
    const barTooltip = document.querySelectorAll(`#${state.chartId} > li > .bar-tooltip`);
    for (const child of barTooltip) {
        child.style.opacity = 0;
        child.style.top = 0;
        child.style.left = 0;
        child.style.zIndex = -1;
        child.style.marginTop = -10 + 'px';
    }
};
</script>