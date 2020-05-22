Vue.component('cnt-phases',
{
    props:
    {
        phases: Array
    },
    template:
    `
    <div class="container">
        <general-card 
            v-for="phase in phases"
            :key="phase.title"
            :carditem="phase"
            >
            <template v-slot:title="props">
                {{ props.carditem.title }}
            </template>

            <template v-slot:body="props">
                {{ props.carditem.description }}
            </template>

        </general-card>
    </div>
    `
})