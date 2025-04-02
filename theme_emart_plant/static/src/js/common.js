$('body').on('click', function (e) {
    $('[data-bs-toggle=popover]').each(function () {
        // hide any open popovers when the anywhere else in the body is clicked
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

/* close popover end */

function openSearchPopup() {
      $(".search-box").addClass("open");
    }

function CartSidebar() {
      $("#cart_sidebar").addClass("toggled");
    }

  $(document).on("click", function(e) {
    if (!$(e.target).closest('.bizople-search-results').length) {
      $(".bizople-search-results").hide("dropdown-menu");
    }
    if (!$(e.target).closest('.bizople-search-text').length) {
      $(".bizople-search-text").hide("dropdown-menu");
    }
  });
  $("#categbtn-popup,#categbtn").on("click", function(e) {
    $(".bizople-search-results").hide("dropdown-menu");
    $(".bizople-search-text").hide("dropdown-menu");
  });
