Vue.component('water-charts', {
    template: `
    <div>
    <div class="row h-50px mt-3">
        <div class="col">
            <div class="card">
                <div class="card-header">Water Consumption</div>
                <bar-chart style="height: 90vh" :chart-data="wcd"></bar-chart>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">Water Level</div>
                <bar-chart style="height: 90vh" :chart-data="wld"></bar-chart>
            </div>
        </div>
    </div>
    </div>
    `,
    props: {
        units: Array,
        water_cons: Array,
        water_level: Array,
    },
    computed: {
        wcd: function() {
            return {
                labels: this.water_cons.map(e => e.date),
                datasets: [{
                    label: 'lt',
                    backgroundColor: '#3232ff',
                    data: this.water_cons.map(e => e.cons)
                }]
            }
        },
        wld: function() {
            return {
                labels: this.water_level.map(e => e.date),
                datasets: [{
                    label: 'lt',
                    backgroundColor: '#f87979',
                    data: this.water_level.map(e => e.cons)
                }]
            }
        }
    }
})

Vue.component('bar-chart',{
    extends: VueChartJs.Bar,
    mixins: [VueChartJs.mixins.reactiveProp],
    data: function() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {display : false},
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            fontSize: '15'
                        },
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'lt - litri',
                            lineHeight: '3em',
                            fontSize: '15'
                        }
                    }]
                }
            }
        }
    },
    mounted(){
        this.renderChart(this.chartData, this.options)
    }
})

Vue.component('line-chart',{
    extends: VueChartJs.Line,
    mixins: [VueChartJs.mixins.reactiveProp],
    data: function() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {display : true},
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            fontSize: '15'
                        },
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'kW',
                            lineHeight: '3em',
                            fontSize: '15'
                        }
                    }]
                }
            }
        }
    },
    mounted(){
        this.renderChart(this.chartData, this.options)
    }
})