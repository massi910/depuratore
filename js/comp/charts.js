Vue.component('charts', {
    template: `
    <div class="row h-100px">
        <div class="col">
            <div class="card">
            <div class="card-header">Water Consumption</div>
            <chart :chart-data="wcd"></chart>
            </div>
        </div>
        <div class="col">
            <div class="card">
            <div class="card-header">Water Consumption</div>
            <chart :chart-data="wcl"></chart>
            </div>
        </div>
    </div>
    `,
    props: {
        units: Array,
        water_cons: Array,
        water_level: Array
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
        wcl: function() {
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

Vue.component('chart',{
    extends: VueChartJs.Bar,
    mixins: [VueChartJs.mixins.reactiveProp],
    data: function() {
        return {
        }
    },
    mounted(){
        this.renderChart(this.chartData, {legend: false, responsive: true})
    }
})
/*  
    element = document.getElementById(this.water_cons_id)
    this.c = new Chart(element, {
        type: 'bar',
        data: this.chartData,
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'lt'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 40,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: true
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    })
*/