<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide')">가이드 페이지 </button>
            </div>
            <div class="guideTitle">에디터</div>
            <editor :editorCon="state.editorCon" @changeEditorCon = onChangeEditor></editor>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { initializeEditor } from '@/core/helper/editor.js';
import editor from '@/components/CkEditor.vue';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
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

</script>