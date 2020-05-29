
<script>
import VueChartJs from 'vue-chartjs'

export default {
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
}
</script>