// 路由配置
export default [
    // 重定向
    {
        path: '',
        redirect: '/home'
    },
    {
        name: '',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        name: '',
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        name: '',
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: {
            show: true
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuId?',
        component: () => import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            show: true
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            show: true
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            show: true
        },
        // 独享路由守卫
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            show: true
        }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            show: true
        },
        children: [
            {
                path: '/center',
                redirect: '/center/myorder'
            },
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            }
        ]
    },
    {
        name: 'communication',
        path: '/communication',
        component: () => import('@/pages/Communication'),
        meta: {
            show: false
        },
        children: [
            {
                path: 'eventtest',
                component: () => import('@/pages/Communication/EventText/EventTest')
            },
            {
                path: 'modetest',
                component: () => import('@/pages/Communication/ModeTest/ModeTest')
            },
            {
                path: 'synctest',
                component: () => import('@/pages/Communication/SyncTest/SyncTest')
            },
            {
                path: 'attrslistenerstest',
                component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest')
            },
            {
                path: 'childrenparenttest',
                component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest')
            },
            {
                path: 'scopeslottest',
                component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest')
            }
        ]
    }
]