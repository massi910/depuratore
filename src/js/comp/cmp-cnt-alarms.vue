<template>
    <div class="card-deck p-3 align-items-center">
        <cardalarm 
            v-for="utenza in utenze"
            :key="utenza.id"
            v-bind:utenza="utenza"
        ></cardalarm>
    </div>
</template>


<script>
import cardalarm from './cmp-card-alarm'

export default {
    components:
    {
        cardalarm
    },
    props:
    {
        utenze: Array
    }
}
</script>