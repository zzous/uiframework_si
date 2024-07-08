<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="titlebox">
                <h1 class="pagetitle"></h1>
                <div class="titleright flex"><button type="button" class="btn posi" @click="goToPage('/guide')">가이드 페이지 </button></div>
            </div>
            
            <div class="cardwrap" style="margin-top:20px;">
                <CardBox :cardWidth="370" style="flex-grow: 0;" :cardTitle="'비용요약'">
                    <template #cardContent>
                        <div class="costBox">
                            <div class="flex" style="justify-content: space-between;">
                                <div class="nowTotal">
                                    <svg xmlns="http://www.w3.org/2000/svg"  width="22" height="22"  viewBox="0 0 16 16" fill="#202020" >
                                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1z"/>
                                    </svg>
                                    <span class="labeltext">금월 사용 금액</span>
                                    <span class="costValue">₩ 3,904</span>
                                </div>
                                <div class="nowTotal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  fill="#202020" viewBox="0 0 16 16">
                                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                    </svg>
                                    <span class="labeltext">예상 사용 금액</span> <span class="costValue">₩ 3,904</span>
                                </div>
                            </div>
                            <div  class="comparepay">
                                
                                <div class="compare"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  viewBox="0 0 16 16" fill="#adacb6">
  <path  d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
</svg><span class="labeltext">지난달 사용 금액</span><span class="costValue">₩ 3,904</span> </div>
                                <div class="compare"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  viewBox="0 0 16 16"  fill="#adacb6">
  <path d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6 9.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"/>
</svg><span class="labeltext">예상 차액</span><span class="costValue">₩ 3,904</span> </div>
                            </div>
                        </div>
                    </template>
                </CardBox>
                <CardBox class="paytable" :cardTitle="'월별 현황'">
                    <template #cardContent>
                        <div style="height:100px">
                            <BarChart :unit="state.unit" :chartBar="state.chartBar" :chartId="'ChartBar4'" :chartColorType="'189F92'"></BarChart>
                        </div>
                    </template>
                </CardBox>
                <CardBox :cardWidth="800" :cardTitle="'CSP Account별 비용'"  :cardSubtext="'CSP Account별 비용 현황 입니다.'">
                    <template #cardContent>
                        <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                        rowSelection="multiple"
                            class="ag-theme-alpine" :domLayout="'autoHeight'">
                        </AgGridVue>
                    </template>
                </CardBox>
            </div>
        </div>
    </div>
</template>
<script setup>


import { defineComponent, onMounted, reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from '@/components/DatePicker.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  dayJS, goToPage } = useCommFunc();
const state = reactive({
    chartBar: [
      
        {name: '9월', rate: 4000, date: '202.06.11', time: '08:00'},
        {name: '8월', rate: 4000, date: '202.06.11', time: '08:00'},
        {name: '7월', rate: 4000, date: '202.06.11', time: '08:00'},
        {name: '6월', rate: 1000, date: '202.06.11', time: '08:00'},
        {name: '5월', rate: 6000, date: '202.06.11', time: '08:00'},
        {name: '4월', rate: 8900, date: '202.06.11', time: '08:00'},
        {name: '3월', rate: 5500, date: '202.06.11', time: '08:00'},
        {name: '2월', rate: 8000, date: '202.06.11', time: '08:00'},
        {name: '1월', rate: 6800, date: '202.06.11', time: '08:00'}
    ],
    
    unit: [0, 1000, 2000, 3000, 4000, 5000, 6000],
    
    colors: ['574794', '9F96BF', 'D8D4E2', '189F92', '72C6BE', 'C9E5E3'],
    
    colors1: ['F3775B', '5F9ECF'],
    colors2: ['189F92', '72C6BE', 'F3775B', 'F3AD53', 'F5E2C8'],
     //테이블
    value: [
        { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 30 },
        { headerName: '존',  field: 'name', valueGetter: 'node.rowIndex + 1', maxWidth: 70 },
        { headerName: '가상서버',  field: 'cloudtype', flex: 1},
        { headerName: '삭제예정일',  field: 'synch', maxWidth: 100},
        { headerName: '가용스토리지',
            field: 'ablestorage',
            maxWidth: 220,
            cellRenderer: (params) => {
                const tagString = `<div class="barChart" id="ablestorage-${params.node.rowIndex}"><em class="bar" style="width:${30}%"></em></div> <em class="datarate">${30}%</em>`;
                const tagTarget = document.createElement('div');
                tagTarget.classList.add('barbox');
                tagTarget.innerHTML = tagString;
                return tagTarget;
            }
        },
        { headerName: '사용여부',
            field: 'usetype',
            flex: 1,
            maxWidth: 220,
            cellRenderer: (params) => {
                const tagString = `<div class="switch"><input type="checkbox" id="usetype-${params.node.rowIndex}" /><label for="usetype-${params.node.rowIndex}">미사용</label></div>`;
                const tagTarget = document.createElement('div');
                tagTarget.classList.add('checkbox');
                tagTarget.innerHTML = tagString;
                const buttonEventTarget = tagTarget.querySelector(`#usetype-${params.node.rowIndex}`);
                buttonEventTarget.addEventListener('change', (event) => {
                    const label = tagTarget.querySelector(`#usetype-${params.node.rowIndex}`).parentNode.children[1];
                    if (event.target.checked) {
                        console.log('텍스트 변경 처리');
                        label.innerHTML = '사용';
                    } else {
                        label.innerHTML = '미사용';
                    }
                });
                return tagTarget;
            }
        }
    ],
    rowData: [
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        }
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



</script>
<style>
.costBox{}
.nowTotal{background:#dcfc34; color:#202020; padding:20px; border-radius: 15px;margin-bottom:20px}
.nowTotal +.nowTotal{margin-left:10px}
.labeltext{display:block;font-size:15px; font-weight: 700;}
.costValue{font-size:30px; font-weight: 700;}
.comparepay{display:flex;background:#535561; color:#adacb6; border-radius: 15px; justify-content: space-around;}
.compare{flex:1; padding:20px;}
.compare +.compare{border-left:dashed 1.5px #adacb6}
.compare .labeltext{font-size:13px; margin-top:10px;}

.compare .costValue{font-size:22px; font-weight: 700;}
.paytable .ui-chart{min-height: 272px;;}
</style>