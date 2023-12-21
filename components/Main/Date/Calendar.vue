<template>
    <div class="calendar">
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
        <div class="table-list">
            <div class="list-1">
                <span>日</span>
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
            </div>
            <div class="list-2">
                <span v-for="(list, index) in lists" :key="index"
                    :class="{ off: list.type != 0, active: list.type === 0 && list.value === curDay, saved: isSaved(list.value)&& list.type === 0 }"
                    @click="switchday(list)">{{ list.value }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Clock from './Clock.vue';
export default {
    name: 'Calendar',
    components: {
        Clock
    },
    data() {
        const today = new Date();
        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            curDay: today.getDate()
        };
    },
    computed: {
        years() {
            const currentYear = new Date().getFullYear();
            return [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2];
        },
        months() {
            return Array.from({ length: 12 }, (_, i) => i + 1);
        },
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
        firstDay() {
            this.curDay = 1;
            this.$store.dispatch('updateDate', {
                year: this.year,
                month: this.month,
                day: this.curDay
            })
        },
        today() {
            const today = new Date();
            this.curDay = today.getDate();
            this.curYear = today.getFullYear();
            this.curMonth = today.getMonth() + 1;
            this.year = this.curYear;
            this.month = this.curMonth;
            this.$store.dispatch('updateDate', {
                year: this.year,
                month: this.month,
                day: this.curDay
            })
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
        },
        isSaved(day) {
            const date = `${this.year}-${this.month}-${day}`
            return this.$store.getters.isSaved(date)
        }
    },
};
</script>

<style lang="scss" scoped>
.calendar {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .top-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 15%;

        .data-select {
            select {
                padding: 5px;
                border-radius: 10px;
                margin-right: 10px;
                color: #fff;
                font-family: 'Ly';
                font-size: 20px;
                font-weight: bold;
                background-color: transparent;
                border: 1px solid #fff;
                outline: none;

                &:focus {
                    color: #000;
                    font-weight: bold;
                }
            }
        }

        .today {
            button {
                background-color: transparent;
                padding: 5px 10px;
                border-radius: 10px;
                font-family: 'Ly';
                color: #fff;
                font-size: 20px;
                font-weight: bold;
                border: 1px solid #fff;
                outline: none;
                cursor: pointer;

                &:hover {
                    background-color: rgb(255, 172, 75);
                }
            }
        }
    }

    .table-list {
        display: flex;
        flex-direction: column;
        height: 85%;

        .list-1 {
            display: flex;
            gap: 1%;
            height: 10%;
            align-items: center;

            span {
                flex: 1;
                text-align: center;
            }
        }

        .list-2 {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            height: 90%;
            flex-grow: 1;
            gap: 1%;

            span {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                font-weight: bold;
                color: rgba(255, 255, 255, 0.8);

                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                }

                &.off {
                    color: rgba(255, 172, 75, 0.3);
                    text-shadow: 1px 1px 15px rgb(255, 172, 75);
                }

                &.active {
                    background-color: rgba(255, 255, 255, 0.2);
                }

                &.saved {
                    position: relative;
                    &::after{
                        content: '';
                        position: absolute;
                        left: 25%;
                        bottom: 12px;
                        width: 50%;
                        height: 1.5px;
                        background-color: rgb(255, 172, 75);
                    }
                }
            }
        }
    }
}
</style>