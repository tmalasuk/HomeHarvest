
const AddItemModal = {

    name: "AddItemModal",
    data: function () {
        return {
            name: '',
            quantity: 1,
            selectedCategory: null,
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
        }
    },

    template: `
        <div class="add-item-container" :class="{ show: show }">
            <span class="close-x" @click="handleClose">&times;</span>
            <form @submit.prevent="handleSubmit">

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