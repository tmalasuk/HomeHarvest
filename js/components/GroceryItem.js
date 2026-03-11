import DurationInput from "./DurationInput.js";

const GroceryItem = {

    name: "GroceryItem",

    components: { DurationInput },

    props: {
        product: { type: Object, required: true },
        variant: { type: String, required: true }, // 'shop', 'organize', or 'stock'
        saveState: { type: String, default: null },
        units: { type: Array, default: null },
    },

    methods: {
        lowerQty() {
            if (this.product.qty > 1) this.product.qty--;
        },
        increaseQty() {
            this.product.qty++;
        },
    },

    template: `
        <!-- Shop: circle checkbox + qty controls -->
        <li v-if="variant === 'shop'">
            <label class="circle-check">
                <input class="check-me-off" v-model="product.bought" type="checkbox">
                <span class="circle"></span>
                <span class="item-name" :class="{ checked: product.bought }">{{ product.name }}</span>
            </label>
            <div class="item-count">
                <i class="bi bi-dash" @click="lowerQty"></i>
                <p class="number">{{ product.qty }}</p>
                <i class="bi bi-plus" @click="increaseQty"></i>
            </div>
        </li>

        <!-- Organize: action checkbox + qty controls -->
        <div v-else-if="variant === 'organize'" class="grocery-item">
            <div class="row">
                <input
                    v-model="product.action"
                    class="changing-checkbox col-3"
                    :class="saveState === 'delete' ? 'red' : 'yellow'"
                    type="checkbox"
                />
                <p class="col-27 truncate">{{ product.name }}</p>
                <div class="item-count col-10">
                    <i class="bi bi-dash" @click="lowerQty"></i>
                    <p class="number">{{ product.qty }}</p>
                    <i class="bi bi-plus" @click="increaseQty"></i>
                </div>
            </div>
        </div>

        <!-- Stock: no checkbox + DurationInput -->
        <div v-else class="cart-row">
            <span class="truncate">{{ product.name }}</span>
            <duration-input
                :duration="product.durationValue"
                :unit-index="product.selectedUnit"
                :units="units"
                track-width="80px"
                @update:duration="product.durationValue = $event; $emit('update-expiration', product)"
                @update:unit-index="product.selectedUnit = $event; $emit('update-expiration', product)"
                @change="$emit('update-expiration', product)"
            />
        </div>
    `,
};

export default GroceryItem;
