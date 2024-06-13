<template>
    <div class="pageView">
        <div class="guideTitle">에디터</div>
        <editor :editorCon="state.editorCon" @changeEditorCon = onChangeEditor></editor>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { initializeEditor } from '@/core/helper/editor.js';
import editor from '@/components/CkEditor.vue';
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