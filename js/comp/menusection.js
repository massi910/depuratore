Vue.component('menusection',
{
    props:
    {
        section: Object,
        active: Boolean
    },
    template:
    `
        <div :id="section.name" class="container-fluid"> 
            <!-- to allow nested components -->
            <slot></slot>
        </div>
    `
})