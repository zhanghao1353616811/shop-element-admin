<template>
    <el-container class="warp">
        <el-header class="nav-header">
            <div class="login-name">{{$config.logo}}</div>
            <el-menu :default-active="navBar.active" mode="horizontal" text-color="#fff" active-text-color="#ffd04b"
                background-color="#545c64" @select="handTopSel">
                <el-menu-item :index="index|numToString" v-for="(item, index) in navBar.list" :key="item.id">
                    {{item.name}}
                </el-menu-item>
                <el-submenu index="7">
                    <template slot="title">
                        <el-avatar size="small" :src="avatarImg"></el-avatar>
                        <span class="avatar-txt">admin</span>
                    </template>
                    <el-menu-item index="7-1">修改</el-menu-item>
                    <el-menu-item index="7-2">退出</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu class="aside-menu" :default-active="asideActive" text-color="#303133" active-text-color="green"
                    background-color="#fff" @select="handLeftSel">
                    <el-menu-item :index="index|numToString" v-for="(item, index) in asidMenu" :key="item.id">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.asideName}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main-content">
                <el-breadcrumb class="bread-crumb" separator-class="el-icon-arrow-right" v-if="crumbArr.length > 0">
                    <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in crumbArr" :key="index">
                        {{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 主内容 -->
                <router-view></router-view>
                <!-- 返回到顶部 -->
                <el-backtop target=".el-main">
                    <i class="el-icon-top back-top"></i>
                </el-backtop>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import numToString from '@/common/mixins/mixins.js';
    export default {
        name: 'Layout',
        mixins: [numToString],
        data() {
            return {
                avatarImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                navBar: {},
                crumbArr: []
            }
        },
        watch: {
            '$route'(to, from) {
                // 登录进来应该是首页 但是显示的上边和侧边菜单导航不是对应的首页与后台首页 界面确是后台首页
                localStorage.setItem('navActive', JSON.stringify({
                    top: this.navBar.active || '0',
                    left: this.asideActive || '0'
                }))
                this.getRouterCrumb()
            }
        },
        computed: {
            asidMenu() {
                return this.navBar.list[this.navBar.active].subMenu || []
            },
            asideActive: {
                // get回调函数 => 当需要读取当前属性值时调用, 根据相关的数据计算并返回当前属性的值
                get() {
                    return this.navBar.list[this.navBar.active].subActive || '0'
                },
                // set回调函数 => 监视当前属性值发生改变时调用, 更新相关的属性值
                set(val) {
                    // console.log(val)
                    this.navBar.list[this.navBar.active].subActive = val
                }
            }
        },
        created() {
            // 初始化菜单
            this.navBar = this.$config.navBar
            // 获取面包屑导航
            this.getRouterCrumb()
            // 刷新后初始化选中菜单
            this.initSelectMenu()
            // 路由是index 界面显示也是后台首页 但是 菜单导航栏没有一一对应
            if (this.$route.name === 'index') {
                this.navBar.active = '0'
                this.asideActive = '0'
            }
        },
        methods: {
            handTopSel(key, keyPath) {
                console.log(key, 'key的值');
                this.navBar.active = key
                // 默认选中跳转到当前激活
                this.asideActive = '0'
                // console.log(this.asidMenu);
                if (this.asidMenu.length > 0) {
                    this.$router.push({
                        name: this.asidMenu[this.asideActive].pathName
                    })
                }
            },
            handLeftSel(key, keyPath) {
                this.asideActive = key
                // 跳转到指定页面
                this.$router.push({
                    name: this.asidMenu[key].pathName
                })
            },
            getRouterCrumb() {
                const name = this.$route.matched.filter(item => item.name)
                const arr = []
                name.forEach(item => {
                    if (item.name === 'index' || item.name === 'layout') return
                    arr.push({
                        name: item.name,
                        path: item.path,
                        title: item.meta.title
                    })
                    if (arr.length > 0) {
                        arr.unshift({
                            name: 'index',
                            path: '/index',
                            title: '后台首页'
                        })
                    }
                });
                this.crumbArr = arr
            },
            initSelectMenu() {
                let navActive = localStorage.getItem('navActive')
                if (navActive) {
                    navActive = JSON.parse(navActive)
                    this.navBar.active = navActive.top
                    this.asideActive = navActive.left
                }
            }
        }
    }
</script>

<style scoped>
    .warp {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    .nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgb(84, 92, 100);
    }

    .login-name {
        color: #fff;
        font-size: 18px;
        font-weight: 700;
    }

    .avatar-txt {
        margin-left: 5px;
    }

    .aside-menu {
        height: 100%;
    }

    .main-content {
        height: 100%;
        background-color: #f8f9fa;
        position: relative;
    }

    .bread-crumb {
        padding: 20px;
        margin: -20px -20px 0 -20px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
    }

    .back-top {
        height: 40px;
        width: 60px;
        font-size: 27px;
        color: #1989fa;
        text-align: center;
        line-height: 42px;
        background-color: #ccc;
        border-radius: 20px;
    }
</style>