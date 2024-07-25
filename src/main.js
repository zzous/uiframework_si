
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { AgGridVue } from 'ag-grid-vue3';
import VueUniversalModal from 'vue-universal-modal';
import VueDatePicker from '@vuepic/vue-datepicker';
import PageNavigation from '@/components/PageNavigation.vue';
import CardBox from '@/components/CardBox.vue';
import BarChart from '@/components/BarChart.vue';
import BarChartHor from '@/components/BarChartHor.vue';
import donutChart from '@/components/donutChart.vue';
import $Modal from '@/plugins/modal';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import '@/plugins/toasted';
import 'vue3-toastify/dist/index.css';
/** @emitter */
import eventBus from '@/core/eventBus';
window.emitter = eventBus;
/** @moment */
import dayjs from 'dayjs';

/** @request */
import request from '@/core/request';
window.$api = request;

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueUniversalModal, { teleportTarget: '#modals' });
app.use(dayjs);
app.provide('$Modal', $Modal);
app.provide('dayJS', dayjs);
app.use(Carousel);
app.component('DatePicker', VueDatePicker);
app.component('PageNavigation', PageNavigation);
app.component('CardBox', CardBox);
app.component('BarChart', BarChart);
app.component('BarChartHor', BarChartHor);
app.component('donutChart', donutChart);
app.component('AgGridVue', AgGridVue);
app.component('Carousel', Carousel);
app.component('Slide', Slide);
app.component('Navigation', Navigation);
app.component('Pagination', Pagination);
app.mount('#app');
