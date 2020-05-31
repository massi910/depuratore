<template>
    <div>
        <h6 class="text-white pl-2 mb-1">Utenze attive:</h6>
        <span>
            <div class="progress">
                <div class="progress-bar progress-bar-striped" :style="{width: width + '%'}" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{{active+'/'+all}}</div>
            </div>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        utenze: Array
    },
    computed: {
        all: function() {
            return this.utenze.length
        },
        active: function() {
            return this.utenze.filter(utenza => utenza.b_status).length
        },
        width: function() {
            return (this.active/this.all) * 100
        },
    }
}
</script>