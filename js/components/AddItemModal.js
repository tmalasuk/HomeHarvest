
const AddItemModal = {

    name: "AddItemModal",
    data: function () {
        return {
            name: '',
            quantity: 1,
            selectedCategory: null,
            fillActive: false,
        }
    },

    props: {
        show: { type: Boolean, required: true },
        categories: { type: Array, required: true },
        defaultCategory: { type: Object, default: null },
        modalMode: { type: String, required: true },
    },

    methods: {
        resetForm() {
            this.name = '';
            this.quantity = 1;
            this.selectedCategory = this.defaultCategory;
        },

        handleClose() {
            this.resetForm();
            this.$emit('close');
        },

        handleSubmit() {
            if (!this.name.trim()) return;
            if (!this.selectedCategory) return;
            if (this.quantity < 1) return;

            this.$emit('submit', {
                name: this.name.trim(),
                category: this.selectedCategory,
                quantity: this.quantity,
                mode: this.modalMode
            });

            this.resetForm();
        },
    },

    computed: {
        qtyLabel() {
            return this.modalMode === 'pantry' ? 'Adding' : 'Quantity';
        },
        submitLabel() {
            return this.modalMode === 'pantry' ? 'Pantry' : 'List';
        },
    },
    watch: {
        defaultCategory: {
            immediate: true,
            handler(newVal) {
                this.selectedCategory = newVal;
            }
        },
        show(val) {
            if (val) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        const rect = this.$refs.svgRect;
                        if (rect) {
                            const len = Math.ceil(rect.getTotalLength()) + 2;
                            rect.style.strokeDasharray = len;
                            rect.style.strokeDashoffset = len;
                            void rect.getBoundingClientRect(); // force reflow before animating
                            rect.style.animation = 'sketch-in 0.7s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards';
                        }
                        this._fillTimer = setTimeout(() => { this.fillActive = true; }, 700);
                    }, 300); // wait for backdrop fade-in (0.3s transition)
                });
            } else {
                this.fillActive = false;
                clearTimeout(this._fillTimer);
                const rect = this.$refs.svgRect;
                if (rect) {
                    rect.style.animation = 'none';
                    rect.style.strokeDasharray = '';
                    rect.style.strokeDashoffset = '';
                }
            }
        },
    },

    template: `
        <div class="add-item-backdrop" :class="{ show: show }" @click.self="handleClose"></div>
        <div class="add-item-container" ref="container" :class="{ show: show, 'fill-active': fillActive }">
            <svg class="modal-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect class="modal-svg-rect" ref="svgRect" x="1" y="1" width="99%" height="99%" rx="18" ry="18"
                    fill="none" stroke="white" stroke-width="3"
                    stroke-dasharray="9999" stroke-dashoffset="9999"/>
            </svg>
            
            <form @submit.prevent="handleSubmit">
                <span class="close-x" @click="handleClose">&times;</span>
                <label for="addItemCategory">Category</label>
                <select v-model="selectedCategory">
                    <option v-for="category in categories" :key="category.name" :value="category">
                        {{ category.name }}
                    </option>
                </select>

                <label for="addItemName">Name</label>
                <input
                    type="text"
                    name="addItemName"
                    placeholder="Milk"
                    v-model="name"
                />

                <div class="d-flex qty mb-3">
                    <label for="addItemQty">{{ qtyLabel }}</label>
                    <input
                        type="number"
                        name="qty"
                        class="ms-auto"
                        min="1"
                        v-model.number="quantity"
                    />
                </div>

                <button class="btn" type="submit">
                    <i class="bi bi-arrow-left-circle"></i>
                    <span> Add To {{ submitLabel }}</span>
                </button>

            </form>
        </div>            
    `,
};

export default AddItemModal;