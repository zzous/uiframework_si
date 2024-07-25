<template>
    <div>
        <div class="btn-file"><input type="file" id="upload-file" hidden="" ref="fileUpload" @change="onChangeFile"><label class="btn-up" for="upload-file">파일첨부</label></div>
        <div class="upload-file-box">
            <div class="upload-file-head flex space-between">
                <button type="button" class="del-all" @click="onDelete()" :disabled="state.fileList.length === 0"><span class="offscreen">전체파일삭제</span></button>
                <span class="name">파일명</span><span class="volume">용량</span>
            </div>
            <div class="upload-file-list">
                <div class="nonefile" v-if="state.fileList.length === 0">등록된 파일이 없습니다.</div>
                <div class="upload-file-list-item flex space-between" v-for="(item, index) in state.fileList" :key="index">
                    <button type="button" class="btn del btn-secondary" @click="onDelete(index)"><span class="offscreen">파일삭제</span></button>
                    <span class="name">{{ item.name }}</span>
                    <span class="volume" v-if="(item.size / (1024 * 1024)) < 0.1 ">0.1 MB</span>
                    <span class="volume" v-else>{{ (item.size / (1024 * 1024)).toFixed(1) }} MB</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, computed, reactive, ref } from 'vue';
const props = defineProps(
    {
        fileList: Array
    });
const emit = defineEmits(['uploadFile', 'deleteFile']);
const fileUpload = ref(null);
const state = reactive({
    fileList: computed(() => props.fileList)
});
const onChangeFile = (e) => {
    const value = Array.from(fileUpload.value.files)[0];
    emit('uploadFile', value);
    e.target.value = '';
};
const onDelete = (value) => {
    emit('deleteFile', value);
};


</script>