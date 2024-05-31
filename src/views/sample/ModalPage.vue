<template>
    <div class="pageView">
        <div class="guideTitle">alert창</div>
        <div class="flex">
            <button type="button" class="btn btn-ss" @click="modal('confirm', 'warning')">alert-warning(경고)</button>
            <button type="button" class="btn btn-ss" @click="modal('confirm', 'confirm')">alert-confirm(확인)</button>
            <button type="button" class="btn btn-ss" @click="modal('confirm', 'error')">alert-error(오류)</button>
            <button type="button" class="btn btn-ss" @click="modal('confirm')">alert-default(정보안내)</button>
        </div>
        <div class="guideTitle">팝업</div>
        <div class="flex">
            <button type="button" class="btn posi" @click="showModal">팝업오픈</button>
        </div>
        <div class="guideTitle">토스트 팝업</div>
        <div class="flex">
            <button type="button" class="btn" @click="showToast('default')">토스트-경고</button>
            <button type="button" class="btn" @click="showToast('error')">토스트-에러</button>
            <button type="button" class="btn" @click="showToast('success')">토스트-성공</button>
        </div>
        <div class="guideTitle">툴팁</div>
        <div class="flex">
            <div class="toolTip">
                <button type="button" class="btn-tooltip" @click="onClickTip($event, 'left')">툴팁 - LEFT</button>
                <div class="tooltipbox" :style="`top:${(state.offsetTop)}px; left:${(state.offsetLeft)}px`" @click="onCloseTip">툴팁 설명입니다.</div>
            </div>
            <div class="toolTip">
                <button type="button" class="btn-tooltip" @click="onClickTip($event, 'right')">툴팁 - LEFT</button>
                <div class="tooltipbox right" :style="`top:${(state.offsetTop)}px; left:${(state.offsetLeft)}px`" @click="onCloseTip">툴팁 설명입니다.</div>
            </div>
            <div class="toolTip">
                <button type="button" class="btn-tooltip" @click="onClickTip($event, 'top')">툴팁 - TOP</button>
                <div class="tooltipbox top" :style="`top:${(state.offsetTop)}px; left:${(state.offsetLeft)}px`" @click="onCloseTip">툴팁 설명입니다.</div>
            </div>
            <div class="toolTip">
                <button type="button" class="btn-tooltip" @click="onClickTip($event, 'bottom')">툴팁 - BOTTOM</button>
                <div class="tooltipbox bottom" :style="`top:${(state.offsetTop)}px; left:${(state.offsetLeft)}px`" @click="onCloseTip">툴팁 설명입니다.</div>
            </div>
        </div>
    </div>
    <DefaultModal :isShow="isShow" :modalTitle="'팝업 제목'" :buttonConfirm="'저장'" :buttonCancel="'취소'"
        @modalclose="modalControl">
        <template #modalcontent>
            <div>
                내용 추가
            </div>
        </template>
    </DefaultModal>
</template>
<script setup>
import {  reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
import DefaultModal from '@/plugins/modal/modal/DefaultModal.vue';
const {  $Modal } = useCommFunc();
const state = reactive({
    offsetTop: null,
    offsetLeft: null
    
});
const isShow = ref(false);
const modal = (type, className) => {
    if (type === 'confirm') {
        $Modal.confirm({
            title: '타이틀이 있는 경우',
            message: '확인 취소 버튼 동시 사용/ 단일 사용 가능',
            className: className,
            //closeButtonHide: true
            buttonText: {
                confirm: '확인',
                cancel: '취소'
            }
        })
            .then(success => {
                console.log(success);
            })
            .catch(error => {
                console.log(error);
            });
    }
};
const modalControl = (type) => {
    if (type)
        switch (type) {
            case 'modalclose':
                return isShow.value = false;
            case 'modalconfirm':
                return isShow.value = false;
            case 'modalcancel':
                return isShow.value = false;
        }
    else isShow.value = false;
};
const showModal = () => {
    isShow.value = true;
};
const showToast = (type) => {
    console.log('111');
    switch (type) {
        case 'success':
            return toast('토스트 성공 메세지를 작성합니다.', 2000, 'success');
        case 'error':
            return toast('토스트 에러 메세지를 작성합니다.', 2000, 'error');
        case 'default':
            return toast('토스트 경고 메세지를 작성합니다.', 2000, 'default');
    }
    
};

const onClickTip = (e, type) => {
    const ele = e.target.nextSibling;
    const clientRect =  window.pageYOffset + e.target.getBoundingClientRect().top;
    const clientRectleft =  window.pageXOffset + e.target.getBoundingClientRect().left;
    if (type === 'left') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft + 30;
    } else if (type === 'bottom') {
        state.offsetTop = clientRect + 30;
        state.offsetLeft = clientRectleft - 50;
    } else if (type === 'right') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft - 115;
    } else if (type === 'top') {
        state.offsetTop = clientRect - 40;
        state.offsetLeft = clientRectleft - 50;
    }
    ele.classList.contains('open') ? ele.classList.remove('open') : ele.classList.add('open');
};
const onCloseTip = (e) => {
    e.target.classList.remove('open');
};

</script>