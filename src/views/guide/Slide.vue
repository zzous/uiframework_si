<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/dashboard')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li> vue3-carousel 플러그인 사용</li>
                <li> vue3-carousel에서 사용할 컴포넌트는main.js에 글로벌로 등록하여 사용 </li>
                <li>CSS는 main.js에 import하지 않고 carousel.css로 별도 저장 하여 사용</li>
                <li>다른 옵션은 vue3-carousel 플러그인 페이지 참조 <a href="https://ismail9k.github.io/vue3-carousel/" target="_blank" class="link">(https://ismail9k.github.io/vue3-carousel)</a></li>
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
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    :breakpoints: 반응형 사이즈 지정
    #addons 슬라이드 버튼
-->
<Carousel class="subpageslider" :breakpoints="state.breakpoints">
    <Slide>
        <!-- 슬라이드 될 항목 코딩 -->
    </Slide>
    <template #addons>
        <Navigation />
    </template>
</Carousel>
\<script setup>
import { onMounted, reactive, computed, ref } from 'vue';
breakpoints: {
    1024: {
        itemsToShow: 4,
        snapAlign: 'start'
    },
    1300: {
        itemsToShow: 4.5,
        snapAlign: 'start'
    },
    1600: {
        itemsToShow: 5.5,
        snapAlign: 'start'
    }
},
<\/script>`
        },
        {
            title: 'main.js',
            sampleCodeJS: `import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
const app = createApp(App);
app.component('Carousel', Carousel);
app.component('Slide', Slide);
app.component('Navigation', Navigation);
app.component('Pagination', Pagination);`
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

