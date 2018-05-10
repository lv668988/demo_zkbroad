// 首页
import Home from '../../views/home/home'
// 系统
import role from './system/role'
import menu from './system/menu'
import log from './system/log'
import sysIndex from './system/sysIndex'
// 内容管理
import artic from './content/artic'
import comment from './content/comment'
import report from './content/report'
import contentIndex from './content/contentIndex'
// 用户管理
import addUser from './user/addUser'
import activeUser from './user/activeUser'
import userIndex from './user/userIndex'
// 统计分析
import activeAna from './count/activeAna'
import churn from './count/churn'
import retention from './count/retention'
import timeAna from './count/timeAna'
import startAdd from './count/startAdd'
import countIndex from './count/countIndex'

import Login from '../../views/login/login'
import Abstract from '../../views/layout/abstract'
// import Table from '../../views/table/table'

//import childIndex from '@/components/routeChild/childIndex'

export const attendRoute = [{
        title: '首页',
        path: '/attendance/home',
        name: 'attendance',
        icon: 'fa fa-home fa-lg',
        component: Home
    },
    {
        path: '/attendance/content',
        name: 'content',
        title: "内容管理",
        icon: 'fa fa-quora fa-lg',
        component: Abstract,
        children: [{
            path: 'artic',
            title: "文章管理",
            component: artic,
            icon: 'fa fa-quora',
            name: 'artic'
        }, {
            path: 'comment',
            title: "评论管理",
            component: comment,
            icon: 'fa fa-area-chart',
            name: 'comment',
        }, {
            path: 'report',
            title: "人员管理",
            component: report,
            icon: 'fa fa-chain-broken',
            name: 'report',
        }]
    },
    {
        title: '用户管理',
        path: '/attendance/user',
        name: 'user',
        icon: 'fa fa-home fa-lg',
        component: Abstract,
        children: [{
                title: '新增用户',
                name: 'addUser',
                path: 'addUser',
                icon: 'fa fa-home fa-lg',
                component: Login
            },
            {
                title: '活跃用户',
                name: 'activeUser',
                path: 'activeUser',
                icon: 'fa fa-home fa-lg',
                component: activeUser
            }
        ]
    },
    {
        title: '统计分析',
        path: '/count/statistics',
        name: 'count',
        icon: 'fa fa-home fa-lg',
        component: Abstract,
        children: [{
                title: '新增和启动',
                name: 'startAdd',
                path: 'new',
                icon: 'fa fa-home fa-lg',
                component: startAdd
            },
            {
                title: '活跃分析',
                name: 'activeAna',
                path: 'activeAna',
                icon: 'fa fa-home fa-lg',
                component: activeAna
            },
            {
                title: '时段分析',
                name: 'timeAna',
                path: 'timeAna',
                icon: 'fa fa-home fa-lg',
                component: timeAna
            },
            {
                title: '用户留存',
                name: 'retention',
                path: 'retention',
                icon: 'fa fa-home fa-lg',
                component: retention
            },
            {
                title: '流失用户',
                name: 'churn',
                path: 'churn',
                icon: 'fa fa-home fa-lg',
                component: churn
            }
        ]
    },
    {
        path: '/attendance/sys',
        name: 'sys',
        title: "系统",
        icon: 'fa fa-quora fa-lg',
        component: Abstract,
        children: [{
            path: 'role',
            title: "角色",
            component: role,
            icon: 'fa fa-quora',
            name: 'role'
                // children: [{
                //     path: 'roleMenu/:roleId',
                //     props: true,
                //     title: "系统",
                //     name: 'roleMenu',
                //     component: roleMenu,
                // }]
        }, {
            path: 'menu',
            title: "菜单管理",
            component: menu,
            icon: 'fa fa-area-chart',
            name: 'menu',
        }, {
            path: 'log',
            title: "日志",
            component: log,
            icon: 'fa fa-chain-broken',
            name: 'log',
        }]
    }
];