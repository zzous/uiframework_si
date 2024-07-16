<template>
    <div class="pageView">
        <div style="position: relative;">
            
            <div class="mainCardBox">
                <Carousel class="subpageslider" :breakpoints="state.breakpoints" ref="myCarousel" :wrapAround="true" :transition="500">
                    <template v-for="(item, index) in state.mainCardlist" :key="index">
                        <Slide v-for="(cloudKey, idx) in Object.keys(item).filter(key => key !== 'resourceType' && item[key])" :key="idx" :class="{active:idx === state.childNum && index === state.parentNum}" @click="onChangeCard(idx, index, cloudKey, item)">
                            <div v-if="item[cloudKey]" class="mainCard"
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
                                        <span>cloudType</span>
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
            <div class="mainListBox">
                <h1>
                    <span class="title"><em>{{state.cloudKey}}</em>{{ state.resourceType }}</span>
                    <span class="subtext">총 {{state.listnum}} 개의 자원이 있습니다.</span>
                </h1>
                <div class="listbox" ref="list">
                    <div class="listheader">
                        <div class="cellIcon"></div>
                        <div class="listCell">계정</div>
                        <div class="listCell">리전</div>
                        <div class="cellTitle">인스턴스 명</div>
                        <div class="listCell wide">인스턴스 ID</div>
                        <div class="listCell">상태</div>
                        <div class="listCell wide">OS</div>
                        <div class="listCell">인스턴스 유형</div>
                        <div class="listCell">IP</div>
                        <div class="listCell">생성일시</div>
                    </div>
                    <div class="listline" v-for="(item, index) in state.mainlist.slice(0, state.listnum)" :key="index">
                        <div class="cellIcon"><img src="/images/icon-box.svg" style="width:20px"/></div>
                        <div class="listCell">{{ item.accountId }}</div>
                        <div class="listCell">{{ item.regionCode }}</div>
                        <div class="cellTitle">{{ item.vmName }}</div>
                        <div class="listCell wide">{{ item.vmId }}</div>
                        <div class="listCell">
                            <template v-if="item.status === 'RUNNING'"><button type="button" class="btn btn-sm"><span class="ico-used"></span>사용중</button></template>
                            <template  v-if="item.status === 'SUSPENDED'"><button type="button" class="btn btn-sm"><span class="ico-pause"></span>중지</button></template>
                            <template  v-if="item.status === 'TERMINATED'"><button type="button" class="btn btn-sm"><span class="ico-stop"></span>종료</button></template>
                        </div>
                        <div class="listCell wide">{{ item.guestOs }}</div>
                        <div class="listCell">{{ item.vmType }}</div>
                        <div class="listCell">{{ item.privateIpAddress }}</div>
                        <div class="listCell">{{ item.createdAt }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance, shallowRef, ref, nextTick } from 'vue';
const state = reactive({
    mainCardlist: [
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
    mainlist: [
        {
            'virtualServerIdx': 2410,
            'vmId': '3085237799658311229',
            'vmName': 'instance-20240711-235437',
            'vmType': 'e2-micro',
            'status': 'RUNNING',
            'guestOs': 'debian-12-bookworm-v20240709',
            'vmHostName': null,
            'regionCode': 'us-central1',
            'privateIpAddress': '10.128.15.198',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': null,
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-07-12T08:54:58',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2416,
            'vmId': '2829623233352476865',
            'vmName': 'gke-m-cluster-default-pool-aa64280d-vbeg',
            'vmType': 'e2-medium',
            'status': 'RUNNING',
            'guestOs': null,
            'vmHostName': null,
            'regionCode': 'asia-northeast3',
            'privateIpAddress': '10.178.15.221',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': null,
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-07-05T06:37:50',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2412,
            'vmId': '1992105920597502872',
            'vmName': 'gke-m-cluster-default-pool-ddf98f4c-35zm',
            'vmType': 'e2-medium',
            'status': 'RUNNING',
            'guestOs': null,
            'vmHostName': null,
            'regionCode': 'asia-northeast3',
            'privateIpAddress': '10.178.15.220',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': null,
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-07-05T06:34:47',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2418,
            'vmId': '1814803627599637107',
            'vmName': 'gke-m-cluster-default-pool-6a781161-t7bv',
            'vmType': 'e2-medium',
            'status': 'RUNNING',
            'guestOs': null,
            'vmHostName': null,
            'regionCode': 'asia-northeast3',
            'privateIpAddress': '10.178.15.219',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': null,
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-07-05T06:31:09',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2411,
            'vmId': '3447744532771785742',
            'vmName': 'test-instance-03',
            'vmType': 'f1-micro',
            'status': 'RUNNING',
            'guestOs': null,
            'vmHostName': null,
            'regionCode': 'us-central1',
            'privateIpAddress': '10.128.15.197',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': null,
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-07-04T09:54:57',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2417,
            'vmId': '6091627976718832530',
            'vmName': 'test-instance-02',
            'vmType': 'e2-micro',
            'status': 'SUSPENDED',
            'guestOs': 'centos-stream-9-v20240613',
            'vmHostName': null,
            'regionCode': 'asia-northeast3',
            'privateIpAddress': '10.178.15.218',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': 'key-38393917-53b30b3d56d7',
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-07-04T09:31:58',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2415,
            'vmId': '2004250786747283908',
            'vmName': 'test-instance-01',
            'vmType': 'e2-medium',
            'status': 'TERMINATED',
            'guestOs': 'debian-12-bookworm-v20240617',
            'vmHostName': null,
            'regionCode': 'asia-northeast3',
            'privateIpAddress': '10.178.15.214',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': null,
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-06-20T15:07:40',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2414,
            'vmId': '2423432009924523390',
            'vmName': 'log-vm',
            'vmType': 'e2-medium',
            'status': 'RUNNING',
            'guestOs': 'debian-12-bookworm-v20240617',
            'vmHostName': null,
            'regionCode': 'asia-northeast3',
            'privateIpAddress': '10.178.15.213',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': null,
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-06-18T13:22:42',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
        },
        {
            'virtualServerIdx': 2413,
            'vmId': '980256276150382106',
            'vmName': 'instance-20240611-041953',
            'vmType': 'e2-micro',
            'status': 'RUNNING',
            'guestOs': 'centos-7-v20240515',
            'vmHostName': null,
            'regionCode': 'asia-northeast3',
            'privateIpAddress': '10.178.15.207',
            'privateDnsName': '',
            'publicDnsName': '',
            'publicIpAddress': null,
            'keyName': 'key-9f34ef35-25f8c4a44931',
            'cloudType': 'GCP',
            'serviceGroupUuid': '3d1835d9-fdac-480f-9050-10bf8a58b49f',
            'accountId': 'gcp-account1',
            'createdAt': '2024-06-11T13:22:13',
            'companyUuid': '77eeb5a5-d08d-49b6-a7fe-e15a941a9607',
            'tagList': null
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
            itemsToShow: 5.5,
            snapAlign: 'start'
        }
    },
    parentNum: 0,
    childNum: 0,
    cloudKey: 'GCP',
    resourceType: 'VirtualServer',
    listnum: 9

});
const list = ref(null);
const onChangeCard = (index, idx, cloudKey,  con) => {
    document.querySelector('.mainListBox').classList.remove('ani');
    document.querySelector('.listbox').classList.remove('ani');
    setTimeout(() => {
        
        // if (eleClass) {
        //     eleClass.remove('ani');
        // } else {
        //     eleClass.add('ani');
        // }
        document.querySelector('.mainListBox').classList.add('ani');
        document.querySelector('.listbox').classList.add('ani');
       
    }, 800); // 0.3초 딜레이

    state.parentNum = idx;
    state.childNum = index;
    state.cloudKey = cloudKey;
    state.resourceType = con.resourceType;
    state.listnum = con[cloudKey].totalCount;
};
const aniMotion = () => {
    setTimeout(() => {
      
        document.querySelector('.mainListBox').classList.add('ani');
        document.querySelector('.mainCardBox').classList.add('ani');
        setTimeout(() => {
            const eleClass = list.value.classList;
            list.value.classList.add('ani');
        }, 300); // 0.3초 딜레이
    }, 500); // 0.3초 딜레이
};
onMounted(() => {
    nextTick(() => {
        
        aniMotion();
    });
    
    
});

</script>

<style>
.mainCardBox{padding: 60px 60px 160px 60px; margin-top: 40px; margin-right: 30px; background: #202020;}
.mainCardBox .carousel__viewport{border-radius:10px;}
.mainCardBox .carousel__prev{ left:-50px;}
.mainCardBox .carousel__next{ right:-50px}
.mainCardBox .carousel__prev svg, .mainCardBox .carousel__next svg{ background:#fff}

.carousel__slide{background:#fff;padding:0 100px 20px 20px;border-radius:10px; position: relative; overflow: hidden;margin-right:20px}
.mainCard::before{content:""; display:block; height:10px; width:100%; background:#dcfc34; position: absolute; left:0; top:0;}
.typeLabel{display: inline-block; background:#dcfc34; height:22px; padding:0 13px; border-radius:0 0 5px 5px;font-size:12px;font-weight:700; line-height:22px; text-align: center;position: absolute; left:20px; top:10px}
.mainCard.bl::before, .mainCard.bl .typeLabel {background:#21e8e4;}
.mainCard.vp::before, .mainCard.vp .typeLabel {background:#5142b2;}
.mainCard.sb::before, .mainCard.sb .typeLabel {background:#189f92;}
.mainCard.vp .typeLabel,.mainCard.sb .typeLabel{color:#fff}
.resourcesummary{margin-top:40px; }
.resourcesummary:after{content:""; display:block; width:60px; height:60px; background: url('/images/icon-serve.svg') no-repeat 0 0/ 60px; position: absolute; right:20px; bottom:20px; }
.resourcesummary strong{font-size: 35px;}
.resourcesummary span{font-size: 15px;;}
.resourcesummary strong, .resourcesummary span{display:block}
.cloudName strong{line-height:27px}
.cloudNum{margin-top:10px;;}
.cloudNum strong, .cloudNum span{display:inline-block}
.cloudNum strong{font-size:20px; margin-left:10px;}
.cloudNum strong em{font-size:13px}
.cloudNum +.cloudNum{margin-left:10px}
.carousel .mainCard{height: auto; text-align: left; flex-grow: 1; width:180px}
.mainListBox{margin-top:30px;padding-right:30px;}
.mainListBox > h1{background:#202020; color:#fff; display: flex; padding:20px 30px; justify-content: space-between; align-items: center; margin-bottom:30px}
.mainListBox > h1 .title{font-size:30px;}
.mainListBox > h1 .title em{display: inline-block; font-size:14px; margin-right:10px;}
.mainListBox > h1 .subtext{font-weight:400; font-size:14px;;}
.mainListBox .listCell.wide{flex:1.5}
.mainListBox .listCell .btn-sm{min-width: 75px;display: inline-flex;cursor: none; }
.mainListBox .listCell .btn-sm:hover{background:#fff}
.mainListBox .listline{background: #ddd;}
.carousel__slide.active{background:#3c3e4a}
.carousel__slide.active .resourcesummary span{color:#eee}
.carousel__slide.active .mainCard.vs .resourcesummary strong{color:#dcfc34}
.carousel__slide.active .mainCard.bl .resourcesummary strong{color:#21e8e4}
.carousel__slide.active .mainCard.vp .resourcesummary strong{color:#9c7eff}
.carousel__slide.active .mainCard.sb .resourcesummary strong{color:#189f92}
.mainListBox .carousel__viewport li:hover{background:none;}
.mainListBox .carousel .carousel__viewport li{border:none}
.mainCardBox .carousel__track{perspective: 1000px;}
.carousel__slide--sliding { transition: 0.5s; }

.mainCardBox .carousel__slide{  transition: all .4s ease-in-out;  right:-400px; opacity: 0;transform:  scale(0.5);}
.mainCardBox.ani .carousel__slide{ right:0px;opacity: 1; transform: rotateY(0deg) scale(1);}
.mainCardBox.ani .carousel__slide:nth-of-type(1){transition-delay: .2s;}
.mainCardBox.ani .carousel__slide:nth-of-type(2){transition-delay: .24s;}
.mainCardBox.ani .carousel__slide:nth-of-type(3){transition-delay: .28s;}
.mainCardBox.ani .carousel__slide:nth-of-type(4){transition-delay: .3s;}
.mainCardBox.ani .carousel__slide:nth-of-type(5){transition-delay: .34s;}
.mainCardBox.ani .carousel__slide:nth-of-type(6){transition-delay: .38s;}
.mainCardBox.ani .carousel__slide:nth-of-type(7){transition-delay: .4s;}
.mainCardBox.ani .carousel__slide:nth-of-type(8){transition-delay: .44s;}
.mainCardBox.ani .carousel__slide:nth-of-type(0){transition-delay: .48s;}







.carousel__slide--active { opacity: 1;  }
/* motion */
.mainListBox .listline, .mainListBox .listheader{transform: translateY(-20px); transition: .3s cubic-bezier(0.250, 0.460, 0.450, 0.940);  opacity:0;}
.mainListBox .listbox.ani .listline, .mainListBox .listbox.ani .listheader{transform: translateY(0px);  opacity:1;}
.mainListBox .listheader{transition-delay: .2s;}
.mainListBox .listline:nth-of-type(1){transition-delay: .2s;}
.mainListBox .listline:nth-of-type(2){transition-delay: .22s;}
.mainListBox .listline:nth-of-type(3){transition-delay: .24s;}
.mainListBox .listline:nth-of-type(4){transition-delay: .26s;}
.mainListBox .listline:nth-of-type(5){transition-delay: .28s;}
.mainListBox .listline:nth-of-type(6){transition-delay: .3s;}
.mainListBox .listline:nth-of-type(7){transition-delay: .32s;}
.mainListBox .listline:nth-of-type(8){transition-delay: .34s;}
.mainListBox .listline:nth-of-type(9){transition-delay: .36s;}
.mainListBox .listline:nth-of-type(10){transition-delay: .38s;}

/* .mainListBox > h1{    width: 100%; z-index: 1; ;transition: .5s;min-height:1000px }
.mainListBox.ani > h1{ width: 100%; z-index: 1;min-height: 1px;} */

</style>