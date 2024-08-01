<template>
    <div class="pageView">
        <div class="pageBgbox">
            <TitleBox :pageTitle="'동적 시뮬레이터 조회'"  :imgIcon="true"></TitleBox>
            
            <div class="tbl-wrap">
                <table class="table reg">
                    <colgroup><col style="width: 160px;"><col style="width: auto;"></colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">메세지</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">결과</th>
                            <td>
                                <editor :editorCon="state.editorCon" @changeEditorCon = onChangeEditor></editor>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div  class="btnwrap center">
                    <button type="button" class="btn posi" @click="registConfirm">등록</button>
                    <button type="button" class="btn" @click="showToast">선택삭제</button>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script setup>
import {  reactive } from 'vue';
import TitleBox from '@/components/TitleBox.vue';
import { useCommFunc } from '@/core/helper/common.js';
import editor from '@/components/CkEditor.vue';
import { initializeEditor } from '@/core/helper/editor.js';
const {  $Modal, goToPage } = useCommFunc();
const state = reactive({
    editorCon: '에디터 내용'
});
const onChangeEditor = (value) => {
    /**
     * 에디터 내용 업데이트
     * 
     * 
    */
    state.editorCon = value;
    console.log(value);
};
const registConfirm = () => {
    $Modal.confirm({
        title: '타이틀이 있는 경우',
        message: '등록하시겠습니까?',
        className: 'confirm',
        //closeButtonHide: true
        buttonText: {
            confirm: '확인',
            cancel: '취소'
        }
    })
        .then(success => {
            console.log(success, '확인버튼 클릭 시 처리');
            
        })
        .catch(error => {
            console.log(error, '취소버튼 클릭 시 처리');
        });
};
/**
    * 클래스 success ,default,error
*/
const showToast = () => {
    toast('토스트 성공 메세지를 작성합니다.', 2000, 'error');
};
</script>
