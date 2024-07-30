<template>
    <div class="toolTip">
        <button type="button" class="btn-tooltip" @click="onClickTip($event, state.toolType)">{{ state.toolBtn }}</button>
        <div :class="['tooltipbox', state.toolType]" :style="`top:${(state.offsetTop)}px; left:${(state.offsetLeft)}px`" @click="onCloseTip">
            {{ toolContent }}
            <slot name="toolTipcon" ></slot>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, computed, ref } from 'vue';
const props = defineProps(
    {
        toolType: {
            type: String,
            default: 'left',
            description: '툴팁 위치'
        },
        toolBtn: String,
        toolContent: String
        
    });
const emit = defineEmits(['selectDay']);
const state = reactive({
    toolType: computed(() => props.toolType),
    toolBtn: computed(() => props.toolBtn),
    toolContent: computed(() => props.toolContent),
    offsetTop: null,
    offsetLeft: null
});
/**
    * 툴팁 열기
    * @parms e 클릭 이벤트
    * @parms type 툴팁 위치
    * 
*/
const onClickTip = (e, type) => {
    console.log(document.querySelector('.pageView').getBoundingClientRect().top);
    const ele = e.target.nextSibling;
    const clientRect =   e.target.getBoundingClientRect().top - document.querySelector('.pageView').getBoundingClientRect().top ;
    const clientRectleft =   e.target.getBoundingClientRect().left - document.querySelector('.pageView').getBoundingClientRect().left;
    if (type === 'left') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft - 15;
    } else if (type === 'bottom') {
        state.offsetTop = clientRect + 30;
        state.offsetLeft = clientRectleft - 78;
    } else if (type === 'right') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft - 115;
    } else if (type === 'top') {
        state.offsetTop = clientRect - 40;
        state.offsetLeft = clientRectleft - 80;
    }
    ele.classList.contains('open') ? ele.classList.remove('open') : ele.classList.add('open');
};
/**
    * 툴팁 닫기
    * @parms e 클릭 이벤트
    * 
*/
const onCloseTip = (e) => {
    e.target.classList.remove('open');
};

</script>