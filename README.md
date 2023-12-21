# Vue2-TodoList
本项目是基于vue2、vueX技术开发的TodoList界面，通过本次项目，详细了解vue技术的应用。
## 1.项目说明
### 1.1.技术栈
|   说明  |    技术栈     |
|:--------:|:----------:|
| Js框架 |    Vue2   |
| 状态管理 |    VueX   |
| 脚手架   |    Vue CLI    |
| 本次存储 | Localstorage |
### 1.2.项目内容
通过日历和输入框记录每天的待办事项，对TodoItem列表的待办事项进行完成、删除、全选、一键清除、换位等功能：
![查看每天待办事项](https://github.com/G1Ser/Vue2-TodoList/blob/main/Image/%E6%97%A5%E8%AE%B0%E8%AE%B0%E5%BD%95%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9.gif "查看每天待办事项")

![TodoItem操作](https://github.com/G1Ser/Vue2-TodoList/blob/main/Image/%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9%E6%93%8D%E4%BD%9C.gif "TodoItem操作")
### 1.3.项目管理
• assets：<br>
css:样式库<br>
fonts:字体库<br>
images:图片素材库<br>
• components：<br>
Header.vue:头部组件<br>
Main-Date:左边日历组件<br>
Main-TodoList:右边事项组件<br>
Footer.vue:底部版权组件<br>
• store：<br>
存放公共数据，实现Date和TodoList组件之间数据的交互。
## 2.项目部署
### 2.1.日历组件
日历组件分为头部内容和中间主要内容<br>
头部由时钟和按钮来组成
```
        <div class="top-select">
            <Clock></Clock>
            <div class="data-select">
                <select v-model="year" @change="firstDay">
                    <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}年</option>
                </select>
                <select v-model="month" @change="firstDay">
                    <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}月</option>
                </select>
            </div>
            <div class="today">
                <button @click="today">今天</button>
            </div>
        </div>
```
```
<script>
computed: {
        years() {
            const currentYear = new Date().getFullYear();
            return [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2];
        },
        months() {
            return Array.from({ length: 12 }, (_, i) => i + 1);
        }
}
</script>
```
