<template>
    <div class="container mb-3">
        
        <!-- nav tabs -->
        <ul :id="name + '_id'" class="nav nav-tabs mt-2">
            <li class="nav-item"
                v-for="region in regions"
                :key="region.id"
                >
                <a class="nav-link" data-toggle="tab"
                    :id="buildTabId(region.id)"
                    :href=" '#' + buildPanelId(region.id)"
                    >
                    {{ region.name }}
                </a>
            </li>
        </ul>

        <!-- tab panes -->
        <div class="tab-content">
            <div class="tab-pane fade" role="tabpanel"
                v-for="region in regions"
                :key="region.id"
                :id="buildPanelId(region.id)"
                >

                <!-- container slot -->
                <slot :name="region.id"></slot>
            </div>
        </div>
    </div>
</template>


<script>
import $ from 'jquery'

/**
 * Generic tab nav bar template
 * 
 * The given regions should have at least the field:
 * - id
 * - name
 * 
 * A slot container for each region will be created
 * with the region id name
 */
export default {
    props:
    {
        name: String,
        regions: Array
    },
    watch:
    {
        /**
         * Set the first region as shown
         */
        regions: 
        {
            handler: function () {
                setTimeout(() => {
                $('.nav-tabs a:first').tab('show')
                },
                500);
            },
            immediate: true
        }
    },
    methods:
    {
        buildTabId: function (name)
        {
            return name + "-tab_id";
        },
        buildPanelId: function (name)
        {
            return name + "-panel_id";
        },
    }
}
</script>