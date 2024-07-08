<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=FormInputCheck')">가이드 페이지 </button>
            </div>
            <div class="guideTitle">form - checkbox 기본형</div>
            <span class="checkbox" >
                <input type="checkbox" id="input8" />
                <label for="input8">코드</label>
            </span>
            <div class="guideTitle">form - checkbox 버튼형</div>
            <div class="checkbox-group btn-group">
                <span class="checkbox" >
                    <input type="checkbox" id="input9"  name="checkgroup" />
                    <label for="input9">버튼명</label>
                </span>
                <span class="checkbox" >
                    <input type="checkbox" id="input10"  name="checkgroup" />
                    <label for="input10">버튼명</label>
                </span>
            </div>
            <div class="guideTitle">form - checkbox 버튼형 type2</div>
            <div class="checkbox-group btn-group type2">
                <span class="checkbox" >
                    <input type="checkbox" id="input11"  name="checkgroup" />
                    <label for="input11">버튼명</label>
                </span>
                <span class="checkbox" >
                    <input type="checkbox" id="input12"  name="checkgroup" />
                    <label for="input12">버튼명</label>
                </span>
                <span class="checkbox" >
                    <input type="checkbox" id="input13"  name="checkgroup" />
                    <label for="input13">버튼명</label>
                </span>
            </div>
            <div class="guideTitle">form - switch (체크, 라디오 모두 사용가능)</div>
            <div class="switch">
                <input type="checkbox" id="switch" />
                <label for="switch">선택</label>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
</script>