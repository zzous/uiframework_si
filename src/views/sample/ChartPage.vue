<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="pageSearch">
                <div class="search_title">
                    <div class="thisMonth">
                        <div class="dateTitle">
                            <span>기준월</span>
                            <strong>2023.07</strong>
                        </div>
                        <div class="monthBtn">
                            <button type="button" class="monthbtn month_prev"></button>
                            <button type="button" class="monthbtn month_next"></button>
                        </div>
                    </div>
                    <div class="thisCom select-wrap">
                        <div class="dateTitle textbtn-select" @click="onChangeSelect($event)">
                            <span>회사명</span>
                            <strong>{{ state.memberLabel }}</strong>
                        </div>
                        <div class="btnselectlist">
                            <ul>
                                <li v-for="(item, index) in state.memberlist" :key="index" @click="onClickSelsect(item.label)">{{item.label}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="searchbths">
                    <button type="button" class="iconbtn ico-detail"></button>
                    <button type="button" class="iconbtn ico-pdf"></button>
                    <button type="button" class="iconbtn ico-calendar"></button>
                </div>
            </div>
            
            <div class="cardwrap" style="margin-top:20px;">
                <CardBox :cardWidth="400" style="flex-grow: 0;" :cardTitle="'비용요약'">
                    <template #cardContent>
                        <div class="costBox">
                            <div class="nowTotal up">
                                <div class="total_wrap">
                                    <div>
                                        <span class="labeltext">금월 사용 금액</span>
                                        <span class="costValue"><em>₩</em> 27,295</span>
                                    </div>
                                </div>
                                <div class="past"><span class="labeltext">예상 사용 금액</span><span class="costValue"><em>₩</em> 76,922</span></div>
                            </div>
                            <div class="nowTotal down">
                                <div class="total_wrap">
                                    <div>
                                        <span class="labeltext">지난달 사용 금액</span>
                                        <span class="costValue"><em>₩</em> 1,002,014</span>
                                    </div>
                                </div>
                                <div class="past"><span class="labeltext">예상 차액</span><span class="costValue"><em>₩</em> -925,092</span></div>
                            </div>
                            
                            
                        </div>
                    </template>
                </CardBox>
                <CardBox class="paytable" :cardTitle="'월별 현황'">
                    <template #cardContent>
                        <div style="height:100px">
                            <BarChart
                                :unit="state.unit"
                                :chartBar="state.chartBar"
                                :unitText ="'(횟수)'"
                                :chartId="'ChartBar4'"
                                :chartColorType="'5142b2'"
                            />
                        </div>
                    </template>
                </CardBox>
            </div>
            <div class="cardwrap">
                <CardBox :cardTitle="'CSP Account별 비용/비율'"  :cardSubtext="'CSP Account별 비용 현황 입니다.'" style="flex-shrink: 0;">
                    <template #cardContent>
                        <div class="flex">
                            <div class="accountCard" style="flex:1 0 230px">
                                <div class="mt-10">
                                    <span class="label">CSP</span>
                                    <strong class="cardStrong">AWS</strong>
                                </div>
                                <div class="mt-10">
                                    <span class="label">Account</span>
                                    <strong class="cardStrong">751498871854</strong>
                                </div>
                            
                                <div class="totalCount"><span class="label">합계 금액</span><strong>₩ 17,400</strong></div>
                                <span class="label">사용량</span>
                                <BarSimple :rate="'50'" :id="'chart1'"  />
                                
                            </div>
                        </div>
                    </template>
                </CardBox>
                <CardBox :cardTitle="'테넌트 별 비용/비율'"  :cardSubtext="'테넌트 별 비용 현황 입니다.'" style="flex-shrink: 0;">
                    <template #cardContent>
                        <div class="flex">
                            <div class="accountCard" style="flex:1 0 230px; background: #c9c9d4;">
                                <div class="mt-10">
                                    <span class="label">테넌트 명</span>
                                    <strong class="cardStrong">imp-test-01</strong>
                                </div>
                                <div class="totalCount"><span class="label">합계 금액</span><strong>₩ 2,017,400</strong></div>
                                <span class="label">사용량</span>
                                <BarSimple :rate="'30'" :id="'chart1'"  />
                            </div>
                        </div>
                    </template>
                </CardBox>
                <CardBox :cardTitle="'CSP'" :cardSubtext="'CSP 비용 현황 입니다.'" style="flex-shrink: 0;flex-grow: 0; width:100%;">
                    <template #cardContent>
                        <div class="cspCarousel">
                            <div class="totalBar"><span class="label">합계 금액</span><strong class="BText"><em>₩</em>27,295</strong></div>
                            <Carousel class="subpageslider" :breakpoints="state.breakpoints"  ref="myCarousel">
                                <Slide v-for="(item, index) in state.csp" :key="index">
                                    <div class="accountCard">
                                        <div class="mt-10">
                                            <span class="label">서비스명</span>
                                            <strong class="cardStrong">{{item.label}}</strong>
                                        </div>
                                        <div class="totalCount"><span class="label">합계 금액</span><strong><em>₩</em> {{item.cost}}</strong></div>
                                    </div>
                                </Slide>
                                <template #addons>
                                    <Navigation />
                                </template>
                            </Carousel>
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
import BarSimple from '@/components/BarSimple.vue';
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
    
    memberlist: [
        {label: '스트라토'},
        {label: '회원사'},
        {label: '회원사1'},
        {label: '회원사 이름이 길경우'}
    ],
    memberLabel: '스트라토',
    breakpoints: {
        1024: {
            itemsToShow: 4,
            snapAlign: 'start'
        },
        1300: {
            itemsToShow: 4.5,
            snapAlign: 'start'
        },
        1600: {
            itemsToShow: 5,
            snapAlign: 'start'
        }
    },
    csp: [
        {label: 'Amazon DynamoDB', cost: '142.95'},
        {label: 'Amazon EC2 Container Registry (ECR)', cost: '5.47'},
        {label: 'Amazon Elastic Compute Cloud - Compute', cost: '6,390.94'},
        {label: 'Amazon Elastic Container Service for Kubernetes', cost: '9,100'},
        {label: 'Amazon Elastic File System', cost: '0'},
        {label: 'Amazon Elastic Load Balancing', cost: '0'},
        {label: 'Amazon Location Service', cost: '-'},
        {label: 'Amazon Simple Notification Service', cost: '-'},
        {label: 'Amazon Simple Queue Service', cost: '0.01'},
        {label: 'Amazon Simple Storage Service', cost: '18.51'},
        {label: 'Amazon Virtual Private Cloud', cost: '4,375.02'},
        {label: 'AmazonCloudWatch', cost: '87.19'},
        {label: 'AWS Glue', cost: '0.01'},
        {label: 'AWS Key Management Service', cost: '87.39'},
        {label: 'AWS Migration Hub Refactor Spaces', cost: '-'},
        {label: 'AWS Secrets Manager', cost: '0.03'},
        {label: 'EC2 - Other', cost: '261.96'}
    ]
});
const onChangeSelect  = (event) => {
    const openEle = event.currentTarget.parentNode;
    
    if (openEle.classList.contains('open')) {
        openEle.classList.remove('open');
    } else {
        openEle.classList.add('open');
    }
};
const onClickSelsect = (label) => {
    const layer = document.querySelector('.select-wrap');
    console.log(layer);
    state.memberLabel = label;
    layer.classList.remove('open');
};


</script>
<style>
.costBox{}
.nowTotal{background:var(--point-green-color); padding:15px 20px; border-radius: 15px;margin-bottom:20px; position: relative;padding-left:90px}
.nowTotal:before{content:""; display:block;width:50px;height:50px; background: url('/images/icon_chart.svg') no-repeat 0 0/50px;position: absolute; left:20px; top:calc(50% - 25px)}
.nowTotal.down:before{content:""; display:block;width:50px;height:50px; background: url('/images/icon_question.svg') no-repeat 0 0/50px;position: absolute; left:20px; top:calc(50% - 25px)}
.nowTotal.up:after{content:""; display:block;width:30px;height:30px; background: url('/images/icon_up.svg') no-repeat 0 0/30px;position: absolute; right:20px;  bottom:20px;}
.nowTotal.up{background:#3c3e4a;}
.nowTotal.down:after{content:""; display:block;width:30px;height:30px; background: url('/images/icon_down.svg') no-repeat 0 0/30px;position: absolute; right:20px;  bottom:20px;}
.total_wrap{display:flex;}
.nowTotal +.nowTotal{margin-top:10px}
.nowTotal.up .labeltext,.nowTotal.up .costValue {color:var(--point-green-color)}
.labeltext{display:block;font-size:15px; font-weight: 400;}
.costValue{font-size:30px; font-weight: 700;}
.costValue em{font-size:20px;}
.comparepay{display:flex;background:#535561; color:#adacb6; border-radius: 15px; justify-content: space-around;}
.compare{flex:1; padding:20px;}
.compare .labeltext{font-size:13px; margin-top:10px;}
.past {display: flex; align-items: center; margin-top:10px}
.past .labeltext{font-size:12px; margin-right:10px;}
.past .costValue{font-size:18px; font-weight: 700;}
.past .costValue em{font-size:14px; font-weight: 700;}
.paytable .ui-chart{min-height: 272px;;}
.pageSearch{background: #f1f1f1; padding:20px; display: flex;align-items: flex-end; justify-content: space-between;}
.search_title{display: flex; align-items: flex-end;}
.thisMonth{display: flex;}
.monthBtn{display: flex;position: relative;top: -7px; margin-left:10px;align-items: flex-end;}
.monthbtn {width:18px; height:18px; background:url('/images/btn-arrow.svg') no-repeat 0 0/18px}
.monthbtn +.monthbtn{margin-left:5px}
.monthbtn.month_next{transform: rotate(-180deg);}
.dateTitle span{display:block; font-size:13px;}
.dateTitle strong{font-size:45px; font-weight:700; letter-spacing: -.5px;}
.pageSearch .flex{align-items: flex-end;}
.thisCom{margin-left:90px;}
.thisCom strong{font-size:26px;}

.searchbths .iconbtn{width:40px; height:40px;}
.select-wrap{position: relative;}
.textbtn-select{padding-right:20px;background:url('/images/icon_select.svg') no-repeat right 24px/13px; cursor: pointer;font-size:26px;}
.btnselectlist{position: absolute; left:0; top:0; border:Solid 1px #ddd; background:#fff; width:max-content; padding:5px 10px; transform: translateY(40px);transition: .2s; z-index: -1; opacity:0; }
.btnselectlist ul{position: relative; }
.btnselectlist ul li{ cursor: pointer; padding:5px 20px; text-align: left; transform: translateY(20px);transition: .4s;opacity:0; }
.btnselectlist ul li:hover{ background:var(--primary-txt-color);; border-radius: 20px;}
.open.select-wrap .btnselectlist{transform: translateY(0px);transition: .3s; z-index: 999;opacity:1;}
.open.select-wrap .btnselectlist ul li{transform: translateY(0px); opacity:1;}
.open.select-wrap .btnselectlist ul li:nth-of-type(1){transition-delay: .2s;}
.open.select-wrap .btnselectlist ul li:nth-of-type(2){transition-delay: .25s;}
.open.select-wrap .btnselectlist ul li:nth-of-type(3){transition-delay: .3s;}
.open.select-wrap .btnselectlist ul li:nth-of-type(4){transition-delay: .35s;}
.open.select-wrap .btnselectlist ul li:nth-of-type(5){transition-delay: .4s;}
.accountCard{border-radius:10px; padding:20px; background:var(--default-txt-color);position: relative;width:250px; height:296px;}
.accountCard:before{content:'';display: block; width:30px; height:30px;background:url('/images/icon_chartbg.svg') no-repeat 0 0/100%; margin-bottom:15px;}
.accountCard .label{font-size:13px; margin-bottom:5px;display: block;  letter-spacing:-1px;}
.accountCard .cardStrong{font-weight: 700; font-size: 18px;}
.totalCount{margin:10px 0;}
.totalCount > strong{font-size: 30px; letter-spacing:-1px;}
.totalCount > strong em{font-size: 20px; letter-spacing:-1px;}
.accountCard .barbox{height:auto; justify-content:flex-start;}
.accountCard .barChart{width: 100%; background:var(--base-wh-color)}
.accountCard .barChart .bar{background:var(--base-txt-color);}
.accountCard .datarate{font-weight: 700; font-size: 15px;}
.totalBar{background:var(--base-txt-color);; margin:10px 0; border-radius:10px; padding:10px 30px; color:var(--point-green-color);}
.BText{font-size:30px; display: inline-block; margin-left:20px}
.BText em{font-size:20px;}
/* accountCard */
.cspCarousel .carousel .accountCard{height:auto; text-align:left; flex-grow:1; background:none}
.cspCarousel .carousel .carousel__viewport li{border-radius:15px;margin-right:20px; border:solid 1px #ddd}
.cspCarousel .carousel .carousel__viewport li:hover{background:var(--point-green-color);}

</style>