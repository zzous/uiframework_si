import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useCommFunc() {
    const router = useRouter();
    //모달 데이터
    const $Modal = inject('$Modal');
    const dayJS = inject('dayJS');
    const goToPage = (params) => {
        router.push(params);
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
     * @item Sn
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

    return {
        goToPage,
        pageReload,

        $Modal,
        dayJS

    };
}