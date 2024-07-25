<template>
    <div :class="['formInputbox', ...state.classNamesArray]">
        <div class="labelbox" v-if="!state.single">
            <label :for="state.id">{{ state.label }}</label>
        </div>
        <div :class="['inputbox', 'text', {icon:state.icon}]">
            <input type="text" :placeholder="state.placeholder" :id="state.id" v-model="state.updatedValue" @input="onInputValue">
            <div class="errormessage">{{ state.error }}</div>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive, watch } from 'vue';
const props = defineProps({
    label: String,
    placeholder: String,
    id: String,
    error: String,
    icon: Boolean,
    single: Boolean,
    value: [String, Number],
    className: [String, Array]
});
const emit = defineEmits(['setValue']);
const state = reactive({
    label: computed(() => props.label),
    placeholder: computed(() => props.placeholder),
    id: computed(() => props.id),
    error: computed(() => props.error),
    icon: computed(() => props.icon),
    single: computed(() => props.single),
    value: computed(() => { return props.value ? updatedValue = props.value :  updatedValue = ''; }),
    classNamesArray: computed(() => { return Array.isArray(props.className) ? props.className : [props.className]; }),
    updatedValue: props.value || ''
});
/**
    * @input
    * value 업데이트
*/
const onInputValue = () => {
    emit('setValue', state.updatedValue);
};

    
</script>
