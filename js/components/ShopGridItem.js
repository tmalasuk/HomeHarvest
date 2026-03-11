import CategoryPanel from "./CategoryPanel.js";
import DurationInput from "./DurationInput.js";

const ShopGridItem = {

    name: "ShopGridItem",

    components: { CategoryPanel, DurationInput },

    props: {
        sortedByCat: { type: Array, required: true },
        categories: { type: Array, required: true },
        filteredShoppingList: { type: Array, required: true },
        saveState: { type: String, default: null },
        moveCategories: { type: Array, required: true },
        selectedCategoryMove: { type: Object, default: null },
        confirmVisible: { type: Boolean, required: true },
        confirmLabel: { type: String, required: true },
        organizeMode: { type: Boolean, required: true },
        showEmptyCats: { type: Boolean, required: true },
        addingCat: { type: Boolean, required: true },
        invalidInput: { type: Boolean, required: true },
        selectedCategoryGrocery: { type: Object, default: () => ({ name: '' }) },
        isDesktop: { type: Boolean, required: true },
        isMobile: { type: Boolean, required: true },
        units: { type: Array, required: true },
    },

    emits: [
        'select-category',
        'end-adding-cat',
        'edit-category',
        'change-save-state',
        'update-move-category',
        'run-action',
        'qty-increase',
        'qty-decrease',
        'update-expiration',
    ],

    data() {
        return { flashIndex: null };
    },

    methods: {
        handleCategoryClick(cat, index) {
            this.$emit('select-category', cat);
            this.flashIndex = index;
            setTimeout(() => { this.flashIndex = null; }, 450);
        },
    },

    template: `
        <div v-for="(cat, index) in sortedByCat" :key="cat.id" :data-id="cat.id">
            <div class="grid-item"
                    v-if="cat.products.length != 0 || showEmptyCats"
                    :class="{ 'empty-cat': cat.products.length === 0 }">
                <div class="sort-box">
                    <div class="category-header" :class="{ 'cat-flash': flashIndex === index }" @click="handleCategoryClick(cat, index)">
                        <span class="grip" v-if="organizeMode && !addingCat" @click.stop><i class="bi bi-grip-horizontal"></i></span>
                        <input
                            v-show="addingCat && index === 0"
                            type="text"
                            :class="{ 'input-error': invalidInput }"
                            ref="shopCatInput"
                            v-model="categories[index].name"
                            placeholder="Category name"
                            @blur="$emit('end-adding-cat', { category: categories[index], index })"
                            @keydown.enter.prevent="$emit('end-adding-cat', { category: categories[index], index })" />
                        <span :class="{ 'd-none': addingCat && index === 0 , 'active-header': selectedCategoryGrocery.name == cat.name}">{{cat.name}}</span>
                        <div class="wrap">
                            <!-- TODO: make modal a component -->
                            <i class="bi bi-pencil-square"
                                data-bs-toggle="modal"
                                data-bs-target="#editCatModal"
                                @click.stop="$emit('edit-category', categories.find(c => c.id === cat.id))"
                                v-show="organizeMode && cat.name !== 'Misc' && !addingCat">
                            </i>
                        </div>
                    </div>
                    <category-panel
                        v-if="isMobile && organizeMode && selectedCategoryGrocery.name === cat.name"
                        :mode="'mobile'"
                        :category-name="cat.name"
                        :filtered-shopping-list="filteredShoppingList"
                        :save-state="saveState"
                        :move-categories="moveCategories"
                        :selected-category-move="selectedCategoryMove"
                        :confirm-visible="confirmVisible"
                        :confirm-label="confirmLabel"
                        @update-move-category="$emit('update-move-category', $event)"
                        @change-save-state="$emit('change-save-state', $event)"
                        @run-action="$emit('run-action')">
                    </category-panel>
                </div>

                <!-- what appears when organize isn't clicked  -->
                <ul class="item-list">
                    <li v-for="product in cat.products" :key="product.id">
                        <label class="circle-check">
                            <input class="check-me-off" v-model="product.bought"
                                type="checkbox">
                            <span class="circle"></span>
                            <span class="item-name"
                                :class="{'checked': product.bought}">{{product.name}}</span>
                        </label>
                        <transition name="item-swap" mode="out-in">
                            <div class="item-count" v-if="!product.bought" :key="'qty'">
                                <i class="bi bi-dash" @click="$emit('qty-decrease', product)"></i>
                                <p class="number">{{product.qty}}</p>
                                <i class="bi bi-plus" @click="$emit('qty-increase', product)"></i>
                            </div>
                            <duration-input
                                v-else
                                :key="'exp'"
                                :duration="product.durationValue"
                                :unit-index="product.selectedUnit"
                                :units="units"
                                track-width="80px"
                                @update:duration="product.durationValue = $event; $emit('update-expiration', product)"
                                @update:unit-index="product.selectedUnit = $event; $emit('update-expiration', product)"
                            />
                        </transition>
                    </li>
                </ul>
            </div>
        </div>
    `,
};

export default ShopGridItem;
