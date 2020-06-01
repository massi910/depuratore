<template>
    <div class="card-deck p-3 align-items-center">
        <cardalarm v-on="$listeners"
            v-for="utenza in utenze"
            :key="utenza.id"
            v-bind:utenza="utenza"
        ></cardalarm>
    </div>
</template>


<script>
import Vue from "vue";
import cardalarm from './cmp-card-alarm'

export default {
    components:
    {
        cardalarm
    },
    props:
    {
        // container menu item
        item: Object,
        utenze: Array
    },
    computed:
    {
        activeAlarmCounter: function ()
        {
            var count = 0;
            this.utenze.forEach(utenza => {
                if (utenza.b_alarm == true)
                    count++;
            });
            return count;
        },
    },
    watch:
    {
        activeAlarmCounter: 
        {
            handler: function (newValue) {
                this.item.counter = this.activeAlarmCounter
            }
        }
    },
    mounted()
    {
        // set counter observer property
        Vue.set(this.item, 'counter', this.activeAlarmCounter)
    }
}
</script>