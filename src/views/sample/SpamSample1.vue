<template>
    <div class="pageView">
        <div class="pageBgbox">
            <TitleBox :pageTitle="'SMS/MMS 차단내역조회'" :subdec="'(22)'" :imgIcon="true"></TitleBox>
            <!-- 검색조건 -->
            <div class="tbl_search">
                <h2 class="subTitle">검색  조건</h2>
                <div class="tbl_searchin">
                    <div class="searchItem">
                        <div class="itemlable">기간</div>
                        <DatePicker ref="datepicker" :dayOpionType=state.dayOpionType  @selectDay ="selectDay"/>
                    </div>
                    <div class="searchItem widthFixed">
                        <TextInput
                            :label="'고객번호'"
                            :icon="false"
                            :placeholder="'고객번호 7자리를 입력해 주세요'"
                            :id="'input1'"
                            :error="'다시 입력해 주세요'"
                            :value = "''"
                            :className="['labelleft', {error:state.inputType3.error}]"
                            @setValue = setValue
                        />
                    </div>
                    <div class="searchItem full">
                        <div class="itemlable">SMS/MMS 차단내역 목록 페이지당 개수</div>
                        <select class="custom-select">
                            <option value="10">10개</option>
                            <option value="20">20개</option>
                            <option value="30">30개</option>
                        </select>
                        <div class="itemlable">RCS 차단내역 목록 페이지당 개수</div>
                        <select class="custom-select">
                            <option value="10">10개</option>
                            <option value="20">20개</option>
                            <option value="30">30개</option>
                        </select>
                    </div>
                </div>
                <div class="btnwrap">
                    <button type="button" class="btn posi">조회</button>
                    <button type="button" class="btn">초기화</button>
                </div>
            </div>
            <div class="tbl-wrap">
                <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    class="ag-theme-alpine" :domLayout="'autoHeight'" rowSelection="multiple">
                </AgGridVue>
                <div class="ui-no-date" v-if="state.rowData.length === 0"><p>내용이 없습니다.</p></div>
            </div>
            <div  class="btnwrap right"><button type="button" class="btn posi">메세지 복원</button></div>
            <!-- 페이징 컴포넌트 -->
            <PageNavigation :cntPerPage='pager.size' :itemCount='pager.totalCnt' :currentPage="pager.current"
             @changedPage="onChangedPage" />
             <TitleBox :pageTitle="'RCS 차단내역조회'" :subdec="'(22)'" :imgIcon="true" style="margin:50px 0  20px 0;"></TitleBox>
             <div class="tbl-wrap">
                <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    class="ag-theme-alpine" :domLayout="'autoHeight'" rowSelection="multiple">
                </AgGridVue>
                <div class="ui-no-date" v-if="state.rowData.length === 0"><p>내용이 없습니다.</p></div>
            </div>
            <div  class="btnwrap right"><button type="button" class="btn posi">RCS 메세지 복원</button></div>
            <!-- 페이징 컴포넌트 -->
            <PageNavigation :cntPerPage='pager.size' :itemCount='pager.totalCnt' :currentPage="pager.current"
             @changedPage="onChangedPage" />
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
        { headerName: '복원구분', headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 120 },
        { headerName: '차단사유',  field: 'cloudtype', flex: 1},
        { headerName: '메세지수신시간',  field: 'abled', flex: 1 },
        { headerName: '발신번호',  field: 'block',  maxWidth: 100},
        { headerName: '회신번호',  field: 'data', maxWidth: 100 },
        { headerName: 'SMS/MMS',  field: 'zone', flex: 1 },
        { headerName: '상세정보',  field: 'positon', flex: 1 }
    ],
    rowData: [],
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
</style>