<template>
    <div class="pageView">
        tablePage
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