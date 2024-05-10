<template>
    <div class="pageView">
       <div class="tabswrap">
            <!-- 탭버튼 -->
            <div class="tablist" role="tablist" >
                <ul>
                    <li v-for="(item, index) in state.tabLists" :key="index" :class="{active:index === state.tabNum}">
                        <button type="button" class="btn-tab" @click="onClickTab(index)" >{{ item.tablabel }}</button>
                        <span class="ani" :style="`left:${155*(state.tabNum)}px`"></span>
                    </li>
                </ul>
                <div class="tabdec">텍스트 추가 영역</div>
            </div>
            <!-- 탭컨텐츠 -->
            <div class="tabconts">
                <template  v-for="(item, index) in state.tabLists.length" :key="index">
                    <div class="tabcontent" v-show="state.tabNum === index"  role="tabpanel">
                        <div :class="['tabpanel',{view:0 === index}]">
                            {{`탭 ${index+1}영역`}}
                        </div>
                    </div>
                </template>
            </div>
       </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
const router = useRouter();
const route = useRoute();
const state = reactive({
    tabIndex: 1,
    tabNum: 0,
    tabLists: [
        {tablabel: 'tab1'},
        {tablabel: 'tab2'},
        {tablabel: 'tab3'},
        {tablabel: 'tab4'},
        {tablabel: 'tab5'}
    ]
});
const onClickTab = (index) => {
    const tablists = document.querySelectorAll('.tabcontent');
    // 탭 Active 처리
    state.tabNum = index;
    // 탭콘텐츠 모션 처리
    tablists.forEach((item, index) => {
        item.children[0].classList.remove('view');
    });
    setTimeout(() => {
        tablists[index].children[0].classList.add('view');
    }, 400);
    // 탭콘텐츠 url 처리
    const tabUrl = `/tab?tabid=${index}`;
    goToPage(tabUrl);
};
// 초기 설정
onMounted(() => {
    Object.keys(route.query).length === 0 ? state.tabNum = 0 : state.tabNum = Number(route.query.tabid);
});
</script>
<style>
.tablist{width:100%;border-bottom:solid 1px #ddd; position: relative; }
.tablist .tabdec{position:absolute; right:0; top:0;}
.tablist ul{display: flex;; position: relative;}
.tablist .btn-tab{min-width:155px; height:40px; line-height:38px; text-align:center; border:solid 1px #ddd; border-bottom:none; background:#F7F9FA; font-size:14px; color:#999;}
.tablist .btn-tab + .btn-tab{border-left:none}
.tablist .active .btn-tab{background:#fff; color:#1D94E5; font-weight:700}
.tablist .ani{display:block; width:155px;height:2px; background:#1D94E5;position: absolute; left:0; top:0px;transition: left .3s;}
.tabcontent .tabpanel{padding:0; opacity:0; transition: all .2s;}
.tabcontent .tabpanel.view{padding:10px 0 0 0; opacity:1;}
</style>