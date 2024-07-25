<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=FormInput')">가이드 페이지 </button>
            </div>
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
            <TextInput
                :label="'텍스트 입력'"
                :placeholder="'텍스트를 입력하세요'"
                :id="'input1'"
                :icon="false"
                :single="false"
                :error="'다시 입력해 주세요'"
                :value = "state.inputType1.value"
                :className="[ {error:state.inputType1.error}]"
                @setValue = setValue
            />
            <div class="guideTitle">form input - input 단일</div>
            <TextInput
                :single="true"
                :placeholder="'텍스트를 입력하세요'"
                :id="'input2'"
                :error="'다시 입력해 주세요'"
                :value = "state.inputType2.value"
                :className="[ {error:state.inputType2.error}]"
                @setValue = setValue
            />
            
            
            <div class="guideTitle">form - input 아이콘</div>
            <TextInput
                :icon="true"
                :placeholder="'텍스트를 입력하세요'"
                :id="'input3'"
                :error="'다시 입력해 주세요'"
                :value = "state.inputType2.value"
                :className="[ {error:state.inputType2.error}]"
                @setValue = setValue
            />
            
            <div class="guideTitle">form - input Type1 (텍스트가 왼쪽)</div>
            <TextInput
                :label="'텍스트 입력'"
                :icon="true"
                :placeholder="'텍스트를 입력하세요'"
                :id="'input4'"
                :error="'다시 입력해 주세요'"
                :value = "''"
                :className="['labelleft', {error:state.inputType3.error}]"
                @setValue = setValue
            />
            
            <div class="guideTitle">form - input Type2 (테이블 형태)</div>
            <div class="formtable half">
                <div class="formtable-col">
                    <TextInput
                        :label="'텍스트 입력'"
                        :icon="true"
                        :placeholder="'텍스트를 입력하세요'"
                        :id="'input4'"
                        :error="'다시 입력해 주세요'"
                        :value = "''"
                        :className="['labelleft','bg', {error:state.inputType3.error}]"
                        @setValue = setValue
                    />
                </div>
                <div class="formtable-col">
                    <TextInput
                        :label="'텍스트 입력'"
                        :placeholder="'텍스트를 입력하세요'"
                        :id="'input4'"
                        :error="'다시 입력해 주세요'"
                        :value = "''"
                        :className="['labelleft','bg', {error:state.inputType3.error}]"
                        @setValue = setValue
                    />
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
import TextInput from '@/components/TextInput.vue';
import { reactive, ref, watch } from 'vue';

import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();

const state = reactive({
    fileNum: null,
    fileList: [],
    inputType1: {
        value: '123',
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
const setValue = (value) => {
    console.log(value);
    state.inputType1.value = value;
};

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
