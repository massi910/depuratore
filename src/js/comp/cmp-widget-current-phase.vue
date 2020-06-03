<template>
<div class="text-center">
    <h5><span class="badge badge-pill badge-default text-dark">Fase corrente</span></h5>
    <div class="progress">
        <div class="progress-bar bg-default" role="progressbar" :style="{width: width+'%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <span class="text-dark font-weight-bold">{{currentPhase+'/'+phases.length}}</span>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    props: {
        phases: Array
    },
    computed: {
        currentPhase: function() {
            return this.phases
                .filter(phase => phase.active)
                .map(phase => phase.id)
                .slice(-1)
        },
        width: function() {
            return (this.currentPhase / this.phases.length) * 100
        }
    }
}
</script>