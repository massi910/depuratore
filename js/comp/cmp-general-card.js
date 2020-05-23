Vue.component('general-card',
{
    props:
    {
        carditem: Object
    },
    template:
    `
    <div class="item-card border-left border-primary shadow my-4">
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
    `
})