<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/section')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li><strong class="tagstyle">&lt;div class="cardwrap" &gt;&lt;/div&gt;</strong>태그 필수 사용 </li>
                <li><strong class="tagstyle">&lt;div class="card" &gt;&lt;/div&gt;</strong>를 반복적으로 추가시 전체 width에 맞춰 유동적으로 배치</li>
                <li>카드 높이의 경우 가장 긴 콘텐츠에 맞춰 자동 정렬</li>
                <li>컴포넌트 혹은 태그에 <strong class="tagstyle">inline</strong>으로 스타일 지정 가능</li>
                <li> <strong>VUE에서 컴포넌트로 사용시 필요 요소를 Props</strong>로 지정하여 사용</li>
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
            sampleCodeJS: `<div class="cardwrap">
    <div class="card" style="flex-basis: 300px;">
        내용 추가
    </div>
    ...
</div>`
        },
        {
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    :cardWidth: 카드 가로 크기(Number)
    :cardTitle: 카드 제목(String)
    :cardSubtext: 카드 제목 설명(String)
    #btnArea 타이틀 우측에 버튼 추가시 슬롯으로 처리 
    #cardContent 카드  콘텐츠 작성
-->
<div class="cardwrap">
    <CardBox :cardWidth="590" :cardTitle="'오늘 나의 업무'" :cardSubtext="'사용자가 처리해야할 업무입니다.'">
        <template #btnArea>
            <div><button type="button" class="btn submit sm">submit 버튼</button></div>
        </template>
        <template #cardContent>
            <div>카드 내용 작성</div>
        </template>
    </CardBox>
    ...
</div>`
        },
        {
            title: 'VUE COMPONENT',
            sampleCodeJS: `<template>
    <div class="card" :style="flex-basis:\${state.cardWidth}px">
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
\<script setup>
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
})
<\/script>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.cardwrap{display: flex; flex-wrap:wrap; position: relative; left:-20px}
.card{flex:1;flex-shrink:1; flex-basis:400px;border:solid 1px #ddd; border-radius:5px; padding:15px;margin-left:20px; margin-bottom:20px; align-items: stretch; background:#fff}`
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
            console.error( '클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
};
</script>