<template>
    <div class="pageView">
        <div class="pageBgbox">
            <TitleBox :pageTitle="'트래픽 감시 제외 관리'" :imgIcon="true"></TitleBox>
            <!-- 검색조건 -->
            <div class="tbl-wrap">
                <div class="table-util flex justify-end">
                    <div class="btn-set-m flex align-end">
                        <span class="table-total">조회결과 총 <strong>{{state.rowData.length}}</strong>건</span>
                        <button type="button" class="btn btn-ss">
                            <span class="ico-download"></span>파일다운로드
                        </button>
                    </div>
                </div>
                <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    class="ag-theme-alpine" :domLayout="'autoHeight'"  @cell-clicked="onCellClicked">
                </AgGridVue>
                <div class="ui-no-date" v-if="state.rowData.length === 0"><p>내용이 없습니다.</p></div>
            </div>
            
            <!-- 페이징 컴포넌트 -->
            <PageNavigation :cntPerPage='pager.size' :itemCount='pager.totalCnt' :currentPage="pager.current"
             @changedPage="onChangedPage" />
             <div  class="btnwrap center">
                <button type="button" class="btn posi">등록</button>
                <button type="button" class="btn">선택삭제</button>
            </div>
        </div>
        <DefaultModal :isShow="isShow" :modalTitle="'RCS-AS 상세정보'" :buttonConfirm="'저장'" :buttonCancel="'삭제'" @modalclose="modalControl">
        <template #modalcontent>
            <div>
                <div class="tbl-wrap">
                    <table class="table reg">
                        <colgroup>
                            <col style="width: 160px;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>Interface ID</th>
                                <td>
                                    <div class="formSingleBox">
                                        <span class="radio" >
                                            <input type="radio" id="input4" />
                                            <label for="input4">코드</label>
                                        </span>
                                        <span class="radio" >
                                            <input type="radio" id="input4" />
                                            <label for="input4">코드</label>
                                        </span>
                                        <span class="radio" >
                                            <input type="radio" id="input4" />
                                            <label for="input4">코드</label>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>시스템 선택</th>
                                <td>
                                    <div class="selectlabelbox full">
                                        <select class="custom-select">
                                            <option value="10">10개</option>
                                            <option value="20">20개</option>
                                            <option value="30">30개</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>사유</th>
                                <td>
                                    <textarea style="height:200px"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </DefaultModal>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from '@/components/DatePicker.vue';
import FileInput from '@/components/FileInput.vue';
import TextInput from '@/components/TextInput.vue';
import TitleBox from '@/components/TitleBox.vue';
import DefaultModal from '@/plugins/modal/modal/DefaultModal.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  dayJS, goToPage } = useCommFunc();
const isShow = ref(false);
const state = reactive({
    dateFormat: 'yyyy-MM-dd',
    /**
        * @type-1 { 1년:year, 6개월:month6, 1개월:month, 1주일:week, 당일:day }
        * 일주일/당일 옵션 없음
    */
    dayOpionType: 'month',
    inputType3: {
        value: '',
        error: false
    },
    value: [
        { headerName: '시스템ID',  field: 'ID', maxWidth: 130},
        { headerName: '시스템명',  field: 'syname', flex: 1},
        { headerName: '사유',
            field: 'reason',
            flex: 1,
            cellRenderer: (params) => {
                const tagString = `<div class="borderbox">${params.data.reason}</div>`;
                const tagTarget = document.createElement('div');
                tagTarget.innerHTML = tagString;
                return tagTarget;
            }
        },
        { headerName: '날짜',
            field: 'registdate',
            flex: 1,
            valueGetter: (params) => {
                return dayJS(params.data.registdate).format('YYYY-MM-DD hh:mm:ss');
            }
        }
    ],
    rowData: [
        {ID: '87', syname: 'TRELAY#6', reason: 'test1111', registdate: '202404031120'},
        {ID: '87', syname: 'TRELAY#6', reason: 'test1111', registdate: '202404031120'},
        {ID: '87', syname: 'TRELAY#6', reason: 'test1111', registdate: '202404031120'},
        {ID: '87', syname: 'TRELAY#6', reason: 'test1111', registdate: '202404031120'}
    ],
    defaultColDef: {
        sortable: false,
        filter: false,
        resizable: false,
        headerClass: 'centered',
        cellClass: 'centered',
        flex: 1
    },
    cellData: {}
});
const datepicker = ref(null);
const  selectDay = (fromDay, toDay) => {
    console.log(dayJS(fromDay).format('YYYY-MM-DD'), dayJS(toDay).format('YYYY-MM-DD'));
};

/**
    * @input value upDate
*/
const setValue = (value) => {
    console.log(value);
};

// 페이징 처리
const pager = reactive({
    current: 1,
    size: computed(() => state.pagesize),
    offset: computed(() => (pager.current - 1) * pager.size),
    totalCnt: 10000
});
const onChangedPage = (num) => {
    console.log(num);
    pager.current = num;
    //api호출
};
/**
    * 테이블 셀 선택
    * @parms e 선택된 셀 
*/
const onCellClicked = (e) => {
    console.log(e.data);
    state.cellData = e.data;
    isShow.value = true;
};
/**
    * 모달 닫기
    * @parms type(String) 닫기 버튼 종류
*/
const modalControl = (type) => {
    if (type)
        switch (type) {
            case 'modalclose':
                return isShow.value = false;
            case 'modalconfirm':
                return isShow.value = false;
            case 'modalcancel':
                return isShow.value = false;
        }
    else isShow.value = false;
};


</script>
<style scoped>
.custom-select + .itemlable{margin-left:10px;}
.searchItem .formInputbox +.formInputbox {margin-left:10px}
</style>