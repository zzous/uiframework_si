<template>
    <div class="pageView">
        <div class="cardwrap">
            <CardBox :cardWidth="500" :cardTitle="'테넌트 별 가상서버 사용 상태'"  style="min-height:320px;">
                <template #cardContent>
                    <donutChart :donetlegend="state.donetlegend1" :colors="state.colors1" :totalValue="72"></donutChart>
                </template>
            </CardBox>
          
            <CardBox :cardWidth="500" :cardTitle="'가로 그래프 기본'">
                <template #cardContent><BarChartHor :unit="state.unit" :chartBar="state.chartBar" :chartId="'ChartBar1'" ></BarChartHor></template>
            </CardBox>

            <CardBox :cardWidth="700" :cardTitle="'가로 그래프 변형(범위 삭제)'">
                <template #cardContent><BarChartHor :unit="state.unit" :chartBar="state.chartBar1" :chartId="'ChartBar2'" :chartClass="'chartNolegend'" :chartColor="'574794'"></BarChartHor></template>
            </CardBox>

            <CardBox :cardWidth="300" :cardTitle="'가로 그래프 변형(차트 별도 컬러 지정)'">
                <template #cardContent><BarChartHor :unit="state.unit" :chartBar="state.chartBar2" :chartId="'ChartBar3'" :chartClass="'chartCompare'" :chartColorType="['574794','189F92', 'F38C25' ]"></BarChartHor></template>
            </CardBox>

            <CardBox  :cardWidth="1000"  :cardTitle="'자원구성현황'">
                <template #cardContent>
                    <div class="cmpbox">
                        <div class="cmptitle">테넌트(전체)의 STRATO CMP 자원 구성 현황입니다.</div>
                        <div class="ternentall">
                            <div class="ternent" v-for="(item, index) in state.ternent" :key="index">
                                <strong class="ternenttit">{{ item.title }}</strong>
                                <span class="ternentvalue">{{ item.value }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </CardBox>
            
            <CardBox :cardWidth="450"  :cardTitle="'원형 그래프 기본'" style="min-height:320px;">
                <template #cardContent>
                    <donutChart :donetlegend="state.donetlegend" :colors="state.colors" :totalValue="72"></donutChart>
                </template>
            </CardBox>
            
            <CardBox :cardWidth="500" :cardTitle="'원형 그래프 변형'" style="min-height:320px;">
                <template #cardContent>
                    <donutChart :donetlegend="state.donetlegend2" :colors="state.colors2" ></donutChart>
                </template>
            </CardBox>

            <CardBox :cardWidth="700" :cardTitle="'세로그래프 기본'">
                <template #cardContent>
                    <BarChart :unit="state.unit" :chartBar="state.chartBar" :chartId="'ChartBar4'" ></BarChart>
                </template>
            </CardBox>
            <CardBox :cardWidth="700" :cardTitle="'세로그래프 색상 변경'">
                <template #cardContent>
                    <BarChart :unit="state.unit" :chartBar="state.chartBar" :chartId="'ChartBar5'" :chartColor="'F38C25'"></BarChart>
                </template>
            </CardBox>
            <CardBox :cardWidth="350" :cardTitle="'가상서버상태'">
                <template #cardContent>
                    <div class="boxlist">
                        <div class="boxitem confirm">
                            <span>정상</span>
                            <strong>5</strong>
                        </div>
                        <div class="boxitem error">
                            <span>정지</span>
                            <strong>5</strong>
                        </div>

                    </div>
                </template>
            </CardBox>
            <CardBox :cardWidth="300" :cardTitle="'클라우드 Health / Status'">
                <template #cardContent>
                    <div class="boxlist same">
                        <div class="boxitem confirm" v-for="(item, index) in 4" :key="index">
                            <span>SDC</span>
                            <strong>5</strong>
                        </div>
                    </div>
                </template>
            </CardBox>
            <CardBox :cardWidth="500" :cardTitle="'삭제 예정 가상서버'">
                <template #cardContent>
                    <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    rowSelection="multiple"
                        class="ag-theme-alpine" :domLayout="'autoHeight'">
                    </AgGridVue>
                </template>
            </CardBox>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from '@/components/DatePicker.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  dayJS } = useCommFunc();
const state = reactive({
    chartBar: [
        {name: '스트라우스', rate: 2000, date: '202.06.11', time: '08:00'},
        {name: '스트라우스', rate: 1500, date: '202.06.11', time: '08:00'},
        {name: '가나다서비스', rate: 35000, date: '202.06.11', time: '08:00'},
        {name: 'LGCCC', rate: 4000, date: '202.06.11', time: '08:00'},
        {name: 'STS', rate: 1000, date: '202.06.11', time: '08:00'},
        {name: 'BCE', rate: 6000, date: '202.06.11', time: '08:00'},
        {name: 'BCE', rate: 8900, date: '202.06.11', time: '08:00'},
        {name: 'BCE', rate: 5500, date: '202.06.11', time: '08:00'},
        {name: 'EFG', rate: 8000, date: '202.06.11', time: '08:00'},
        {name: 'GHI', rate: 6800, date: '202.06.11', time: '08:00'}
    ],
    chartBar1: [
        {name: '가상서버이름A', rate: 51, coreType: {a: '33코어', b: '65코어', all: '72코어'}, date: '202.06.11', time: '08:00'},
        {name: '가상서버이름b', rate: 26, coreType: {a: '33코어', b: '65코어', all: '72코어'}, date: '202.06.11', time: '08:00'},
        {name: '가상서버이름c', rate: 12, coreType: {a: '33코어', b: '65코어', all: '72코어'}, date: '202.06.11', time: '08:00'},
        {name: '가상서버이름d', rate: 6, coreType: {a: '33코어', b: '65코어', all: '72코어'}, date: '202.06.11', time: '08:00'},
        {name: '가상서버이름e', rate: 3, coreType: {a: '33코어', b: '65코어', all: '72코어'}, date: '202.06.11', time: '08:00'},
        {name: '가상서버이름f', rate: 70, coreType: {a: '33코어', b: '65코어', all: '72코어'}, date: '202.06.11', time: '08:00'}
    ],
    chartBar2: [
        {name: '블록스토리지', rate: 45, coreType: {a: '579Gib', b: '1024Gib'}, date: '202.06.11', time: '08:00'},
        {name: 'NSA 스토리지', rate: 36, coreType: {a: '579Gib', b: '1024Gib'}, date: '202.06.11', time: '08:00'},
        {name: 'NSA 스토리지', rate: 16, coreType: {a: '579Gib', b: '1024Gib'}, date: '202.06.11', time: '08:00'}
    ],
    unit: [0, 1000, 2000, 3000, 4000, 5000, 6000],
    ternent: [
        {title: '존', value: 1},
        {title: '리전', value: 1},
        {title: 'CSP', value: 1},
        {title: '클러스터', value: 1},
        {title: '호스트', value: 1},
        {title: '데이터스토어', value: 1},
        {title: '가상서버', value: 1},
        {title: 'CPU코어', value: 1},
        {title: '할당CPU', value: 1},
        {title: 'VCPU', value: 1},
        {title: '메모리', value: 1},
        {title: '할당 메모리', value: 1}
    ],
    values: [35, 20, 7, 20, 15, 40],
    colors: ['574794', '9F96BF', 'D8D4E2', '189F92', '72C6BE', 'C9E5E3'],
    
    colors1: ['F3775B', '5F9ECF'],
    colors2: ['189F92', '72C6BE', 'F3775B', 'F3AD53', 'F5E2C8'],
    donetlegend: [
        {name: '테넌트A', num: '10', rate: 35},
        {name: '테넌트B', num: '4', rate: 20},
        {name: '테넌트C', num: '2', rate: 7},
        {name: '테넌트D', num: '7', rate: 20},
        {name: '테넌트E', num: '5', rate: 15},
        {name: '테넌트F', num: '12', rate: 40}
    ],
    donetlegend1: [
        {name: '사용', num: '10', rate: 74},
        {name: '미사용', num: '4', rate: 26}
    ],
    donetlegend2: [
        {name: '리전A', num: '12', rate: 35},
        {name: '리전B', num: '7', rate: 23},
        {name: '리전C', num: '6', rate: 21},
        {name: '리전D', num: '4', rate: 14},
        {name: '리전E', num: '2', rate: 7}
    ],

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
.cardwrap{display: flex; flex-wrap:wrap; position: relative; left:-20px}
.card{flex:1;flex-shrink:1; flex-basis:400px;border:solid 1px #ddd; border-radius:5px; padding:15px;margin-left:20px; margin-bottom:20px; align-items: stretch;}
.card .pagetitle{font-size:14px}
.card .titlebox{border:none}
.card .titlebox.img .pagetitle{background-size:15px; padding-left:20px}
.ui-chart { height: 100%; min-height: 300px; padding-bottom:30px }
.ui-bar-chart { display: flex; position: relative; height: 100%; padding-bottom: 20px; }
.ui-bar-chart .ui-bar-x { flex: 1; border-bottom: 1px solid #d2d2d2; }
.ui-bar-x .unit { position: absolute; bottom: -4px; right: 0; font-size: 12px; }
.ui-bar-chart .ui-bar-y { border-right: 1px solid #d2d2d2; }
.ui-bar-y .unit { position: absolute; top: -3px; left: 0; font-size: 12px; }
.ui-bar-x-unit { display: flex; height: 100%; margin-right: 30px; }
.ui-bar-x-unit li { position: relative; width: 100%; height:100%; text-align: center; }
.ui-bar-x-unit li .bar { position: absolute; bottom: 0; left: 25%; width: 50%; background-color: #189F92; border-radius: 5px 5px 0 0; cursor: pointer; }
.ui-chart .ratetext{display:none}

.ui-bar-x-unit li .x-value, .ui-bar-x-unit li .x-value { position: absolute; bottom: -26px; left: 0; width: 100%; text-align: center; }
.ui-bar-y-unit { display: flex; flex-direction: column-reverse; align-items: flex-end; justify-self: flex-end; height: 100%; }
.ui-bar-y-unit li { display: flex; flex-direction: column-reverse; position: relative; height: 100%; padding-right: 20px; line-height: 0; }
.ui-bar-y-unit li::after { content: ''; position: absolute; bottom: 0; right: 0; width: 6px; height: 1px; background-color: #d2d2d2; }
.ui-bar-y-unit li .bar { background-color: #189F92; border-radius: 0 5px 5px 0; }
.ui-bar-chart.hor { display: block; }
.ui-bar-chart.hor .ui-bar-y { display: flex; height: 100%; border: none; }
.ui-bar-chart.hor .ui-bar-y-unit { width: 100%; flex-direction: column; }
.ui-bar-chart.hor .ui-bar-y-unit li { flex-direction: unset; align-items: center; width: 100%; line-height: normal; padding-right: 0; }
.ui-bar-chart.hor .ui-bar-y-unit li::after { display: none; }
.ui-bar-chart.hor .ui-bar-y-unit li .lb { display: flex; align-items: center; justify-content: end; position: relative; width: 20%; height: 100%; padding-right: 14px; text-align: right; border-right: 1px solid #d2d2d2; }
.ui-bar-chart.hor .ui-bar-y-unit li .graph { display: block; position: relative; width: 80%; height: 100%; }
.ui-bar-chart.hor .ui-bar-y-unit li .graph .bar { position: absolute; top: 25%; left: 0; height: 50%; border-radius: 0 5px 5px 0; background-color: #189F92; }
.ui-bar-chart.hor .ui-bar-x { margin-left: 20%; }
.ui-bar-chart.hor .ui-bar-x-unit { margin-right: 0; position: relative;left:-27px }
.ui-bar-chart.hor .ui-bar-x-unit li::before { content: ''; position: absolute; top: -6px; left: 50%; width: 1px; height: 6px; background-color: #d2d2d2; }
.ui-bar-chart.hor .ui-bar-x-unit li:nth-of-type(1)::before{display: none;}

.ui-chart.chartNolegend .ui-bar-x, .ui-chart.chartCompare .ui-bar-x{display: none;}
.ui-chart.chartNolegend .ratetext, .ui-chart.chartCompare .ratetext{display:block;position: absolute; right:0px; bottom: -20px;display: flex; align-items: center;}
.ui-chart.chartCompare .ratetext{bottom:auto; top:0px; flex-direction: row-reverse;}
.ui-chart.chartNolegend .coreType, .ui-chart.chartCompare .coreType {display:block; font-size:12px; text-align: center;}
.ui-chart.chartNolegend .coreType .coreall, .ui-chart.chartCompare .coreType .coreall{width:100%;font-size:11px;display:block }
.ui-chart.chartNolegend .rateValue, .ui-chart.chartCompare .rateValue{margin-left:10px; font-size:14px; font-weight:700;}
.ui-chart.chartCompare .rateValue{margin-left:0; margin-right:10px;}
.ui-chart.chartNolegend .ui-bar-chart.hor .ui-bar-y-unit li, .ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li{flex-wrap: wrap; margin:8px 0; padding-right:130px;}
.ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li{height:auto; padding-right:0;}
.ui-chart.chartNolegend .ui-bar-chart.hor .ui-bar-y-unit li .lb, .ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li .lb{border:none;width: 100%; text-align: left; justify-content: flex-start;}
.ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li .lb{margin-bottom:10px;}
.ui-chart.chartNolegend .ui-bar-chart.hor .ui-bar-y-unit li .graph, .ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li .graph{width:100%;height:10px; background:#eee; border-radius:10px; }
.ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li .graph{height:20px;border-radius:0px;}
.ui-chart.chartNolegend .ui-bar-chart.hor .ui-bar-y-unit li .graph .bar, .ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li .graph .bar{height:100%; left:0; top:0; border-radius:10px;}
.ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y-unit li .graph .bar{border-radius: 0;}
.ui-chart.chartCompare .ui-bar-chart.hor .ui-bar-y{height:auto}

.bar-tooltip { opacity: 0; position: fixed;  padding: 10px; border: 1px solid #d2d2d2; background-color: #fff; border-radius: 5px; font-size: 11px; color: #666; transform: translateX(-50%); z-index: 10;transition: opacity .3s, margin-top .3s; margin-top:-10px }
.bar-tooltip::after { content: ''; position: absolute; bottom: -5px; left: 50%; width: 8px; height: 8px; margin-left: -5px; border-width: 1px 1px 0 0; border-style: solid; border-color: #d2d2d2; background-color: #fff; transform: rotate(135deg); }
.bar-tooltip .t-sales-num { display: block; margin-top: 3px;  color: var(--point-txt-color); text-align: right; }
.bar-tooltip .t-countbox {   color: var(--base-txt-color); display:flex; justify-content: space-between;}
.bar-tooltip .t-count {  font-weight: bold; color: var(--point-txt-color);margin-left:10px;}
.bar-tooltip .t-title { display:block; font-weight: bold; color: var(--base-txt-color);font-size:13px; margin-bottom:5px;text-align: left; }
.bar-tooltip .t-date { display:block; text-align: left; margin-top:5px; }
.bar:hover .bar-tooltip { display: block; }






.donut-box{display: flex; height:90%; align-items: center;justify-content: space-around;}
.donnt-regend{flex-basis:200px;; height:100%;}
.donnt-regend ul{ display: flex; height:100%; flex-direction: column; justify-content: space-evenly;}
.donnt-regend ul li{ display: flex;align-items: center; }
.donnt-regend ul li > span{flex:1;font-size:14px; text-align: right;}
.donnt-regend ul li .regend-icon{display:block; width:10px; height:10px; border-radius:50%; margin-right:5px;}
.donnt-regend ul li .regend-name{text-align: left;}
.donnt-regend ul li .regend-num{color:#666}
.donnt-regend ul li .regend-rate{color:#574794; font-weight:700;}

.ui-donut{width:200px; height:100%; position: relative;flex: 1 0 250px; max-height: 250px; max-width: 250px;}
.chart-donut{width:100%; height:100%; border-radius:50%;}
.ui-donut-in{background: #fff; position: absolute; top:50%; left:50%; width:60%; height:60%;border-radius: 50%; transform: translate(-50%, -50%);}
.ui-donut-in .in-text{display: flex; width:100%; height:100%; align-items: center; justify-content: center; flex-direction: column;}
.ui-donut-in .in-text span{color:#737373; font-size:12px;}
.ui-donut-in .in-text strong{color:#333; font-size:28px; font-weight:700;}



.cmpbox{}
.cmptitle{text-align: center; color: var(--base-txt-color); font-size:16px; font-weight:700; margin-bottom: 20px;;}
.ternentall{display:flex;flex-wrap: wrap;position: relative;left:-10px;}
.ternentall .ternent{background: #F7F9FA; padding:10px 0; display:flex; flex-direction:column; justify-content:center; align-items: center; flex-basis:155px; flex-grow: 1; flex-shrink: 1; height:70px; margin:10px 0 0 10px; border-radius:5px;}
.ternentall .ternent .ternenttit{background: #F7F9FA; padding:10px 0; display:flex;}
.ternentall .ternent .ternentvalue{font-size:18px; font-weight:700;color:#574794;}
.boxlist{height: 90%; display: flex; flex-direction: column; justify-content: space-evenly;}
.boxlist .boxitem{width:100%; height:70px; border-radius:5px; padding:0 30px; display:flex; justify-content: space-between; align-items: center;}
.boxlist .boxitem span{font-size:16px;}
.boxlist .boxitem strong{font-size:28px; text-decoration: underline;}
.boxlist .boxitem.confirm{background: rgba(24, 159, 146, 0.05);}
.boxlist .boxitem.error{background: rgba(247, 249, 250, 1);}

.boxlist.same{flex-wrap:wrap;flex-direction: row;}
.boxlist.same .boxitem{width:48%; height:48%;}


.barbox{display:flex; width:100%; height:100%; justify-content: center; align-items:center; position: relative;}
.barChart{width:100px;height:8px; border-radius: 4px; background:#F0F0F0; position: relative;}
.barChart .bar{height:8px; border-radius: 4px; background:#1297F2; position:absolute; left:0; top:0}
.datarate{margin-left:10px;}
</style>