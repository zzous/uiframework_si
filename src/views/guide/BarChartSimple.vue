<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/chart')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li>차트 색상 변경시  클래스 추가 하여 색상 변경</li>
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
            sampleCodeJS: `<!-- 기본 사용 비율만 표기-->
<div class="barbox">
    <div class="barChart" id="ablestorage-0"><em class="bar" style="width: 50%;"></em></div>
    <em class="datarate">50%</em>
</div>`
        },
        {
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    :rate 그래프 비율(Number || String)
    :id 차트 ID(String)
-->
<BarSimple :rate="'50'" :id="'chart1'"  />`
        },
        {
            title: 'VUE COMPONENT',
            sampleCodeJS: `<div class="barbox">
    <div class="barChart" :id="state.id"><em class="bar" :style="'width:\${state.rate}%'"></em></div>
    <em class="datarate">{{state.rate}}%</em>
</div>
</template>
\<script setup>
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
<\/script>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.barbox { display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; position: relative; }
.barChart { width: 100px; height: 8px; border-radius: 4px; background: #f0f0f0; position: relative; }
.barChart .bar { height: 8px; border-radius: 4px; background: var(--point-bar-color); position: absolute; left: 0; top: 0; }
.datarate { margin-left: 10px; }`
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