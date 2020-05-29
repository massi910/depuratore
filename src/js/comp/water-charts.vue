<template>
    <div>
        <div class="row h-50px mt-3">
            <div class="col">
                <div class="card">
                    <div class="card-header">Water Consumption</div>
                    <barchart style="height: 80vh" :chart-data="wcd"></barchart>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">Water Level</div>
                    <barchart style="height: 80vh" :chart-data="wld"></barchart>
                </div>
            </div>
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
}
</script>