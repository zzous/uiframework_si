<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="guideTitle">form - select 기본형</div>
            <select class="custom-select">
                <option value="사용">사용</option>
                <option value="미사용">미사용 </option>
            </select>
        </div>
    </div>
</template>
<script setup>
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
</script>
