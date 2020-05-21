Vue.component('charts', {
    props: {
        units: Array,
        water_cons: Array,
        water_level: Array
    },
    data: function() {
        return {
            water_cons_id: 'water_cons',
        }
    },
    computed: {
        water_cons_labels: function() { return this.water_cons.map(function(entry) {return entry.date}) },
        water_cons_data: function() { return this.water_cons.map(function(entry) {return entry.cons}) },
        
        water_level_labels: function() { return this.water_level.map(function(entry) {return entry.date}) },
        water_level_data: function() { return this.water_level.map(function(entry) {return entry.cons}) }
    },
    template:
    `
    <div class="row">
    <div class="col-sm-6">
        <chart :id="water_cons_id" :labels="water_cons_labels" :data="water_cons_data"></chart>
    </div>
    <div class="col-sm-6">
    </div>
    </div>
    `
})

Vue.component('chart', {
    props: {
        id: String,
        labels: Array,
        data: Array
    },
    // data: function() {
    //     return {
    //         el: {},
    //         chart: {}
    //     }
    // },
    created() {
        var l = this.labels
        var d = this.data
        createChartOn(
            this.id,
            l,
            d
        )
    },
    template: `
    <div class="card">
        <div class="card-header">Water Consumption</div>
        <div class="card-body">
            <canvas :id="id" width="1300" height="520" style="display: block; height: 260px; width: 650px;" class="chartjs-render-monitor"></canvas>
        </div>
    </div>
    `
})

// Bar Chart Example
function createChartOn(id, l, d) {
    return new Chart(document.getElementById(id), {
        type: 'bar',
        data: {
            labels: l,
            datasets: [{
                label: "Revenue",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,1,1,1)",
                data: d,
            }],
        },
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
}