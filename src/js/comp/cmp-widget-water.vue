<template>
    <div>
        <h5 class="text-white">Consumo acqua
            <svg  v-if="compared == 0" class="bi bi-arrow-right-square-fill text-default" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm5.646 10.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/>
            </svg>
            <svg v-else-if="compared > 0" class="bi bi-arrow-up-square-fill text-default" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 8.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"/>
            </svg>
            <svg  v-else class="bi bi-arrow-down-square-fill text-default" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"/>
            </svg>
        </h5>
    </div>
</template>

<script>
export default {
    props: {
        water_cons: Array
    },
    computed: {
        lastTwoDays: function() {
            return this.water_cons.map( entry => entry.date ).sort().slice(-2)
        },
        beforeLast: function() {
            const value = this.water_cons.find(entry => entry.date == this.lastTwoDays[0])
            return value != null ? value.cons : 'N/A'
        },
        last: function() {
            const value = this.water_cons.find(entry => entry.date == this.lastTwoDays[1])
            return value != null ? value.cons : 'N/A'
        },
        compared: function() {
            return this.last - this.beforeLast
        }
    }
}
</script>