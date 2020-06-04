<template>
    <div v-if="consumptionsData != null" class="card mt-3">
        <div class="card-header">
            <h4 class="m-1">Consumo elettrico per ogni utenza</h4>
            
            <!-- interval selection -->
            <div class="btn-group float-right" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-outline-default btn-sm dropdown-toggle" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Seleziona intervallo
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" v-on:click="changeData(365)">Tutti</a>
                    <a class="dropdown-item" v-on:click="changeData(31)">Ultimo mese</a>
                    <a class="dropdown-item" v-on:click="changeData(7)">Ultima settimana</a>
                </div>
            </div>

        </div>
        <!-- chart -->
        <linechart style="height: 80vh;" :chart-data="consumptionsData"></linechart>
    </div>
</template>

<script>
import barchart from './cmp-chart-bar'
import linechart from './cmp-chart-line'

export default {
    components:
    {
        barchart,
        linechart
    },
    props: {
        utenze: Array,
        units: Array,
        consumptions: Array
    },
    data: function() {
        return {
            consumptionsData: null,
            colorArray: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
        }
    },
    computed: {
        /**
         * Set of all dates inside consumptions
         */
        dates: function() {
            const d = new Set(this.consumptions.map(e => e.date))
            return [...d]
        },
    },
    methods:
    {
        /**
         * Changes number of days shown inside the graph
         * @param daysNumber: number of days to show
         */
        changeData: function(daysNumber)
        {
            let data = {
                labels: this.dates.filter((date) => 
                    {
                        let today = new Date();
                        let diff = today.getTime() - new Date(date).getTime();
                        let diffDays = diff / (1000 * 3600 * 24);
                        return diffDays < daysNumber;
                    }),
                datasets: []
            }            
            for (const utenza of this.utenze)
            {
                data.datasets.push({
                    fill: false,
                    borderColor: this.colorArray[utenza.id],
                    label: utenza.name,
                    data: this.consumptions.filter(e => e.id_item == utenza.id)
                                                    .filter(e => data.labels.includes(e.date))
                                                    .map(e => e.cons)
                })
            }
            this.consumptionsData = data;
        }
    },
    mounted()
    {
        // default: show last 7 days
        this.changeData(7);
    }
}
</script>
