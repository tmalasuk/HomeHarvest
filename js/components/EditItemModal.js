import DurationInput from "./DurationInput.js";
import { computeExpirationDate, getDurationValueAndUnit } from "../utils.js";

const EditItemModal = {

    name: "EditItemModal",
    components: {
        DurationInput
    },

    data: function () {
        return {
            durationValue: 1,
            selectedUnitIndex: 0,
            isEditingName: false,
        }
    },

    props: {
        itemToEdit: { type: Object, default: null },
        productOfEditItem: { type: Object, default: null },
        categories: { type: Array, required: true },
        defaultCategory: { type: Object, default: null },
        units: { type: Array, required: true }
    },

    methods: {
        startEditingName() {
            this.isEditingName = true;
            this.$nextTick(() => {
                this.$refs.nameInput.focus();
                this.$refs.nameInput.select();
            });
        },

        stopEditingName() {
            this.isEditingName = false;

            if (!this.itemToEdit.name || !this.itemToEdit.name.trim()) {
                this.itemToEdit.name = this.productOfEditItem.name;
                return;
            }

            this.$emit('name-changed', {
                item: this.itemToEdit,
                product: this.productOfEditItem,
            });
        },

        onCategoryChange() {
            this.$emit('category-changed', {
                item: this.itemToEdit,
                product: this.productOfEditItem,
            });
        },

        onDurationChange() {
            this.itemToEdit.expiration = computeExpirationDate(
                this.durationValue,
                this.selectedUnit
            );
        },
    },

    computed: {
        selectedUnit() {
            return this.units[this.selectedUnitIndex];
        },
    },
    watch: {
        itemToEdit: {
            immediate: true,
            handler(newVal) {
                if (!newVal) return;
                const { value, unitIndex } = getDurationValueAndUnit(newVal.expiration);
                this.durationValue = value;
                this.selectedUnitIndex = unitIndex;
            }
        }
    },

    template: `
        <div class="modal fade" id="editItemModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" v-if="itemToEdit">

                    <!-- Header -->
                    <div class="modal-header border-0">
                        <h5 v-if="!isEditingName" class="modal-title truncate" id="editModalLabel">
                            {{ itemToEdit.name }}
                        </h5>
                        <input
                            v-else
                            ref="nameInput"
                            type="text"
                            class="form-control"
                            v-model="itemToEdit.name"
                            @blur="stopEditingName"
                            @keyup.enter="stopEditingName"
                        />
                        <i v-if="!isEditingName" class="bi bi-pencil-fill" @click="startEditingName"></i>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">

                        <!-- Qty slider -->
                        <label for="qtySlider">
                            Qty left <span>{{ itemToEdit.qty }}%</span>
                        </label>
                        <input
                            type="range"
                            id="qtySlider"
                            min="0"
                            max="100"
                            step="10"
                            list="tickmarks"
                            v-model.number="itemToEdit.qty"
                        />
                        <datalist id="tickmarks">
                            <option value="0"></option>
                            <option value="10"></option>
                            <option value="20"></option>
                            <option value="30"></option>
                            <option value="40"></option>
                            <option value="50"></option>
                            <option value="60"></option>
                            <option value="70"></option>
                            <option value="80"></option>
                            <option value="90"></option>
                            <option value="100"></option>
                        </datalist>

                        <!-- Category -->
                        <div class="row">
                            <label class="col-15" for="editItemCategory">Category</label>
                            <select class="col-25" name="editItemCategory"
                                v-model="itemToEdit.category"
                                @change="onCategoryChange">
                                <option v-for="category in categories" :key="category.name" :value="category.name">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>

                        <!-- Expiration duration -->
                        <div class="row">
                            <label class="col-20" for="editItemExp">Expiration in</label>
                            <duration-input
                                :duration="durationValue"
                                :unit-index="selectedUnitIndex"
                                :units="units"
                                @update:duration="durationValue = $event"
                                @update:unit-index="selectedUnitIndex = $event"
                                @change="onDurationChange"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `,
};

export default EditItemModal;