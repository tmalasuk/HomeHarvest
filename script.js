$(document).ready(function () {

    // -------- TAB NAV ---------
    const $indicator = $('.nav-indicator');

    function moveIndicator($element) {
        const tabLeft = $element.position().left;
        const tabWidth = $element.outerWidth();

        const indicatorWidth = tabWidth * 0.4; // 40%
        const centeredLeft = tabLeft + (tabWidth / 2) - (indicatorWidth / 2);

        $('.nav-indicator').css({
            width: indicatorWidth,
            transform: `translateX(${centeredLeft}px)`
        });
    }

    moveIndicator($('.nav-link.active'));

    $('.nav-link').on('click', function () {
        $('.nav-link.active').removeClass('active');
        $(this).addClass('active');

        moveIndicator($(this));
    });

    //-----------HEADER FOR PANTRY

    let catDropDown = $('.dropdown-wrapper')

    $('.bi-list').on('click', function () {
        catDropDown.removeClass('d-none');
    });

    catDropDown.on('click', '.dropdown-item', function () {

        let selectedText = $(this).text();

        $('#category-title').children('span').text(selectedText);
        catDropDown.addClass('d-none');

        catDropDown.find('.dropdown-item').removeClass('active');
        $(this).addClass('active');
    });


    //----------PANTRY TABLE
    $('.dropdown').on('click', function () {
        const $row = $(this).closest('.row'); // the main row
        let itemName = $($row.children()[1]).text().trim();
        itemName = itemName.replace(/\s*\(x\d+\)$/, '');
        let batchName = '.batch-content-' + itemName;

        // Toggle the icon
        const $icon = $(this).children('i');
        if ($icon.hasClass('bi-chevron-down')) {
            $icon.removeClass('bi-chevron-down').addClass('bi-chevron-up');

            // Hide qty and expiration
            $row.find('.qty, .progress').addClass('d-none');

            $row.addClass('batch-header-open');


            // Check if batch row already exists
            if ($row.next('.batch-row').length === 0) {
                // Create new batch row
                const batchRow = $(`
                <div class="row batch-row">
                    <div class="col-40">
                        <div class="batch-content-${itemName}" style="display:none;">
                            <div class="row align-items-center py-2">
                                <div class="col-1 edit"><i class="bi bi-pencil-square edit"></i></div>
                                <div class="col-13">Bread</div>
                                <div class="col-4">50%</div>
                                <div class="col-7">
                                    <div class="progress">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width:70%;"></div>
                                    </div>
                                </div>
                                <div class="col-7">Dairy</div>
                                <div class="col-3"><i class="bi bi-x-circle trash"></i></div>
                                <div class="col-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row batch-row">
                    <div class="col-40">
                        <div class="batch-content-${itemName}" style="display:none;">
                            <div class="row align-items-center py-2 ">
                                <div class="col-1 edit"><i class="bi bi-pencil-square edit"></i></div>
                                <div class="col-13">Bread</div>
                                <div class="col-4">50%</div>
                                <div class="col-7">
                                    <div class="progress">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width:70%;"></div>
                                    </div>
                                </div>
                                <div class="col-7">Dairy</div>
                                <div class="col-3"><i class="bi bi-x-circle trash"></i></div>
                                <div class="col-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row batch-row">
                    <div class="col-40">
                        <div class="batch-content-${itemName}" style="display:none;">
                            <div class="row align-items-center py-2">
                                <div class="col-1 edit"><i class="bi bi-pencil-square edit"></i></div>
                                <div class="col-13">Bread</div>
                                <div class="col-4">50%</div>
                                <div class="col-7">
                                    <div class="progress">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width:70%;"></div>
                                    </div>
                                </div>
                                <div class="col-7">Dairy</div>
                                <div class="col-3"><i class="bi bi-x-circle trash"></i></div>
                                <div class="col-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

                // Insert after current row
                $row.after(batchRow);

                // Slide down the content
                batchRow.find(batchName).slideDown('fast');
            } else {
                // If it exists, just slide it down
                $row.siblings('.batch-row').find(batchName).slideDown('fast');
            }

        } else {
            // Collapse
            $icon.removeClass('bi-chevron-up').addClass('bi-chevron-down');

            $row.removeClass('batch-header-open');

            // Show qty and expiration
            $row.find('.qty, .progress').removeClass('d-none');

            // Slide up batch row if it exists
            $row.siblings('.batch-row').find(batchName).slideUp('fast');
        }
    });

    //---------EDIT ITEM

    $('.inventory').on('click', '.bi-pencil-square', function (e) {

        let rowDetails = $(this).parent().siblings()

        //handle adding number identifiers if needed
        if ($(this).parents('.batch-row').length != 0) {
            let arrayTarget = '.batch-content-' + $(rowDetails[0]).text()
            let batchArray = $(arrayTarget);
            let clickedRow = $(this).closest(arrayTarget);
            let index = batchArray.index(clickedRow) + 1;
            $('#optionalItemNum').text('#' + index);
            $(this).closest('.row').parent();
        }
        else {
            $('#optionalItemNum').text('');
        }

        //handle qty loading
        let qty = $(rowDetails[1]).text()
        let cleanQty = qty.replace('%', '');
        $('#qtyValue').text(qty)
        $('#qtySlider').val(cleanQty);

        //
        $('#editModalLabel').text($(rowDetails[0]).text())

        var editModal = new bootstrap.Modal(document.getElementById('editItemModal'));
        editModal.show();

        //handle changing edited qty


        $('#editItemSave').on('click', function () {
            let newQty = $('#qtySlider').val() + '%';

            $(rowDetails[1]).text(newQty);
        });



    })

    const slider = document.getElementById('qtySlider');
    const value = document.getElementById('qtyValue');
    slider.addEventListener('input', () => {
        value.textContent = slider.value + '%';
    });

    let itemHeight = 46.8; // must match CSS height

    // Right arrow click
    $(document).on('click', '.right', function () {

        const $switcher = $(this).closest('.unit-switcher');
        const $track = $switcher.find('.unit-track');
        const $left = $switcher.find('.left');
        const $right = $(this);

        let index = $switcher.data('index') || 0;
        let total = $track.find('span').length;

        if (index < total - 1) {
            index++;
            $switcher.data('index', index);

            $left.removeClass('hidden');
            $left.removeClass('d-none');
            if (index === total - 1) {
                $right.addClass('hidden');
            }

            $track.css(
                'transform',
                `translateY(-${index * itemHeight}px)`
            );
        }
    });


    // Left arrow click
    $(document).on('click', '.left', function () {

        const $switcher = $(this).closest('.unit-switcher');
        const $track = $switcher.find('.unit-track');
        const $right = $switcher.find('.right');
        const $left = $(this);

        let index = $switcher.data('index') || 0;

        if (index > 0) {
            index--;
            $switcher.data('index', index);

            $right.removeClass('hidden');
            if (index === 0) {
                $left.addClass('hidden');
                $left.addClass('d-none');

            }

            $track.css(
                'transform',
                `translateY(-${index * itemHeight}px)`
            );
        }
    });




    // -------- ADD ITEM TO PANTRY/GROCERY
    const addBtn = document.getElementById('addItemBtn');
    const modal = document.getElementById('addItemModal');
    const closeBtn = document.getElementById('closeModal');

    // Open the swing menu
    addBtn.addEventListener('click', () => {
        modal.classList.add('show');
        $(modal).find('button').children('span').text('Add to Pantry')

        var selectedCategory = $('#category-title span').text().trim().toUpperCase(); // normalize to uppercase

        // Find the option that matches and select it
        $(modal).find('input[type="number"]').val(1);
        $(this).find('select[name="addItemCategory"] option').each(function () {
            if ($(this).val().toUpperCase() === selectedCategory) {
                $(this).prop('selected', true);
                return false; // stop looping once found
            }
            else {
                $('select[name="addItemCategory"]').val('Misc');
            }
        });

    });

    $('.addItemtoGroceryListBtn').on('click', function () {
        $('#addItemModal').addClass('show');
        $(modal).find('button').children('span').text('Add to List')
        $(modal).find('input[type="number"]').val(1);
        var categoryText = $('.category-items header h3').text().trim();
        $('select[name="addItemCategory"]').val(categoryText);

    })

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {

        if (
            !modal.contains(e.target) &&
            !e.target.closest('#addItemBtn') &&
            !e.target.closest('.addItemtoGroceryListBtn')
        ) {
            modal.classList.remove('show');
        }
    });




    //---------GROCERY TABS
    const buttons = document.querySelectorAll('.section-btn');
    const sections = document.querySelectorAll('.section');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            // Hide all sections
            sections.forEach(sec => sec.classList.remove('active'));
            // Show target section
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    $('.ac-button').on('click', function (e) {
        $('.ac-button').not(this).removeClass('active');
        $(this).toggleClass('active');

        $('.category-items-desktop').find('h3').text($(this).text())
    });

    //-----CATEGORIES

    $('#categoryTable').sortable({
        items: '.sort',
        handle: '.grip',      // only drag when grabbing this
        axis: 'y',            // vertical only
        cursor: 'grabbing',
        placeholder: 'sortable-placeholder'
    });


    $('#categoryTable').on('click', '.bi-pencil-square', function () {
        var editCat = new bootstrap.Modal(document.getElementById('editCatModal'));
        editCat.show();

        $('#editCatModal').find('input').val($(this).parent().text())

        $('#editCatModal').on('shown.bs.modal', function () {
            $('#editCatModal').find('input').focus();
        })
    })

    $(".ac-button").on("click", function () {

        if (window.innerWidth <= 1400) {
            let currentCategory = $(this).next(".category-items-mobile");

            // Close all other open categories
            $(".category-items-mobile")
                .not(currentCategory)
                .slideUp(300);

            // Toggle the clicked one
            currentCategory.stop(true, true).slideToggle(300);
        }


    });






    //------CATEGORY ITEM LIST LOGIC

    $('.action-group').on('click', function (e) {
        $(e.target).parent().children().removeClass('active');
        $(e.target).addClass('active');

        if ($(e.target).hasClass('btn-move')) {
            if (!$('.move-select-wrapper').hasClass('active')) {
                $('.move-select-wrapper').addClass('active');
            }
        }
        else {
            $('.move-select-wrapper').removeClass('active');
        }

        if ($(e.target).text() === "Move") {
            $('.changing-checkbox').removeClass("red");
            $('.changing-checkbox').addClass("yellow");
        }
        else {
            $('.changing-checkbox').removeClass("yellow");
            $('.changing-checkbox').addClass("red");
        }
    })

    $('.save').on('mouseenter', function () {
        $(this).children().removeClass('bi-floppy').addClass('bi-floppy-fill');
    }).on('mouseleave', function () {
        $(this).children().removeClass('bi-floppy-fill').addClass('bi-floppy');
    });

    //------------- SHOPPING SECTION
    const groceryData = [
        { category: "Bread & Bakery", items: ["Sourdough", "Bagels"] },
        { category: "Dairy", items: ["Milk", "Yogurt", "Parfait", "Butter", "Eggs", "Whipping Cream"] },
        { category: "Fruit", items: ["Strawberries", "Bananas", "Apples"] },
        { category: "Frozen", items: ["Ice Cream", "Pizza", "Frozen Peas", "Berries"] },
        { category: "Baking", items: ["Flour", "Sugar", "Baking Soda"] },
        { category: "Misc", items: ["Toothpicks", "Paper Towels", "Batteries", "Soap"] },
        { category: "Deli", items: ["Turkey Breast", "Swiss Cheese"] }
    ];

    const grid = document.getElementById('grocery-grid');

    groceryData.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'grid-item';

        let itemsHtml = cat.items.map(item => `<li><input class="check-me-off" type="checkbox"><span class="item-name"> ${item}</span> <div class="item-count">
                                            <i class="bi bi-dash"></i>
                                            <p class="number">1</p>
                                            <i class="bi bi-plus"></i>
                                        </div>`).join('');

        card.innerHTML = `
                <div class="category-header">${cat.category}</div>
                <ul class="item-list">${itemsHtml}</ul>
            `;
        grid.appendChild(card);
    });


    $('.shop').on('click', function () {

    })


    $('#print-list').on('mouseenter', function () {
        $(this).children().removeClass('bi-printer').addClass('bi-printer-fill')
    })

    $('#print-list').on('mouseleave', function () {
        $(this).children().removeClass('bi-printer-fill').addClass('bi-printer')
    })

    $('#print-list').on('click', function () {
        window.print();
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('check-me-off')) {
            const nameSpan = e.target.nextElementSibling;
            nameSpan.classList.toggle('checked');
        }
    });

    $('#check-all-off').on('click', function () {
        if ($(this).prop('checked')) {
            $('.check-me-off').each(function () {
                const $checkbox = $(this);
                const $nameSpan = $checkbox.next('.item-name');

                if (!$nameSpan.hasClass('checked')) {
                    $nameSpan.addClass('checked');
                    $checkbox.prop('checked', true);
                }
            });
        }
        else {
            $('.check-me-off').each(function () {
                const $checkbox = $(this);
                const $nameSpan = $checkbox.next('.item-name');

                $nameSpan.removeClass('checked');
                $checkbox.prop('checked', false);
            }
            );
        }
    });



    $('#stock').on('click', function () {
        const $cart = $('.cart-item-container');
        $cart.empty();

        $('.grid-item').each(function () {
            const $gridItem = $(this);
            const categoryName = $gridItem.find('.category-header').text().trim();

            const $checkedItems = $gridItem.find('.check-me-off:checked');

            if ($checkedItems.length > 0) {

                // Create card wrapper
                const $card = $('<div class="cart-card"></div>');
                const $cardHeader = $(`<div class="cart-card-header">${categoryName}</div>`);
                const $cardBody = $('<div class="cart-card-body"></div>');

                // Loop checked items
                $checkedItems.each(function () {
                    const itemName = $(this).next('.item-name').text().trim();

                    const $itemRow = $(`
                    <div class="cart-row">
                        <span >${itemName}</span>
                        <div class="duration-input">
                            <input type="number" min="1" value="1" class="duration-number">
                            <div class="unit-switcher">
                                <button class="unit-arrow">
                                    <i class="bi bi-caret-left-fill left d-none"></i>
                                </button>
                                <div class="unit-display">
                                    <div class="unit-track">
                                        <span>day(s)</span>
                                        <span>week(s)</span>
                                        <span>month(s)</span>
                                        <span>year(s)</span>
                                    </div>
                                </div>
                                <button class="unit-arrow right">
                                    <i class="bi bi-caret-right-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `);

                    $cardBody.append($itemRow);
                });

                $card.append($cardHeader);
                $card.append($cardBody);
                $cart.append($card);
            }
        });
    });

    //--------RECIPES
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');

        });
    });

    const recipeLibrary = {
        "Apple Cinnamon Oatmeal": {
            ingredients: ["1 cup rolled oats", "2 cups water/milk", "1 diced apple", "1 tsp cinnamon", "Maple syrup"],
            steps: ["Boil liquid and add oats.", "Stir in apples and cinnamon.", "Simmer for 5-7 mins.", "Sweeten to taste."]
        },
        "Apple Pancakes": {
            ingredients: ["1 cup flour", "1 tbsp sugar", "1 tsp baking powder", "1/2 tsp cinnamon", "1 cup milk", "1 egg", "1 grated apple"],
            steps: ["Whisk dry ingredients.", "Mix in wet ingredients.", "Fold in grated apples.", "Cook on a griddle until golden."]
        },
        "Baked Apples with Cream": {
            ingredients: ["4 large apples", "1/4 cup brown sugar", "1 tsp cinnamon", "2 tbsp butter", "Heavy cream"],
            steps: ["Core apples, leaving bottom intact.", "Stuff with sugar, cinnamon, and butter.", "Bake at 375°F (190°C) for 30 mins.", "Serve warm with cream poured over."]
        },
        "Apple Smoothie": {
            ingredients: ["1 apple (sliced)", "1/2 cup Greek yogurt", "1/2 cup milk", "Pinch of cinnamon", "Handful of ice"],
            steps: ["Place all ingredients in a blender.", "Blend until completely smooth.", "Top with a sprinkle of cinnamon."]
        },
        "Apple Custard / Bread Pudding": {
            ingredients: ["4 cups bread cubes", "2 apples (sliced)", "3 eggs", "2 cups milk", "1/2 cup sugar", "1 tsp vanilla"],
            steps: ["Toss bread and apples in a baking dish.", "Whisk eggs, milk, sugar, and vanilla.", "Pour over bread; let soak for 15 mins.", "Bake at 350°F (175°C) for 40 mins."]
        }
    };

    const displayArea = document.getElementById('recipe-display-area');
    const links = document.querySelectorAll('.recipe-link');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get the target recipe name from the data attribute
            const recipeKey = e.currentTarget.getAttribute('data-recipe');
            const data = recipeLibrary[recipeKey];
            $('.recipe-link').removeClass('selected');
            e.target.classList.add('selected');

            if (data) {
                // Clear and Update the UI
                renderRecipe(recipeKey, data, displayArea);
            }
        });
    });

    function renderRecipe(name, data, container) {
        // Clear the area first
        container.innerHTML = "";

        // Create the HTML structure
        const html = `
    <div class="animate-fade-in recipe-card">
      <h2 class="fw-bold mb-4">${name}</h2>
      <div class="row">
        <div class="col-md-15">
          <h5>Ingredients</h5>
          <ul class="list-unstyled">
            ${data.ingredients.map(i => `<li class="mb-1">• ${i}</li>`).join('')}
          </ul>
        </div>
        <div class="col-md-25">
          <h5>Instructions</h5>
          <ol class="ps-3">
            ${data.steps.map(s => `<li class="mb-2">${s}</li>`).join('')}
          </ol>
        </div>
      </div>
    </div>
  `;

        container.innerHTML = html;
    }











});
