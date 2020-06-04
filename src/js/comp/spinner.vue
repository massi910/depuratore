<template>
    <div v-if="show" class="container-fluid d-flex align-items-center justify-content-center all bg-light">
        <font-awesome-icon  id="table" icon="spinner" style="color:black" size="3x" spin />
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner)

export default {
    props: 
    {
        show: Boolean
    }
}
</script>


<style scoped>
.all
{
    height: 100vh;
}
</style>