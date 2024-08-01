<template>
    <div class="pageView">
        <div class="pageBgbox">
            <TitleBox :pageTitle="'악성URL'" :subdec="'(22)'" :imgIcon="true"></TitleBox>
            <!-- 검색조건 -->
            <div class="tbl_search">
                <h2 class="subTitle">검색  조건</h2>
                <div class="tbl_searchin">
                    <div class="searchItemDate">
                        <div class="itemlable">기간 조회</div>
                        <DatePicker ref="datepicker" :dayOpionType=state.dayOpionType  @selectDay ="selectDay"/>
                    </div>
                    
                    <div class="searchItem both">
                        <TextInput
                            :label="'악성 URL'"
                            :icon="false"
                            :placeholder="'고객번호 7자리를 입력해 주세요'"
                            :id="'input1'"
                            :error="'다시 입력해 주세요'"
                            :value = "''"
                            :className="['labelleft', {error:state.inputType3.error}]"
                            @setValue = setValue
                        />
                        <TextInput
                            :label="'비고'"
                            :icon="false"
                            :placeholder="'고객번호 7자리를 입력해 주세요'"
                            :id="'input2'"
                            :error="'다시 입력해 주세요'"
                            :value = "''"
                            :className="['labelleft', {error:state.inputType3.error}]"
                            @setValue = setValue
                        />
                    </div>
                    <div class="searchItem both">
                        <div class="selectlabelbox">
                            <div class="itemlable">건수</div>
                            <select class="custom-select">
                                <option value="10">10개</option>
                                <option value="20">20개</option>
                                <option value="30">30개</option>
                            </select>
                        </div>
                        <div class="selectlabelbox">
                        <div class="itemlable">페이지당 개수</div>
                            <select class="custom-select">
                                <option value="10">10개</option>
                                <option value="20">20개</option>
                                <option value="30">30개</option>
                            </select>
                        </div>
                    </div>
                    <div class="searchItem full">
                        <div class="labelbox">코드명</div>
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
                    </div>
                </div>
                <div class="btnwrap">
                    <button type="button" class="btn posi">조회</button>
                    <button type="button" class="btn">초기화</button>
                </div>
            </div>
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
                    class="ag-theme-alpine" :domLayout="'autoHeight'" >
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
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from '@/components/DatePicker.vue';
import FileInput from '@/components/FileInput.vue';
import TextInput from '@/components/TextInput.vue';
import TitleBox from '@/components/TitleBox.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  dayJS, goToPage } = useCommFunc();

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
        { headerName: '#', valueGetter: 'node.rowIndex + 1', maxWidth: 60 },
        { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 80 },
        { headerName: '악성URL',  field: 'url', flex: 1},
        { headerName: '비고',  field: 'etc', maxWidth: 150},
        { headerName: '건수',  field: 'num',  maxWidth: 100},
        { headerName: '등록일',
            field: 'registdate',
            maxWidth: 150,
            valueGetter: (params) => {
                return dayJS(params.data.registdate).format('YYYY-MM-DD hh:mm:ss');
            }
        },
        { headerName: '최종차단일',
            field: 'stopdate',
            maxWidth: 120,
            valueGetter: (params) => {
                return dayJS(params.data.registdate).format('YYYY-MM-DD');
            }
        },
        { headerName: '수정',
            field: 'edit',
            maxWidth: 250,
            cellRenderer: (params) => {
                const tagString = `<div class="tablebt"><button class="btn btn-ss submit" id="edit-${params.node.rowIndex}">수정</button> <button class="btn btn-ss error" id="del-${params.node.rowIndex}">삭제</button></div>`;
                const tagTarget = document.createElement('div');
                tagTarget.classList.add('btns');
                tagTarget.innerHTML = tagString;
                const buttoneditTarget = tagTarget.querySelector(`#edit-${params.node.rowIndex}`);
                const buttondelTarget = tagTarget.querySelector(`#del-${params.node.rowIndex}`);
                buttoneditTarget.addEventListener('click', (event) => {
                    console.log(`${params.node.rowIndex} 줄 수정버튼 클릭`);
                });
                buttondelTarget.addEventListener('click', (event) => {
                    console.log(`${params.node.rowIndex} 줄 삭제버튼 클릭`);
                });
                return tagTarget;
            }
        }
    ],
    rowData: [
        {url: 'www.naver.com', etc: '운영자 차단등록', num: '0', registdate: '202404031120', stopdate: '20240403'},
        {url: 'www.naver.com', etc: '운영자 차단등록', num: '0', registdate: '202404031120', stopdate: '20240403'},
        {url: 'www.naver.com', etc: '운영자 차단등록', num: '0', registdate: '202404031120', stopdate: '20240403'},
        {url: 'www.naver.com', etc: '운영자 차단등록', num: '0', registdate: '202404031120', stopdate: '20240403'}
    ],
    defaultColDef: {
        sortable: false,
        filter: false,
        resizable: false,
        headerClass: 'centered',
        cellClass: 'centered',
        flex: 1
    }
});
const datepicker = ref(null);
const  selectDay = (fromDay, toDay) => {
    console.log(dayJS(fromDay).format('YYYY-MM-DD'), dayJS(toDay).format('YYYY-MM-DD'));
};
/**
    * @input 에러체크
*/
watch(state, () => {
    state.inputType1.value.length > 5 ? state.inputType1.error = true : state.inputType1.error = false;
    state.inputType2.value.length > 5 ? state.inputType2.error = true : state.inputType2.error = false;
    state.inputType3.value.length > 9 ? state.inputType3.error = true : state.inputType3.error = false;
});
/**
    * @input value upDate
*/
const setValue = (value) => {
    console.log(value);
    state.inputType1.value = value;
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


</script>
<style scoped>
.custom-select + .itemlable{margin-left:10px;}
.searchItem .formInputbox +.formInputbox {margin-left:10px}
</style>