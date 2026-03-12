import ExpirationBadge from "./ExpirationBadge.js";

const PantryRow = {

    name: "PantryRow",

    components: { ExpirationBadge },

    data: function () {
        return {};
    },

    props: {
        product: { type: Object, required: true },
        isMobile: { type: Boolean, required: true },
        index: { type: Number, required: true },
    },

    methods: {
        toggleBatchOpen() {
            this.product.isOpen = !this.product.isOpen;
        },

        onRestockChange() {
            if (this.product.restock && !this.product.restockQty) {
                this.product.restockQty = 1;
            }
            this.$emit('restock-change');
            if (this.product.restock) {
                this.$nextTick(() => {
                    this.$el.querySelector('.restock-qty-num')?.focus();
                });
            }
        },

        getMaxBatchQtyPercent() {
            if (!this.product.batch || this.product.batch.length === 0) return 0;
            return Math.max(...this.product.batch.map(b => b.qty || 0));
        },
    },

    template: `
        <div class="product">

            <!-- Main row -->
            <div :class="{
                'row': true,
                'align-items-center': true,
                'py-2 td': true,
                'batch-header-open': product.isOpen
            }">

                <!-- Edit / Batch toggle -->
                <div class="col-1 edit dropdown" v-if="product.batch.length > 1"
                    @click="toggleBatchOpen">
                    <i :class="product.isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                </div>
                <div class="col-1 edit" v-else
                    @click="$emit('edit', { product, item: product.batch[0] })">
                    <i class="bi bi-pencil-square edit"></i>
                </div>

                <!-- Name -->
                <div class="col-md-13 col-12 truncate">
                    {{ product.name + " " }}
                    <span v-if="product.batch.length > 1">(x{{ product.batch.length }})</span>
                </div>

                <!-- Qty -->
                <div class="col-md-4 col-6">
                    <div v-if="!product.isOpen" class="qty">{{ getMaxBatchQtyPercent() }}%</div>
                </div>

                <!-- Expiration progress bar -->
                <div class="col-md-7 col-10">
                    <expiration-badge v-if="!product.isOpen" :batch="product.batch" />
                </div>

                <!-- Category -->
                <div class="col-md-7 col-0">{{ product.category }}</div>

                <!-- Trash -->
                <div class="col-md-3 col-4 trash">
                    <div v-if="!isMobile && product.batch.length == 1"
                        class="delete-btn"
                        @click="$emit('delete-product', product)">
                        <svg viewBox="0 0 35.6 35.6">
                            <rect class="bg" x="0" y="0" width="35.6" height="35.6" rx="4" ry="4"></rect>
                            <line class="x-line" x1="11" y1="11" x2="24.6" y2="24.6"></line>
                            <line class="x-line" x1="24.6" y1="11" x2="11" y2="24.6"></line>
                        </svg>
                    </div>
                    <div v-if="isMobile && product.batch.length == 1"
                        @click="$emit('delete-product', product)">
                        <i class="bi bi-x-circle"></i>
                    </div>
                </div>

                <!-- Restock -->
                <div class="col-md-3 col-4 restock">
                    <label class="restock-toggle" @click.stop>
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
                    </label>
                </div>

                <div class="col-md-0 col-3"></div>
            </div>

            <!-- Batch rows -->
            <transition name="slide"
                v-if="product.batch.length > 1"
                v-for="(item) in product.batch"
                :key="item.id"
                :class="'batch-content-' + product.name"
                v-show="product.isOpen">
                <div class="row batch-row">
                    <div class="col-40">
                        <div class="row align-items-center py-2">

                            <!-- Edit -->
                            <div class="col-1 edit">
                                <i class="bi bi-pencil-square edit"
                                    @click="$emit('edit', { product, item })">
                                </i>
                            </div>

                            <!-- Name -->
                            <div class="col-md-13 col-10">{{ product.name }}</div>

                            <!-- Qty -->
                            <div class="col-md-4 col-8">
                                <div class="qty">{{ item.qty }}%</div>
                            </div>

                            <!-- Expiration progress bar -->
                            <div class="col-md-7 col-10">
                                <expiration-badge :item="item" />
                            </div>

                            <!-- Category -->
                            <div class="col-md-7 col-0">{{ item.category }}</div>

                            <!-- Trash -->
                            <div class="col-md-3 col-4 trash">
                                <div class="delete-btn" @click="$emit('delete-item', { item, product })">
                                    <svg viewBox="0 0 35.6 35.6">
                                        <rect class="bg" x="0" y="0" width="35.6" height="35.6" rx="4" ry="4"></rect>
                                        <line class="x-line" x1="11" y1="11" x2="24.6" y2="24.6"></line>
                                        <line class="x-line" x1="24.6" y1="11" x2="11" y2="24.6"></line>
                                    </svg>
                                </div>
                            </div>

                            <div class="col-md-3 col-4"></div>
                        </div>
                    </div>
                </div>
            </transition>

        </div>
    `,
};

export default PantryRow;
