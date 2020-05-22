Vue.component('general-card',
{
    props:
    {
        carditem: Object
    },
    template:
    `
    <div class="item-card border-left border-primary shadow p-2 my-4">
        <div class="container">
            <div class="row">
                <slot name="title" v-bind:carditem="carditem"></slot>
            </div>
            <div class="row">
                <slot name="body" v-bind:carditem="carditem"></slot>
            </div>
        </div>
    </div>
    `
})