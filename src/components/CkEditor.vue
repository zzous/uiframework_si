<template>
    <div class="editor_container">
        <!-- <CKEditor :editor="state.ckeditor" :model-value="state.editorCon" /> -->
    </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue';
import { initializeEditor } from '@/core/helper/editor.js';
const props = defineProps(['editorCon']);
const emit = defineEmits(['changeEditorCon']);
let editor;
const state = reactive({
    editorCon: computed(() => props.editorCon)
    // ckeditor: ClassicEditor
});

onMounted(async () => {
    editor = await initializeEditor();
    editor.setData(state.editorCon);
    
    editor.model.document.on('change', () => {
        emit('changeEditorCon', editor.getData());
        console.log(editor.getData());
    });
});
</script>