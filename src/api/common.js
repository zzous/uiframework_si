export function _uploadEditFile(formData) {
    return $api({
        url: 'api주소',
        method: 'post',
        data: formData,
        timeout: 6000
    });
}
export function _uploadFile(formData) {
    console.log(formData);
    return $api({
        url: 'api주소',
        method: 'post',
        data: formData,
        timeout: 6000
    });
}
export const _fileDownload = async (params) => {
    return await $api.get('api주소', { responseType: 'blob' });
};

export const _getPartnerList = async (params) => {
    return await $api.post('api주소', params);
};