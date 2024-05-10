import { createRouter, createWebHistory } from 'vue-router';
const withPrefix = (prefix, routes) => routes.map(route => {
    route.path = prefix + route.path;
    return route;
});

const routes = [
    {

        redirect: '/section',
        name: 'layout',
        component: () => import('@/components/Layout.vue'),
        children: [
            {
                path: '/section',
                name: 'SectionPage',
                component: () => import('@/views/sample/SectionPage.vue')

            },
            ...withPrefix('/tab', [
                {
                    path: '/',
                    name: 'TabPage',
                    component: () => import('@/views/sample/TabPage.vue')
                },
                {
                    name: 'TabPage_sub',
                    path: '/:tabid',
                    component: () => import('@/views/sample/TabPage.vue')
                }
            ]),
            {
                path: '/table',
                name: 'TablePage',
                component: () => import('@/views/sample/TablePage.vue')
            },
            {
                path: '/title',
                name: 'TitlePage',
                component: () => import('@/views/sample/TitlePage.vue')

            }
        ]
    },
    {
        path: '/guide',
        name: 'guide',
        component: () => import('@/views/guide/Index.vue')
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});


router.beforeEach(async (to, from, next) => {
    /* 라우터 전처리
    * to:  이동할 URL정보가 담긴 라우터 객체
    * from: 현재 URL정보가 담긴 라우터 객체
    * next : from 에서 to로 이동하기 위해 호출 되야 하는 함수, next()가 호출되기 전에는 이동하지 않음.
    */
    console.log('from ==>', from.fullPath);
    console.log('to ==>', to.fullPath);
    next();
});
export default router;