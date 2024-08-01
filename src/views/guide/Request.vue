<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <!-- <button type="button" class="btn-sample" @click="goToPage('/dashboard')">샘플페이지 보기</button> -->
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            
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
            title: 'request.js',
            sampleCodeJS: `import axios from 'axios';

/**
 * @process.env
 * VITE 에서는 import.meta.env 로 가져온다.
 */
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 6000
});
request.interceptors.request.use(
    (config) => {
        //토큰 로그인 정보 설정

        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        console.log('[API Request ERROR]', error);
        return Promise.reject(error);
    }
);

// api response 설정
request.interceptors.response.use(
    response => {
        console.log('[API Response]');
        return response;
    },
    error => {
        console.log(error);
        // ~ axios에서 서버 요청을 취소한 경우에 실행.
        return Promise.reject(error);
    }
);
export const CancelToken = axios.CancelToken;
export default request;`
        },
        {
            title: 'api.js',
            sampleCodeJS: `export function _uploadEditFile(formData) {
    return $api({
        url: 'api주소',
        method: 'post',
        data: formData,
        timeout: 6000
    });
}
export function _uploadFile(formData) {
    console.log(formData);
    return $api({
        url: 'api주소',
        method: 'post',
        data: formData,
        timeout: 6000
    });
}
export const _fileDownload = async (params) => {
    return await $api.get('api주소', { responseType: 'blob' });
};

export const _getPartnerList = async (params) => {
    return await $api.post('api주소', params);
};`
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

