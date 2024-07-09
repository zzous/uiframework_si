<template>
    <div style="height:calc(100% - 30px);">
        <div :class="['layout', state.menuTop]">
            <header>
                <div class="logo"><img src="/images/logo.svg" /></div>
                <div class="gnb">
                    <ul>
                        <li v-for="(item, index) in 5" :key="index" :class="{active:index=== 0}"></li>
                    </ul>
                </div>
            </header>
            <div class="contents">
                <div class="lnb">
                    <!-- <button class="btn-leftmenu"></button> -->
                    <div class="lnb-menu-list">
                        <h1> 사용자 관리</h1>
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
                                        <ul v-if="depth.depth.length > 0">
                                            
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
                <div class="contentwrap">
                    <div class="myinfo" style="height:97px; padding:20px 30px;font-size:15px">
                        <div class="fulllogo"><img src="/images/logo.svg" /></div>
                        <div class="myinfo-btns">
                            <div class="myname">
                                <span>test7777</span>
                            </div>
                            <div class="myname">
                                <img src="/images/user-avatar.png" style="width:28px;" />
                                <span>홍길동</span>
                            </div>
                            <div>
                                <button class="mybtn btn-alarm"><em>1</em></button>
                                <button class="mybtn btn-setting"></button>
                                <button class="mybtn btn-company"></button>
                                <button class="mybtn btn-logout"></button>
                            </div>

                        </div>
                            
                    </div>
                    <div class="content">
                        
                        <!-- 컨텐츠 영역 -->
                        <RouterView />
                    </div>
                </div>
            </div>
            
        </div>
        <footer>
            <div class="flex-center">Powered by STRATO Cloud Management Platform</div>
        </footer>
        <ConfirmModal />
        <!-- <ChartTool /> -->
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
        {menu: '가이드 활용 페이지',
            pagelink:null,
            depth: [
                { menu: '카드형태 페이지', pagelink: '/boxlayout', depth: [] },
                { menu: '테이블 페이지', pagelink: '/tablelayout', depth: [] },
                { menu: '차트 활용 페이지', pagelink: '/chart', depth: [] },
            ]
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
                { menu: '탭 스타일', pagelink: '/tab', depth: [] },
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
                // { menu: 'select 스타일', pagelink: '/formselect', depth: [] },
                { menu: 'Editor 스타일', pagelink: '/ckeditor', depth: [] }
            ]
        },
        {menu: '팝업',
            pagelink: null,
            depth: [
                {
                    menu: '팝업',
                    pagelink: '/modal',
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

/*.lnb-menu-list li > .menutext:after,.lnb-menu-list li > .menutext:before{display: block; content:''}
.lnb-menu-list li > .menutext:before{width:0%; height:100%; background:#ccc;position:absolute; right:0px; top:0px; transition: width .3s; z-index: 1; }

.lnb-menu-list li > .menutext:hover:before{width:100%;}
.lnb-menu-list li.depth2{margin-top:5px;}
.lnb-menu-list li.depth1.depth > .menutext:after, .lnb-menu-list li.depth2.depth > .menutext:after{width:15px; height:15px;position:absolute; right:30px; top:20px; background: url('/images/icon-arrow-down.svg') no-repeat 0 0/100%;z-index:2;} */


/* depth2 */
/* */

/* depth3 */
/* .lnb-menu-list li.depth3{margin-top:2px}
.lnb-menu-list li.depth3 > .menutext{font-size:13px; padding:0 5px;}
.lnb-menu-list li.depth3 .menutext{padding-top:0px}
.lnb-menu-list li.depth3 .menutext:hover:before,.lnb-menu-list li.depth3.active .menutext:before, .lnb-menu-list li.depth3.thispage .menutext:before{display: none;}
.lnb-menu-list li.depth3 .menutext em{color:#000}
.lnb-menu-list li.depth3 .menutext em:after{content:''; display: block; width:3px; height:1px; border-radius:0; background:#666; position: absolute; left:5px; top:8px;}
.lnb-menu-list li.depth3.active .menutext em,.lnb-menu-list li.depth3.thispage .menutext em{color:var(--point-txt-color)}
.lnb-menu-list li.depth3.active .menutext em:after, .lnb-menu-list li.depth3.thispage .menutext em:after{background:var(--point-txt-color)} */

/* active */
/* .lnb-menu-list  li.active > ul, .lnb-menu-list  li.thispage > ul{height: auto;}
.lnb-menu-list  li.depth1.active > ul, .lnb-menu-list  li.depth1.thispage > ul{margin: 0px 15px;padding: 10px;}
.lnb-menu-list  li.depth2.active > ul, .lnb-menu-list  li.depth2.thispage > ul{margin: 0px;padding:5px;}
.lnb-menu-list  li.depth3.active > ul, .lnb-menu-list  li.depth3.thispage > ul{margin: 0px;padding:5px;}
.lnb-menu-list  li.depth.active > ul > li, .lnb-menu-list  li.depth.thispage> ul > li{display: block;} */



/* .menuTop .lnb-menu-list > ul{margin-top:0; display:flex;}
.menuTop .lnb-menu-list > ul > li > ul{display: none;}
.menuTop .lnb-menu-list > ul > li{flex:1 1 auto; position: relative; }
.menuTop .lnb-menu-list > ul > li > .menutext {padding:20px 0 13px 0 }
.menuTop .lnb-menu-list > ul > li .menutext:before{display: none;}
.menuTop .lnb-menu-list li.depth1 > ul {position: absolute;margin: 0; height:auto; width:100%; padding-left:0}
.menuTop .lnb-menu-list{position: relative;}
.menuTop .lnb-menu-list:hover::after{content:""; display:block; width:100%; height:200px; position: absolute; left:0;top:50px; background: rgba(0,0,0,.5);}
.menuTop .lnb-menu-list:hover > ul > li > ul{display:block;} */
.gnb{margin-top:50px;}
.gnb ul li{width:50px; height:50px;  margin:0 auto; position: relative;border-radius:10px;}
.gnb ul li:after{content:""; display: block;width:100%; height:100%;background-repeat: no-repeat; background-position: 11px 10px; }
.gnb ul li.active{background-color:#21e8e4; }
.gnb ul li:hover{background-color:#21e8e4; }
.gnb ul li + li{margin-top:30px}
.gnb ul li:nth-of-type(1):after{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23898999'/%3E%3C/svg%3E");}
.gnb ul li.active:nth-of-type(1):after{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23202020'/%3E%3C/svg%3E");}
.gnb ul li:nth-of-type(1):after{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23898999'/%3E%3C/svg%3E");}
.gnb ul li:nth-of-type(2):after{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23898999'/%3E%3C/svg%3E");}
.gnb ul li:nth-of-type(3):after{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23898999'/%3E%3C/svg%3E");}
.gnb ul li:nth-of-type(4):after{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23898999'/%3E%3C/svg%3E");}
.gnb ul li:nth-of-type(5):after{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23898999'/%3E%3C/svg%3E");}

.logo{width:60px; overflow:hidden; }
.lnb-menu-list > h1{margin-bottom:20px;font-size:20px; font-weight:700;color:#eee }
.lnb-menu-list > h1:before{content:"";display:block; width:40px; height:40px; background-repeat: no-repeat;
background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' fill='%23eee'/%3E%3C/svg%3E");}
.contents{display:flex; background:#fff; border-radius:30px 0 0 30px; flex:1}
.btn-leftmenu{width:30px; height:30px; background-repeat: no-repeat; background-position:0px 0px;
    background-image: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1' fill='%23d2d2d2'/%3E%3C/svg%3E");}
.myinfo{height: 97px;padding: 20px; font-size: 15px; position: relative; z-index: 2;}
.fulllogo{position: absolute; left:30px; top:33px;}
.myinfo-btns{display: flex; justify-content:flex-end;}
.myname{display: flex; align-items: center; background: #dcfc34; border-radius: 5px; padding: 0 10px; height: 35px; }
.myname > span{display:inline-block; padding-right:20px;background: url("/images/icon-arrow-down-dark.svg") no-repeat right 2px; color:#202020; cursor: pointer;}
.myname > img{width:28px;margin-right:10px;}
.myname + .myname{margin-left:10px;}
.mybtn{width:35px; height:35px;border-radius:5px;background-color:#dcfc34; background-repeat: no-repeat;position: relative; background-position: 8px 7px; margin-left:10px}
.mybtn.btn-alarm > em{background:#ea7c77;width:15px; height:15px; color:#fff; border-radius:50%; font-size:10px; position: absolute; left:-5px; top:-3px; line-height:15px;}
.mybtn.btn-alarm{ background-image: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901' fill='%23202020'/%3E%3C/svg%3E");}
.mybtn.btn-setting{background-image: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' fill='%23202020'/%3E%3C/svg%3E");}
.mybtn.btn-company{background-image: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath  d='M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0 M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z' fill='%23202020'/%3E%3C/svg%3E");}
.mybtn.btn-logout{background-image: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath  d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708 M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4' fill='%23202020'/%3E%3C/svg%3E");}


.contentwrap{position: relative;}
.contentwrap:before{content:""; display: block; height:250px; width:100%; position: absolute; background:#202020;}

.pageBgbox{position: relative;background: #fff; padding: 30px; border-radius: 30px 0 0 30px;}

.lnb-menu-list .menutext > .text{position: relative; z-index:2;display:block;}
.lnb-menu-list .menutext{display:block; position: relative; cursor: pointer; width:100%; text-align: left; color:#636573}
.lnb-menu-list > ul{margin-top:20px;}
.lnb-menu-list > ul > li ul{height:0; transition: padding-top .3s; margin:0; background:#25272f;}
.lnb-menu-list > ul > li ul li{display: none;}
.lnb-menu-list > ul > li > .menutext{padding:10px 20px 10px 30px; font-size:16px; font-weight:700; position: relative; }
.lnb-menu-list > ul > li > .menutext:after{content:"";display:block;width:20px; height:20px; position: absolute; left:0;top:9px;
background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath  d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z' fill='%23898999'/%3E%3C/svg%3E");}
.lnb-menu-list li.active > .menutext:before, .lnb-menu-list li.thispage > .menutext:before{width:100%;}
.lnb-menu-list li.active > ul, .lnb-menu-list  li.thispage > ul{height: auto; position: relative;}
.lnb-menu-list  li.depth.active > ul > li, .lnb-menu-list  li.depth.thispage> ul > li{display: block;}
.lnb-menu-list  li.depth.active > ul:after, .lnb-menu-list li.thispage > ul:after{content:""; display:block;width:1px; height:100%; border-left:dashed 1px #21e8e4; position: absolute; left:10px; top:0}
.lnb-menu-list > ul > li.active > .menutext, .lnb-menu-list > ul > li.thispage > .menutext{color:#21e8e4}
.lnb-menu-list > ul > li.active > .menutext:after, .lnb-menu-list > ul > li.thispage > .menutext:after{background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath  d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z' fill='%2321e8e4'/%3E%3C/svg%3E");}


.lnb-menu-list li.depth2 .menutext{font-size:13px; padding:5px 5px 5px  20px;margin: 0 0 0 25px;width: calc(100% - 50px);}
.lnb-menu-list li.depth2.thispage .menutext{background:#21e8e4; color:#202020; border-radius:10px;}
.lnb-menu-list li.depth2.depth > .menutext:after{width:10px; height:10px; top:8px; right:13px}
.lnb-menu-list li.depth3 .menutext .text:after{content:''; display: block; width:3px; height:3px; border-radius:50%; background:#666; position: absolute; left:5px; top:8px;}
</style>