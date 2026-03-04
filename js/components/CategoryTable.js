const CategoryTable = {

    name: "CategoryTable",

    data: function () {
        return {
            handlingEnter: false,
        };
    },

    props: {
        categories: { type: Array, required: true },
        selectedCategoryGrocery: { type: Object, required: true },
        addingCat: { type: Boolean, required: true },
        doneAddingCat: { type: Boolean, required: true },
        shakeAC: { type: Boolean, required: true },
        invalidInput: { type: Boolean, required: true },
    },

    watch: {
        addingCat(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        const input = this.$refs['categoryInput_0'];
                        const el = Array.isArray(input) ? input[0] : input;
                        if (el) el.focus();
                    });
                });
            }
        }
    },

    methods: {
        endAddingCat(category, index) {
            if (this.handlingEnter) return; // skip blur if enter already handled it
            if (!category.name || !category.name.trim()) {
                this.$emit('invalid-cat');
                this.$nextTick(() => {
                    const input = this.$refs['categoryInput_' + index];
                    const el = Array.isArray(input) ? input[0] : input;
                    if (el) el.focus();
                });
                return;
            }
            this.$emit('end-adding-cat', { category, index });
        },

        handleEnter(category, index, event) {
            console.log('keydown fired', event.key);
            if (event.key !== 'Enter') return;
            event.preventDefault();
            this.endAddingCat(category, index);
        },
    },

    template: `
        <div class="categories">
            <header>
                <h3>Categories</h3>
                <span class="add-cat"><i class="bi bi-plus-lg icon-spin" id="addCat"
                        @click="$emit('add-category'); $nextTick(() => { const el = Array.isArray($refs['categoryInput_0']) ? $refs['categoryInput_0'][0] : $refs['categoryInput_0']; if(el) el.focus(); })"
                        v-if="!addingCat">
                    </i></span>
            </header>
            <div id="categoryTable">
                <div class="sort"
                    v-for="(category, index) in categories"
                    :key="category.id || index"
                    :data-id="category.id">

                    <div class="ac-button"
                        @click="$emit('select-category', category)"
                        :class="{
                            active: selectedCategoryGrocery === category,
                            shake: shakeAC && index === 0
                        }">

                        <span class="grip"><i class="bi bi-grip-horizontal"></i></span>

                        <input
                            type="text"
                            :class="{ 'input-error': invalidInput }"
                            v-show="addingCat && index == 0"
                            v-model="category.name"
                            :ref="'categoryInput_' + index"
                            @blur="endAddingCat(category, index)"
                            @keydown="handleEnter(category, index, $event)"
                        />

                        <span
                            :class="{ 'd-none': addingCat && !doneAddingCat && index == 0 }"
                            class="truncate">
                            {{ category.name }}
                        </span>

                        <div class="wrap">
                            <i class="bi bi-pencil-square"
                                data-bs-toggle="modal"
                                data-bs-target="#editCatModal"
                                @click.stop="$emit('edit-category', category)"
                                v-show="selectedCategoryGrocery.name != 'Misc' && !addingCat">
                            </i>
                        </div>
                    </div>

                    <!-- Mobile panel slot — parent renders CategoryPanel here via v-if -->
                    <slot :category="category" :index="index"></slot>

                </div>
            </div>
        </div>
    `,
};

export default CategoryTable;