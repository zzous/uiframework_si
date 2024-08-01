<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <!-- <button type="button" class="btn-sample" @click="goToPage('/dashboard')">샘플페이지 보기</button> -->
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>헬스케어 사용 기준(2023)</li>
                <li>validation, img사이즈 체크</li>
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
            title: 'common.js',
            sampleCodeJS: `import { useRouter, useRoute } from 'vue-router';
export function useCommFunc() {
    const goToPage = (params) => {
        router.push(params);
    };
    /**
     * images size check ( width * height )
     * @file image
     * @callback 
    */
    const getImageInfo = (file, callback) => {
        console.log('>>load reader', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const fileSize = Math.floor(file.size / 1024);
        const fileType = file.type;
        // console.log('file type', file.type);
        if (fileType.indexOf('image') > -1) {
            reader.onload = function(e) {
                console.log('>>load reader');
                // let image = new Image(); // ck-editor 랑 충돌남....
                let image = document.createElement('img');
                image.src = e.target.result;
                image.onload = function() {
                    const _image = {
                        width: this.width,
                        height: this.height,
                        ratio: this.width / this.height,
                        fileSize: fileSize, // KB
                        fileType: fileType // file type
                    };
                    callback(_image);
                };
            };
        } else {
            const _file = {
                fileSize: fileSize, // KB
                fileType: fileType // file type
            };
            callback(_file);
        }
    };

    /**
     * 비밀번호 생성규칙 * 영문, 숫자, 특수기호가 포함된 8~16자리
     * @params password
    */
    const validPassword = (password) => {
        const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/;
        return reg.test(password);
    };

    /**
     * Email validation check ( 직접입력일때 )
     */
    const validEmail = (email) => {
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return reg.test(email);
    };

    /**
     * @format Brn 사업자번호 format 333-22-55555 형식 만들기
     * @brn 숫자 10자리 (3332255555)
     */
    const formatterBrn = (brn) => {
        // const reg = /^\{10}$/;
        // if (!reg.test(brn)) return brn;

        const fomatted = brn?.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
        return fomatted;
    };
    /**
     * 페이지 새로고침
     * 
     * 
    */
    const pageReload = () => {
        router.go(0);
    };
    /**
     * 파일 다운로드
     * 
     * @item 업로드시 respose받은 번호
    */
    const fileDownload = async (item) => {
        try {
            const response = await _fileDownload(item);
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            const match = /filename="(.+?)"/.exec([response.headers['content-disposition']]);
            const filename = decodeURI(match ? match[1] : null);
            console.log(filename);
            a.href = url;
            a.download = filename;
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }
    };
};
return {
        goToPage,
        pageReload,
        getCommonCode,
        fileDownload,
        formatterBrn,
        validPassword,
        validEmail,
        getImageInfo
};`
        },
        {
            title: '템플릿에서 사용 시',
            sampleCodeJS: `\<script setup>
import { onMounted, reactive, computed, ref } from 'vue';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage, pageReload, getImageInfo ... } = useCommFunc();
const fileListUp = async (type) => {
    await getImageInfo(업로드된 파일, imageSizeCallback);
    const imageSizeCallback = (callback) => {
    console.log(callback.width, callback.fileType);
    // 이미지 크기, 파일 확장자
    goToPage('라우터 주소')
}
<\/script>`
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

