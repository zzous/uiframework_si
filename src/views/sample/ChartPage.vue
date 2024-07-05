<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="dashbordTitle">비용 요약</div>
            <div class="cardwrap">
                <CardBox :cardWidth="370" style="flex-grow: 0;">
                    <template #cardContent>
                        <div class="costBox">
                            <div class="flex">
                                <div class="nowTotal">
                                    <span class="labeltext">금월 사용 금액</span> 
                                    <span class="costValue">₩ 3,904</span> 
                                </div>
                                <div class="nowTotal"><span class="labeltext">예상 사용 금액</span> <span class="costValue">₩ 3,904</span> </div>
                            </div>
                            <div  class="comparepay">
                                
                                <div class="compare"><span class="labeltext">지난달 사용 금액</span><span class="costValue">₩ 3,904</span> </div>
                                <div class="compare"><span class="labeltext">예상 차액</span><span class="costValue">₩ 3,904</span> </div>
                            </div>
                        </div>
                    </template>
                </CardBox>
                <CardBox :cardWidth="300"  style="min-height:320px;">
                    <template #cardContent>
                        <div style="height:100px">
                            <BarChart :unit="state.unit" :chartBar="state.chartBar" :chartId="'ChartBar4'" :chartColorType="'189F92'"></BarChart>
                        </div>
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
const {  dayJS } = useCommFunc();
const state = reactive({
    chartBar: [
      
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
    

});



</script>
<style>
.costBox{}
.nowTotal{background:#dcfc34; color:#202020; padding:20px; border-radius: 15px;margin-bottom:20px}
.nowTotal +.nowTotal{margin-left:10px}
.labeltext{display:block;font-size:15px; font-weight: 700;}
.costValue{font-size:30px; font-weight: 700;}
.comparepay{display:flex}

.compare +.compare{margin-left:20px;}

.compare .costValue{font-size:20px; font-weight: 700;}
</style>