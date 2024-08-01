<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <!-- <button type="button" class="btn-sample" @click="goToPage('/dashboard')">샘플페이지 보기</button> -->
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li>헬스케어 사용 기준(2023)</li>
                <li>참고용</li>
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
            title: '.eslintrc.js',
            sampleCodeJS: `/* eslint-env node */
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        // # OFF
        'no-useless-escape': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'arrow-parens': 'off',
        'prefer-const': 'off',
        'no-undef': 'off', // Compatibility
        'no-fallthrough': 'off',
        'no-extra-boolean-cast': 'off',
        'no-useless-catch': 'off',
        'no-irregular-whitespace': 'off',
        'no-prototype-builtins': 'off',
        'no-case-declarations': 'off',
        'no-unused-vars': ['off', {
            'vars': 'local',
            'args': 'none',
            'ignoreRestSiblings': true
        }],
        'no-async-promise-executor': 'off',
        'vue/script-setup-uses-vars': 'off',
        'vue/no-unused-vars': ['off', {
            'ignorePattern': 'Regexp'
        }],
        'vue/no-unused-components': ['off', {
            'ignoreWhenBindingPresent': true
        }],
        // # Default
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'indent': ['error', 4, {
            'SwitchCase': 1,
            'ObjectExpression': 1,
            'MemberExpression': 1,
            'ImportDeclaration': 1,
            'VariableDeclarator': 1,
            'ignoredNodes': [
                'CallExpression > FunctionExpression.callee > BlockStatement.body'
            ],
            'ignoreComments': true
        }],
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': ['error', {
            'before': false,
            'after': true
        }],
        'block-spacing': ['error', 'always'],
        'no-tabs': ['error', {
            'allowIndentationTabs': true
        }],
        'no-empty': ['error', {
            'allowEmptyCatch': true
        }],
        'no-use-before-define': ['error', {
            'functions': false,
            'variables': false
        }],
        'no-trailing-spaces': ['error', {
            'skipBlankLines': true,
            'ignoreComments': true
        }],
        'arrow-spacing': ['error', {
            'before': true,
            'after': true
        }],
        'no-spaced-func': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-unexpected-multiline': 'error',
        'space-in-parens': ['error', 'never', {
            'exceptions': []
        }],
        'space-infix-ops': ['error', {
            'int32Hint': false
        }],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'array-bracket-spacing': ['error', 'never'],
        'func-call-spacing': ['error', 'never'],
        'function-call-argument-newline': ['error', 'consistent'],
        'key-spacing': ['error', {
            'beforeColon': false,
            'afterColon': true
        }],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true
        }],
        'object-property-newline': ['error', {
            'allowMultiplePropertiesPerLine': true
        }]
    }
};`
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

