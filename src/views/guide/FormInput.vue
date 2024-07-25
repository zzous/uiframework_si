<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/forminput')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>html5 기본 태그로 사용</li>
                <li>부모 태그 필수 사용(<strong class="tagstyle">&lt;div class="formInputbox" &gt;&lt;/div&gt;</strong>) </li>
                <li>디자인 변경 및 태그 확장성이 용이 하도록 <strong class="tagstyle">&lt;label&gt;,&lt;input&gt;</strong>태그 영역 분리 하여 사용</li>
                <li>error메세지 처리는 <strong class="tagstyle">&lt;div class="errormessage"&gt;,&lt;/div&gt;</strong>태그추가 하여 처리함</li>
                <li>부모 태그에 클래스 처리 하여 아이콘, 테이블 형태로 변경 가능(샘플 페이지 참고)</li>
            </ul>
        </div>
        <div class="codewrap" v-for="(item, index) in state.codeSample" :key="index">
            <div :class="['codetitle', state.className]" >
                <span @click="toggleAcc(index)">{{item.title}}</span>
                <button type="button" class="btn btn-ss" @click="copyCode(item.sampleCodeJS)"> <span class="ico-menu"></span> 복사하기</button>
            </div>
            <div :class="['code', item.title]" >
<pre>
<code>
{{ item.sampleCodeJS }}
</code>
</pre>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const props = defineProps({ title: String });
const { goToPage } = useCommFunc();
const state = reactive({
    className: '',
    codeSample: [
        {
            title: 'HTML',
            sampleCodeJS: ` <!-- 라벨텍스트 위치 or 배경색 변경 시 labelleft, bg클래스 추가, 에러 문구 설정 error 클래스 추가 -->
<div class="formInputbox labelleft">
    <div class="labelbox">
        <label for="input1">텍스트 입력</label>
    </div>
    <!-- 아이콘 추가시 icon 클래스 추가 -->
    <div class="inputbox text icon">
        <input type="text" placeholder="텍스트를 입력하세요" id="input1">
        <div class="errormessage">error message</div>
    </div>
</div>`
        },
        {
            title: '템플릿에서 컴포넌트로 사용 시',
            sampleCodeJS: `<!-- 
    :label: 텍스트(String)
    :placeholder: 설명 가이드 문구(String)
    :id: input id(String)
    :icon: icon 유무(Boolean)  Default = false 
    true가 아니면 작성하지 않아도 됨 
    :single: input 단독 사용(Boolean)  Default = false 
    true가 아니면 작성하지 않아도 됨
    :error: 에러메세지(String)
    에러처리는 템플릿에서 정의 하여 사용
    :value = input value
    input value 값 필수
    :className: 클래스(String, array)
    single인 경우 클래스는 error만 넣음
-->
<TextInput
    :label="'텍스트 입력'"
    :placeholder="'텍스트를 입력하세요'"
    :id="'input1'"
    :icon="true"
    :single="false"
    :error="'다시 입력해 주세요'"
    :value = "state.inputType1.value"
    :className="['labelleft', 'bg', {error:state.inputType1.error}]"
    @setValue = setValue
/>
\<script setup>
import { reactive, watch } from 'vue';
const state = reactive({
    fileNum: null,
    fileList: [],
    inputType1: {
        value: '123',
        error: false
    },
});
/**
 * @input 에러체크
 */
watch(state, () => {
    state.inputType1.value.length > 5 ? state.inputType1.error = true : state.inputType1.error = false;
});
/**
 * @input value upDate
 */
const setValue = (value) => {
    console.log(value);
    state.inputType1.value = value;
};
<\/script>`
        },
        {
            title: 'VUE COMPONENT',
            sampleCodeJS: `<template>
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
\<script setup>
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

<\/script>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `inputbox{position: relative;}
.inputbox.text input[type="text"]{width:100%;height: 30px;padding: 6px 10px;border-radius: 5px;border:solid 1px #ddd; line-height:28px}
.inputbox.text input[type="text"]:disabled{background: #F7F9FA;}
.inputbox.text input[type="text"]:hover, .inputbox.text input[type="text"]:focus{border-color:var(--point-txt-color)}
.inputbox.text.icon:after{content:''; display:block;width:20px; height:20px; position: absolute; left:3px; top:5px;
background:url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none'
 xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.9165 11.6666H12.2581L12.0248 11.4416C13.0248 10.275 13.5415 8.68331 13.2581 6.99164C12.8665 4.67497 10.9331 2.82497 8.59979 2.54164C5.07479 2.10831 2.10812 5.07497 2.54146 8.59997C2.82479 10.9333 4.67479 12.8666 6.99146 13.2583C8.68312 13.5416 10.2748 13.025 11.4415 12.025L11.6665 12.2583V12.9166L15.2081 16.4583C15.5498 16.8 16.1081 16.8 16.4498 16.4583C16.7915 16.1166 16.7915 15.5583 16.4498 15.2166L12.9165 11.6666ZM7.91646 11.6666C5.84146 11.6666 4.16646 9.99164 4.16646 7.91664C4.16646 5.84164 5.84146 4.16664 7.91646 4.16664C9.99146 4.16664 11.6665 5.84164 11.6665 7.91664C11.6665 9.99164 9.99146 11.6666 7.91646 11.6666Z' fill='%23444444'/%3E%3C/svg%3E") no-repeat}
.inputbox.text.icon input{padding-left:23px}
.labelleft .inputbox.text.icon:after { left: 3px; top: 5px; } 
.labelleft.bg .inputbox.text.icon:after { left: 20px; top: 15px; }
.formInputbox .labelbox{font-size:12px; margin-bottom:5px;}
.formInputbox.error .inputbox.text input[type="text"]{border-color:var(--error-color)}
.formInputbox .errormessage{color:var(--error-color); font-size:12px; padding-left:16px; margin-top:7px;background: url('/images/error_outline.svg') no-repeat left center; display: none;}
.formInputbox.error .errormessage{display:block}
.formInputbox.labelleft{display:flex;align-items: center;}
.formInputbox.labelleft .labelbox{flex:0 0 130px; font-size:14px;}
.formInputbox.labelleft.bg{height:100%;}
.formInputbox.labelleft.bg .labelbox{background:#eee; margin-bottom:0; align-self: stretch; display: flex; align-items: center; justify-content: center; padding:10px 0;}
.formInputbox.labelleft.bg .inputbox.text{width:100%;padding:10px 20px 10px 15px}
.formtable .formtable-col{border:solid 1px #ddd}
.formtable.half {display: flex; }
.formtable.half .formtable-col{flex:1 1 auto}
.formtable.half .formtable-col:nth-of-type(odd){border-right:none}`
        }
    ]
});
const toggleAcc = (idx) => {
    const tag = document.getElementsByClassName('codewrap');
    tag[idx].classList.contains('up') ? tag[idx].classList.remove('up') : tag[idx].classList.add('up');
};
const copyCode = (code) => {
    navigator.clipboard.writeText(code)
        .then(() => {
            alert('코드가 클립보드에 복사되었습니다.');
        })
        .catch((err) => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
};

</script>

