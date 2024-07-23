<template>
    <div class="pageView">
       
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=Card')">가이드 페이지 </button>
            </div>
            <div class="guideTitle">내부 영역 레이아웃</div>
            <div class="flex btns">
                <button type="button" class="btn btn-sm " @click="onChangeBox('2')"><span class="ico-search"></span>2단</button>
                <button type="button" class="btn btn-sm" @click="onChangeBox('2', 'fixed')">2단 왼쪽 고정</button>
                <button type="button" class="btn btn-sm" @click="onChangeBox('3')">3단 </button>
                <button type="button" class="btn btn-sm" @click="onChangeBox('3', 'fixed')">3단 왼쪽 고정</button>
            </div>
            <div :class="['section-share', state.className]">
                <div class="sharebox">
                    <div class="flex-center">영역1</div>
                </div>
                <div class="sharebox">
                    <div class="flex-center">영역2</div>
                </div>
                <div class="sharebox" v-if="state.caseType">
                    <div class="flex-center">영역2</div>
                </div>
            </div>
            <div class="guideTitle">카드 타입</div>
            
            <div class="cardwrap">
                <CardBox :cardWidth="590" :cardTitle="' 카드 타이틀 입니다.'" :cardSubtext="'카드 서브 타이틀 입니다'" style="min-height:100px;">
                    <template #btnArea>
                        <div><button type="button" class="btn submit sm">submit 버튼</button></div>
                    </template>
                    <template #cardContent>
                        <div>카드 내용 작성</div>
                    </template>
                </CardBox>
                <CardBox :cardWidth="590" :cardTitle="' 카드 타이틀 입니다.'" :cardSubtext="'카드 서브 타이틀 입니다'" style="min-height:100px;">
                    
                    <template #cardContent>
                        <div>카드 내용 작성</div>
                    </template>
                </CardBox>
                
               
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
const state = reactive({
    caseType: false,
    className: ''
    
});
const onChangeBox = (type, fixed) => {
    if (fixed === 'fixed') {
        state.className = fixed;
        type === '3' ? state.caseType = true : state.caseType = false;
    } else {
        state.className = '';
        type === '3' ? state.caseType = true : state.caseType = false;
    }
};
</script>