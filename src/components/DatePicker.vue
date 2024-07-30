<template>
    <div class="flex align-center">
        <div class="radio-group btn-group" v-if="state.optionsType">
            <template v-for="(item, index) in state.selectDayValue" :key="index">
                <span class="radio" @change="setFromDate(item.value)">
                    <input :id="'dateType' + index" v-model="state.dayType" :value="item.value" name="dategroup"
                        type="radio">
                    <label :for="'dateType' + index">{{ item.label }}</label>
                </span>
            </template>
            <span class="radio" @click="setFromDate('self')">
                <input id="self" v-model="state.self" name="dategroup" type="radio" value="직접입력">
                <label for="self">직접입력</label>
            </span>
        </div>
        <div class="ui-datepicker-range ml-10">
        <template v-if="!state.singleType">
            <div class="ui-datepicker">
                <DatePicker :disabled="state.pickerStatus" :enable-time-picker="false" :format="state.dateFormat"
                    :model-value="pickerData.date.from" locale="ko" @update:model-value="setFromDate" />
            </div>
            <span class="ui-coupler">~</span>
        </template>
            <div class="ui-datepicker">
                
                <DatePicker :disabled="state.pickerStatus" :enable-time-picker="false" :format="state.dateFormat"
                    :model-value="pickerData.date.to" locale="ko" @update:model-value="setToDate" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, computed, ref } from 'vue';
const props = defineProps(
    {
        setDay: Object,
        dayOpionType: String,
        optionsType: {
            type: Boolean,
            default: true,
            description: ' 버튼 여부'
        },
        singleType: {
            type: Boolean,
            default: false,
            description: '피커하나만 사용'
        }

    });
const emit = defineEmits(['selectDay']);
const state = reactive({
    dateFormat: 'yyyy-MM-dd',
    pickerStatus: true,
    setDay: new Date(),
    dayOpionType: computed(() => props.dayOpionType),
    optionsType: computed(() => props.optionsType),
    singleType: computed(() => props.singleType),
    /**
        * @type-1 { 1년, 6개월, 1개월, 1주일, 당일 }
    */
    selectDayValue: [
        { label: '1년', value: 'year' },
        { label: '6개월', value: 'month6' },
        { label: '1개월', value: 'month' },
        { label: '일주일', value: 'week' },
        { label: '당일', value: 'day' }
    ],
    dayType: '',
    self: ''
});
const pickerData = ref({
    date: {
        from: null,
        to: state.setDay
    }
});
onMounted(() => {
    initDate();
});
/**
    * @init 초기값 설정
*/
const initDate = () => {
    state.singleType ? setToDate(pickerData.value.date.to) : setFromDate(state.dayOpionType);
};
/**
     * @start
    * 시작일
    * @value { 1년:year, 6개월:month6, 1개월:month, 1주일:week, 당일:day }
*/
const setFromDate = (value) => {
    const day = state.setDay.getTime();
    state.dayType = value;
    state.optionsType ? state.pickerStatus = true : state.pickerStatus = false;
    switch (value) {
        case 'year' :
            pickerData.value.date.from = day - 3600 * 1000 * 24 * 365;
            break;
        case 'month6' :
            pickerData.value.date.from = day - 3600 * 1000 * 24 * 180;
            break;
        case 'month' :
            pickerData.value.date.from = day - 3600 * 1000 * 24 * 30;
            break;
        case 'week' :
            pickerData.value.date.from = day - 3600 * 1000 * 24 * 7;
            break;
        case 'day' :
            pickerData.value.date.from = day - 3600 * 1000 * 24;
            break;
        case 'self' :
            state.pickerStatus = false;
            break;
        default :
            pickerData.value.date.from = value;
            state.pickerStatus = false;
    }
    emit('selectDay', pickerData.value.date.from, pickerData.value.date.to);
};
/**
    * @start
    * 종료일
*/
const setToDate = (value) => {
    state.pickerStatus = false;
    pickerData.value.date.to = value;
    emit('selectDay', pickerData.value.date.from, pickerData.value.date.to);
};


</script>