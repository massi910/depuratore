Vue.component('water-charts', {
    template: `
    <div>
    <div class="row h-50px mt-3">
        <div class="col">
            <div class="card">
                <div class="card-header">Water Consumption</div>
                <bar-chart style="height: 80vh" :chart-data="wcd"></bar-chart>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">Water Level</div>
                <bar-chart style="height: 80vh" :chart-data="wld"></bar-chart>
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