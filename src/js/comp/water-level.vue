<template>
    <div>
        <div class="card mt-3">
            <div class="card-header">Water Level</div>
            <barchart style="height: 80vh" :chart-data="wld"></barchart>
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
        water_level: Array,
    },
    computed: {
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
}
</script>