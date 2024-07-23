<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/title')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li>영역을 좌우로 나누어 텍스트 영역과 버튼 또는 form 영역으로 나누어 사용</li>
                <li><strong>VUE에서 컴포넌트로 사용시 필요 요소를 Props</strong>로 지정하여 사용</li>
                <li>현재 페이지 내의 예시는 아이콘 여부, 버튼 추가, 툴팁 추가를 설정 할 수 있도록 되어 있음</li>
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
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const props = defineProps({ title: String });
const { goToPage } = useCommFunc();
const state = reactive({
    className: '',
    codeSample: [
        {
            title: 'HTML',
            sampleCodeJS: `<div class="titlebox">
    <h1 class="pagetitle">페이지 타이틀 <em class="subdec">(11)</em>
        <div class="toolTip">
            <button type="button" class="btn-tooltip">툴팁</button>
            <div class="tooltipbox left open"> <div>툴팁 내용</div></div>
        </div>
    </h1>
    <div class="titleright">
        <button type="button" class="btn btn-line">버튼명</button>
        <button type="button" class="btn btn-line">버튼명</button>
    </div>
</div>`
        },
        {
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    :pageTitle: 제목(String)
    :subdec: 제목 서브 설명이나 리스트 개수 표시(String or Number)
    :imgIcon: 아이콘이 필요한 경우(Boolean 기본값 false)
    #btnArea 타이틀 우측에 버튼 추가시 슬롯으로 처리 
    #ToolTip 툴팁 추가
-->
<TitleBox :pageTitle="'타이틀 레이아웃'" :subdec="'(22)'" :imgIcon="true">
    <template #btnArea>
        <button type="button" class="btn sm">버튼명</button>
        <button type="button" class="btn sm">버튼명</button>
    </template>
    <template #ToolTip>
        <ToolTip :toolBtn="'툴팁'" :toolContent="'툴팁 설명입니다.'" :toolType="'top'" />
    </template>
</TitleBox>`
        },
        {
            title: 'VUE COMPONENT',
            sampleCodeJS: `<template>
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
\<script setup>
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
<\/script>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.titlebox{display:flex; align-items: center; justify-content: space-between; padding-bottom:20px; border-bottom:solid 1px #ddd}
.titlebox .pagetitle{font-size:20px; font-weight:700;}
.titlebox .subdec{font-size:15px; font-weight:700;}
.titlebox .titleright button + button{margin-left:10px}`
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
        })
        .catch((err) => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
};

</script>

