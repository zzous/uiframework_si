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
     * images size check ( width * height )
     * @file image
     */
    const getImageInfo = (file, callback) => {
        console.log('>>load reader', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const fileSize = Math.floor(file.size / 1024);
        const fileType = file.type;
        // console.log('file type', file.type);
        if (fileType.indexOf('image') > -1) {
            reader.onload = function(e) {
                console.log('>>load reader');
                // let image = new Image(); // ck-editor 랑 충돌남....
                let image = document.createElement('img');
                image.src = e.target.result;
                image.onload = function() {
                    const _image = {
                        width: this.width,
                        height: this.height,
                        ratio: this.width / this.height,
                        fileSize: fileSize, // KB
                        fileType: fileType // file type
                    };
                    callback(_image);
                };
            };
        } else {
            const _file = {
                fileSize: fileSize, // KB
                fileType: fileType // file type
            };
            callback(_file);
        }
    };

    /**
     * 비밀번호 생성규칙 * 영문, 숫자, 특수기호가 포함된 8~16자리
     * @params password
     */
    const validPassword = (password) => {
        const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/;
        return reg.test(password);
    };

    /**
     * Email validation check ( 직접입력일때 )
     */
    const validEmail = (email) => {
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return reg.test(email);
    };

    /**
     * @format Brn 사업자번호 format 333-22-55555 형식 만들기
     * @brn 숫자 10자리 (3332255555)
     */
    const formatterBrn = (brn) => {
        // const reg = /^\{10}$/;
        // if (!reg.test(brn)) return brn;

        const fomatted = brn?.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
        return fomatted;
    };

    const getCommonCode = async (code, callback) => {
        try {
            const response = await _getCommonCode(code);
            callback(response.data.data.list);
        } catch (error) {
            console.log(error);
        }
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
     * @item 업로드시 respose받은 번호
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
        getCommonCode,
        fileDownload,
        formatterBrn,
        validPassword,
        validEmail,
        getImageInfo,
        

        $Modal,
        dayJS

    };
}