Vue.component('consumptions', {
    template: `
    <div class="container-fluid">
        <div class="card mt-3 mb-3">
            <div class="card-header">General Consumptions</div>
            <line-chart style="height: 50vh;" :chart-data="cons"></line-chart>
        </div>

        <div class="btn-group mb-3">
            <button class="btn btn-default" @click="sezioneCorrente = undefined">TUTTE</button>
            <button 
                v-for="sezione in sezioni"
                :key="sezione.id" 
                @click="setSezioneCorrente(sezione.id)" 
                class="btn btn-default">
                {{sezione.name}}
            </button>
        </div>
        <div class="card mb-3" v-for="utenza in utenzeAttive" :key="utenza.id">
            <div class="card-header">{{utenza.name}}</div>
            <bar-chart style="height: 45vh;" :chart-data="buildChartData(utenza)"></bar-chart>
        </div>
    </div>
    `,
    props: {
        utenze: Array,
        sezioni: Array,
        units: Array,
        consumptions: Array
    },
    data: function() {
        return {
            sezioneCorrente: undefined,
            colorArray: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
        }
    },
    computed: {
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
            return this.consumptions.map(e => e.date)
        },
        cons: function() {
            data = {
                labels: this.dates,
                datasets: []
            }
            for (utenza of this.utenze)
            {
                data.datasets.push({
                    fill: false,
                    borderColor: this.colorArray[utenza.id],
                    label: utenza.name,
                    // TO-DO: 0 = valore per testare il funzionamento -> sarà null
                    data: this.consumptions.map(e => this.dates.includes(e.date) && e.id_item == utenza.id ? e.cons : 0 )
                })
            }
            return data
        }
    },
    methods: {
        setSezioneCorrente: function(sezione) {            
            this.sezioneCorrente = sezione
        },
        buildChartData: function(utenza) {
            return {
                labels: this.dates,
                datasets: [{
                    backgroundColor: this.colorArray[utenza.id],
                    label: utenza.name,
                    // TO-DO: 12 = valore per testare il funzionamento -> sarà null
                    data: this.consumptions.map(e => this.dates.includes(e.date) && e.id_item == utenza.id ? e.cons : 12 ) 
                }]
            }
        }
    }
})