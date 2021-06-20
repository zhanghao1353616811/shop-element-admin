<template>
    <div :class="[isActive ? 'active-style' : '', '']" @click.stop="$emit('click', index)">
        <div>{{item.name}}</div>
        <el-dropdown class="drop-down">
            <span class="drop-btn">{{item.num}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.stop.native="$emit('update', {item, index})">修改</el-dropdown-item>
                <el-dropdown-item @click.stop.native="$emit('del', index)">删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: {}
            },
            index: {
                type: Number,
                default: 0
            },
            isActive: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style>
    .active-style {
        color: #67C23A;
        background-color: #f0f9eb;
        border-color: #c2e7b0;
    }
    .drop-btn {
        border: 1px solid #ccc;
        background-color: #fff;
        padding: 4px 8px;
    }
</style>