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