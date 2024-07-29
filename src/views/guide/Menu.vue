<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/section')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li>3Depth기준</li>
                <li>메뉴 활성화 기준은 라우터 정보가 아닌 Dom 기준</li>
                <li>메뉴 활성화 클래스는 <strong class="tagstyle">&lt;li&gt;</strong> 태그에 지정 </li>
                <li>메뉴 Depth별로 클래스 지정<strong class="tagstyle">(.depth1, depth2, depth3)</strong></li>
                <li>메뉴의 하위메뉴가 있는 경우<strong class="tagstyle">.depth</strong> 클래스 지정</li>
                <li>현재 페이지인 경우 <strong class="tagstyle">.thispage</strong> 클래스 지정</li>
                <li>초기 접속시 메뉴 활성화는  <strong class="tagstyle">Mounted</strong>훅에서 <strong class="tagstyle">thisPageCheck()</strong> 함수 호출</li>
                <li><strong class="tagstyle">watch</strong>에서 라우터 변경 감지 하여  <strong class="tagstyle">thisPageCheck()</strong>  함수 호출 </li>
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
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const props = defineProps({ title: String });
const { goToPage } = useCommFunc();
const state = reactive({
    className: '',
    codeSample: [
        {
            title: 'HTML',
            sampleCodeJS: `<div class="lnb-menu-list">
    <ul>
        <!-- 1depth -->
        <li v-for="(item, index) in state.menuList" :key="index" :class="['depth1',{depth:item.depth.length > 0}, {thispage:item.pagelink === state.thisPage}]">
            <button type="button" class="menutext" @click="menuClick(item.pagelink,'depth1', index)">
                <em class="text">{{ item.menu }}</em>
            </button>
            <ul v-if="item.depth.length > 0">
                <!-- 2depth -->
                <li v-for="(depth, idx) in item.depth" :key="idx" :class="['depth2', {depth:depth.depth.length > 0}, {thispage:depth.pagelink === state.thisPage}]">
                    <button type="button" class="menutext" @click="menuClick(depth.pagelink,'depth2', index, idx)">
                        <em class="text">{{ depth.menu }}</em>
                    </button>
                    <ul v-if="depth.depth.length > 0"  >
                        <!-- 3depth -->
                        <li v-for="(sub, i) in depth.depth" :key="i" :class="['depth3', {thispage:sub.pagelink === state.thisPage}]">
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
`
        },
        {
            title: 'CSS',
            sampleCodeJS: `/* :default */
.lnb-menu-list .menutext > .text{position: relative; z-index:2;display:block;}
.lnb-menu-list .menutext{display:block; position: relative; cursor: pointer; width:100%; text-align: left; color:var(--default-txt-color);}
.lnb-menu-list > ul{margin-top:20px;}
.lnb-menu-list > ul > li ul{height:0; transition: padding-top .3s; margin:0; }
.lnb-menu-list > ul > li ul li{display: none;}
.lnb-menu-list > ul > li > .menutext{padding:15px 20px 15px 30px; font-size:16px; font-weight:700; position: relative; }
.lnb-menu-list > ul > li > .menutext:after{content:"";display:block;width:20px; height:20px; position: absolute; left:0;top:16px;
background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath  d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z' fill='%23545ca1'/%3E%3C/svg%3E");}
/* active */
.lnb-menu-list li.active > .menutext:before, .lnb-menu-list li.thispage > .menutext:before{width:100%;}
.lnb-menu-list li.active > ul, .lnb-menu-list  li.thispage > ul{height: auto; position: relative;}
.lnb-menu-list  li.depth.active > ul > li, .lnb-menu-list  li.depth.thispage> ul > li{display: block;}
.lnb-menu-list  li.depth.active > ul:after, .lnb-menu-list li.thispage > ul:after{content:""; display:block;width:1px; height:100%; border-left:dashed 1px var(--point-txt-color); position: absolute; left:10px; top:0}
.lnb-menu-list > ul > li.active > .menutext, .lnb-menu-list > ul > li.thispage > .menutext{color:var(--primary-txt-color);}
.lnb-menu-list > ul > li.active > .menutext:after, .lnb-menu-list > ul > li.thispage > .menutext:after{background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath  d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z' fill='%231c2135'/%3E%3C/svg%3E");}

/* depth2 active*/
.lnb-menu-list li.depth2 .menutext{font-size:15px; padding:8px 8px 8px  20px;margin: 0 0 0 25px;width: calc(100% - 50px);}
.lnb-menu-list li.depth2.thispage > .menutext, .lnb-menu-list li.depth2.active > .menutext{background:var(--primary-txt-color); color:var(--primary-wh-color); border-radius:13px; z-index:2;}
.lnb-menu-list li.depth2.depth > .menutext:after{width:10px; height:10px; top:8px; right:13px}
.lnb-menu-list li.depth2 +.depth2{margin-top:5px;}
.lnb-menu-list li.depth2.depth > ul{margin:0 25px;background:var(--primary-txt-color); top:-12px; border-radius: 0 0 13px 13px;}
.lnb-menu-list li.depth2.depth > ul:after{display: none;}

/* depth3 active*/
.lnb-menu-list li.depth3 .menutext{font-size:15px; padding:8px 8px 8px 10px;width: calc(100% - 50px); color:var(--primary-wh-color); opacity: .6;}
.lnb-menu-list li.depth3 .menutext:after{content:"";display:block;width:5px; height:1px; position: absolute; left:0;top:16px;background:var(--primary-wh-color);}
.lnb-menu-list li.depth3.active > .menutext,  .lnb-menu-list li.depth3.thispage > .menutext{opacity: 1;}
.lnb-menu-list li.depth2.depth.active > ul{ padding-top:12px;}`
        },
        {
            title: 'DATA',
            sampleCodeJS: `menuList: [
    {menu: 'menu1', pagelink: '/section', depth: [] },
    {menu: 'menu2',
        pagelink: '',
        depth: [
            {
                menu: 'menu2-1',
                pagelink: '/tab',
                depth: []
            },
            {
                menu: 'menu2-2',
                pagelink: '',
                depth: [
                    {menu: 'menu2-2-1', pagelink: '/table', depth: [] },
                    {menu: 'menu2-2-2', pagelink: '', depth: [] }
                ]
            }
        ]
    },
    {menu: 'menu3',
        pagelink: '',
        depth: [
            {
                menu: 'menu3-1',
                pagelink: '',
                depth: [
                    {menu: 'menu3-1-1', pagelink: '', depth: [] },
                    {menu: 'menu3-1-2', pagelink: '', depth: [] }
                ]
            },
            {
                menu: 'menu3-2',
                pagelink: '',
                depth: []
            }
        ]
    }
]`
        },
        {
            title: 'JS',
            sampleCodeJS: `
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
    if (url !== '') {
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
    const menuItems = document.querySelectorAll('.lnb-menu-list li.thispage');
    menuItems.forEach(item => { item.classList.remove('thispage', 'active'); });
    state.thisPage = route.path;
    nextTick(() => {
        thisPageCheck();
    });
    
});`
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

