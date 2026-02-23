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

    //---------GROCERY TABS
    let buttons = document.querySelectorAll('.section-btn');
    let sections = document.querySelectorAll('.section');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sections.forEach(sec => sec.classList.remove('active'));
            let targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // $('#categoryTable').sortable({
    //     items: '.sort',
    //     handle: '.grip',
    //     axis: 'y',
    //     cursor: 'grabbing',
    //     placeholder: 'sortable-placeholder',
    //     stop: function (event, ui) {
    //         // After sorting finishes, sync with Vue
    //         const sortedIds = $(this).children('.sort').map((_, el) => {
    //             return $(el).data('id');  // we'll attach data-id to each item
    //         }).get();

    //         // Rearrange categories array
    //         const newCategories = [];
    //         sortedIds.forEach(id => {
    //             const cat = app.categories.find(c => c.id === id);
    //             if (cat) newCategories.push(cat);
    //         });

    //         app.categories = newCategories; // reassign array so Vue reacts
    //     }
    // });


    //scrolling
    // $(".ac-button").on("click", function () {

    //     if (window.innerWidth <= 1400) {
    //         let currentCategory = $(this).parent().find("transition");
    //         if (!currentCategory.is(":visible")) {
    //             $("html, body").animate({
    //                 scrollTop: $(this).offset().top
    //             }, 500); 
    //         }
    //     }
    // });

    $('#print-list').on('mouseenter', function () {
        $(this).children().removeClass('bi-printer').addClass('bi-printer-fill')
    })

    $('#print-list').on('mouseleave', function () {
        $(this).children().removeClass('bi-printer-fill').addClass('bi-printer')
    })

    $('#print-list').on('click', function () {
        window.print();
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
