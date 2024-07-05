<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/boxlayout')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li><strong class="tagstyle">&lt;div class="cardwrap" &gt;&lt;/div&gt;</strong>태그 필수 사용 </li>
                <li><strong class="tagstyle">&lt;div class="card" &gt;&lt;/div&gt;</strong> 추가시 전체 width에 맞춰 유동적으로 배치</li>
                <li> 태그에 inline 으로 스타일 지정하여(flex-basis)크기 조절 가능</li>
                
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
            sampleCodeJS: `
<div class="cardwrap">
    <div class="card" style="flex-basis: 300px; min-height: 100px;">
        내용 추가
    </div>
    <div class="card" style="flex-basis: 700px; min-height: 100px;">
        내용 추가
    </div>
</div>
`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.cardwrap{display: flex; flex-wrap:wrap; position: relative; left:-20px}
.card{flex:1;flex-shrink:1; flex-basis:400px;border:solid 1px #ddd; border-radius:5px; padding:15px;margin-left:20px; margin-bottom:20px; align-items: stretch; background:#fff}`
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

