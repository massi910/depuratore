<template>
    <div class="container-fluid border mt-4 p-2">
        
        <div class="card mb-2">
            <div class="card-header">Water Consumption</div>
            <barchart style="height: 80vh" :chart-data="wcd"></barchart>
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
    data: function() {
        return {
            /** Chart data */
            wcd: {},
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
    components:
    {
        barchart
    },
    props: {
        units: Array,
        water_cons: Array,
    },
    watch:
    {
        water_cons:
        {
            /** each time water_cons changes the chart 
             * data formatted object will be updated 
            */
            handler: function()
            {
                this.wcd = {
                labels: this.water_cons.map(e => e.date),
                datasets: [{
                    label: 'lt',
                    backgroundColor: '#3232ff',
                    data: this.water_cons.map(e => e.cons)
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
            this.wcd = {
                labels: this.water_cons.map(e => e.date).filter(filter),
                datasets: [{
                    label: 'lt',
                    backgroundColor: '#3232ff',
                    data: this.water_cons.map(e => e.cons)
                }]}
        }
    }
}
</script>