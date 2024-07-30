<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/chart')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li>마우스 오버시 툴팁</li>
                <li>차트의 색상은 단일, 개별적으로 태그</li>
            </ul>
        </div>
        <div class="codewrap" v-for="(item, index) in state.codeSample" :key="index">
            <div :class="['codetitle', state.className]" >
                <span @click="toggleAcc(index)">{{item.title}}</span>
                <button type="button" class="btn btn-ss" @click="copyCode(item.sampleCodeJS)"> <span class="ico-menu"></span> 복사하기</button>
            </div>
            <div :class="['code', item.title]" >
<pre>
<code>
{{ item.sampleCodeJS }}
</code>
</pre>
            </div>
        </div>
    </div>
</template>
<script setup>
import {  reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const props = defineProps({ title: String });
const { goToPage } = useCommFunc();
const state = reactive({
    className: '',
    codeSample: [
        {
            title: 'HTML',
            sampleCodeJS: `<div class="ui-chart">
    <div class="ui-bar-chart">
        <div class="ui-bar-y">
            <!-- Y 축 레이블 -->
            <strong class="unit">레이블</strong>
            <ul class="ui-bar-y-unit">
                <li>0</li>
                .
                .
                .
            </ul>
        </div>
        <div class="ui-bar-x">
            <ul class="ui-bar-x-unit" id="ChartBar4">
                <li>
                    <!-- 차트 -->
                    <span class="bar" style="height: 57.1429%;"></span>
                    <!-- x 축 레이블 -->
                    <span class="x-value">9월</span>
                    <!-- 툴팁 -->
                    <span class="bar-tooltip">
                        <span class="t-title">9월</span>
                        <span class="t-countbox"><em>9월</em><em class="t-count">4000건</em></span>
                        <strong class="t-sales-num">4000원</strong>
                        <span class="t-date">202.06.1108:00</span>
                    </span>
                </li>
                .
                .
                .
            </ul>
        </div>
    </div>
</div>`
        },
        {
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    :unit Y 축 레이블(Array)
    :unitText Y 축 레이블명(String)
    :chartBar 차트 데이터(Array)
    :chartId 차트 ID(String)
    :chartColorType 차트 색상(String || Array)
-->
<div style="height:100px">
<BarChart
    :unit="state.unit"
    :unitText ="'(횟수)'"
    :chartBar="state.chartBar"
    :chartId="'ChartBar4'"
    :chartColorType="'5142b2'" ||  :chartColorType="['5142b2', '666666']"
/>
</div>`
        },
        {
            title: 'VUE COMPONENT',
            sampleCodeJS: `<div class="ui-chart">
    <div class="ui-bar-chart">
        <div class="ui-bar-y">
            <strong class="unit">{{state.unitText}}</strong>
            <ul class="ui-bar-y-unit">
                <li v-for="(item, index) in state.unit" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="ui-bar-x">
            <ul class="ui-bar-x-unit" :id="state.chartId" >
                <li v-for="(item, index) in state.chartBar" :key="index" @mouseover.stop.prevent="onClickBar($event,index)" @mouseout.stop.prevent="onCloseTip" >
                    <span class="bar" :style="barStyle(item.rate, index)" ></span>
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
\<script setup>
import { computed, reactive } from 'vue';
const props = defineProps(
    {
        unit: Array,
        unitText: String,
        chartBar: Array,
        chartId: String,
        chartColorType: Array || String
    });
const state = reactive({
    unitText: computed(() => props.unitText),
    unit: computed(() => props.unit),
    chartBar: computed(() => props.chartBar),
    chartId: computed(() => props.chartId),
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
    * 해당 값/그래프 맥스 값을 백분율로 높이 지정
    * 단일,다중 색상지정
    * @params rate 그래프 비율 값
    * @params index 그래프 순서
    * 
*/
const barStyle = (rate, index) => {
    const hight = maxValue();
    
    return {
        backgroundColor: Array.isArray(state.chartColorType) ? '#\${state.chartColorType[index]}' : '#\${state.chartColorType}',
        height: ((rate / hight) * 100) > 100 ? '100%' : '\${((rate / hight) * 100)}%'
    };
};
/**
    * 툴팁
    * @description 마우스 클릭 위치 계산하여 툴팁 위치 설정
    * @params target, index
*/
const onClickBar = (target, index) => {
    const toolTip = document.querySelectorAll('#\${state.chartId} > li')[index];
    const barTooltip = document.querySelectorAll('#\${state.chartId} > li > .bar-tooltip');
    for (const child of barTooltip) {
        child.style.opacity = 0;
        child.style.top = 0;
        child.style.left = 0;
        child.style.marginTop = -10 + 'px';
        child.style.zIndex = -1;
    }
    for (const child of toolTip.children) {
        if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('bar-tooltip')) {
            child.style.opacity = 1;
            child.style.top = (target.clientY - child.getBoundingClientRect().height) + 'px';
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
    const barTooltip = document.querySelectorAll('#\${state.chartId} > li > .bar-tooltip');
    for (const child of barTooltip) {
        child.style.opacity = 0;
        child.style.top = 0;
        child.style.left = 0;
        child.style.zIndex = -1;
        child.style.marginTop = -10 + 'px';
    }
};
<\/script>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.ui-chart { height: 100%; min-height: 300px; padding-bottom: 30px; } 
.ui-bar-chart { display: flex; position: relative; height: 100%; padding-bottom: 20px; }
.ui-bar-chart .ui-bar-x { flex: 1; border-bottom: 1px solid #d2d2d2; }
.ui-bar-x .unit { position: absolute; bottom: -4px; right: 0; font-size: 12px; }
.ui-bar-chart .ui-bar-y { border-right: 1px solid #d2d2d2; } 
.ui-bar-y .unit { position: absolute; top: -3px; left: 0; font-size: 12px; }
.ui-bar-x-unit { display: flex; height: 100%; margin-right: 30px; }
.ui-bar-x-unit li { position: relative; width: 100%; height: 100%; text-align: center; }
.ui-bar-x-unit li .bar { position: absolute; bottom: 0; left: 25%; width: 50%; background-color: var(--point-txt-color); border-radius: 5px 5px 0 0; cursor: pointer; }
.ui-chart .ratetext { display: none; }
.ui-bar-x-unit li .x-value,
.ui-bar-x-unit li .x-value { position: absolute; bottom: -26px; left: 0; width: 100%; text-align: center; }
.ui-bar-y-unit { display: flex; flex-direction: column-reverse; align-items: flex-end; justify-self: flex-end; height: 100%; }
.ui-bar-y-unit li { display: flex; flex-direction: column-reverse; position: relative; height: 100%; padding-right: 20px; line-height: 0; }
.ui-bar-y-unit li::after { content: ""; position: absolute; bottom: 0; right: 0; width: 6px; height: 1px; background-color: #d2d2d2; }
.ui-bar-y-unit li .bar { background-color: var(--point-bar-color); border-radius: 0 5px 5px 0; }
.bar-tooltip { opacity: 0; position: fixed; padding: 10px; border: 1px solid #d2d2d2; background-color: var(--base-wh-color); border-radius: 5px; font-size: 11px; color: #666; transform: translateX(-50%); z-index: 10; transition: opacity 0.3s, margin-top 0.3s; margin-top: -10px; }
.bar-tooltip::after { content: ""; position: absolute; bottom: -5px; left: 50%; width: 8px; height: 8px; margin-left: -5px; border-width: 1px 1px 0 0; border-style: solid; border-color: #d2d2d2; background-color: var(--base-wh-color); transform: rotate(135deg); }
.bar-tooltip .t-sales-num { display: block; margin-top: 3px; color: var(--point-txt-color); text-align: right; }
.bar-tooltip .t-countbox { color: var(--base-txt-color); display: flex; justify-content: space-between; }
.bar-tooltip .t-count { font-weight: bold; color: var(--point-txt-color); margin-left: 10px; }
.bar-tooltip .t-title { display: block; font-weight: bold; color: var(--base-txt-color); font-size: 13px; margin-bottom: 5px; text-align: left; }
.bar-tooltip .t-date { display: block; text-align: left; margin-top: 5px; }
.bar:hover .bar-tooltip { display: block; }`
        }
    ]
});
const toggleAcc = (idx) => {
    const tag = document.getElementsByClassName('codewrap');
    tag[idx].classList.contains('up') ? tag[idx].classList.remove('up') : tag[idx].classList.add('up');
};
const copyCode = (code) => {
    navigator.clipboard.writeText(code)
        .then(() => {
            alert('코드가 클립보드에 복사되었습니다.');
        })  .catch((err) => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
};
</script>