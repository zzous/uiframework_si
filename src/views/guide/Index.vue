<template>
    <div class="guidewrap">
        <div class="guidetop">NewUI Guide</div>
        <div class="guidecontentwrap">
            <div class="guidelnb">
                <div class="menulist">
                    <ul>
                        <li v-for="(item, index) in state.guideMenu" :key="index" :class="{'active':item.name === String(currentPageComponent.__name)}" @click="onChangePage(item.name, item.label)">
                            <span  v-html="item.label"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <component :is="currentPageComponent" :title="state.componentsTitle"></component>
        </div>
    </div>
</template>

<script setup>
import {  onMounted, reactive,  shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PageLayout from '@/views/guide/PageLayout.vue';
import Menu from '@/views/guide/Menu.vue';
import Section from '@/views/guide/Section.vue';
import Card from '@/views/guide/Card.vue';
import Title from '@/views/guide/Title.vue';
import Tab from '@/views/guide/Tab.vue';
import Buttons from '@/views/guide/Buttons.vue';
import Accordion from '@/views/guide/Accordion.vue';
import FormInput from '@/views/guide/FormInput.vue';
import FormFile from '@/views/guide/FormFile.vue';
import FormInputCheck from '@/views/guide/FormInputCheck.vue';
import Modal from '@/views/guide/Modal.vue';
import ToolTip from '@/views/guide/ToolTip.vue';
import List from '@/views/guide/List.vue';
import Table from '@/views/guide/Table.vue';
import DatePicker from '@/views/guide/DatePicker.vue';
import Pageing from '@/views/guide/Pageing.vue';
import Setting from '@/views/guide/Setting.vue';
import BarChartSimple from '@/views/guide/BarChartSimple.vue';
import BarChart from '@/views/guide/BarChart.vue';
import BarCharHor from '@/views/guide/BarCharHor.vue';
import Slide from '@/views/guide/Slide.vue';
import Request from '@/views/guide/Request.vue';
import Eslint from '@/views/guide/Eslint.vue';
import Common from '@/views/guide/Common.vue';
import CKedit from '@/views/guide/CKedit.vue';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
const router = useRouter();
const route = useRoute();
const state = reactive({
    guideMenu: [
        {label: '버전정보', name: 'Setting'},
        {label: 'request 설정', name: 'Request'},
        {label: 'eslint 설정', name: 'Eslint'},
        {label: '공통함수 설정', name: 'Common'},
        {label: '페이지 레이아웃', name: 'PageLayout'},
        {label: '카드', name: 'Card'},
        {label: '메뉴', name: 'Menu'},
        {label: '타이틀', name: 'Title'},
        {label: '리스트', name: 'List'},
        {label: '테이블', name: 'Table'},
        {label: '테이블 페이징', name: 'Pageing'},
        {label: '탭', name: 'Tab'},
        {label: '아코디언', name: 'Accordion'},
        {label: '버튼', name: 'Buttons'},
        {label: '폼-input', name: 'FormInput'},
        {label: '폼-input-file', name: 'FormFile'},
        {label: '폼-radio,checkbox', name: 'FormInputCheck'},
        {label: '차트-기본bar', name: 'BarChartSimple'},
        {label: '차트-bar세로형', name: 'BarChart'},
        {label: '차트-bar가로형', name: 'BarCharHor'},
        {label: '데이터피커', name: 'DatePicker'},
        {label: '툴팁', name: 'ToolTip'},
        {label: '모달팝업', name: 'Modal'},
        {label: '슬라이드', name: 'Slide'},
        {label: '에디터', name: 'CKedit'},
        // {label: '토스트 팝업', name: 'Toast'},
        // {label: '페이징', name: 'Pageing'},
        // {label: '데이터피커', name: 'Datepicker'}
    ],
    componentsTitle: '버전정보'
});
const componentsMap = {
    'Setting': { component: Setting, title: '버전정보' },
    'Request': { component: Request, title: 'request 설정' },
    'Eslint': { component: Eslint, title: 'eslint 설정' },
    'Common': { component: Common, title: '공통함수 설정' },
    'PageLayout': { component: PageLayout, title: '페이지 레이아웃' },
    'Menu': { component: Menu, title: '메뉴' },
    'Card': { component: Card, title: '카드' },
    'Title': { component: Title, title: '타이틀' },
    'List': { component: List, title: '리스트' },
    'Table': { component: Table, title: '테이블' },
    'Pageing': { component: Pageing, title: '테이블 페이징' },
    'Tab': { component: Tab, title: '탭' },
    'Buttons': { component: Buttons, title: '버튼' },
    'Accordion': { component: Accordion, title: '아코디언' },
    'FormInput': { component: FormInput, title: '폼-input' },
    'FormFile': { component: FormFile, title: '폼-input-file' },
    'FormInputCheck': { component: FormInputCheck, title: '폼-radio,checkbox' },
    'BarChartSimple': { component: BarChartSimple, title: '차트-기본bar' },
    'BarChart': { component: BarChart, title: '차트-bar세로형' },
    'BarCharHor': { component: BarCharHor, title: '차트-bar가로형' },
    'DatePicker': { component: DatePicker, title: '데이터피커' },
    'Modal': { component: Modal, title: '모달팝업' },
    'ToolTip': { component: ToolTip, title: '툴팁' },
    'Slide': { component: Slide, title: '슬라이드' },
    'CKedit': { component: CKedit, title: '에디터' }
    // 'Toast': { component: ToolTip, title: '토스트' },
};
const currentPageComponent = shallowRef(PageLayout);
const onChangePage = async (pageName, pageTitle) => {
    const compontUrl = `/guide?guideName=${pageName}`;
    goToPage(compontUrl);
    // state.componentsTitle = pageTitle;
    const componentData = componentsMap[pageName];
    if (componentData) {
        currentPageComponent.value = componentData.component;
        state.componentsTitle = componentData.title;
    } else {
        currentPageComponent.value = null;
    }
};


// 초기 설정
onMounted(() => {
    if (route.query.guideName) {
        const guideName = route.query.guideName;
        const componentData = componentsMap[guideName];

        if (componentData) {
            currentPageComponent.value = componentData.component;
            state.componentsTitle = componentData.title;
        } else {
            currentPageComponent.value = null;
        }
    }
});
</script>

<style>
.guidewrap{width:100%; height:100%;position: relative; }
.guidetop{width:100%; height:50px;background:#1C2536;padding:0 20px; color:var(--base-wh-color); font-size:20px; font-weight:700;display: flex; align-items: center; position: absolute; left:0; top:0;}
.guidecontentwrap{width:100%; height:100%; display:flex; padding-top:50px}
.guidelnb{flex:0 0 200px;position: relative;}
.guidelnb .menulist {position: relative; z-index: 3;}
.guidelnb .menulist > ul > li{ padding:15px 20px; border-bottom:solid 1px #ddd; position: relative; }
.guidelnb .menulist > ul > li > span{display: block;position: relative; z-index:2;}
.guidelnb .menulist > ul > li:after{content:""; display: block; width:15px; height:15px; position: absolute; right:20px; top:17px;background:url('/images/icon-arrow-right.svg') 0 0/100%}
.guidelnb .menulist > ul > li.active{font-weight:700;}
.guidelnb .menulist > ul > li.active:before{content:''; display:block; width:100%; height:100%;background: #ddd;position: absolute; left:0px; top:0px;}
.guidecontent{flex:1 1 auto;padding:15px 30px;overflow-y:auto}
.guidelnb:after{content:''; width:13px; height:100%; background:url('/images/footer-bg.png') repeat-y -65px; position: absolute; right:0; top:0;}
.guidetitle{color:#000; font-size:25px;font-weight:700; border-bottom:solid 1px #000; padding-bottom:10px; position: relative;}

.btn-sample{height:30px; background:#1297F2; color:var(--base-wh-color); font-size:12px; font-weight:700; border-radius:5px; line-height:28px; padding:0 15px;}
.guidetitle .btn-sample{position: absolute; right:0; top:0}
.guidememo{padding:20px;}
.guidememo .memotitle{font-size:16px; font-weight:700;  background:url('/images/icon-ribbon.svg') no-repeat left center; padding-left:20px; margin-bottom:20px}
.memolist{margin-left:24px}
.memolist li{position: relative; padding-left:10px; margin-top:10px;}
.memolist li:nth-of-type(1){margin-top:0px}
.memolist li:after{content:''; display: block; width:3px; height:3px; border-radius:50%; background:#666; position: absolute; left:0; top:7px;}
.memolist li .memolist{margin-top:10px;}
.codewrap{padding:20px;}
.codetitle{font-size:16px; font-weight:700; width:100%; padding:20px 20px 20px 50px; background: url('/images/icon-arrow-up.svg') no-repeat 26px center;position: relative;}
.codetitle > span{font-size:16px; font-weight:700; width:calc(100% - 70px); display:block; cursor: pointer;}
.codetitle .btn{position: absolute; right:0; top:17px}
.code{background: #292d3e;border-radius: 6px;padding: 10px 20px; height: auto; transition: all .3s;}
code{color: #89DDFF;;font-family: Consolas, monospace !important;}
.up.codewrap .codetitle{ background: url('/images/icon-arrow-down.svg') no-repeat 26px center; border:solid 1px; border-radius:5px;}
.up.codewrap .codetitle + .code{height:0; transition: all .3s; padding:0 20px}
.up.codewrap .codetitle + .code pre{display: none;}
.up.codewrap .codetitle .btn{display: none;}
.tagstyle{color:#F07178; font-weight:700;}
.code.CSS code{color:#C3E88D}
.code.HTML code{color:#F07178;}
.code.JS code{color:#C792EA;}
.code.VUE code{color:#FFCB6B;}
.link{color:#006e6c; font-weight: 700;}
</style>