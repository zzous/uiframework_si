<template>
    <div class="pageView">
       <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=FormInputCheck')">가이드 페이지 </button>
            </div>
            <div class="guideTitle">form - radio 기본형</div>
            <span class="radio" >
                <input type="radio" id="input4" />
                <label for="input4">코드</label>
            </span>
            <div class="guideTitle">form - radio 버튼형</div>
            <div class="radio-group btn-group">
                <span class="radio" >
                    <input type="radio" id="input5" name="dategroup"/>
                    <label for="input5">버튼명</label>
                </span>
                <span class="radio" >
                    <input type="radio" id="input6"  name="dategroup"/>
                    <label for="input6">버튼명</label>
                </span>
                <span class="radio" >
                    <input type="radio" id="input7" name="dategroup" />
                    <label for="input7">버튼명</label>
                </span>
            </div>
            <div class="guideTitle">form - radio 버튼형 type2</div>
            <div class="radio-group btn-group type2">
                <span class="radio" >
                    <input type="radio" id="input8" name="dategroup"/>
                    <label for="input8">버튼명</label>
                </span>
                <span class="radio" >
                    <input type="radio" id="input9"  name="dategroup"/>
                    <label for="input9">버튼명</label>
                </span>
                <span class="radio" >
                    <input type="radio" id="input10" name="dategroup" />
                    <label for="input10">버튼명</label>
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
</script>