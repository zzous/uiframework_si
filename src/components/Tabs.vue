<template>
    <div class="tabswrap">
        <!-- 탭버튼 -->
        <div class="tablist" role="tablist" >
            <ul>
                <li v-for="(item, index) in state.tabLists" :key="index" :class="{active:index === state.tabNum}">
                    <button type="button" class="btn-tab" @click="onClickTab(index)" >{{ item.tablabel }}</button>
                    <span class="ani" :style="`left:${155*(state.tabNum)}px`"></span>
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
    subdec: [Number, String]
});
const state = reactive({
    tabNum: 0,
    tabLists: [],
    imgIcon: computed(() => props.imgIcon),
    subdec: computed(() => props.subdec),
    elHeight: 0,
    tabbtwidth: 0
});
const onClickTab = (index) => {
    const tabElements = document.querySelectorAll('.tabcontent');
    // 탭버튼 Active 처리
    state.tabNum = index;
    tabElements.forEach((item, idx) => {
        item.children[0].classList.remove('view');
    });
    // 탭콘텐츠 모션 처리 클래스 추가 
    setTimeout(() => {
        tabElements[index].children[0].classList.add('view');
    }, 400);

    const eleH = tabElements[index].children[0].clientHeight;
    state.elHeight = eleH;
    // 탭 url 처리
    const tabUrl = `/tab?tabid=${index}`;
    goToPage(tabUrl);
    
};
// 탭 초기설정
onMounted(() => {
    nextTick(() => {
        const tabElements = document.querySelectorAll('.tabcontent');
        tabElements.forEach((tabElement, index) => {
            tabElements[index].children[0].classList.remove('view');
            state.tabLists.splice(index, 0, {tablabel: tabElement.dataset.title});
        });
        tabElements[0].children[0].classList.add('view');
        const eleH = tabElements[0].children[0].clientHeight;
        state.elHeight = eleH;
        const tabbtn = document.querySelectorAll('.tablist');
        console.log(tabbtn);
    });
    
});
</script>