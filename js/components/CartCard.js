import DurationInput from "./DurationInput.js";

const CartCard = {

    name: "CartCard",

    components: { DurationInput },

    props: {
        category: { type: Object, required: true },
        units: { type: Array, required: true },
    },

    template: `
        <div class="cart-card">
            <div class="cart-card-header">{{ category.name }}</div>
            <div class="cart-card-body">
                <div class="cart-row" v-for="product in category.products" :key="product.id">
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
            </div>
        </div>
    `,
};

export default CartCard;