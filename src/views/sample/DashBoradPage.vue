<template>
    <div class="pageView">
        <div style="position: relative;">
            
            <div class="mainCardBox">
                <Carousel class="subpageslider" :breakpoints="state.breakpoints" ref="myCarousel">
                    <template v-for="(item, index) in state.mainlist" :key="index">
                        <Slide v-for="(cloudKey, idx) in Object.keys(item).filter(key => key !== 'resourceType' && item[key])" :key="idx">
                            <div v-if="item[cloudKey] || item[cloudKey] !== null" class="mainCard"
                                :class="[
                                    { vs: item.resourceType === 'virtualServer' },
                                    { bl: item.resourceType === 'blockStorage' },
                                    { vp: item.resourceType === 'vpc' },
                                    { sb: item.resourceType === 'subnet' }
                                ]"
                            >
                                <span class="typeLabel">{{ item.resourceType }}</span>
                                <div class="resourcesummary">
                                    <div class="cloudName">
                                        <span>{{ cloudKey }}</span>
                                        <strong>{{ cloudKey }}</strong>
                                    </div>
                                    <div class="flex">
                                        <div class="cloudNum">
                                            <span>count</span>
                                            <strong>{{ item[cloudKey].totalCount }}<em>EA</em></strong>
                                        </div>
                                        <div class="cloudNum">
                                            <span>totalSize</span>
                                            <strong>{{ item[cloudKey].totalSize }}<em v-if="item[cloudKey].sizeUnit">{{ item[cloudKey].sizeUnit }}</em></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    </template>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance, shallowRef } from 'vue';
const state = reactive({
    mainlist: [
        {
            'resourceType': 'virtualServer',
            'gcp': {
                'totalCount': 9,
                'totalSize': 0,
                'sizeUnit': null
            },
            'nhn': {
                'totalCount': 2,
                'totalSize': 0,
                'sizeUnit': null
            },
            'aws': {
                'totalCount': 2,
                'totalSize': 0,
                'sizeUnit': null
            },
            'naver': {
                'totalCount': 2,
                'totalSize': 0,
                'sizeUnit': null
            },
            'azure': null
        },
        {
            'resourceType': 'blockStorage',
            'gcp': {
                'totalCount': 17,
                'totalSize': 436,
                'sizeUnit': 'GB'
            },
            'nhn': {
                'totalCount': 2,
                'totalSize': 40,
                'sizeUnit': null
            },
            'aws': {
                'totalCount': 2,
                'totalSize': 40,
                'sizeUnit': 'GiB'
            },
            'naver': {
                'totalCount': 2,
                'totalSize': 100,
                'sizeUnit': 'GB'
            },
            'azure': null
        },
        {
            'resourceType': 'vpc',
            'gcp': {
                'totalCount': 4,
                'totalSize': 0,
                'sizeUnit': null
            },
            'nhn': {
                'totalCount': 3,
                'totalSize': 0,
                'sizeUnit': null
            },
            'aws': {
                'totalCount': 29,
                'totalSize': 0,
                'sizeUnit': null
            },
            'naver': {
                'totalCount': 4,
                'totalSize': 0,
                'sizeUnit': null
            },
            'azure': null
        },
        {
            'resourceType': 'subnet',
            'gcp': {
                'totalCount': 43,
                'totalSize': 0,
                'sizeUnit': null
            },
            'nhn': {
                'totalCount': 4,
                'totalSize': 0,
                'sizeUnit': null
            },
            'aws': {
                'totalCount': 56,
                'totalSize': 0,
                'sizeUnit': null
            },
            'naver': {
                'totalCount': 12,
                'totalSize': 0,
                'sizeUnit': null
            },
            'azure': null
        },
        {
            'resourceType': 'cluster',
            'gcp': null,
            'nhn': null,
            'aws': null,
            'naver': null,
            'azure': null
        }
    ],
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
    }
});

</script>

<style>
.mainCardBox{padding:0 60px 0 40px}
.mainCardBox .carousel__viewport{border-radius:10px;}
.mainCardBox .carousel__prev{ left:-50px}
.mainCardBox .carousel__next{ right:-50px}
.carousel__slide{background:#fff;padding:0 100px 20px 20px;border-radius:10px; position: relative; overflow: hidden;margin-right:20px}
.mainCard::before{content:""; display:block; height:10px; width:100%; background:#dcfc34; position: absolute; left:0; top:0;}
.typeLabel{display: inline-block; background:#dcfc34; height:22px;margin-top:10px; padding:0 13px; border-radius:0 0 5px 5px;font-size:12px;font-weight:700; line-height:22px; text-align: center;}
.mainCard.bl::before, .mainCard.bl .typeLabel {background:#21e8e4;}
.mainCard.vp::before, .mainCard.vp .typeLabel {background:#5142b2;}
.mainCard.sb::before, .mainCard.sb .typeLabel {background:#189f92;}
.mainCard.vp .typeLabel,.mainCard.sb .typeLabel{color:#fff}
.resourcesummary{margin-top:20px; }
.resourcesummary:after{content:""; display:block; width:60px; height:60px; background: url('/images/icon-serve.svg') no-repeat 0 0/ 60px; position: absolute; right:20px; bottom:20px; }
.resourcesummary strong{font-size: 35px;}
.resourcesummary span{font-size: 15px;;}
.resourcesummary strong, .resourcesummary span{display:block}
.cloudName strong{line-height:22px}
.cloudNum{margin-top:10px;;}
.cloudNum strong, .cloudNum span{display:inline-block}
.cloudNum strong{font-size:20px; margin-left:10px;}
.cloudNum strong em{font-size:13px}
.cloudNum +.cloudNum{margin-left:10px}
.carousel .mainCard{height: auto; text-align: left; flex-grow: 1; width:180px}
</style>