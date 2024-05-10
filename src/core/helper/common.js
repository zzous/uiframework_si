import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useCommFunc() {
    const router = useRouter();
    //모달 데이터
    const isDownShow = ref(false);
    const isPartnerShow = ref(false);
    const isImgShow = ref(false);
    const isRequestShow = ref(false);
    const goToPage = (params) => {
        router.push(params);
    };
    const fileDown = (params) => {
        console.log('파일다운로드', params);
    };
    const tableResize = (params) => {
        console.log('테이블리사이징');
    };
    const openModal = (modal) => {
        if (modal === 'isPartnerShow') {
            isPartnerShow.value = true;
        } else if (modal === 'isDownShow') {
            isDownShow.value = true;
        } else if (modal === 'isImgShow') {
            isImgShow.value = true;
        } else if (modal === 'isRequestShow') {
            isRequestShow.value = true;
        }

    };
    return {
        goToPage,
        fileDown,
        tableResize,
        openModal,
        isPartnerShow,
        isDownShow,
        isImgShow,
        isRequestShow

    };
}