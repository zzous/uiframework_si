<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <!-- <button type="button" class="btn-sample" @click="goToPage('/dashboard')">샘플페이지 보기</button> -->
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memolist">
                <li> ckeditor5-vue  무료 버전<a href="https://ckeditor.com/" target="_blank" class="link">(https://ckeditor.com/)</a></li>
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
            title: '템플릿에서 사용 시',
            sampleCodeJS: `<!-- 
    :editorCon: 에디터내용(String)
    @changeEditorCon 저장
-->
<editor :editorCon="state.editorCon" @changeEditorCon = onChangeEditor></editor>
\<script setup>
import { reactive } from 'vue';
import editor from '@/components/CkEditor.vue';
import { initializeEditor } from '@/core/helper/editor.js';
let editor = null;
onMounted(async () => {
    
    //에디터 초기화 
    editor = await initializeEditor();
    //에디터 데이터 폼 데이터 업데이트 
    editor.setData(state.contents);
    editor.model.document.on('change', () => {
        state.contents = editor.getData();
    });
});
const state = reactive({
    editorCon: '에디터 내용'
});
<\/script>`
        },
        {
            title: 'editor.js',
            sampleCodeJS: `
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
const formData = new FormData();
export class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then((file) => {
            return new Promise((resolve, reject) => {
                this._initListeners(resolve, reject, file);
            });
        });
    }

    async _initListeners(resolve, reject, file) {

        formData.append('file', file);
        console.log('> formData', file);
        const response = await _uploadEditFile(formData);
        console.log(response);
        // return response;
        resolve({
            default: response.data
        });

    }
}
/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
// 
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
// import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import {
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, ListProperties } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { SpecialCharacters } from '@ckeditor/ckeditor5-special-characters';
import {
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar
} from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
export const initializeEditor = async () => {
    try {
        const editor = await ClassicEditor
            .create(document.querySelector('.editor_container'), {
                plugins: [
                    Alignment,
                    BlockQuote,
                    Bold,
                    Essentials,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    GeneralHtmlSupport,
                    Heading,
                    HorizontalLine,
                    Image,
                    //ImageCaption,
                    //ImageResize,
                    //ImageStyle,
                    //ImageToolbar,
                    ImageUpload,
                    Indent,
                    Italic,
                    Link,
                    List,
                    ListProperties,
                    MediaEmbed,
                    Paragraph,
                    PasteFromOffice,
                    SourceEditing,
                    Strikethrough,
                    Table,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TextTransformation,
                    Underline,
                    WordCount
                ],
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'fontFamily',
                        'fontSize',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'strikethrough',
                        'underline',
                        'link',
                        'horizontalLine',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'alignment',
                        'outdent',
                        'indent',
                        '|',
                        'imageUpload',
                        'blockQuote',
                        'insertTable',
                        'undo',
                        'redo',
                        '|',
                        'sourceEditing'
                    ]
                },
                language: 'ko',
                image: {
                    toolbar: [
                        'imageTextAlternative',
                        'toggleImageCaption',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableCellProperties',
                        'tableProperties'
                    ]
                },
                extraPlugins: [
                    function (editor) {
                        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                            return new UploadAdapter(loader);
                        };
                    }
                ],
                htmlSupport: {
                    allow: [
                        {
                            name: /.*/,
                            attributes: true,
                            classes: true,
                            styles: true
                        }
                    ]
                }

            })
            .then(editor => {
                console.log(editor);
                return editor;
            })
            .catch(editor => {
                console.log(editor);
            });
        return editor;
    } catch (error) {
        throw error;
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

