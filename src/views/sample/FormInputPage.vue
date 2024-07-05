<template>
    <div class="pageView">
        <div class="pageBgbox">
       
            <!-- <div class="btn-file"><input type="file" id="upload-file" hidden="" ref="fileUpload" @change="uploadFile"><label class="btn-up" for="upload-file">파일첨부</label></div>
            <div class="upload-file-box">
                <div class="upload-file-head flex space-between">
                    <button type="button" class="del-all "><span class="offscreen">전체파일삭제</span></button>
                    <span class="name">파일명</span><span class="volume">용량</span>
                </div>
                <div class="upload-file-list">
                    <div class="nonefile" v-if="state.fileList.length === 0">등록된 파일이 없습니다.</div>
                    <div class="upload-file-list-item flex space-between" v-for="(item, index) in state.fileList" :key="index">
                        <button type="button" class="btn del btn-secondary"><span class="offscreen">파일삭제</span></button>
                        <span class="name">{{ item.name }}</span>
                        <span class="volume" v-if="(item.size / (1024 * 1024)) < 0.1 ">0.1 MB</span>
                        <span class="volume" v-else>{{ (item.size / (1024 * 1024)).toFixed(1) }} MB</span>
                    </div>
                </div>
            </div> -->
        
            <!-- default -->
            <div class="guideTitle">form input - text</div>
            <div :class="['formInputbox', {error:state.inputType1.error}]">
                <div class="labelbox"><label for="input1">텍스트 입력</label></div>
                <div class="inputbox text">
                    <input type="text" placeholder="텍스트를 입력하세요" id="input1" v-model="state.inputType1.value" />
                    <div class="errormessage">error message</div>
                </div>
            </div>
            <div class="guideTitle">form - input 아이콘</div>
            <div :class="['formInputbox', {error:state.inputType2.error}]">
                <div class="labelbox"><label for="input2">텍스트 입력</label></div>
                <div class="inputbox text icon">
                    <input type="text" placeholder="텍스트를 입력하세요" id="input2"  v-model="state.inputType2.value" />
                    <div class="errormessage">error message</div>
                </div>
            </div>
            <div class="guideTitle">form - input Type1 (텍스트가 왼쪽)</div>
            <div class="formInputbox labelleft">
                <div class="labelbox"><label for="input3">텍스트 입력</label></div>
                <div class="inputbox text">
                    <input type="text" placeholder="텍스트를 입력하세요" id="input3" />
                    <div class="errormessage">error message</div>
                </div>
            </div>
            <div class="guideTitle">form - input Type2 (테이블 형태)</div>
            <div class="formtable half">
                <div class="formtable-col">
                    <div class="formInputbox labelleft bg">
                        <div class="labelbox"><label for="input1">텍스트 입력</label></div>
                        <div class="inputbox text">
                            <input type="text" placeholder="텍스트를 입력하세요" id="input1" />
                            <div class="errormessage">error message</div>
                        </div>
                    </div>
                </div>
                <div class="formtable-col">
                    <div class="formInputbox labelleft bg">
                        <div class="labelbox"><label for="input1">텍스트 입력</label></div>
                        <div class="inputbox text">
                            <input type="text" placeholder="텍스트를 입력하세요" id="input1" />
                            <div class="errormessage">error message</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- file -->
            <div class="guideTitle">form input - file</div>
            <FileInput :fileList="state.fileList" @uploadFile="uploadFile" />
            <div class="guideTitle">form - textarea</div>
            <!-- textarea -->
            <div class="textarea">
                <textarea id="textarea" :class="['form-textarea', {error:state.inputType3.error}]" placeholder="본문을 입력하세요." style="height: 100px;" v-model="state.inputType3.value" maxlength="10"></textarea>
                <div :class="['txt-counter',{error:state.inputType3.error}]"><strong>{{state.inputType3.value.length}}</strong> / <span>200</span></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import FileInput from '@/components/FileInput.vue';
import { reactive, ref, watch } from 'vue';
const state = reactive({
    fileNum: null,
    fileList: [],
    inputType1: {
        value: '',
        error: false
    },
    inputType2: {
        value: '',
        error: false
    },
    inputType3: {
        value: '',
        error: false
    }
});
 /**
 * @input 에러체크
 */
watch(state, () => {
    state.inputType1.value.length > 5 ? state.inputType1.error = true : state.inputType1.error = false;
    state.inputType2.value.length > 5 ? state.inputType2.error = true : state.inputType2.error = false;
    state.inputType3.value.length > 9 ? state.inputType3.error = true : state.inputType3.error = false;
});


 /**
 * @inputfile 파일업로드
 */
const uploadFile = async (value) => {
    const formData = new FormData();
    formData.append('file', value); //단일 파일만 업로드시
    state.fileList.push(value);
    
    try {
        //  API 처리
        console.log('form');
    } catch (error) {
        console.log(error);
    }
};
</script>
