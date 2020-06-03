<template>
    <div v-if="chartsData != null">
        <div class="btn-group btn-toolbar btn-group-toggle mb-3 pt-2 sticky-top">
            <button class="btn btn-default" :class="{ active : sezioneCorrente == undefined }" @click="sezioneCorrente = undefined">TUTTE</button>
            <button
                v-for="sezione in sezioni"
                :key="sezione.id"
                @click="setSezioneCorrente(sezione.id)"
                class="btn btn-default"
                :class="{ active : sezioneCorrente == sezione.id }">
                {{sezione.name}}
            </button>
        </div>
        <div class="card mb-3" 
            v-for="utenza in utenzeAttive" :key="utenza.name">
            
            <div class="card-header">
                <h4 class="m-1"> {{ utenza.name }} </h4>
            
                <!-- interval selection -->
                <div class="btn-group float-right" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-outline-default btn-sm dropdown-toggle" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Seleziona intervallo
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <a class="dropdown-item" v-on:click="changeData(365, utenza)">Tutti</a>
                        <a class="dropdown-item" v-on:click="changeData(31, utenza)">Ultimo mese</a>
                        <a class="dropdown-item" v-on:click="changeData(7, utenza)">Ultima settimana</a>
                    </div>
                </div>
            </div>
            <barchart style="height: 45vh;" :chart-data="chartsData[utenza.id]"></barchart>

        </div>
    </div>
</template>

<script>
import barchart from './cmp-chart-bar.vue'

export default {
    components: {
        barchart
    },
    props: {
        utenze: Array,
        sezioni: Array,
        units: Array,
        consumptions: Array
    },
    data: function() {
        return {
            chartsData: null,
            sezioneCorrente: undefined,
            colorArray: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
        }
    },
    computed: 
    {
        utenzeAttive: function() {
            var alias = this;
            return this.utenze.filter(function(utenza) 
            {                 
                if (alias.sezioneCorrente == undefined) // show all when starting
                    return true;
                    
                return utenza.section_id == alias.sezioneCorrente 
            })
        },
        dates: function() {
            const d = new Set(this.consumptions.map(e => e.date))
            return [...d]
        }
    },
    methods: 
    {
        setSezioneCorrente: function(sezione) {            
            this.sezioneCorrente = sezione
        },
        /**
         * Change the data according to the data filter
         * In order to change the chart rendering, the 
         * entire object should be re-assign
         */
        changeData: function(daysNumber, utenza)
        {
            this.chartsData[utenza.id] = {
                        labels: this.dates.filter((date) => 
                        {
                            let today = new Date();
                            let diff = today.getTime() - new Date(date).getTime();
                            let diffDays = diff / (1000 * 3600 * 24);
                            return diffDays < daysNumber;
                        }),
                        datasets:[{
                            fill: false,
                            backgroundColor: this.colorArray[utenza.id],
                            label: utenza.name,
                            data: this.consumptions.filter(e => e.id_item == utenza.id).map(e => e.cons)
                        }]
                    }
        },
        /**
         * Return the object data to fill the
         * chart for all the available items
         */
        initData: function() {
            var dataArray = {}
            for (const utenza of this.utenze)
            {
                dataArray[utenza.id] = {
                    labels: this.dates.filter((date) => 
                        {
                            let today = new Date();
                            let diff = today.getTime() - new Date(date).getTime();
                            let diffDays = diff / (1000 * 3600 * 24);
                            return diffDays < 7;
                        }),
                    datasets:[{
                        fill: false,
                        backgroundColor: this.colorArray[utenza.id],
                        label: utenza.name,
                        data: this.consumptions.filter(e => e.id_item == utenza.id).map(e => e.cons)
                    }]
                }
            }
            return dataArray
        }
    },
    mounted()
    {
        this.chartsData = this.initData()
    }
}
</script>