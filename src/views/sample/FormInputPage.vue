<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=FormInput')">가이드 페이지 </button>
            </div>
        
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
            <FileInput
                :fileList="state.fileList"
                @uploadFile="uploadFile"
                @deleteFile = "deleteFile"
            />
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
    },
    uploadFiles: []
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
 * @input value upDate
 */
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
        // await 업로드 API 처리 후  response로 받은값 저장 필요(삭제시 필요)
        // state.uploadFiles.push(response로 받은값);
        console.log(formData);
    } catch (error) {
        console.log(error);
    }
};
 /**
 * @inputfile 파일 삭제
 */
const deleteFile = (value) => {
    console.log(value);
    if (value === undefined) {
        state.fileList = [];
        // await 삭제 API 처리
        // 전체 삭제 처리
    } else {
        state.fileList.splice(value, 1);
        // await 삭제 API 
        // 단일 처리  
        // state.uploadFiles.splice(value, 1)
    }
};


</script>
