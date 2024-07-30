<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/forminput')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li>파일 업로드<strong class="tagstyle">&lt;input type="file"&gt;</strong> 태그를 사용하고 CSS로 변형하여 디자인 변경</li>
                <li>업로드된 파일 리스트는 따로 추출하여 프론트에서 추가, 삭제 처리</li>
                <li>업로드된 파일 리스트는 <strong class="tagstyle">&lt;div class="upload-file-box"&gt;</strong> 태그에 처리함(샘플 페이지 참고)</li>
                
            </ul>
        </div>
        <div class="codewrap" v-for="(item, index) in state.codeSample" :key="index">
            <div :class="['codetitle', state.className]" >
                <span @click="toggleAcc(index)">{{item.title}}</span>
                <button type="button" class="btn btn-ss" @click="copyCode(item.sampleCodeJS)"> <span class="ico-menu"></span> 복사하기</button>
            </div>
            <div :class="['code', item.title]" >
<pre>
<code>
{{ item.sampleCodeJS }}
</code>
</pre>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const props = defineProps({ title: String });
const { goToPage } = useCommFunc();
const state = reactive({
    className: '',
    codeSample: [
        {
            title: 'HTML',
            sampleCodeJS: `//파일 업로드 버튼
<div class="btn-file">
    <input type="file" id="upload-file" hidden="">
    <label class="btn-up" for="upload-file">파일첨부</label>
</div>
//파일 업로드 리스트 
<div class="upload-file-box">
    <div class="upload-file-head flex space-between">
        <button type="button" class="del-all"><span class="offscreen">전체파일삭제</span></button>
        <span class="name">파일명</span><span class="volume">용량</span>
    </div>
    //파일 리스트가 없는 경우
    <div class="upload-file-list"><div class="nonefile">등록된 파일이 없습니다.</div></div>
</div>`
        },
        {
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    :fileList: 업로드 파일 리스트
    @uploadFile: 파일 업로드 API처리
    @deleteFile 파일 삭제 API처리
-->
<FileInput
    :fileList="state.fileList"
    @uploadFile="uploadFile"
    @deleteFile = "deleteFile"
/>
\<script setup>
import { reactive, watch } from 'vue';
const state = reactive({
    fileList: []
});
/**
    * @inputfile 파일업로드
    *  단일 파일 업로드
    *  API 처리 후  response로 받은값 저장 필요(삭제시 필요)
*/
const uploadFile = async (value) => {
    const formData = new FormData();
    formData.append('file', value); 
    state.fileList.push(value);
    try {
        // await 업로드 API 처리 후  response로 받은값 저장 필요(삭제시 필요)
        // state.uploadFiles.push(response로 받은값);
        console.log(formData);
    } catch (error) {
        console.log(error);
    }
};
/**
    * @inputfile 파일 삭제
    * 전체 or 단일 삭제 처리 필요
*/
const deleteFile = (value) => {
    console.log(value);
    if (value === undefined) {
        state.fileList = [];
        // await 삭제 API 
    } else {
        state.fileList.splice(value, 1);
        // await 삭제 API 
        // state.uploadFiles.splice(value, 1)
    }
};
<\/script>`
        },
        {
            title: 'VUE COMPONENT',
            sampleCodeJS: `<template>
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
\<script setup>
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
/**
    * @inputfile 파일업로드
    *  선택된 파일 form변경
*/
const onChangeFile = (e) => {
    const value = Array.from(fileUpload.value.files)[0];
    emit('uploadFile', value);
    e.target.value = '';
};
/**
    * @inputfile 파일삭제
    * 리스트만 삭제
*/
const onDelete = (value) => {
    emit('deleteFile', value);
};
<\/script>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `/** input file **/
.btn-file { display: inline-block; }
.btn-file label { display: block; height: 28px; line-height: 28px; padding: 0 8px; border: 1px solid var(--base-bd-color); background-color: #fff; font-size: 12px; color: #464646; border-radius: 3px; cursor: pointer; }
.btn-file label:hover,
.btn-file label:focus { background-color: #f2f2f2;}
.upload-file-box .nonefile{padding:6px 10px;font-size:12px; font-size: 12px; color: #767676;}
.upload-file-box { width: 578px; margin-top: 10px; border: 1px solid var(--base-bd-color); border-radius: 3px; }
.upload-file-box .upload-file-head { position: relative; padding: 6px 10px 6px 32px; border-bottom: 1px solid var(--base-bd-color); font-size: 12px; color: #767676; }
.upload-file-box .upload-file-head .del-all { position: absolute; top: 7px; left: 10px; width: 12px; height: 12px; padding: 0; border: none; cursor:pointer; 
    background-color: transparent; background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' 
    xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.15035 2.85486C8.95535 2.65986 8.64035 2.65986 8.44535 2.85486L6.00035 5.29486L3.55535 2.84986C3.36035 2.65486 3.04535 2.65486 2.85035 2.84986C2.65535 3.04486 2.65535 3.35986 2.85035 3.55486L5.29535 5.99986L2.85035 8.44486C2.65535 8.63986 2.65535 8.95486 2.85035 9.14986C3.04535 9.34486 3.36035 9.34486 3.55535 9.14986L6.00035 6.70486L8.44535 9.14986C8.64035 9.34486 8.95535 9.34486 9.15035 9.14986C9.34535 8.95486 9.34535 8.63986 9.15035 8.44486L6.70535 5.99986L9.15035 3.55486C9.34035 3.36486 9.34035 3.04486 9.15035 2.85486Z' fill='%23767676'/%3E%3C/svg%3E"); background-repeat: no-repeat; }
.upload-file-box .upload-file-list .upload-file-list-item { position: relative; padding: 8px 10px 8px 32px; border: none; font-size: 12px; color: #444; }
.upload-file-box .upload-file-list .upload-file-list-item .del { position: absolute; top: 10px; left: 10px; width: 12px; height: 12px; padding: 0; border: none; background-color: transparent; background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.15035 2.85486C8.95535 2.65986 8.64035 2.65986 8.44535 2.85486L6.00035 5.29486L3.55535 2.84986C3.36035 2.65486 3.04535 2.65486 2.85035 2.84986C2.65535 3.04486 2.65535 3.35986 2.85035 3.55486L5.29535 5.99986L2.85035 8.44486C2.65535 8.63986 2.65535 8.95486 2.85035 9.14986C3.04535 9.34486 3.36035 9.34486 3.55535 9.14986L6.00035 6.70486L8.44535 9.14986C8.64035 9.34486 8.95535 9.34486 9.15035 9.14986C9.34535 8.95486 9.34535 8.63986 9.15035 8.44486L6.70535 5.99986L9.15035 3.55486C9.34035 3.36486 9.34035 3.04486 9.15035 2.85486Z' fill='%23767676'/%3E%3C/svg%3E"); background-repeat: no-repeat; }
.upload-file-box .upload-file-list .upload-file-list-item .name { display: inline-block; position: relative; padding-left: 20px; }
.upload-file-box .upload-file-list .upload-file-list-item .name::before { content: ''; position: absolute; top: 0; left: 0; width: 16px; height: 16px; 
background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath 
d='M12 13.5H4C3.72386 13.5 3.5 13.2761 3.5 13V3C3.5 2.72386 3.72386 2.5 4 2.5H8.58579C8.71839 2.5 8.84557 2.55268 8.93934 2.64645L12.3536 6.06066C12.4473 6.15443 12.5 6.2816 12.5 6.41421V13C12.5 13.2761 12.2761 13.5 12 13.5Z' stroke='%23444444'/%3E%3Cpath d='M8 2V6C8 6.55228 8.44772 7 9 7H13' stroke='%23444444'/%3E%3C/svg%3E"); }
.upload-file-box .upload-file-list .upload-file-list-item .img { display: inline-block; position: relative; width: 100px; }
.upload-file-box .upload-file-list .upload-file-list-item .img img { width: 100%; }
`
        }
    ]
});
const toggleAcc = (idx) => {
    const tag = document.getElementsByClassName('codewrap');
    tag[idx].classList.contains('up') ? tag[idx].classList.remove('up') : tag[idx].classList.add('up');
};
const copyCode = (code) => {
    navigator.clipboard.writeText(code)
        .then(() => {
            alert('코드가 클립보드에 복사되었습니다.');
        })
        .catch((err) => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
};

</script>

