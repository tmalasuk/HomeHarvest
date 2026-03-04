const CategoryPanel = {

    name: "CategoryPanel",

    data: function () {
        return {};
    },

    props: {
        mode: { type: String, required: true }, // 'mobile' or 'desktop'
        categoryName: { type: String, required: true },
        filteredShoppingList: { type: Array, required: true },
        saveState: { type: String, default: null },
        moveCategories: { type: Array, required: true },
        selectedCategoryMove: { type: Object, default: null },
        confirmVisible: { type: Boolean, required: true },
        confirmLabel: { type: String, required: true },
    },

    computed: {
        wrapperClass() {
            return this.mode === 'mobile' ? 'category-items-mobile' : 'category-items-desktop';
        },
    },

    template: `
        <div :class="wrapperClass">

            <!-- Header -->
            <header>
                <h3 v-if="mode === 'desktop'">{{ categoryName }}</h3>
                <button class="addItemtoGroceryListBtn" @click="$emit('open-modal')">
                    <h5><i class="bi bi-plus-lg icon-spin"></i><span>Item</span></h5>
                </button>
                <div class="action-group">
                    <button class="mode-btn mode-delete"
                        :class="{ active: saveState === 'delete' }"
                        @click="$emit('change-save-state', 'delete')"
                        title="Delete mode">
                        <i class="bi bi-trash3"></i>
                    </button>
                    <button class="mode-btn mode-move"
                        :class="{ active: saveState === 'move' }"
                        @click="$emit('change-save-state', 'move')"
                        title="Move mode">
                        <i class="bi bi-arrow-left-right"></i>
                    </button>
                </div>
            </header>

            <!-- Move destination row -->
            <div class="move-dest-row" :class="{ visible: saveState === 'move' }">
                <span class="move-dest-label">Move to</span>
                <select name="chooseMoveCat"
                    class="move-dest-select"
                    :value="selectedCategoryMove ? selectedCategoryMove.name : ''"
                    @change="$emit('update:selected-category-move', moveCategories.find(c => c.name === $event.target.value))">
                    <option v-for="cat in moveCategories" :key="cat.name" :value="cat.name">
                        {{ cat.name }}
                    </option>
                </select>
            </div>

            <!-- Grocery list -->
            
                <div class="grocery-list" :class="{ 'mode-active': saveState !== null }">
                    <div class="grocery-item"
                        v-for="product in filteredShoppingList"
                        :key="product.id">
                        <div class="row">
                            <input
                                v-model="product.action"
                                class="changing-checkbox col-3"
                                :class="saveState === 'delete' ? 'red' : 'yellow'"
                                type="checkbox"
                            />
                            <p class="col-27 truncate">{{ product.name }}</p>
                            <div class="item-count col-10">
                                <i class="bi bi-dash" @click="$emit('qty-decrease', product)"></i>
                                <p class="number">{{ product.qty }}</p>
                                <i class="bi bi-plus" @click="$emit('qty-increase', product)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            

            <!-- Confirm bar -->
            <div class="confirm-bar"
                :class="[{ visible: confirmVisible }, saveState ? 'mode-' + saveState : '']">
                <button class="confirm-btn" @click="$emit('run-action')">
                    <i :class="saveState === 'delete' ? 'bi bi-trash3' : 'bi bi-arrow-left-right'"></i>
                    <span class="confirm-label">{{ confirmLabel }}</span>
                </button>
            </div>
            

        </div>
    `,
};

export default CategoryPanel;