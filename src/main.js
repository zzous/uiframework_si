
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { AgGridVue } from 'ag-grid-vue3';
import VueUniversalModal from 'vue-universal-modal';
import VueDatePicker from '@vuepic/vue-datepicker';
import PageNavigation from '@/components/PageNavigation.vue';
import $Modal from '@/plugins/modal';
import '@/plugins/toasted';
import 'vue3-toastify/dist/index.css';
/** @emitter */
import eventBus from '@/core/eventBus';
window.emitter = eventBus;
/** @moment */
import dayjs from 'dayjs';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueUniversalModal, { teleportTarget: '#modals' });
app.use(dayjs);
app.provide('$Modal', $Modal);
app.provide('dayJS', dayjs);
app.component('DatePicker', VueDatePicker);
app.component('PageNavigation', PageNavigation);
app.component('AgGridVue', AgGridVue);
app.mount('#app');
