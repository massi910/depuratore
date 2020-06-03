<template>       
    <div class="card mt-3">
        <div class="card-header">
            <h4 class="m-1">Livello dell'acqua nella vasca</h4>
            
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
        <barchart style="height: 80vh" :chart-data="wcd"></barchart>
    </div>
</template>

<script>
import barchart from './cmp-chart-bar'

export default {
    data: function() {
        return {
            /** Chart data */
            wcd: {}
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
    methods:
    {
        /**
         * Change the data according to the given
         * filter function
         * In order to change the chart rendering, the 
         * entire object should be assign
         */
        changeData: function(daysNumber)
        {
            this.wcd = {
                labels: this.water_cons.map(e => e.date).filter((date) => 
                    {
                        let today = new Date();
                        let diff = today.getTime() - new Date(date).getTime();
                        let diffDays = diff / (1000 * 3600 * 24);
                        return diffDays < daysNumber;
                    }),
                datasets: [{
                    label: 'lt',
                    backgroundColor: '#f87979',
                    data: this.water_cons.map(e => e.cons)
                }]
            }
        }
    },
    mounted()
    {
        this.changeData(7);
    }
}
</script>