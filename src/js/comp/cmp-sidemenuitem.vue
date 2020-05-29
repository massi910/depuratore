<template>
    <div class="nav-item nav-link mb-3" 
        :class="isactive ? 'active' : '' "
        >
        <a v-on:click="activation"> {{ item.name }} 
        <span
            v-if="item.counter > 0"
            class="badge bg-danger"> {{ item.counter }} </span>
        </a>
    </div>
</template>


<script>
export default 
{
    props:
    {
        isactive: Boolean,
        item: 
        {
            name: String,
            description: String,
            counter: Number
        },
    },
    methods:
    {
        activation: function (e) {         
            this.$emit('activation', this.item.name)
          }
    }
}
</script>