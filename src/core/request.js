import axios from 'axios';
import dayjs from 'dayjs';
import $Modal from '@/plugins/modal';

/**
 * @process.env
 * VITE 에서는 import.meta.env 로 가져온다.
 */
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 6000
});

/**
 * @cancel
 * server 단 취소는 안되고 , front 에서 취소
 */
// request.isCancel = axios.isCancel;
request.interceptors.request.use(
    (config) => {
        const myToken = localStorage.getItem('AUTH-TOKEN');
        const lastAccessTime = localStorage.getItem('lastAccessTime');
        let diff = dayjs().diff(lastAccessTime, 'minute');
        // console.log(diff); //날짜차이 비교(분)
        if (diff > 30) {
            //강제 로그아웃
            localStorage.clear();
            emitter.$emit('goLoginPage');
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers.Authorization = myToken;
        if (config.url === '/common/api/v1/file/upload' || config.url === '/common/api/v1/file/upload/editor' ||
            config.url === '/common/api/v1/mna/iss/user/excel') {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        console.log('[API Request ERROR]', error);
        return Promise.reject(error);
    }
);


request.interceptors.response.use(
    response => {
        console.log('[API Response]');
        if (response.data.code == 'ERROR_CODE_AI001' ||
            response.data.code == 'ERROR_CODE_AI002' ||
            response.data.code == 'ERROR_CODE_AI003' ||
            response.data.code == 'ERROR_CODE_AI004' ||
            response.data.code == 'ERROR_UNKNOWN_AUTHORIZATION') {
            if (window.location.pathname !== '/login') {

                $Modal.confirm({
                    title: '',
                    message: `${response.data.message} 다시 로그인해주세요.`,

                    buttonText: {
                        confirm: '확인'
                    }
                })
                    .then(async (success) => {
                        window.location.href = `${import.meta.env.VITE_APP_KBADMIN_LOGIN_URL}/login`;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        } else {
            //응답 성공시 마지막 접속 시간을 갱신한다.
            let time = dayjs().format('YYYY-MM-DD HH:mm:ss');
            localStorage.setItem('lastAccessTime', time);
        }

        return response;
    },
    error => {
        console.log(error);
        // ~ axios에서 서버 요청을 취소한 경우에 실행.
        return Promise.reject(error);
    }
);

export const CancelToken = axios.CancelToken;
export default request;
