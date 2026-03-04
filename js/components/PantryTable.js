import PantryRow  from './PantryRow.js';
import PantryCard from './PantryCard.js';

const PantryTable = {

    name: "PantryTable",

    components: { PantryRow, PantryCard },

    props: {
        products: { type: Array, required: true },
        isMobile: { type: Boolean, required: true },
    },

    template: `
        <div class="container inventory">

            <!-- v-show keeps DOM alive across resize — avoids destroy/recreate bugs -->

            <div class="row py-2 table-header" v-show="!isMobile">
                <div class="col-1"></div>
                <div class="col-md-13 col-12">Name</div>
                <div class="col-md-4 col-6">Qty</div>
                <div class="col-md-7 col-10">Exp</div>
                <div class="col-md-7 col-0">Category</div>
                <div class="col-md-3 col-4"><span>Trash</span><i class="bi bi-trash"></i></div>
                <div class="col-md-3 col-4"><span>Restock</span><i class="bi bi-arrow-repeat"></i></div>
                <div class="col-md-0 col-3"></div>
            </div>

            <pantry-row
                v-show="!isMobile"
                v-for="(product, index) in products"
                :key="'desktop-' + product.id"
                :product="product"
                :index="index"
                :is-mobile="isMobile"
                @edit="$emit('edit', $event)"
                @delete-product="$emit('delete-product', $event)"
                @delete-item="$emit('delete-item', $event)"
                @restock-change="$emit('restock-change')"
            />

            <div class="inventory-cards" v-show="isMobile">
                <pantry-card
                    v-for="(product, index) in products"
                    :key="'mobile-' + product.id"
                    :product="product"
                    :index="index"
                    @edit="$emit('edit', $event)"
                    @delete-product="$emit('delete-product', $event)"
                    @delete-item="$emit('delete-item', $event)"
                    @restock-change="$emit('restock-change')"
                />

                <div class="inventory-empty" v-if="isMobile && !products.length">
                    Nothing in your pantry yet
                </div>
            </div>

        </div>
    `,
};

export default PantryTable;