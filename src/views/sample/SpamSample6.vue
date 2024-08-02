<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="section-share">
                <div class="sharebox">
                    <div class="mainChart">
                        <Tabs :id="'mainChart'">
                            <template #tabsubdec>
                                <div class="selectlabelbox">
                                    <select class="custom-select">
                                        <option value="10">MFS</option>
                                        <option value="20">MFS Gateway</option>
                                        <option value="30">앱</option>
                                    </select>
                                </div>
                            </template>
                            <template #tabcons>
                                <div class="tabcontent" data-title="트래픽 그래프">
                                    <div class="tabpanel" role="tabpanel">
                                        <Carousel class="mainslider" v-bind="state.settings">
                                            <Slide v-for="(item, index) in 5" :key="index">
                                                <div class="lineChartbox">
                                                    <div class="chartInfo">
                                                        <div class="chart_title">{{ `MFS#${index}` }}</div>
                                                        <div class="label_legend">
                                                            <span class="this">금일</span>
                                                            <span class="last">전주</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slide>
                                            <template #addons>
                                                <Pagination />
                                            </template>
                                        </Carousel>
                                        
                                    </div>
                                </div>
                                <div class="tabcontent" data-title="서비스 그래프">
                                    <div class="tabpanel" role="tabpanel">tabcontent2<br>tabcontent2</div>
                                </div>
                            </template>
                        </Tabs>
                    </div>
                </div>
                <div class="sharebox">
                    <div class="mainChart">
                        <Tabs :id="'useChart'">
                            <template #tabsubdec>
                                <div class="selectlabelbox">
                                    <select class="custom-select">
                                        <option value="10">MFS</option>
                                        <option value="20">MFS Gateway</option>
                                        <option value="30">앱</option>
                                    </select>
                                </div>
                            </template>
                            <template #tabcons>
                                <div class="tabcontent" data-title="CPU">
                                    <div class="tabpanel" role="tabpanel">
                                        <Carousel class="mainslider" v-bind="state.settings">
                                            <Slide v-for="(item, index) in 5" :key="index">
                                                <div class="lineChartbox">
                                                    <div class="chartInfo background">
                                                        <div class="chart_title">{{ `MFS#${index}` }}</div>
                                                        <div class="totalRate">25%</div>
                                                    </div>
                                                    <div>
                                                        <BarChartHor
                                                            :chartBar="state.chartBar1"
                                                            :chartColorType="['854cf5', '189F92' ]"
                                                            :chartId="'ChartBar2'"
                                                            :chartClass="'chartNolabel'"
                                                            :unit = state.unit
                                                        />
                                                    </div>
                                                </div>
                                            </Slide>
                                            <template #addons>
                                                <Pagination />
                                            </template>
                                        </Carousel>
                                        
                                    </div>
                                </div>
                                <div class="tabcontent" data-title="Memory">
                                    <div class="tabpanel" role="tabpanel">tabcontent2<br>tabcontent2</div>
                                </div>
                                <div class="tabcontent" data-title="TPS">
                                    <div class="tabpanel" role="tabpanel">tabcontent2<br>tabcontent2</div>
                                </div>
                            </template>
                        </Tabs>
                    </div>
                </div>
            </div>

            <div class="cardwrap">
                <CardBox :cardWidth="400" style="flex-grow: 0;" :cardTitle="'알람'">
                    <template #cardContent>
                        <div class="costBox">
                            <div class="nowTotal up">
                                <div class="total_wrap">
                                    <div>
                                        <span class="labeltext">2024.08.02 10:11:11 </span>
                                        <span class="labeltext">Critical 알림  </span>
                                        <span class="costValue">MFS#4 CPU사용율</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="nowTotal down">
                                <div class="total_wrap">
                                    <div>
                                        <span class="labeltext">2024.08.02 10:11:11</span>
                                        <span class="labeltext">Major 알림 </span>
                                        <span class="costValue">MFS#2 CPU사용율 </span>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </template>
                </CardBox>
                <CardBox :cardWidth="800"  :cardTitle="'필터링 Workflow'">
                    <template #cardContent>
                        <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                            class="ag-theme-alpine" :domLayout="'autoHeight'" >
                        </AgGridVue>
                    </template>
                </CardBox>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Tabs from '@/components/Tabs.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  dayJS, goToPage } = useCommFunc();

const state = reactive({
    
    settings: {
        itemsToShow: 2,
        snapAlign: 'start'
    },
    chartBar1: [
        {name: '금일 사용률', rate: 51,  date: '202.06.11', time: '08:00'},
        {name: '전주 사용률', rate: 26,  date: '202.06.11', time: '08:00'}
    ],
    unit: [0, 1000, 2000, 3000, 4000, 5000, 6000],
    value: [
        { headerName: '순서',  field: 'ID', maxWidth: 130},
        { headerName: '기능',  field: 'syname', flex: 1},
        { headerName: '탐지',
            field: 'reason',
            flex: 1,
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
        },
        { headerName: '필터링',
            field: 'registdate',
            flex: 1,
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
    }
});




</script>
<style scoped>
.cardwrap{margin-top:40px;}
.mainChart{padding:20px;}
.lineChartbox{width:100%;padding:10px; margin:0 10px 0 0; border:solid 1px var(--base-bd-color)}
.chartInfo{display: flex; justify-content: space-between;}
.chartInfo.background{padding:10px; background:#eee; margin-bottom:15px;}
.chartInfo .chart_title{font-size:15px; font-weight:700}
.chartInfo .label_legend > span{display: inline-block;position: relative; padding-left:14px;}
.chartInfo .label_legend > span + span{margin-left:10px;}
.chartInfo .label_legend > span:after{content:""; display: block; width:10px; height:10px; border-radius:10px; position: absolute; left:0; top:3px;}
.chartInfo .label_legend > span.last:after{background:var(--point-bar-color)}
.chartInfo .label_legend > span.this:after{background:var(--primary-txt-color)}
.mainChart .ui-chart{min-height: 100px; padding-bottom:0}
.costBox{}
.nowTotal{background:var(--point-green-color); padding:15px 20px; border-radius: 15px;margin-bottom:20px; position: relative;padding-left:90px}
.nowTotal:before{content:""; display:block;width:50px;height:50px; background: url('/images/icon_chart.svg') no-repeat 0 0/50px;position: absolute; left:20px; top:calc(50% - 25px)}
.nowTotal.down:before{content:""; display:block;width:50px;height:50px; background: url('/images/icon_question.svg') no-repeat 0 0/50px;position: absolute; left:20px; top:calc(50% - 25px)}
.nowTotal.up{background:#3c3e4a;}
.total_wrap{display:flex;}
.nowTotal +.nowTotal{margin-top:10px}
.nowTotal.up .labeltext,.nowTotal.up .costValue {color:var(--point-green-color)}
.labeltext{display:block;font-size:15px; font-weight: 400;}
.costValue{font-size:30px; font-weight: 700;}
.costValue em{font-size:20px;}
</style>