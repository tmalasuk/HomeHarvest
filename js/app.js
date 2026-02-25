import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";


function computeExpirationDate(value, unit) {
    const now = new Date();
    let expiration = new Date(now);

    switch (unit) {
        case 'day(s)':
            expiration.setDate(expiration.getDate() + value);
            break;
        case 'week(s)':
            expiration.setDate(expiration.getDate() + value * 7);
            break;
        case 'month(s)':
            expiration.setMonth(expiration.getMonth() + value);
            break;
        case 'year(s)':
            expiration.setFullYear(expiration.getFullYear() + value);
            break;
        default:
            console.warn('Unknown unit', unit);
    }

    return expiration;
}

function getExpirationDifferenceInDays(expiration) {
    const today = new Date();
    // normalize to midnight for simplicity
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const expMid = new Date(expiration.getFullYear(), expiration.getMonth(), expiration.getDate());

    const diffMs = expMid - todayMid; // milliseconds difference
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)); // convert to days
    return diffDays;
}

function getDurationValueAndUnit(expiration) {
    const diffDays = getExpirationDifferenceInDays(expiration);

    if (diffDays <= 0) return { value: 1, unitIndex: 0 }; // at least 1 day

    if (diffDays % 365 === 0) {
        return { value: diffDays / 365, unitIndex: 3 }; // years
    } else if (diffDays % 30 === 0) {
        return { value: diffDays / 30, unitIndex: 2 }; // months
    } else if (diffDays % 7 === 0) {
        return { value: diffDays / 7, unitIndex: 1 }; // weeks
    } else {
        return { value: diffDays, unitIndex: 0 }; // days
    }
}





const app = createApp({
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
                            { id: 1, name: 'Milk', category: 'Dairy', dateAdded: new Date("2026-02-20"), expiration: new Date("2026-02-24"), qty: 10 },
                            { id: 2, name: 'Milk', category: 'Dairy', dateAdded: new Date("2026-02-20"), expiration: new Date("2026-02-26"), qty: 100 },

                        ]
                    },
                    {
                        id: 2, name: 'Yogurt', category: 'Dairy', isOpen: false, restock: true, batch: [
                            {
                                id: 1, name: 'Yogurt', category: 'Dairy', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-02-27"), qty: 100,
                            }
                        ]
                    },
                    {
                        id: 4, name: 'Bread', category: 'Grains', isOpen: false, restock: true, batch: [
                            {
                                id: 1, name: 'Bread', category: 'Grains', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-15"), qty: 50,
                            }
                        ]
                    },
                    {
                        id: 4, name: 'Venison', category: 'Meat', isOpen: false, restock: false, batch: [

                            { id: 1, name: 'Venison', category: 'Meat', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-15"), qty: 100 },
                            { id: 2, name: 'Venison', category: 'Meat', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-03-15"), qty: 100, },
                            { id: 3, name: 'Venison', category: 'Meat', dateAdded: new Date("2026-02-18"), expiration: new Date("2027-03-15"), qty: 100, },
                            { id: 4, name: 'Venison', category: 'Meat', dateAdded: new Date("2026-02-18"), expiration: new Date("2027-03-15"), qty: 100, },

                        ]
                    },
                    {
                        id: 4, name: 'Chicken', category: 'Meat', isOpen: false, restock: false, batch: [
                            {
                                id: 1, name: 'Chicken', category: 'Meat', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-02-15"), qty: 100,
                            }
                        ]
                    },
                    {
                        id: 4, name: 'Strawberries', category: 'Produce', isOpen: false, restock: true, batch: [
                            {
                                id: 1, name: 'Strawberries', category: 'Produce', dateAdded: new Date("2026-02-18"), expiration: new Date("2026-02-28"), qty: 30,
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
                    { id: 5, name: 'Apples', qty: 6, category: 'Produce', expiration: new Date('2026-02-18'), action: true, bought: false, durationValue: 2, selectedUnit: 1 },
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
            newItem: {
                name: 'Pickles',
                adding: 1,
                category: null,
            },
            newShopItem: {
                name: 'Orange',
                qty: 1,
                category: null,
                expiration: null,
                action: false,
                bought: false,
                durationValue: 2,
                selectedUnit: 1,

            },
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
            durationValue: 1,
            units: ['day(s)', 'week(s)', 'month(s)', 'year(s)'],
            selectedUnitIndex: 0,
            isEditingName: false,
            //
            // add item modal
            showAddModal: false,
            modalMode: 'pantry',
            selectedCategory: null,
            //
            // grocery -organize
            selectedCategoryGrocery: {
                name: ''
            },
            selectedCategoryMove: null,
            showCategoryDropdown: false,
            isPanelVisible: false,
            isMobilePanelVisible: false,
            restockShoppingList: [],
            saveState: 'delete',
            //
            editCategoryName: '',
            addingCat: false,
            doneAddingCat: false,
            shakeAC: false,
            invalidInput: false,
            checkAll: false,
            isDark: false,
        };
    },

    // methods: usually "events" triggered by v-on:
    methods: {
        toggle() {
            this.isDark = !this.isDark;
            $('html').attr('data-theme', this.isDark ? 'dark' : 'light');
        },

        updateShoppingListFromPantry() {
            this.pantry.products.forEach(p => {
                if (p.restock) {
                    const existing = this.shoppingList.products.find(
                        s => s.name.toLowerCase() === p.name.toLowerCase()
                    );

                    if (existing) {
                        existing.qty += 1;
                    } else {
                        this.shoppingList.products.push({
                            id: p.id,
                            name: p.name,
                            qty: 1,
                            categoryID: p.categoryID
                        });
                    }
                }
            })
        },
        getMaxBatchQtyPercent(product) {
            if (!product.batch || product.batch.length === 0) return 0;
            const maxQty = Math.max(...product.batch.map(b => b.qty || 0));
            return maxQty;
        },

        getItemProgress(item) {
            const today = new Date();

            const timeDiff = item.expiration - today;
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysLeft <= 0) return 100;
            if (daysLeft < 1) return 90;
            if (daysLeft < 2) return 80;
            if (daysLeft < 3) return 70;
            if (daysLeft < 4) return 60;
            if (daysLeft < 5) return 50;
            if (daysLeft < 6) return 40;
            if (daysLeft < 7) return 30;
            if (daysLeft < 8) return 20;
            if (daysLeft < 9) return 10;
            return 0;
        },

        getBatchProgress(product) {
            // Look at all batches, take the **lowest %** (earliest expiring item)
            if (!product.batch || product.batch.length === 0) return 0;
            const progresses = product.batch.map(i => this.getItemProgress(i));
            return Math.max(...progresses);
        },

        getProgressClass(product) {
            const percent = this.getBatchProgress(product);
            if (percent <= 20) return 'bg-success';
            if (percent <= 50) return 'bg-warning';
            return 'bg-danger';
        },

        getItemProgressClass(item) {
            const percent = this.getItemProgress(item);
            if (percent <= 20) return 'bg-success';
            if (percent <= 50) return 'bg-warning';
            return 'bg-danger';
        },

        getBatchPercent(product) {
            const progress = this.getBatchProgress(product); // 0-100 (100 = safe, 0 = expired)
            // Invert so expired = 100% bar, safe = small
            return 100 - progress;
        },

        getItemPercent(item) {
            const progress = this.getItemProgress(item);
            return 100 - progress;
        },

        toggleBatchOpen(product) {
            product.isOpen = !product.isOpen
            console.log('this method is firing')
        },

        editProduct(product, item) {
            this.itemToEdit = item;
            this.productOfEditItem = product;

            const { value, unitIndex } = getDurationValueAndUnit(item.expiration);
            this.durationValue = value;
            this.selectedUnitIndex = unitIndex;
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

        prevUnit() {
            if (this.selectedUnitIndex > 0) {
                this.selectedUnitIndex--;
                this.updateExpiration();
            }
        },
        nextUnit() {
            if (this.selectedUnitIndex < this.units.length - 1) {
                this.selectedUnitIndex++;
                this.updateExpiration();
            }
        },
        prevUnitIndividual(product) {
            if (product.selectedUnit > 0) {
                product.selectedUnit--;
                this.updateExpiration(product);
            }
        },
        nextUnitIndividual(product) {
            console.log('click')
            if (product.selectedUnit < this.units.length - 1) {
                product.selectedUnit++;
                this.updateExpiration(product);
            }
        },
        selectedUnitConverter(product) {
            return this.units[product.selectedUnit];
        },
        updateExpiration(product = null) {
            if (!product) {
                this.itemToEdit.expiration = computeExpirationDate(this.durationValue, this.selectedUnit);
                console.log('Updated expiration:', this.itemToEdit.expiration);
            }
            else {
                const textUnit = this.units[product.selectedUnit];

                product.expiration = computeExpirationDate(
                    product.durationValue,
                    textUnit
                );

                console.log('Updated individual expiration:', product.expiration);
            }

        },



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
            }

            if (this.itemToEdit.name != this.productOfEditItem) {
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
                            isOpen: false,
                            batch: [movedItem]
                        };


                        const originalProductIndex = this.pantry.products.findIndex(p => p.id === this.productOfEditItem.id);
                        if (originalProductIndex !== -1) {
                            this.pantry.products.splice(originalProductIndex + 1, 0, targetProduct);
                            this.productOfEditItem = targetProduct
                        } else {
                            // fallback if original product not found
                            this.pantry.products.push(targetProduct);
                            this.productOfEditItem = targetProduct
                        }
                    }

                    // If the original product's batch is now empty, remove the product
                    if (oldProduct.batch.length === 0) {
                        const indexProduct = this.pantry.products.findIndex(p => p.id === oldProduct.id);
                        if (indexProduct !== -1) {
                            this.pantry.products.splice(indexProduct, 1);
                        }
                    }
                    else if (this.productOfEditItem.batch.length === 1) {
                        this.oldProduct.isOpen = false;
                    }
                }
            }
        },

        deleteProduct(index) {
            this.pantry.products.splice(index, 1);
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

        openPantryModal() {
            this.modalMode = 'pantry'
            this.newItem.category = this.selectedCategory
                ? this.selectedCategory
                : this.categories.find(c => c.name === 'Misc')
            this.showAddModal = true
        },

        //implement this
        openListModal() {
            this.modalMode = 'list'
            this.newShopItem.category = this.selectedCategoryGrocery
                ? this.selectedCategoryGrocery
                : this.categories.find(c => c.name === 'Misc')
            this.showAddModal = true

        },

        closeAddItemModal() {
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
            if (this.selectedCategoryGrocery === category) {
                this.selectedCategoryGrocery = { name: '' };
                this.isPanelVisible = false;
                this.isMobilePanelVisible = false;
            }
            else {
                this.selectedCategoryGrocery = category;
                this.editCategoryName = category.name;
                if (this.isDesktop) { this.isPanelVisible = true; }
                if (this.isMobile) { this.isMobilePanelVisible = true; }
            }
        },

        addItem() {
            if (this.modalMode == 'pantry') {
                let matchProduct = this.pantry.products.find(p => p.name === this.newItem.name && p.category === this.newItem.category.name);
                const newItems = [];
                const now = new Date();

                for (let i = 0; i < this.newItem.adding; i++) {
                    newItems.push({
                        id: crypto.randomUUID(),
                        name: this.newItem.name,
                        category: this.newItem.category.name,
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
                        name: this.newItem.name,
                        category: this.newItem.category.name,
                        restock: false,
                        isOpen: false,
                        batch: newItems
                    };
                    this.pantry.products.unshift(newProduct);
                }

                // Reset form
                this.newItem.name = 'Pickles';
                this.newItem.adding = 1;
                this.showAddModal = false;
            }
            else {
                let matchItem = null

                for (const category of this.sortedByCat) {
                    matchItem = category.products.find(
                        p => p.name === this.newShopItem.name && p.category === this.newShopItem.category.name
                    );
                    if (matchItem) break;
                }

                if (matchItem) {
                    matchItem.qty += this.newShopItem.qty

                }
                else {
                    let newThing = ({
                        id: crypto.randomUUID(),
                        name: this.newShopItem.name,
                        qty: this.newShopItem.qty,
                        category: this.newShopItem.category.name,
                        expiration: null,
                        action: false,
                        bought: false,
                        durationValue: 2,
                        selectedUnit: 1,
                    })
                    this.shoppingList.products = [...this.shoppingList.products, newThing];
                }

                this.newShopItem.name = 'Orange';
                this.newShopItem.qty = 1;
                this.showAddModal = false;
            }
        },


        lowerQty(product) {
            console.log('click')
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
            if (!this.isDesktop) { this.isPanelVisible = false; }
            if (!this.isMobile) { this.isMobilePanelVisible = false; }
        },

        updateRestockShoppingList() {
            this.restockShoppingList = this.pantry.products
                .filter(p => p.restock === true)
                .map(item => ({
                    id: crypto.randomUUID(),
                    name: item.name,
                    category: item.category,
                    qty: 1,
                    notes: '',
                    originalPantryItem: item,
                    action: false,
                    bought: false,
                    durationValue: 2,
                    selectedUnit: 1,
                }));
        },

        changeSaveState(state) {
            this.saveState = state
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
        saveCategory() {
            console.log("Saving category:", this.editCatName);
            this.showEditCatModal = false;
        },
        deleteCategory() {
            console.log("Deleting category:", this.editCatName);
            this.showEditCatModal = false;
        },
        saveCategory() {
            if (this.editCategoryName == "") {
                return
            }
            this.pantry.products.forEach(p => {


                if (p.category == this.selectedCategoryGrocery.name) {
                    p.category = this.editCategoryName

                    p.batch.forEach(i => {
                        i.category = this.editCategoryName
                    })
                }
            })
            this.shoppingList.products.forEach(p => {
                if (p.category == this.selectedCategoryGrocery.name) {
                    p.category = this.editCategoryName
                }
            })

            this.selectedCategoryGrocery.name = this.editCategoryName
            this.updateRestockShoppingList()
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
        getNextCategoryId() {
            if (this.categories.length === 0) return 1;
            return Math.max(...this.categories.map(c => c.id)) + 1;
        },
        addCategory() {
            this.addingCat = true;

            // Add new category at the top
            const id = this.getNextCategoryId();
            this.categories.unshift({
                id: id,
                name: '',
                products: [],
            });

            this.$nextTick(() => {
                const inputArray = this.$refs['categoryInput_0'];
                if (inputArray && inputArray.length) {
                    inputArray[0].focus();
                }
            });
        },
        endAddingCat(category, index) {
            if (category.name == '') {
                this.invalidInput = true;
                this.shakeAC = true;
                setTimeout(() => { this.shakeAC = false; }, 300);
                this.$nextTick(() => {
                    const input = this.$refs['categoryInput_' + index][0]; // array from v-for
                    if (input) input.focus();
                });
                return
            }
            this.invalidInput = false;
            this.addingCat = false

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
                            expiration: p.expiration,
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
        updateBoughtItemExpiration() {
            this.boughtItems.forEach(c => {
                c.products.forEach(p =>
                    this.updateExpiration(p)
                )
            })
        },
        handleOutsideClick(event) {
            let menu = this.$refs.categoryMenu;
            if (!menu.contains(event.target)) {
                this.showCategoryDropdown = false;
            }
        },

    },

    // computed: values that are updated and cached if dependencies change
    computed: {
        selectedUnit() {
            return this.units[this.selectedUnitIndex];
        },

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

            if (!this.selectedCategoryGrocery) {
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
        currentItem: {
            get() {
                return this.modalMode == 'pantry' ? this.newItem : this.newShopItem;
            },
            set(value) {
                if (this.modalMode == 'pantry') {
                    this.newItem = value;
                } else {
                    this.newShopItem = value;
                }
            }
        },
        quantityField: {
            get() {
                return this.modalMode == 'pantry' ? this.newItem.adding : this.newShopItem.qty;
            },
            set(value) {
                if (this.modalMode == 'pantry') {
                    this.newItem.adding = value;
                } else {
                    this.newShopItem.qty = value;
                }
            }
        },

    },

    //mounted:  called after the instance has been mounted,
    mounted: function () {
        window.addEventListener('resize', this.handleResize);
        this.updateRestockShoppingList()

        const vm = this;
        $('#categoryTable').sortable({
            items: '.sort',
            handle: '.grip',
            axis: 'y',
            stop(event, ui) {
                const sortedIds = $(this).children('.sort').map((_, el) => $(el).data('id')).get();
                const newCategories = [];
                sortedIds.forEach(id => {
                    const cat = vm.categories.find(c => c.id === id);
                    if (cat) newCategories.push(cat);
                });
                vm.categories = newCategories;
            }
        });
        document.addEventListener('click', this.handleOutsideClick);


        // if (localStorage.getItem('shoppingList')) {
        //     this.shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
        // }
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
        // shoppingList: {
        //     handler: function (newVal, oldVal) {
        //         //store that in local storage
        //         localStorage.setItem('shoppingList', JSON.stringify(newVal))
        //     },
        //     deep: true,
        // }
    },

});

export default app;
