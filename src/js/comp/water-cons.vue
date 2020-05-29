<template>
    <div>
        <div class="card mt-3">
            <div class="card-header">Water Consumption</div>
            <barchart style="height: 80vh" :chart-data="wcd"></barchart>
        </div>
    </div>
</template>

<script>
import barchart from './cmp-chart-bar'

export default {
    components:
    {
        barchart
    },
    props: {
        units: Array,
        water_cons: Array,
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
        }
    }
}
</script>