import GridItem from "./ShopGridItem.js";
import CategoryPanel from "./CategoryPanel.js";

const ShopSection = {

    name: "ShopSection",

    components: {
        GridItem,
        CategoryPanel,
    },

    props: {
        sortedByCat: { type: Array, required: true },
        addingCat: { type: Boolean, required: true },
        invalidInput: { type: Boolean, required: true },
        categories: { type: Array, required: true },
        filteredShoppingList: { type: Array, required: true },
        saveState: { type: String, default: null },
        moveCategories: { type: Array, required: true },
        selectedCategoryMove: { type: Object, default: null },
        confirmVisible: { type: Boolean, required: true },
        confirmLabel: { type: String, required: true },
        selectedCategoryGrocery: { type: Object, default: () => ({ name: '' }) },
        isDesktop: { type: Boolean, required: true },
        isMobile: { type: Boolean, required: true },
        hasBought: { type: Boolean, default: false },
        units: { type: Array, required: true },
    },

    data: function () {
        return {
            organizeMode: false,
            showEmptyCats: false,
        };
    },

    methods: {
        toggleOrganizeMode() {
            if (!this.organizeMode) {
                // Phase 1 — collapse item-lists, nothing moves
                const items = [...document.querySelectorAll('#grocery-grid .grid-item')];
                const firsts = items.map(el => el.getBoundingClientRect());
                const itemLists = [...document.querySelectorAll('#grocery-grid .item-list')];

                itemLists.forEach(el => {
                    el.style.maxHeight = el.scrollHeight + 'px';
                    el.style.overflow = 'hidden';
                    el.getBoundingClientRect();
                    el.style.transition = 'max-height 0.4s ease, opacity 0.25s ease';
                    el.style.maxHeight = '0';
                    el.style.opacity = '0';
                });

                // Phase 2 — after lists are gone, apply layout change and FLIP
                setTimeout(() => {
                    this.organizeMode = true;

                    this.$nextTick(() => {
                        itemLists.forEach(el => {
                            el.style.maxHeight = '';
                            el.style.opacity = '';
                            el.style.transition = '';
                            el.style.overflow = '';
                        });

                        const lasts = items.map(el => el.getBoundingClientRect());
                        items.forEach((el, i) => {
                            const dx = firsts[i].left - lasts[i].left;
                            const dy = firsts[i].top - lasts[i].top;
                            const delay = i * 0.03;
                            const easing = `cubic-bezier(0.34, 1.1, 0.64, 1) ${delay}s`;

                            el.style.transition = 'none';
                            el.style.transform = `translate(${dx}px, ${dy}px)`;
                            el.getBoundingClientRect();
                            el.style.transition = [
                                `transform 0.55s ${easing}`,
                                `background-color 0.45s ease ${delay}s`,
                                `box-shadow 0.45s ease ${delay}s`,
                                `border-radius 0.4s ease ${delay}s`,
                                `margin-bottom 0.4s ease ${delay}s`,
                            ].join(', ');
                            el.style.transform = '';

                            el.addEventListener('transitionend', function handler(e) {
                                if (e.propertyName === 'transform') {
                                    el.style.transition = '';
                                    el.removeEventListener('transitionend', handler);
                                }
                            });
                        });

                        // Phase 3 — after FLIP completes, slide in header + empty categories
                        const flipDuration = (items.length > 0 ? (items.length - 1) * 0.03 + 0.55 : 0) * 1000;
                        setTimeout(() => {
                            this.showEmptyCats = true;
                            this.$nextTick(() => {
                                const header = document.querySelector('.shopping-list .organize-header');
                                const emptyCats = [...document.querySelectorAll('#grocery-grid .empty-cat')];
                                const toAnimate = [header, ...emptyCats].filter(Boolean);

                                toAnimate.forEach((el, i) => {
                                    const h = el.scrollHeight;
                                    el.style.maxHeight = '0';
                                    el.style.opacity = '0';
                                    el.style.overflow = 'hidden';
                                    el.getBoundingClientRect();
                                    el.style.transition = `max-height 0.3s ease ${i * 0.05}s, opacity 0.25s ease ${i * 0.05}s`;
                                    el.style.maxHeight = h + 'px';
                                    el.style.opacity = '1';
                                    el.addEventListener('transitionend', function handler(e) {
                                        if (e.propertyName === 'max-height') {
                                            el.style.maxHeight = '';
                                            el.style.opacity = '';
                                            el.style.transition = '';
                                            el.style.overflow = '';
                                            el.removeEventListener('transitionend', handler);
                                        }
                                    });
                                });

                                // Enable drag-to-sort on category headers
                                const vm = this;
                                $('#grocery-grid').sortable({
                                    items: '> div',
                                    handle: '.grip',
                                    axis: 'y',
                                    stop() {
                                        const sortedIds = $('#grocery-grid').children('div').map((_, el) => parseInt($(el).attr('data-id'))).get();
                                        const newCategories = [];
                                        sortedIds.forEach(id => {
                                            const cat = vm.categories.find(c => c.id === id);
                                            if (cat) newCategories.push(cat);
                                        });
                                        if (newCategories.length === vm.categories.length) {
                                            vm.$emit('reorder-categories', newCategories);
                                        }
                                        vm.$nextTick(() => $('#grocery-grid').sortable('refresh'));
                                    }
                                });
                            });
                        }, flipDuration + 60);
                    });
                }, 420);

            } else {
                this.$emit('update:selectedCategoryGrocery', { name: '' });

                // Wait for category panel slide-right transition (0.35s) to finish
                setTimeout(() => {
                // EXITING
                if ($('#grocery-grid').data('ui-sortable')) {
                    $('#grocery-grid').sortable('destroy');
                }

                // Phase 1 — collapse empty cats instantly, suppress item-lists so layout
                // change doesn't cause a jump, then capture FIRST positions
                this.showEmptyCats = false;
                const items = [...document.querySelectorAll('#grocery-grid .grid-item:not(.empty-cat)')];
                const itemLists = [...document.querySelectorAll('#grocery-grid .item-list')];
                const firsts = items.map(el => el.getBoundingClientRect());

                itemLists.forEach(el => {
                    el.style.maxHeight = '0';
                    el.style.overflow = 'hidden';
                    el.style.opacity = '0';
                });

                // Phase 2 — apply layout change then FLIP grid items to new positions
                this.organizeMode = false;

                this.$nextTick(() => {
                    const lasts = items.map(el => el.getBoundingClientRect());
                    const flipDuration = (items.length > 0 ? (items.length - 1) * 0.03 + 0.55 : 0) * 1000;

                    items.forEach((el, i) => {
                        const dx = firsts[i].left - lasts[i].left;
                        const dy = firsts[i].top - lasts[i].top;
                        const delay = i * 0.03;
                        const easing = `cubic-bezier(0.34, 1.1, 0.64, 1) ${delay}s`;

                        el.style.transition = 'none';
                        el.style.transform = `translate(${dx}px, ${dy}px)`;
                        el.getBoundingClientRect();
                        el.style.transition = [
                            `transform 0.55s ${easing}`,
                            `background-color 0.45s ease ${delay}s`,
                            `box-shadow 0.45s ease ${delay}s`,
                            `border-radius 0.4s ease ${delay}s`,
                            `margin-bottom 0.4s ease ${delay}s`,
                        ].join(', ');
                        el.style.transform = '';

                        el.addEventListener('transitionend', function handler(e) {
                            if (e.propertyName === 'transform') {
                                el.style.transition = '';
                                el.removeEventListener('transitionend', handler);
                            }
                        });
                    });

                    // Phase 3 — after FLIP completes, slide item-lists back in
                    setTimeout(() => {
                        itemLists.forEach(el => {
                            el.style.transition = 'max-height 0.4s ease, opacity 0.25s ease';
                            el.style.maxHeight = el.scrollHeight + 'px';
                            el.style.opacity = '1';
                            el.addEventListener('transitionend', function handler(e) {
                                if (e.propertyName === 'max-height') {
                                    el.style.maxHeight = '';
                                    el.style.opacity = '';
                                    el.style.transition = '';
                                    el.style.overflow = '';
                                    el.removeEventListener('transitionend', handler);
                                }
                            });
                        });

                    }, flipDuration + 60);
                });
                }, 500);
            }
        },
    },

    template: `
        <div id="shopSection" class="section active">

            <div class="shop-toolbar">
                <button class="organize-toggle" :class="{ active: organizeMode }" @click="toggleOrganizeMode">
                    <i class="bi bi-sliders"></i><span>Organize</span>
                </button>
                
                <div class="action-container">
                    <div class="action-center" v-if="!organizeMode">
                        <div class="checkbox-container">
                            <input type="checkbox" name="checkAll" id="check-all-off" @click="$emit('check-all')">
                            <label for="check-all-off">Check All Items</label>
                        </div>
                        <span id="print-list"><i class="bi bi-printer"></i></span>
                    </div>
                    <transition name="toolbar-btn">
                        <button v-if="hasBought && !organizeMode" class="add-to-pantry-btn" @click="$emit('add-to-pantry')">
                            <i class="bi bi-arrow-right-circle"></i><span>Add &#10004; to pantry</span>
                        </button>
                    </transition>
                </div>
                <button id="addItemBtn" @click="$emit('add-item')">
                    <i class="bi bi-plus-lg"></i>Item
                </button>
            </div>

            

            <div class="organize-layout">
                <div class="shopping-list" :class="{ 'organize-active': organizeMode }">
                    <div class="organize-header" v-if="showEmptyCats">
                        <h3>Categories</h3>
                        <i class="bi bi-plus-lg icon-spin"
                            v-if="!addingCat"
                            @click="$emit('add-category')">
                        </i>
                    </div>
                    <div class="grid" id="grocery-grid">
                        <grid-item
                            :sorted-by-cat="sortedByCat"
                            :categories="categories"
                            :filtered-shopping-list="filteredShoppingList"
                            :save-state="saveState"
                            :move-categories="moveCategories"
                            :selected-category-move="selectedCategoryMove"
                            :confirm-visible="confirmVisible"
                            :confirm-label="confirmLabel"
                            :organize-mode="organizeMode"
                            :show-empty-cats="showEmptyCats"
                            :adding-cat="addingCat"
                            :invalid-input="invalidInput"
                            :selected-category-grocery="selectedCategoryGrocery"
                            :is-desktop="isDesktop"
                            :is-mobile="isMobile"
                            :units="units"
                            @select-category="$emit('select-category', $event)"
                            @end-adding-cat="$emit('end-adding-cat', $event)"
                            @edit-category="$emit('edit-category', $event)"
                            @change-save-state="$emit('change-save-state', $event)"
                            @update-move-category="$emit('update-move-category', $event)"
                            @run-action="$emit('run-action')"
                            @qty-increase="$emit('qty-increase', $event)"
                            @qty-decrease="$emit('qty-decrease', $event)"
                            @update-expiration="$emit('update-expiration', $event)">
                        </grid-item>
                    </div>
                </div>
                <transition name="slide-right">
                    <category-panel
                        v-if="isDesktop && organizeMode && selectedCategoryGrocery && selectedCategoryGrocery.name"
                        mode="desktop"
                        :category-name="selectedCategoryGrocery.name"
                        :filtered-shopping-list="filteredShoppingList"
                        :save-state="saveState"
                        :move-categories="moveCategories"
                        :selected-category-move="selectedCategoryMove"
                        :confirm-visible="confirmVisible"
                        :confirm-label="confirmLabel"
                        @change-save-state="$emit('change-save-state', $event)"
                        @update-move-category="$emit('update-move-category', $event)"
                        @run-action="$emit('run-action')">
                    </category-panel>
                </transition>
            </div>
        </div>
    `,
};

export default ShopSection;
