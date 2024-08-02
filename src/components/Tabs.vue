<template>
    <div class="tabswrap" :id="state.id">
        <!-- 탭버튼 -->
        <div class="tablist" role="tablist">
            <ul>
                <li v-for="(item, index) in state.tabLists" :key="index" :class="{active:index === state.tabNum}">
                    <button type="button" class="btn-tab" @click="onClickTab(index, taburl)" >{{ item.tablabel }}</button>
                    <span class="ani" :style="`left:${state.tabbtposi*(state.tabNum)}px; width:${state.tabbtwidth}px`"></span>
                </li>
            </ul>
            <div class="tabdec">
                <slot name="tabsubdec"></slot>
            </div>
        </div>
        <!-- 탭컨텐츠 -->
        <div class="tabconts" :style="`height:${state.elHeight}px`">
            <slot name="tabcons"></slot>
        </div>
    </div>
</template>
<script setup>
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
    const tabElements = document.querySelectorAll(`#${state.id} .tabcontent`);
    const tabbtEle = document.querySelectorAll(`#${state.id} .tablist ul li`);
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
        const tabUrl = `/tab?tabid=${index}`;
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
    const tabElements = document.querySelectorAll(`#${state.id} .tabcontent`);
    tabElements.forEach((tabElement, index) => {
        state.tabLists.splice(index, 0, {tablabel: tabElement.dataset.title, taburl: tabElement.dataset.url});
        tabElement.children[0].classList.remove('view');
    });
    nextTick(() => {
        const eleH = tabElements[0].children[0].clientHeight;
        state.elHeight = eleH;
        tabElements[0].children[0].classList.add('view');
        const tabbtEle = document.querySelectorAll(`#${state.id} .tablist ul li`);
        state.tabbtwidth = tabbtEle[0].offsetWidth;
    });
});
</script>