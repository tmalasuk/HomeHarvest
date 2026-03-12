import { daysToPercent } from "../utils.js";
import ExpirationBadge from "./ExpirationBadge.js";

const PantryCard = {

    name: "PantryCard",

    components: { ExpirationBadge },

    props: {
        product: { type: Object, required: true },
        index: { type: Number, required: true },
    },

    data() {
        return {
            expanded: false,
        };
    },

    methods: {
        getMaxBatchQtyPercent() {
            if (!this.product.batch || this.product.batch.length === 0) return 0;
            return Math.max(...this.product.batch.map(b => b.qty || 0));
        },

        handleCardTap() {
            if (this.product.batch.length > 1) {
                this.expanded = !this.expanded;
            } else {
                this.$emit('edit', { product: this.product, item: this.product.batch[0] });
            }
        },

        onRestockChange() {
            this.$emit('restock-change');
            if (this.product.restock) {
                this.$nextTick(() => {
                    this.$el.querySelector('.restock-qty-num')?.focus();
                });
            }
        },
    },

    computed: {
        batchPercent() {
            if (!this.product.batch || !this.product.batch.length) return 0;
            return Math.max(...this.product.batch.map(i => daysToPercent(i.expiration)));
        },
        statusClass() {
            const p = this.batchPercent;
            if (p === 0) return 'status-green';
            if (p <= 30) return 'status-yellow';
            if (p <= 60) return 'status-red';
            return 'status-expired';
        },
    },

    template: `
        <div class="inv-card" :class="statusClass" @click="handleCardTap">

            <div class="card-top">
                <div class="card-name">{{ product.name }}</div>
                <div class="exp-expired-label" v-if="batchPercent === 100">
                    <i class="bi bi-x-circle-fill"></i> Expired
                </div>

                <div v-if="product.batch.length > 1" class="card-batch-badge">
                    ×{{ product.batch.length }}
                    <i :class="expanded ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
                       style="font-size:0.5rem; margin-left:3px;"></i>
                </div>

                <div class="card-actions" @click.stop>
                    <button v-if="product.batch.length === 1"
                            class="edit-btn"
                            @click="$emit('edit', { product, item: product.batch[0] })">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button v-if="product.batch.length === 1"
                            class="del-btn"
                            @click="$emit('delete-product', product)">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>

            <div class="card-meta" @click.stop>
                <span class="card-qty">{{ getMaxBatchQtyPercent() }}%</span>
                <span class="card-dot"></span>
                <span class="card-category">{{ product.category }}</span>
                <label class="restock-toggle card-restock" @click.stop>
                    <input type="checkbox"
                           v-model="product.restock"
                           @change="onRestockChange"
                           class="restock-cb-hidden">
                    <div class="restock-pill" :class="{ checked: product.restock }">
                        <svg class="restock-check-icon" viewBox="0 0 20 20" fill="none">
                            <polyline class="restock-checkmark" points="3,11 8,16 17,5"></polyline>
                        </svg>
                        <input v-if="product.restock" type="number" min="1"
                               v-model.number="product.restockQty"
                               @change="$emit('restock-change')"
                               @click.stop
                               class="restock-qty-num">
                    </div>
                    <span class="restock-label">restock</span>
                </label>
            </div>

            <div class="card-exp">
                <expiration-badge variant="card" :batch="product.batch" />
            </div>

            <!-- ── Batch expansion (multi-batch only) ── -->
            <transition name="batch-expand">
                <div v-if="product.batch.length > 1 && expanded"
                     class="card-batch-list"
                     @click.stop>
                    <div v-for="item in product.batch"
                         :key="item.id"
                         class="card-batch-item">

                        <i class="bi bi-pencil-square"
                           @click="$emit('edit', { product, item })"></i>

                        <span class="batch-qty">{{ item.qty }}%</span>

                        <div class="batch-exp-wrap">
                            <expiration-badge variant="card" :item="item" />
                        </div>

                        <i class="bi bi-x-circle"
                           @click="$emit('delete-item', { item, product })"></i>
                    </div>
                </div>
            </transition>

        </div>
    `,
};

export default PantryCard;
