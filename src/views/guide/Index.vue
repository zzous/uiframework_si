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
import { defineComponent, onMounted, reactive, computed, getCurrentInstance, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import PageLayout from '@/views/guide/PageLayout.vue';
import Menu from '@/views/guide/Menu.vue';
import Section from '@/views/guide/Section.vue';
import Title from '@/views/guide/Title.vue';
import Tab from '@/views/guide/Tab.vue';
const state = reactive({
    guideMenu: [
        {label: '페이지 레이아웃', name: 'PageLayout'},
        {label: '영역 분배', name: 'Section'},
        {label: '메뉴', name: 'Menu'},
        {label: '타이틀', name: 'Title'},
        {label: '탭', name: 'Tab'},
        {label: '아코디언', name: 'Accordion'},
        {label: '버튼', name: 'Button'},
        {label: '폼', name: 'Form'},
        {label: '테이블', name: 'Table'},
        {label: '슬라이드', name: 'Slide'},
        {label: '모달팝업', name: 'Modal'},
        {label: '토스트 팝업', name: 'Toast'},
        {label: '페이징', name: 'Pageing'},
        {label: '데이터피커', name: 'Datepicker'}
    ],
    componentsTitle: '페이지 레이아웃'
});
const currentPageComponent = shallowRef(PageLayout);
const onChangePage = async (pageName, pageTitle) => {
    // console.log(pageName);
    state.componentsTitle = pageTitle;
    switch (pageName) {
        case 'PageLayout':
            currentPageComponent.value = PageLayout;
            break;
        case 'Menu':
            currentPageComponent.value = Menu;
            break;
        case 'Section':
            currentPageComponent.value = Section;
            break;
        case 'Title':
            currentPageComponent.value = Title;
            break;
        case 'Tab':
            currentPageComponent.value = Tab;
            break;
        default:
            currentPageComponent.value = null;
            break;
    }
};
</script>

<style>
.guidewrap{width:100%; height:100%;position: relative; }
.guidetop{width:100%; height:50px;background:#1C2536;padding:0 20px; color:#fff; font-size:20px; font-weight:700;display: flex; align-items: center; position: absolute; left:0; top:0;}
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

.btn-sample{height:30px; background:#1297F2; color:#fff; font-size:12px; font-weight:700; border-radius:5px; line-height:28px; padding:0 15px;}
.guidetitle .btn-sample{position: absolute; right:0; top:0}
.guidememo{padding:20px;}
.guidememo .memotitle{font-size:16px; font-weight:700;  background:url('/images/icon-ribbon.svg') no-repeat left center; padding-left:20px; margin-bottom:20px}
.memolist{margin-left:24px}
.memolist li{position: relative; padding-left:10px; margin-top:10px;}
.memolist li:nth-of-type(1){margin-top:0px}
.memolist li:after{content:''; display: block; width:3px; height:3px; border-radius:50%; background:#666; position: absolute; left:0; top:7px;}
.codewrap{padding:20px;}
.codetitle{font-size:16px; font-weight:700; width:100%; padding:20px 20px 20px 50px; background: url('/images/icon-arrow-up.svg') no-repeat 26px center;position: relative;}
.codetitle > span{font-size:16px; font-weight:700; width:calc(100% - 70px); display:block; cursor: pointer;}
.codetitle .btn{position: absolute; right:0; top:17px}
.code{background: #282c34;border-radius: 6px;padding: 10px 20px; height: auto; transition: all .3s;}
code{color: #FFCB6B;;font-family: Consolas, monospace !important;}
.up.codewrap .codetitle{ background: url('/images/icon-arrow-down.svg') no-repeat 26px center; border:solid 1px; border-radius:5px;}
.up.codewrap .codetitle + .code{height:0; transition: all .3s; padding:0 20px}
.up.codewrap .codetitle + .code pre{display: none;}
.up.codewrap .codetitle .btn{display: none;}
.tagstyle{color:#F07178; font-weight:700;}
.code.CSS code{color:#C3E88D}
.code.HTML code{color:#F07178;}
.code.JS code{color:#89DDFF;}

</style>