<template>
    <div :class="['layout', state.menuTop]">
        <header>NewUIGuide </header>
        <div class="contentwrap">

            <div class="lnb">
                <div class="lnb-menu-list">
                    <ul>
                        <!-- 1depth -->
                        <li v-for="(item, index) in state.menuList" :key="index" :class="['depth1',{depth:item.depth.length > 0}, {thispage:state.thisPage == item.pagelink}]">
                            <button type="button" class="menutext" @click="menuClick(item.pagelink,'depth1', index)">
                                <em class="text">{{ item.menu }}</em>
                            </button>
                            <ul v-if="item.depth.length > 0">
                                <!-- 2depth -->
                                <li v-for="(depth, idx) in item.depth" :key="idx" :class="['depth2', {depth:depth.depth.length > 0}, {thispage:state.thisPage == depth.pagelink}]">
                                    
                                    <button type="button" class="menutext" @click="menuClick(depth.pagelink,'depth2', index, idx)">
                                        <em class="text">{{ depth.menu }}</em>
                                    </button>
                                    <ul v-if="depth.depth.length > 0"  >
                                        
                                        <!-- 3depth -->
                                        <li v-for="(sub, i) in depth.depth" :key="i" :class="['depth3', {thispage:state.thisPage == sub.pagelink }]">
                                            <button class="menutext" @click="menuClick(sub.pagelink,'depth3', index, idx, i)">
                                                <em  class="text"> {{ sub.menu }}</em>
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="content">
                <div class="flex justify-end" style="margin:10px 0; padding-right:30px; text-align: right;">
                    <!-- <button type="button" class="btn" @click="onChangePage">레이아웃 변경</button> -->
                    <button type="button" class="btn posi" @click="goToPage('/guide')">가이드 페이지로 이동</button>
                </div>
                <!-- 컨텐츠 영역 -->
                <RouterView />
            </div>
        </div>
        <footer>
            <div class="flex-center">Powered by STRATO Cloud Management Platform</div>
        </footer>
        <ConfirmModal />
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance, shallowRef, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router';
import ConfirmModal from '@/plugins/modal/modal/ConfirmModal.vue';
import { useCommFunc } from '@/core/helper/common.js';

const { goToPage } = useCommFunc();
const router = useRouter();
const route = useRoute();

const state = reactive({
    menuTop: '',
    menuList: [
        {menu: '대시보드',
            pagelink: '/boxlayout',
            depth: []
        },
        {menu: '영역별 요소',
            pagelink: null,
            depth: [
                { menu: 'box 스타일', pagelink: '/section', depth: [] },
                { menu: '타이틀 스타일', pagelink: '/title', depth: [] },
                { menu: '리스트 스타일', pagelink: '/list', depth: [] }
            ]
        },
        {menu: 'UI 요소',
            pagelink: null,
            depth: [
                { menu: '테이블 스타일', pagelink: '/table', depth: [] },
                { menu: '아코디언 스타일', pagelink: '/accordion', depth: [] },
                { menu: '탭 스타일', pagelink: null, depth: [{menu: '탭 스타일', pagelink: '/tab', depth: [] }] },
                { menu: 'DatePicker 스타일', pagelink: '/datepicker', depth: [] }
                
            ]
        },
        {menu: '폼 요소',
            pagelink: null,
            depth: [
                { menu: 'button 스타일', pagelink: '/button', depth: [] },
                { menu: 'input 스타일', pagelink: '/forminput', depth: [] },
                { menu: 'radio 스타일', pagelink: '/formradio', depth: [] },
                { menu: 'checkbox 스타일', pagelink: '/formcheck', depth: [] },
                { menu: 'select 스타일', pagelink: '/formselect', depth: [] },
                { menu: 'Editor 스타일', pagelink: '/ckeditor', depth: [] }
            ]
        },
        {menu: '팝업',
            pagelink: null,
            depth: [
                {
                    menu: '팝업',
                    pagelink: null,
                    depth: [
                        {menu: '공통 팝업', pagelink: '/modal', depth: [] },
                        {menu: 'menu3-1-2', pagelink: null, depth: [] }
                    ]
                },
                {
                    menu: 'menu3-2',
                    pagelink: null,
                    depth: []
                }
            ]
        }
    ],
    thisPage: ''
});
const onChangePage = () => {
    state.menuTop === 'menuTop' ? state.menuTop = '' : state.menuTop = 'menuTop';
};

// 메뉴 클릭시 active
const menuClick = (url, depthType, depth1, depth2, depth3) => {
    const menuItemsDepth1 = document.querySelectorAll('.lnb-menu-list li.depth1');
    const menuItemsDepth2 = document.querySelectorAll('.lnb-menu-list li.depth2');
    const menuItemsDepth3 = document.querySelectorAll('.lnb-menu-list li.depth3');
    // depth1 비활성화
    if (depthType === 'depth1') {
        menuItemsDepth1.forEach((item, index) => {
            if (index !== depth1) {
                item.classList.remove('active');
            }
        });
    }
    // depth2 비활성화
    if (depthType === 'depth2') {
        menuItemsDepth2.forEach((item, index) => {
            if (index !== depth2) { item.classList.remove('active'); }
        });
    }
    // depth3 비활성화
    if (depthType === 'depth3') {
        menuItemsDepth3.forEach((item, index) => {
            item.classList.remove('active');
        });
    }
    // active
    const clickedSpan = event.target;
    const parentLi = clickedSpan.closest('li');
    parentLi.classList.add('active');
    //페이지 이동
    if (url !== ('' || null)) {
        goToPage(url);
    }
};


// 해당 페이지 active
const thisPageCheck = () => {
    const menuItems = document.querySelectorAll('.lnb-menu-list li');
    menuItems.forEach(item => {
        if (item.classList.contains('thispage')) {
            if (item.classList.contains('depth3')) {
                item.parentNode.parentNode.classList.add('thispage');
                item.parentNode.parentNode.parentNode.parentNode.classList.add('thispage');
            } else if (item.classList.contains('depth2')) {
                item.parentNode.parentNode.classList.add('thispage');
            }
        }
    });
};

onMounted(() => {
    // 현재 메뉴 active
    state.thisPage = route.path;
    nextTick(() => {
        thisPageCheck();
    });
});
watch(route, () => {
    // 메뉴 변경 감지
    if (Object.keys(route.query).length === 0) {
        state.thisPage = route.path;
        const menuItems = document.querySelectorAll('.lnb-menu-list li.thispage');
        menuItems.forEach(item => { item.classList.remove('thispage', 'active'); });
        nextTick(() => {
            thisPageCheck();
        });
    }
});
</script>
<style>
.lnb-menu-list .menutext > .text{position: relative; z-index:2;display:block;}
.lnb-menu-list .menutext{display:block; position: relative; cursor: pointer; width:100%; text-align: left;}
.lnb-menu-list > ul{margin-top:20px;}
.lnb-menu-list > ul > li ul{height:0; transition: padding-top .3s; margin:0; background:#fff;}
.lnb-menu-list > ul > li ul li{display: none;}
.lnb-menu-list > ul > li > .menutext{padding:20px; font-size:15px; font-weight:700;}
.lnb-menu-list li > .menutext:after,.lnb-menu-list li > .menutext:before{display: block; content:''}
.lnb-menu-list li > .menutext:before{width:0%; height:100%; background:#ccc;position:absolute; right:0px; top:0px; transition: width .3s; z-index: 1; }
.lnb-menu-list li.active > .menutext:before, .lnb-menu-list li.thispage > .menutext:before{width:100%;}
.lnb-menu-list li > .menutext:hover:before{width:100%;}
.lnb-menu-list li.depth2{margin-top:5px;}
.lnb-menu-list li.depth1.depth > .menutext:after, .lnb-menu-list li.depth2.depth > .menutext:after{width:15px; height:15px;position:absolute; right:30px; top:20px; background: url('/images/icon-arrow-down.svg') no-repeat 0 0/100%;z-index:2;}


/* depth2 */
.lnb-menu-list li.depth2 .menutext{font-size:13px; padding:5px;}
.lnb-menu-list li.depth2.depth > .menutext:after{width:10px; height:10px; top:8px; right:13px}
.lnb-menu-list li.depth2 .menutext:before{border-radius:35px;}
.lnb-menu-list li.depth2 .menutext .text{padding-left:15px;}
.lnb-menu-list li.depth3 .menutext .text:after{content:''; display: block; width:3px; height:3px; border-radius:50%; background:#666; position: absolute; left:5px; top:8px;}

/* depth3 */
.lnb-menu-list li.depth3{margin-top:2px}
.lnb-menu-list li.depth3 > .menutext{font-size:13px; padding:0 5px;}
.lnb-menu-list li.depth3 .menutext{padding-top:0px}
.lnb-menu-list li.depth3 .menutext:hover:before,.lnb-menu-list li.depth3.active .menutext:before, .lnb-menu-list li.depth3.thispage .menutext:before{display: none;}
.lnb-menu-list li.depth3 .menutext em{color:#000}
.lnb-menu-list li.depth3 .menutext em:after{content:''; display: block; width:3px; height:1px; border-radius:0; background:#666; position: absolute; left:5px; top:8px;}
.lnb-menu-list li.depth3.active .menutext em,.lnb-menu-list li.depth3.thispage .menutext em{color:var(--point-txt-color)}
.lnb-menu-list li.depth3.active .menutext em:after, .lnb-menu-list li.depth3.thispage .menutext em:after{background:var(--point-txt-color)}

/* active */
.lnb-menu-list  li.active > ul, .lnb-menu-list  li.thispage > ul{height: auto;}
.lnb-menu-list  li.depth1.active > ul, .lnb-menu-list  li.depth1.thispage > ul{margin: 0px 15px;padding: 10px;}
.lnb-menu-list  li.depth2.active > ul, .lnb-menu-list  li.depth2.thispage > ul{margin: 0px;padding:5px;}
.lnb-menu-list  li.depth3.active > ul, .lnb-menu-list  li.depth3.thispage > ul{margin: 0px;padding:5px;}
.lnb-menu-list  li.depth.active > ul > li, .lnb-menu-list  li.depth.thispage> ul > li{display: block;}



.menuTop .lnb-menu-list > ul{margin-top:0; display:flex;}
.menuTop .lnb-menu-list > ul > li > ul{display: none;}
.menuTop .lnb-menu-list > ul > li{flex:1 1 auto; position: relative; }
.menuTop .lnb-menu-list > ul > li > .menutext {padding:20px 0 13px 0 }
.menuTop .lnb-menu-list > ul > li .menutext:before{display: none;}
.menuTop .lnb-menu-list li.depth1 > ul {position: absolute;margin: 0; height:auto; width:100%; padding-left:0}
.menuTop .lnb-menu-list{position: relative;}
.menuTop .lnb-menu-list:hover::after{content:""; display:block; width:100%; height:200px; position: absolute; left:0;top:50px; background: rgba(0,0,0,.5);}
.menuTop .lnb-menu-list:hover > ul > li > ul{display:block;}
</style>