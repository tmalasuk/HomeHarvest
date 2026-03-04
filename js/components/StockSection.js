import CartCard from "./CartCard.js";

const StockSection = {

    name: "StockSection",

    components: { CartCard },

    props: {
        boughtItems: { type: Array, required: true },
        units: { type: Array, required: true },
    },

    template: `
        <div id="stockSection" class="section">

            <!-- Header -->
            <header>
                <template v-if="boughtItems.length > 0">
                    <h3>Set Expiration</h3>
                    <div class="action-buttons">
                        <button class="gen">
                            <i class="bi bi-magic"></i>
                            <span>AUTO GEN</span>
                        </button>
                        <button class="to-pantry" @click="$emit('add-to-pantry')">
                            ADD ALL TO PANTRY
                            <i class="bi bi-arrow-right-circle"></i>
                        </button>
                    </div>
                </template>
            </header>

            <!-- Empty state -->
            <div class="empty-cart" v-if="boughtItems.length === 0">
                <div class="empty-cart-inner">
                    <div class="fridge-wrap">
                        <div class="icon-wrap-3">
                            <svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="18" y="12" width="40" height="54" rx="6" stroke="currentColor" stroke-width="2.5" />
                                <line x1="18" y1="34" x2="58" y2="34" stroke="currentColor" stroke-width="2" />
                                <circle cx="52" cy="24" r="2" fill="currentColor" opacity=".5" />
                                <circle cx="52" cy="44" r="2" fill="currentColor" opacity=".5" />
                                <path d="M32 24 Q34 22 36 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" />
                                <path d="M40 24 Q42 22 44 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" />
                                <path d="M34 28 Q38 31 42 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" />
                            </svg>
                        </div>
                        <div class="zzz-col">
                            <span class="zzz z1">z</span>
                            <span class="zzz z2">z</span>
                            <span class="zzz z3">z</span>
                        </div>
                    </div>
                    <p class="empty-cart-text">Fridge is resting...</p>
                    <p class="empty-cart-sub">Shop something to wake it up</p>
                </div>
            </div>

            <!-- Cart cards -->
            <div class="cart-item-container">
                <cart-card
                    v-for="category in boughtItems"
                    :key="category.name"
                    :category="category"
                    :units="units"
                    @update-expiration="$emit('update-expiration', $event)"
                />
            </div>

        </div>
    `,
};

export default StockSection;