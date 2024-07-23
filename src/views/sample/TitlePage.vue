<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=Title')">가이드 페이지 </button>
            </div>
            <div class="guideTitle">타이틀 레이아웃</div>
            <div class="titlebox">
                <h1 class="pagetitle">페이지 타이틀 <em class="subdec">(11)</em></h1>
                <div class="titleright flex">
                    <button type="button" class="btn sm">버튼명</button>
                    <button type="button" class="btn sm">버튼명</button>
                </div>
            </div>
            <div class="guideTitle">타이틀 레이아웃 - 아이콘 추가</div>
            <div class="titlebox img">
                <h1 class="pagetitle">페이지 타이틀 <em class="subdec">(11)</em></h1>
                <div class="titleright flex">
                    <button type="button" class="btn sm">버튼명</button>
                    <button type="button" class="btn sm">버튼명</button>
                </div>
            </div>
            <div class="guideTitle">타이틀 레이아웃 - 아이콘, 툴팁추가</div>
            <div class="titlebox img" style="margin-bottom:50px">
                <h1 class="pagetitle">
                    페이지 타이틀
                    <ToolTip :toolBtn="'툴팁'" :toolContent="'툴팁 설명입니다.'" :toolType="'top'" />
                    
                </h1>
                <div class="titleright flex">
                    <button type="button" class="btn sm">버튼명</button>
                    <button type="button" class="btn sm">버튼명</button>
                </div>
            </div>
            <TitleBox :pageTitle="'타이틀 레이아웃'" :subdec="'(22)'" :imgIcon="true">
                <template #btnArea>
                    <button type="button" class="btn sm">버튼명</button>
                    <button type="button" class="btn sm">버튼명</button>
                </template>
                <template #ToolTip>
                    <ToolTip :toolBtn="'툴팁'" :toolContent="'툴팁 설명입니다.'" :toolType="'top'" />
                </template>
            </TitleBox>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
import ToolTip from '@/components/ToolTip.vue';
import TitleBox from '@/components/TitleBox.vue';
const { goToPage } = useCommFunc();
const state = reactive({
    caseType: false,
    className: '',
    offsetTop: null,
    offsetLeft: null
    
});

</script>