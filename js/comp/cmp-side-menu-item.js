Vue.component('sidemenuitem',
{
    props:
    {
        item: Object
    },
    template:
    `
    <div class="nav-item nav-link">
        <a href="#"
        v-on:click="activation"
        :id="'link-'.concat(menu.name)"
        class="nav-link"> {{ menu.name }} 
        <span
            class="badge bg-danger">4</span>
        </a>
    </div>
    `
})