<template>
    <div class="pageView">
        <div class="titlebox">
            <h1 class="pagetitle">페이지 타이틀 <em class="subdec">(11)</em></h1>
            <div class="titleright">
                <button type="button" class="btn btn-line">버튼명</button>
                <button type="button" class="btn btn-line">버튼명</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
const state = reactive({
    caseType: false,
    className: ''
    
});

</script>

<style>
.titlebox{display:flex; align-items: center; justify-content: space-between; padding-bottom:20px; border-bottom:solid 1px #ddd}
.titlebox .pagetitle{font-size:20px; font-weight:700;}
.titlebox .subdec{font-size:15px; font-weight:700;}
.titlebox .titleright button + button{margin-left:10px}
</style>