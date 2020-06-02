<template>
    <div class="container-fluid border mt-4 p-2">
        <div class="card mb-2">
            <div class="card-header">Water Level</div>
            <barchart style="height: 80vh" :chart-data="wld"></barchart>
        </div>

        <div>
            <button class="btn btn-outline-default btn-sm" v-on:click="changeData(() => true)">
                Tutti
            </button>
            <button class="btn btn-outline-default btn-sm" v-on:click="changeData(lastSevenFilter)">
                Ultimi sette giorni
            </button>
        </div>
    </div>
</template>

<script>
import barchart from './cmp-chart-bar'

export default {
    components:
    {
        barchart
    },
    data () {
      return {
        wld: {},
        /** Date filter function */
        lastSevenFilter: (date) => 
        {
            let today = new Date();
            let diff = today.getTime() - new Date(date).getTime();
            let diffDays = diff / (1000 * 3600 * 24);
            return diffDays < 28;
        }
      }
    },
    props: {
        units: Array,
        water_level: Array,
    },
    watch:
    {
        water_level:
        {
            /** each time water_cons changes the chart 
             * data formatted object will be updated 
            */
            handler: function()
            {
                this.wld = {
                labels: this.water_level.map(e => e.date),
                datasets: [{
                    label: 'lt',
                    backgroundColor: '#f87979',
                    data: this.water_level.map(e => e.cons)
                }]}
            },
            deep: true,
            immediate: true
        }
    },
    methods:
    {
        /**
         * Change the data according to the given
         * filter function
         * In order to change the chart rendering, the 
         * entire object should be assign
         */
        changeData: function(filter)
        {
            this.wld = {
                labels: this.water_level.map(e => e.date).filter(filter),
                datasets: [{
                    label: 'lt',
                    backgroundColor: '#f87979',
                    data: this.water_level.map(e => e.cons)
                }]
            }
        }
    }
}
</script>