<template>
    <div>
        <h5 class="text-white">Utenze attive <span class="badge badge-default text-dark w-110">{{ active +'/'+ all }}</span></h5>
    </div>
</template>

<script>
export default {
    props: {
        utenze: Array
    },
    computed: {
        /**
         * returns number of corrently active items
         */
        active: function() {
            return this.utenze.filter(utenza => utenza.b_status).length
        },
        /**
         * return number of all items (active and inactive)
         */
        all: function() {
            return this.utenze.length
        }
    }
}
</script>