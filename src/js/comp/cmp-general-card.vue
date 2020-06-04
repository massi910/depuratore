<template>
    <div class="item-card shadow my-4 card">
        <div class="view">        
            
            <!-- container -->   
            <div class="container p-4">
                <div class="row">
                    <slot name="title" v-bind:carditem="carditem"></slot>
                </div>
                <div class="row">
                    <slot name="body" v-bind:carditem="carditem"></slot>
                </div>
            </div>

            <!-- mask -->
            <slot name="mask" v-bind:carditem="carditem"></slot>
        </div>
    </div>
</template>


<script>
export default {
    props:
    {
        carditem: Object
    }
}
</script>

<style>
    .card
    {
        border-left-width: 6px;
    }
</style>