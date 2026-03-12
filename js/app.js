import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import AddItemModal from "./components/AddItemModal.js";
import PantryTable from "./components/PantryTable.js";
import EditItemModal from "./components/EditItemModal.js";
import CategoryPanel from "./components/CategoryPanel.js";
import ThemeToggle from "./components/ThemeToggle.js";
import ShopSection from "./components/ShopSection.js";
import { computeExpirationDate } from "./utils.js";

const app = createApp({
    components: {
        AddItemModal,
        PantryTable,
        EditItemModal,
        CategoryPanel,
        ThemeToggle,
        ShopSection,
    },
    // data: all the data for the app
    data: function () {
        return {
            //objects
            categories: [
                { id: 1, name: 'Produce', products: [] },
                { id: 2, name: 'Dairy', products: [] },
                { id: 3, name: 'Meat', products: [] },
                { id: 4, name: 'Grains', products: [] },
                { id: 5, name: 'Frozen', products: [] },
                { id: 6, name: 'Canned Goods', products: [] },
                { id: 7, name: 'Snacks', products: [] },
                { id: 8, name: 'Misc', products: [] },
            ],

            pantry: {
                products: [
                    {
                        id: 1, name: 'Milk', category: 'Dairy', restock: false, isOpen: false, batch: [
                            { id: 1, name: 'Milk', category: 'Dairy', dateAdded: new Date("2026-02-20"), expiration: new Date("2026-03-15"), qty: 10 },
                            { id: 2, name: 'Milk', category: 'Dairy', dateAdded: new Date("2026-02-20"), expiration: new Date("2026-03-15"), qty: 100 },

                        ]
                    },
                    {
                        id: 2, name: 'Yogurt', category: 'Dairy', isOpen: false, restock: true, restockQty: 3, batch: [
                            {
                                id: 1, name: 'Yogurt', category: 'Dairy', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-20"), qty: 100,
                            }
                        ]
                    },
                    {
                        id: 4, name: 'Bread', category: 'Grains', isOpen: false, restock: true, restockQty: 2, batch: [
                            {
                                id: 1, name: 'Bread', category: 'Grains', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-16"), qty: 50,
                            }
                        ]
                    },
                    {
                        id: 4, name: 'Apple', category: 'Produce', isOpen: false, restock: false, batch: [

                            { id: 1, name: 'Apple', category: 'Produce', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-14"), qty: 100 },
                            { id: 2, name: 'Apple', category: 'Produce', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-14"), qty: 100, },
                            { id: 3, name: 'Apple', category: 'Produce', dateAdded: new Date("2026-02-18"), expiration: new Date("2027-03-16"), qty: 100, },
                            { id: 4, name: 'Apple', category: 'Produce', dateAdded: new Date("2026-02-18"), expiration: new Date("2027-03-16"), qty: 100, },

                        ]
                    },
                    {
                        id: 4, name: 'Chicken', category: 'Meat', isOpen: false, restock: false, batch: [
                            {
                                id: 1, name: 'Chicken', category: 'Meat', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-12"), qty: 100,
                            }
                        ]
                    },
                    {
                        id: 4, name: 'Strawberries', category: 'Produce', isOpen: false, restock: true, restockQty: 4, batch: [
                            {
                                id: 1, name: 'Strawberries', category: 'Produce', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-14"), qty: 30,
                            }
                        ]
                    },
                ]
            },

            shoppingList: {
                products: [
                    //Dairy
                    { id: 1, name: 'Eggs', qty: 2, category: 'Dairy', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 2, name: 'Coffee Creamer', qty: 1, category: 'Dairy', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 3, name: 'Sour Cream', qty: 1, category: 'Dairy', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 4, name: 'String Cheese', qty: 2, category: 'Dairy', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    // Produce        
                    { id: 5, name: 'Apples', qty: 6, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 6, name: 'Peppers', qty: 3, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 7, name: 'Mushrooms', qty: 1, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 8, name: 'Carrots', qty: 1, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 9, name: 'Onions', qty: 1, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 10, name: 'Grapes', qty: 1, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 11, name: 'Kiwi', qty: 1, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 12, name: 'Onions', qty: 1, category: 'Produce', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    // Meat
                    { id: 13, name: 'Ground Beef', qty: 2, category: 'Meat', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    // Grains 
                    { id: 14, name: 'Rice', qty: 1, category: 'Grains', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 15, name: 'Spaghetti Noodles', qty: 1, category: 'Grains', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 16, name: 'Quinoa', qty: 1, category: 'Grains', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    // Frozen
                    { id: 17, name: 'Pizza', qty: 2, category: 'Frozen', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 18, name: 'Waffles', qty: 2, category: 'Frozen', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 19, name: 'Ice Cream', qty: 2, category: 'Frozen', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 20, name: 'Chicken Nuggets', qty: 2, category: 'Frozen', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    // Canned Goods
                    { id: 21, name: 'Black Beans', qty: 4, category: 'Canned Goods', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 22, name: 'Crushed Tomatoes', qty: 4, category: 'Canned Goods', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    // Snacks
                    { id: 23, name: 'Chips', qty: 3, category: 'Snacks', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 24, name: 'Goldfish', qty: 3, category: 'Snacks', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 25, name: 'Triscuits', qty: 3, category: 'Snacks', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 26, name: 'Crackers', qty: 3, category: 'Snacks', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                    { id: 27, name: 'Oreos', qty: 3, category: 'Snacks', expiration: new Date('2026-02-18'), action: false, bought: false, durationValue: 2, selectedUnit: 1 },
                ]
            },
            //
            //new objects
            newCategory: {
                name: ''
            },
            //
            // general
            searchQuery: '',
            isDesktop: window.innerWidth >= 1400,
            isMobile: window.innerWidth < 1400,
            //edit item modal
            itemToEdit: null,
            productOfEditItem: null,
            units: ['day(s)', 'week(s)', 'month(s)', 'year(s)'],
            //
            // add item modal
            modalMode: 'pantry',
            defaultCategory: null,
            showAddModal: false,
            selectedCategory: null,
            //
            // grocery -organize
            selectedCategoryGrocery: {
                name: ''
            },
            selectedCategoryMove: null,
            showCategoryDropdown: false,
            restockShoppingList: [],
            saveState: null,
            //
            editCategoryName: '',
            addingCat: false,
            doneAddingCat: false,
            shakeAC: false,
            invalidInput: false,
            checkAll: false,
        };
    },

    // methods: usually "events" triggered by v-on:
    methods: {

        editProduct(product, item) {
            this.itemToEdit = item;
            this.productOfEditItem = product;

            this.$nextTick(() => {
                const modalEl = document.getElementById('editItemModal');
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.show();
            });
        },

        categoryChanged() {
            if (this.itemToEdit.category != this.productOfEditItem.category) {
                let oldProduct = this.productOfEditItem;
                const indexInBatch = this.productOfEditItem.batch.findIndex(b => b.id === this.itemToEdit.id);
                if (indexInBatch !== -1) {
                    const [movedItem] = this.productOfEditItem.batch.splice(indexInBatch, 1);

                    let targetProduct = this.pantry.products.find(p =>
                        p.name === movedItem.name && p.category === movedItem.category
                    );

                    if (targetProduct) {
                        this.productOfEditItem = targetProduct
                        targetProduct.batch.push(movedItem);
                    } else {
                        const newProductId = this.pantry.products.length
                            ? Math.max(...this.pantry.products.map(p => p.id)) + 1
                            : 1;
                        targetProduct = {
                            id: newProductId,
                            name: movedItem.name,
                            category: movedItem.category,
                            restock: false,
                            restockQty: 1,
                            isOpen: false,
                            batch: [movedItem]
                        };


                        const originalProductIndex = this.pantry.products.findIndex(p => p.id === this.productOfEditItem.id);
                        if (originalProductIndex !== -1) {
                            this.pantry.products.splice(originalProductIndex + 1, 0, targetProduct);
                            this.productOfEditItem = targetProduct
                        } else {
                            this.pantry.products.push(targetProduct);
                            this.productOfEditItem = targetProduct
                        }
                    }

                    if (oldProduct.batch.length === 0) {
                        const indexProduct = this.pantry.products.findIndex(p => p.id === oldProduct.id);
                        if (indexProduct !== -1) {
                            this.pantry.products.splice(indexProduct, 1);
                        }
                    }
                    else if (oldProduct.batch.length === 1) {
                        oldProduct.isOpen = false;
                    }
                }
            }
        },

        stopEditingName(item, product) {
            let oldProduct = product;
            const indexInBatch = product.batch.findIndex(b => b.id === item.id);

            if (indexInBatch !== -1) {
                const [movedItem] = product.batch.splice(indexInBatch, 1);

                let targetProduct = this.pantry.products.find(p =>
                    p.name === movedItem.name && p.category === movedItem.category
                );

                if (targetProduct) {
                    this.productOfEditItem = targetProduct;
                    targetProduct.batch.push(movedItem);
                } else {
                    const newProductId = this.pantry.products.length
                        ? Math.max(...this.pantry.products.map(p => p.id)) + 1
                        : 1;
                    targetProduct = {
                        id: newProductId,
                        name: movedItem.name,
                        category: movedItem.category,
                        restock: false,
                        restockQty: 1,
                        isOpen: false,
                        batch: [movedItem]
                    };

                    const originalProductIndex = this.pantry.products.findIndex(p => p.id === oldProduct.id);
                    if (originalProductIndex !== -1) {
                        this.pantry.products.splice(originalProductIndex + 1, 0, targetProduct);
                        this.productOfEditItem = targetProduct;
                    } else {
                        this.pantry.products.push(targetProduct);
                        this.productOfEditItem = targetProduct;
                    }
                }

                if (oldProduct.batch.length === 0) {
                    const indexProduct = this.pantry.products.findIndex(p => p.id === oldProduct.id);
                    if (indexProduct !== -1) {
                        this.pantry.products.splice(indexProduct, 1);
                    }
                } else if (oldProduct.batch.length === 1) {
                    oldProduct.isOpen = false;
                }
            }
        },

        deleteProduct(product) {
            const index = this.pantry.products.findIndex(p => p === product);
            if (index !== -1) this.pantry.products.splice(index, 1);
        },

        deleteItem(item, product) {
            const productIndex = this.pantry.products.findIndex(
                p => p.name === product.name
            )
            const targetProduct = this.pantry.products[productIndex]
            const itemIndex = targetProduct.batch.findIndex(
                i => i.name === item.name
            )
            targetProduct.batch.splice(itemIndex, 1)

            if (targetProduct.batch.length === 0) {
                this.pantry.products.splice(productIndex, 1)
            }
            else if (targetProduct.batch.length === 1) {
                targetProduct.isOpen = false
            }
        },


        openAddModal(mode) {
            if (this.addingCat) {
                this.categories.splice(0, 1);
                this.addingCat = false;
                this.invalidInput = false;
            }
            this.modalMode = mode

            this.defaultCategory = mode === 'pantry'
                ? (this.selectedCategory ?? this.categories.find(c => c.name === 'Misc'))
                : (this.selectedCategoryGrocery ?? this.categories.find(c => c.name === 'Misc'));

            this.showAddModal = true;
        },

        handleAddItem({ name, category, quantity, mode }) {
            if (mode === 'pantry') {
                this.addToPantry(name, category, quantity);
            } else {
                this.addToShoppingList(name, category, quantity);
            }
        },

        addToPantry(name, category, quantity) {
            let matchProduct = this.pantry.products.find(p => p.name === name && p.category === category.name);
            const newItems = [];
            const now = new Date();

            for (let i = 0; i < quantity; i++) {
                newItems.push({
                    id: crypto.randomUUID(),
                    name: name,
                    category: category.name,
                    dateAdded: now,
                    expiration: new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000) * 2), // 7 days default
                    qty: 100
                });
            }

            if (matchProduct) {
                matchProduct.batch.unshift(...newItems);
            } else {
                const newProduct = {
                    id: crypto.randomUUID(),
                    name: name,
                    category: category.name,
                    restock: false,
                    restockQty: 1,
                    isOpen: false,
                    batch: newItems
                };
                this.pantry.products.unshift(newProduct);
            }

            this.showAddModal = false;
        },

        addToShoppingList(name, newCategory, quantity) {
            let matchItem = null
            for (const category of this.sortedByCat) {
                matchItem = category.products.find(
                    p => p.name === name && p.category === newCategory.name
                );
                if (matchItem) break;
            }

            if (matchItem) {
                matchItem.qty += quantity

            }
            else {
                let newThing = ({
                    id: crypto.randomUUID(),
                    name: name,
                    qty: quantity,
                    category: newCategory.name,
                    expiration: null,
                    action: false,
                    bought: false,
                    durationValue: 2,
                    selectedUnit: 1,
                })
                this.shoppingList.products = [...this.shoppingList.products, newThing];
            }

            this.showAddModal = false;
        },

        toggleCategoryDropdown() {
            this.showCategoryDropdown = !this.showCategoryDropdown
        },

        selectCategory(category) {
            this.selectedCategory = category;
            this.showCategoryDropdown = false
        },

        selectCategoryGrocery(category) {
            if (this.selectedCategoryGrocery && this.selectedCategoryGrocery.id === category.id) {
                this.selectedCategoryGrocery = { name: '' };
            }
            else {
                this.selectedCategoryGrocery = category;
                this.editCategoryName = category.name;
            }
        },


        lowerQty(product) {
            if (product.qty > 1) {
                product.qty--
            }
            else {
                return;
            }
        },

        increaseQty(product) {
            product.qty++
        },

        handleResize() {
            this.isDesktop = window.innerWidth >= 1400;
            this.isMobile = window.innerWidth < 1400;
        },

        updateRestockShoppingList() {
            this.restockShoppingList = this.pantry.products
                .filter(p => p.restock === true)
                .map(item => ({
                    id: crypto.randomUUID(),
                    name: item.name,
                    category: item.category,
                    qty: item.restockQty || 1,
                    notes: '',
                    originalPantryItem: item,
                    action: false,
                    bought: false,
                    durationValue: 2,
                    selectedUnit: 1,
                }));
        },

        updateMoveCat(catName){
            this.selectedCategoryMove = this.categories.find(c => c.name == catName)
        },

        runAction() {
            if (this.saveState == 'delete') {

                this.filteredShoppingList.forEach(item => {
                    if (item.action && item.originalPantryItem) {
                        item.originalPantryItem.restock = false;
                    }
                });

                this.shoppingList.products = this.shoppingList.products.filter(item => !item.action);
                this.restockShoppingList = this.restockShoppingList.filter(item => !item.action);
            }
            else if (this.saveState == 'move') {
                this.filteredShoppingList.forEach(item => {
                    if (item.action) {
                        item.category = this.selectedCategoryMove.name
                        item.action = false;
                    }
                })
            }
        },

        deleteCategory() {
            this.pantry.products.forEach(p => {
                if (p.category == this.selectedCategoryGrocery.name) {
                    p.category = 'Misc'
                    p.batch.forEach(i => {
                        i.category = 'Misc'
                    })
                }
            })
            this.shoppingList.products.forEach(p => {
                if (p.category == this.selectedCategoryGrocery.name) {
                    p.category = 'Misc'
                }
            })

            let index = this.categories.findIndex(c => c.name === this.selectedCategoryGrocery.name)
            this.selectedCategoryGrocery = { name: '' };
            this.categories.splice(index, 1)

            this.isPanelVisible = false;
            this.updateRestockShoppingList()
        },

        saveCategory() {
            const oldName = this.selectedCategoryGrocery.name;
            const newName = this.editCategoryName.trim();
            if (!newName || oldName === newName) return;

            this.pantry.products.forEach(p => {
                if (p.category === oldName) {
                    p.category = newName;
                    p.batch.forEach(i => { i.category = newName; });
                }
            });
            this.shoppingList.products.forEach(p => {
                if (p.category === oldName) p.category = newName;
            });

            this.selectedCategoryGrocery.name = newName;
        },

        getNextCategoryId() {
            if (this.categories.length === 0) return 1;
            return Math.max(...this.categories.map(c => c.id)) + 1;
        },


        addCategoryShop() {
            this.addingCat = true;
            this.doneAddingCat = false;
            const id = this.getNextCategoryId();
            this.categories.unshift({
                id: id,
                name: '',
                products: [],
            });
            this.$nextTick(() => {
                this.$nextTick(() => {
                    const input = document.querySelector('#shopSection .category-header input');
                    if (input) input.focus();
                });
            });
        },

        endAddingCat(category, index) {
            if (!this.addingCat) return;
            if (!category.name || !category.name.trim()) {
                this.invalidInput = true;
                this.shakeAC = true;
                setTimeout(() => { this.shakeAC = false; }, 300);
                this.$nextTick(() => {
                    const input = document.querySelector('#shopSection .category-header input');
                    if (input) input.focus();
                });
                return;
            }
            this.invalidInput = false;
            this.addingCat = false;
            this.doneAddingCat = true;
        },

        onInvalidCat() {
            this.invalidInput = true;
            this.shakeAC = true;
            setTimeout(() => { this.shakeAC = false; }, 300);
        },



        checkAllMethod() {
            this.checkAll = !this.checkAll
            if (this.checkAll == true) {
                this.sortedByCat.forEach(c => {
                    c.products.forEach(i => {
                        i.bought = true;
                    })
                })
            }
            else {
                this.sortedByCat.forEach(c => {
                    c.products.forEach(i => {
                        i.bought = false;
                    })
                })
            }
        },

        addBoughtToPantry() {
            if (this.addingCat) {
                this.categories.splice(0, 1);
                this.addingCat = false;
                this.invalidInput = false;
            }
            this.boughtItems.forEach(c => {
                c.products.forEach(p => {

                    let matchProduct = this.pantry.products.find(product => product.name === p.name && product.category === p.category);
                    const newItems = [];
                    const now = new Date();

                    for (let i = 0; i < p.qty; i++) {
                        newItems.push({
                            id: crypto.randomUUID(),
                            name: p.name,
                            category: p.category,
                            dateAdded: now,
                            expiration: computeExpirationDate(p.durationValue, this.units[p.selectedUnit]),
                            qty: 100
                        });
                    }

                    if (matchProduct) {
                        matchProduct.batch.unshift(...newItems);
                    } else {
                        const newProduct = {
                            id: crypto.randomUUID(),
                            name: p.name,
                            category: p.category,
                            restock: false,
                            restockQty: 1,
                            isOpen: false,
                            batch: newItems
                        };
                        this.pantry.products.unshift(newProduct);
                    }
                })
            })

            this.shoppingList.products = this.shoppingList.products.filter(p => !p.bought);
            this.updateRestockShoppingList()

        },

        updateExpiration(product) {
            const unit = this.units[product.selectedUnit];
            product.expiration = computeExpirationDate(product.durationValue, unit);
        },

        handleOutsideClick(event) {
            let menu = this.$refs.categoryMenu;
            if (!menu.contains(event.target)) {
                this.showCategoryDropdown = false;
            }
        },

        changeSaveState(state) {
            if (this.saveState === state) {
                this.saveState = null;
                this.filteredShoppingList.forEach(p => p.action = false);
            } else {
                this.filteredShoppingList.forEach(p => p.action = false);
                this.saveState = state;
            }
        },

        runActionAndReset() {
            this.runAction();
            this.saveState = null;
        },

    },

    // computed: values that are updated and cached if dependencies change
    computed: {
        pantryTable() {
            if (this.selectedCategory == null) {
                if (this.searchQuery.trim() !== '') {
                    let query = this.searchQuery.toLowerCase();

                    let productMatch = this.pantry.products.filter(product => product.name.toLowerCase().includes(query))
                    return productMatch;
                }
                return this.pantry.products

            }
            else {
                let filteredPantry = this.pantry.products.filter(p => p.category == this.selectedCategory.name)
                if (this.searchQuery.trim() !== '') {
                    let query = this.searchQuery.toLowerCase();

                    let productMatch = filteredPantry.filter(product => product.name.toLowerCase().includes(query))
                    return productMatch;
                }
                return filteredPantry;
            }
        },

        filteredShoppingList() {

            const combined = [
                ...this.shoppingList.products,
                ...this.restockShoppingList
            ];

            if (!this.selectedCategoryGrocery.name) {
                return combined;
            }

            return combined.filter(p =>
                p.category === this.selectedCategoryGrocery.name
            );
        },
        moveCategories() {
            return this.categories.filter(cat =>
                cat.name !== this.selectedCategoryGrocery.name
            )
        },

        sortedByCat() {

            let sortedArray = this.categories.map(c => ({
                ...c,
                products: []
            }));

            this.shoppingList.products.forEach(p => {
                let category = sortedArray.find(c => c.name === p.category);
                if (category) category.products.push(p);
            });


            this.restockShoppingList.forEach(p => {
                let category = sortedArray.find(c => c.name === p.category);
                if (category) category.products.push(p);
            });

            return sortedArray;
        },
        boughtItems() {
            return this.sortedByCat
                .map(c => ({
                    ...c,
                    products: c.products.filter(i => i.bought)
                }))
                .filter(c => c.products.length > 0);
        },
        checkedCount() {
            return this.filteredShoppingList.filter(p => p.action).length;
        },

        confirmLabel() {
            const n = this.checkedCount;
            if (this.saveState === 'delete') return `Delete ${n} item${n !== 1 ? 's' : ''}`;
            if (this.saveState === 'move') return `Move ${n} item${n !== 1 ? 's' : ''}`;
            return '';
        },

        confirmVisible() {
            return this.saveState !== null && this.checkedCount > 0;
        },

    },

    //mounted:  called after the instance has been mounted,
    mounted: function () {
        window.addEventListener('resize', this.handleResize);
        this.updateRestockShoppingList()

        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
        window.removeEventListener('resize', this.handleResize);
        if (this.addingCat) {
            this.categories.splice(0, 1)
        }
        this.addCat = false;
    },

    // watch:   calls the function if the value changes
    // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
    watch: {

    },

});

export default app;
