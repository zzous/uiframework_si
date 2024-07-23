<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
        </div>
        <div class="guidememo">
            <div class="memotitle">기본 버전</div>
            <ul class="memolist">
                <li>Node : <strong>20.14.1</strong>
                    <ul class="memolist">
                        <li>현재 가이드에 사용된 플러그인은 16~ 버전과 호환가능</li>
                        <li>플러그인 사용 하지 않은 UI(아코디언,탭, 메뉴 툴팁, barChart, Pageing)는 Node버전 이슈 없음</li>
                    </ul>
                </li>
                <li>Vue : <strong>3.4.21</strong></li>
                <li>vite(기본 모듈러) : <strong> 5.2.8</strong></li>
            </ul>
            <div class="memotitle" style="margin-top:30px">UI 플러그인 버전</div>
            <ul class="memolist">
                <li>테이블 :
                    <ul class="memolist">
                        <li>ag-grid-vue3  <strong>버전: 30.0.6이상</strong></li>
                        <li>옵션 정보 : <a href="https://www.ag-grid.com/vue-data-grid/getting-started/" target="_blank" class="link">https://www.ag-grid.com/vue-data-grid/getting-started/</a></li>
                    </ul>
                </li>
                <li>에디터 :
                    <ul class="memolist">
                        <li>ckeditor5 사용 <strong>ckeditor5-vue - 5.4.0이상</strong></li>
                        <li>무료버전과 유료버전이 있음 옵션에 따라 다름</li>
                        <li>에디터의 옵션은 필요에 따라 커스텀 하여 사용 </li>
                        <li>옵션 정보 : <a href="https://ckeditor.com/" target="_blank" class="link">https://ckeditor.com/</a></li>
                    </ul>
                </li>
                <li>달력 : <strong>vue-datepicker - 1.11이상</strong></li>
                <li>날짜형식 포맷 : <strong>dayjs - 1.11이상</strong></li>
                <li>lodash : <strong>lodash - 4.17.21이상</strong></li>
                <li>emitter : <strong>tiny-emitter - 2.1이상</strong></li>
                <li>Teleport Modal : <strong>vue-universal-modal - 1.1.4이상</strong></li>
                <li>토스트팝업 : <strong>vue3-toastify - 0.2.1이상</strong></li>
                <li>슬라이드 : <strong>vue3-carousel - 0.3.3이상</strong></li>
            </ul>
            <div class="memotitle" style="margin-top:30px">CSS 작성 규칙</div>
            <ul class="memolist">
                <li>CSS는 public 폴더에 따로 두어 빌드에 포함 시키지 않음(브라우저 성능 이슈)</li>
                <li>font, images도 public 폴더에 저장</li>
                <li>플러그인 사용 시 관련 CSS는 vue 템플릿에 import 하여 사용하지 않고 css다운로드 받아 public 폴더에 저장하여 index.html에 추가 하여 사용함</li>
                <li>프로젝트의 특별한 이유가 없는 한 SASS사용 지양</li>
                <li>컴포넌트 유형에 맞춰 CSS작성(예시: form.css, button.css, table.css...)</li>
                <li>선택자의 상속 구조 지양</li>
                <li>사이트 내에 쓰이는 색상은 :root에 변수로 지정하여 사용</li>
            </ul>
        </div>
        <div class="codewrap">
            <div class="codetitle CSS" >
                <span @click="toggleAcc(0)">CSS</span>
                <button type="button" class="btn btn-ss" @click="copyCode()"> <span class="ico-menu"></span> 복사하기</button>
            </div>
            <div class="code CSS" >
<pre>
<code>
/* 색상설정 */
:root {
  --base-txt-color: #202020;
  --strong-txt-color: #202020;
  --primary-txt-color: #21e8e4;
  --point-txt-color: #5142b2;
  --point-purple-color: #9c7eff;
  --point-green-color: #dcfc34;
  --point-bar-color: #189f92;
  --base-box-color: #c9c9d4;
  --base-wh-color: #ffffff;
  --gray-box-color: #f1f1f1;
  --placeholder-txt-color: #ccc;
  --base-bg-color: #f7f9fa;
  --base-bd-color: #ddd;
  --base-disable-color: #999;
  --base-bd1-color: #ccc;
  --bd1-color: #d2d2d2;
  --bd2-color: #ebebeb;
  --error-color: #ea7c77;
}
/* 사용 예시 */
body {color: var(--base-txt-color); background-color:var(--base-wh-color);}
</code>
</pre>
            </div>
        </div>
    </div>
</template>
<script setup>
import {  reactive } from 'vue';
import { useCommFunc } from '@/core/helper/common.js';
const props = defineProps({ title: String });
const { goToPage } = useCommFunc();
const state = reactive({
    className: ''
    
});
const toggleAcc = (idx) => {
    const tag = document.getElementsByClassName('codewrap');
    tag[idx].classList.contains('up') ? tag[idx].classList.remove('up') : tag[idx].classList.add('up');
};

const copyCode = () => {
    console.log(document.querySelector('.code code').innerHTML);
    let Code = document.querySelector('.code code').innerHTML;
    navigator.clipboard.writeText(Code)
        .then(() => {
            alert('코드가 클립보드에 복사되었습니다.');
        })
        .catch((err) => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
};
</script>
