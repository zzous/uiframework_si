<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/tab')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li>tabindex가 필요한 경우 <strong class="tagstyle">&lt;div class="tabcontent"&gt;</strong>태그에 추가하여 사용</li>
                <li>현재 탭 활성화 처리 <strong class="tagstyle">active</strong> 클래스 추가 하여 처리</li>
                <li>탭 버튼의 width의 에 따라  <strong class="tagstyle">&lt;span class="ani"&gt;</strong>의 위치와 크기 변경 처리</li>
                <li>탭 콘텐츠 영역을 주소 처리 할 경우 라우터 path에 query로 처리함 (하단 참고)</li>
                <li>가이드에서 제공하는 탭 컴포넌트는 <strong class="tagstyle">data-title </strong>속성값이 탭 버튼이 됨 </li>
                <li>웹 표준을 위해 <strong class="tagstyle">role</strong>속성 작성 권고</li>
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
            sampleCodeJS: `<div class="tabswrap">
    <!-- 탭버튼 -->
    <div class="tablist" role="tablist">
        <ul>
            <li>
                <button type="button" class="btn-tab active">탭버튼1</button>
                <span class="ani"></span>
            </li>
            <li>
                <button type="button" class="btn-tab">탭버튼2</button>
                <span class="ani"></span>
            </li>
        </ul>
        <div class="tabdec">텍스트 추가 영역</div>
    </div>
    <!-- 탭컨텐츠 -->
    <div class="tabconts">
        <div class="tabcontent">
            <div class="tabpanel view" role="tabpanel">
                탭 영역1
            </div>
            <div class="tabpanel" role="tabpanel">
                탭 영역2
            </div>
        </div>
    </div>
</div>`
        },
        {
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    role: 롤 작성 권고
    data-title: 속성 입력 후 입력값 필수 처리(탭 버튼 텍스트)
    data-url: 탭 클릭시 url이 필요한 변경이 들어가는 경우
    #tabcons 탭  콘텐츠 작성 슬롯
    #tabsubdec 탭 버튼 우측에 텍스트 추가시
-->
<Tabs :id="'id'">
    <template #tabsubdec>
        <div>우측에 텍스트 추가시 사용 슬롯</div>
    </template>
    <template #tabcons>
        <div class="tabcontent" data-title="탭1" data-url="url정보">
            <div class="tabpanel" role="tabpanel">tabcontent1</div>
        </div>
        <div class="tabcontent" data-title="탭2" data-url="url정보">
            <div class="tabpanel" role="tabpanel">tabcontent2<br>tabcontent2</div>
        </div>
        <div class="tabcontent" data-title="탭3" data-url="url정보">
            <div class="tabpanel" role="tabpanel">
                
            </div>
        </div>
    </template>
</Tabs>`
        },
        {
            title: 'VUE COMPONENT',
            sampleCodeJS: `<template>
    <div class="tabswrap" :id="state.id">
        <!-- 탭버튼 -->
        <div class="tablist" role="tablist" >
            <ul>
                <li v-for="(item, index) in state.tabLists" :key="index" :class="{active:index === state.tabNum}">
                    <button type="button" class="btn-tab" @click="onClickTab(index, taburl)" >{{ item.tablabel }}</button>
                    <span class="ani" :style="left:\${state.tabbtposi*(state.tabNum)}px; width:\${state.tabbtwidth}px"></span>
                </li>
            </ul>
            <div class="tabdec">
                <slot name="tabsubdec"></slot>
            </div>
        </div>
        <!-- 탭컨텐츠 -->
        <div class="tabconts" :style="height:\${state.elHeight}px">
            <slot name="tabcons"></slot>
        </div>
    </div>
</template>
\<script setup>
import { computed, reactive, onMounted,  nextTick } from 'vue';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
const props = defineProps({
    subdec: [Number, String],
    url: String,
    id: String
});
const state = reactive({
    tabNum: 0,
    tabLists: [],
    imgIcon: computed(() => props.imgIcon),
    subdec: computed(() => props.subdec),
    url: computed(() => props.url),
    id: computed(() => props.id),
    elHeight: 0,
    tabbtposi: 0,
    tabbtwidth: 0
});
/**
    * 탭 메뉴 클릭 이벤트
    * @param {Number} index 메뉴 순번
    * 클릭된 버튼에 active 처리(메뉴 순번 체크)
    * bar의 크기, 위치 클릭시 마다 유동적으로 지정
    * 탭콘텐츠 모션 처리(view 클래스 추가)
    * 탭 콘텐츠 내용의 따라 높이 변경
    * url이 필요한 경우 쿼리 추가 
*/
const onClickTab = (index, url) => {
    const tabElements = document.querySelectorAll('#\${state.id} .tabcontent');
    const tabbtEle = document.querySelectorAll('#\${state.id} .tablist ul li');
    state.tabbtposi = index === 0 ? state.tabbtposi = 0 : state.tabbtposi = tabbtEle[(index - 1)].offsetWidth;
    state.tabbtwidth = tabbtEle[(index)].offsetWidth;
    state.tabNum = index;
    tabElements.forEach((item, idx) => {
        item.children[0].classList.remove('view');
    });
    setTimeout(() => {
        tabElements[index].children[0].classList.add('view');
    }, 400);
    const eleH = tabElements[index].children[0].clientHeight;
    state.elHeight = eleH;
    if (url) {
        const tabUrl = '/tab?tabid=\${index}';
        goToPage(tabUrl);
    }
};
onMounted(() => {
     /**
        * 탭 메뉴 설정 
        * .tabcontent 태그에 작성된 data-title 속성값으로 탭 메뉴 리스트 생성
        * nextTick 데이터 생성된 이후 돔 처리
        * 첫번째 메뉴 콘텐츠 활성화(view 클래스 추가)
        * 탭 콘텐츠 내용의 따라 높이 변경
        * bar의 크기, 위치 클릭시 마다 유동적으로 지정
    */
    const tabElements = document.querySelectorAll('#\${state.id} .tabcontent');
    tabElements.forEach((tabElement, index) => {
        state.tabLists.splice(index, 0, {tablabel: tabElement.dataset.title, taburl: tabElement.dataset.url});
        tabElement.children[0].classList.remove('view');
    });
    nextTick(() => {
        const eleH = tabElements[0].children[0].clientHeight;
        state.elHeight = eleH;
        tabElements[0].children[0].classList.add('view');
        const tabbtEle = document.querySelectorAll('#\${state.id} .tablist ul li');
        state.tabbtwidth = tabbtEle[0].offsetWidth;
    });
});
<\/script>`
        },
        
        {
            title: 'ROUTER',
            sampleCodeJS: `const withPrefix = (prefix, routes) => routes.map(route => {
    route.path = prefix + route.path;
    return route;
});
/**
    * @라우터path
    * index 탭 순번
    * /:tabid 주소쿼리
*/
...withPrefix('/tab', [
    {
        path: '/',
        name: 'TabPage',
        component: () => import('@/views/sample/TabPage.vue')
    },
    {
        name: 'TabPage_sub',
        path: '/:tabid',
        component: () => import('@/views/sample/TabPage.vue')
    }
])`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.tablist{width:100%;border-bottom:solid 1px #ddd; position: relative; }
.tablist .tabdec{position:absolute; right:0; top:0;}
.tablist ul{display: flex;; position: relative;}
.tablist .btn-tab{min-width:155px; height:40px; line-height:38px; text-align:center; border:solid 1px #ddd; border-bottom:none; background:#F7F9FA; font-size:14px; color:#999;}
.tablist .btn-tab + .btn-tab{border-left:none}
.tablist .active .btn-tab{background:#fff; color:#1D94E5; font-weight:700}
.tablist .ani{display:block; width:155px;height:2px; background:#1D94E5;position: absolute; left:0; top:0px;transition: left .3s;}
.tabcontent .tabpanel{padding:0; opacity:0; transition: all .2s;}
.tabcontent .tabpanel.view{padding:10px 0 0 0; opacity:1;}`
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

