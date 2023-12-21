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
通过日历和输入框记录每天的待办事项，对TodoItem列表的待办事项进行完成、删除、全选、一键清除、换位等功能：<br>
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
    },
</script>
```
中间主要部分通过获得year,month来判断月份的天数和星期，将返回的数据进行渲染,并在点击日期的时候，将year、month、day返回给vueX的公共数据。
```
    computed: {
        lists() {
            return this.initList(this.year, this.month);
        },
    },
    methods: {
        initList(year, month) {
            let firstDate = new Date(year, month - 1, 1);
            let day = firstDate.getDay();
            let nextDate = new Date(year, month, 0);
            let nextday = nextDate.getDate();
            let endday = nextDate.getDay();
            let lastDate = new Date(year, month - 1, 0);
            let lastday = lastDate.getDate();
            let arr = [];
            for (let i = 0, j = lastday - day + 1; i < day; i++, j++) {
                arr[i] = {
                    value: j,
                    type: -1,
                };
            }
            for (let i = day, j = 1; j <= nextday; i++, j++) {
                arr[i] = {
                    value: j,
                    type: 0,
                };
            }
            for (let i = arr.length, j = 1; j < 7 - endday; i++, j++) {
                arr[i] = {
                    value: j,
                    type: 1,
                };
            }
            return arr;
        },
        switchday(list) {
            if (list.type === 0) {
                this.curDay = list.value
            }
            if (list.type === -1) {
                this.curDay = list.value
                if (this.month === 1) {
                    this.month = 12
                    this.year--
                    return
                }
                this.month--
            }
            if (list.type === 1) {
                this.curDay = list.value
                if (this.month === 12) {
                    this.month = 1
                    this.year++
                    return
                }
                this.month++
            }
            this.$store.dispatch('updateDate', {
                year: this.year,
                month: this.month,
                day: this.curDay
            })
        }
    }
```
### 2.2.待办事项组件
待办事项主要由头部输入框、中间事项表、底部信息栏组成。<br>
1.头部输入框<br>
通过vueX读取当前的日期，将todo添加入vueX数组数据中。todo数组拥有五个字段，id:根据时间戳给予、content：输入框输入的内容、completed：完成状况（默认false）、date：当前日期、order：根据order排序。
```
        addtodo() {
            if (this.content === "") {
                alert("请输入内容");
                return;
            }
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            const todo = {
                id: Date.now(),
                content: this.content,
                completed: false,
                date: date,
                order: Date.now()
            };
            //检查是否已经存在相同内容和日期的待办事项
            const exists = this.$store.state.todos.some(todo => todo.content === this.content && todo.date === date)
            if (exists) {
                alert("该事项已存在");
                return;
            }
            this.$store.dispatch('addTodo', todo);
            this.content = ''
        }
```
2.中间事项表<br>
设置动画组，实现拖拽换行的效果，通过设置checkbox来更改事项完成状况，设置text文本框进行双击修改操作。
```
        <transition-group name="list" class="todo-list">
            <TodoItem v-for="todo in sortedTodos" :key="todo.id" :todo="todo" @dragStart="dragStart($event, todo)"
                @dragOver="dragOver($event)" @drop="drop($event, todo)"></TodoItem>
        </transition-group>
```
```
    <div class="todo-item" draggable="true" @dragstart="$emit('dragStart', $event)" @dragover="$emit('dragOver', $event)" @drop="$emit('drop', $event)">
        <input type="checkbox" :checked="todo.completed" @change="Select" />
        <input type="text" v-if="iswitch" v-focus v-model="content" @blur="iswitch = false" @keyup.enter="updatecontent" />
        <label v-else :class="labelstyle" @dblclick="editContent">{{ todo.content }}</label>
        <button @click="deleteTodo"></button>
    </div>
```
```
    methods: {
        Select(event) {
            this.$store.dispatch('toggleCompleted', { id: this.todo.id, completed: event.target.checked });
        },
        deleteTodo() {
            this.$store.dispatch('toggleDelete', this.todo.id)
        },
        editContent() {
            if (!this.todo.completed) {
                this.iswitch = true,
                    this.content = this.todo.content
            }
        },
        updatecontent(event) {
            if (event.target.value === '') {
                alert("请输入内容");
                return;
            }
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            //检查是否已经存在相同内容和日期的待办事项
            const exists = this.$store.state.todos.some(todo => todo.content === event.target.value && todo.date === date)
            if (exists) {
                alert("该事项已存在");
                return;
            }
            this.$store.dispatch('editContent', {id:this.todo.id,content:event.target.value});
            this.iswitch=false
        }
    }
```
```
SET_TODOS(state, todos) {
      state.todos = todos;
      localStorage.setItem('todos', JSON.stringify(state.todos));
  }
updateOrder(context, payload) {
      const todos = context.state.todos;

      // 查找并更新这两个待办事项的顺序
      todos.forEach(todo => {
        if (todo.id === payload.draggingTodoId) {
          todo.order = payload.draggingTodoOrder;
        } else if (todo.id === payload.targetTodoId) {
          todo.order = payload.targetTodoOrder;
        }
      });

      // 将更新后的待办事项提交到状态中
      context.commit('SET_TODOS', todos);
    }
```
3.底部信息栏<br>
底部信息栏通过传递filtertype来切换渲染的todolist
```
        filtertodos() {
            const date = `${this.$store.state.year}-${this.$store.state.month}-${this.$store.state.day}`;
            switch (this.filtertype) {
                case "all":
                    return this.$store.state.todos.filter(todo => todo.date === date);
                    break;
                case "active":
                    return this.$store.state.todos.filter(todo => todo.date === date && todo.completed === false);
                    break;
                case "completed":
                    return this.$store.state.todos.filter(todo => todo.date === date && todo.completed === true);
                    break;
            }
        }
```
## 3.项目链接
该项目已经部署线上[TodoList](https://todolist-1322830973.cos-website.ap-beijing.myqcloud.com/)
