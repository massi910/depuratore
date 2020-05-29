<template>
    <div :id="section.name" class="container-fluid"> 
            <!-- to allow nested components -->
            <slot></slot>
    </div>
</template>


<script>
export default {
    props:
    {
        section: Object,
        active: Boolean
    }
}
</script>