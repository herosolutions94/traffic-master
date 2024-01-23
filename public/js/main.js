$(document).ready(function () {
  /*========== Toggle ==========*/
  $(document).on("click", ".toggle", function () {
    $(".toggle").toggleClass("active");
    $("html").toggleClass("flow");
    $("[nav]").toggleClass("active");
  });
  $(document).on("click", ".included_lst h5", function () {
    $(this).next(".txt_included").slideToggle();
  });
  $(document).on("click", "[inbox] .frnds li", function () {
    $("[inbox] .chatBlk").addClass("active");
  });
  $(document).on("click", "[inbox] .chatPerson .backBtn", function () {
    $("[inbox] .chatBlk").removeClass("active");
  });
  $(document).on("click", ".txtGrp.pasDv i.icon-eye", function () {
    $(this).addClass("icon-eye-slash");
    $(this).removeClass("icon-eye");
    $(this).parent().find(".txtBox").attr("type", "text");
  });
  $(document).on("click", ".txtGrp.pasDv i.icon-eye-slash", function () {
    $(this).addClass("icon-eye");
    $(this).removeClass("icon-eye-slash");
    $(this).parent().find(".txtBox").attr("type", "password");
  });

  $("#lightSlider").lightSlider({
    gallery: true,
    item: 1,
    auto: true,
    loop: true,
    speed: 2500,
    pause: 8000,
    slideMargin: 0,
    enableDrag: false,
    thumbMargin: 4,
    thumbItem: 4,
  });

  /*_____ FAQ's _____*/
  $(document).on("click", ".faqBlk > h5", function () {
    $(".faqBlk")
      .not($(this).parent().toggleClass("active"))
      .removeClass("active");
    $(".faqBlk > .txt")
      .not($(this).parent().children(".txt").slideToggle())
      .slideUp();
  });

  /*----- Card Sec Bar -----*/
  $(document).on("click", ".cardSecBar .lblBtn", function () {
    var checkbox = $(this).parents(".lblBtn").find("input[type=radio]");
    checkbox.prop("checked", !checkbox.prop("checked"));
    $(".cardSec").slideDown("3000");
    $(".paypalSec").slideUp("3000");
  });
  $(document).on("click", ".paypalSecBar .lblBtn", function () {
    var checkbox = $(this).parents(".lblBtn").find("input[type=radio]");
    checkbox.prop("checked", !checkbox.prop("checked"));
    $(".paypalSec").slideDown("3000");
    $(".cardSec").slideUp("3000");
  });

  $(".qtyplus").click(function (e) {
    e.preventDefault();
    var parnt = $(this).parent().children(".qty");
    var currentVal = parnt.val();
    if (!isNaN(currentVal)) {
      parnt.val(parseInt(currentVal) + 1);
    } else {
      parnt.val(0);
    }
  });
  // This button will decrement the value till 0
  $(".qtyminus").click(function (e) {
    e.preventDefault();
    var parnt = $(this).parent().children(".qty");
    var currentVal = parnt.val();
    if (!isNaN(currentVal) && currentVal > 0) {
      parnt.val(parseInt(currentVal) - 1);
    } else {
      parnt.val(0);
    }
  });

  $("#price").ionRangeSlider({
    hide_min_max: true,
    hide_from_to: true,
    min: 0,
    max: 500,
    from: 40,
    to: 480,
    type: "double",
    prettify: function (num) {
      return "$" + num;
    },
    // prefix: "$",
    grid: true,
  });
  $(document).on("focus", ".txtGrp .txtBox:not(select)", function () {
    $(this).parents(".txtGrp:first").find("label:first").addClass("move");
  });

  $(document).on("blur", ".txtGrp .txtBox:not(select)", function () {
    if (this.value == "")
      $(this).parents(".txtGrp:first").find("label:first").removeClass("move");
  });

  $(".txtGrp .txtBox:not(select)").each(function (e) {
    if (this.value != "")
      $(this).parents(".txtGrp:first").find("label:first").addClass("move");
  });
  var imgFile;
  $(document).on("click", "#uploadDp", function () {
    imgFile = $(this).attr("data-file");
    $(this).parents("form").children(".uploadFile").trigger("click");
  });
  $(document).on("change", ".uploadFile", function () {
    // alert(imgFile);
    var file = $(this).val();
    $(".uploadImg").html(file);
  });
  /*_____ Upload File _____*/
  var upldFile;
  $(document).on(
    "click",
    ".uploadImg[data-upload]:not(.uploaded)",
    function () {
      upldFile = $(this).attr("data-upload");
      $(this).data("preText", $(this).attr("data-text"));
      $(this)
        .parents("form")
        .find(`input[type="file"][data-upload="${upldFile}"]`)
        .trigger("click");
    }
  );
  $(document).on("click", ".uploadImg[data-upload].uploaded", function () {
    upldFile = $(this).attr("data-upload");
    $(this).attr("data-text", $(this).data("preText")).removeClass("uploaded");
    $(this)
      .parents("form")
      .find(`input[type="file"][data-upload="${upldFile}"]`)
      .get(0).value = "";
  });
  $(document).on("change", ".uploadFile[data-upload]", function () {
    // alert(imgFile);
    let file = $(this).val();
    let preText = $(`.uploadImg[data-upload="${upldFile}"]`).data("preText");
    if (this.files.length > 0) {
      $(`.uploadImg[data-upload="${upldFile}"]`)
        .addClass("uploaded")
        .attr("data-text", file);
    } else {
      $(`.uploadImg[data-upload="${upldFile}"]`)
        .removeClass("uploaded")
        .attr("data-text", preText);
    }
    // console.log(this.files.length);
    // $(`.uploadImg[data-upload="${upldFile}"]`).html(file);
  });

  /*========== Dropdown ==========*/
  $(document).on("click", ".dropBtn", function (e) {
    e.stopPropagation();
    var $this = $(this).parent().children(".dropCnt");
    $(".dropCnt").not($this).removeClass("active");
    var $parent = $(this).parent(".dropDown");
    $parent.children(".dropCnt").toggleClass("active");
  });
  $(document).on("click", ".dropCnt", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", function () {
    $(".dropCnt").removeClass("active");
  });

  // =============filter dropdown===========

  $("._dropBtn").click(function (e) {
    e.stopPropagation();
    var $this = $(this).parent().children("._dropCnt");
    $("._dropCnt").not($this).removeClass("active");
    var $parent = $(this).parent("._dropDown");
    $parent.children("._dropCnt").toggleClass("active");
  });
  $(document).on("click", "._dropCnt", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", function () {
    $("._dropCnt").removeClass("active");
  });

  /*----- video button -----*/

  var vid = $("video");
  // var vid = document.getElementById("bannerVid");
  $(document).on("click", ".fa-play", function () {
    $(this).parents().children(vid).trigger("play");

    $(this).removeClass("fa-play").addClass("fa-pause");
  });
  $(document).on("click", ".fa-pause", function () {
    $(this).parents().children(vid).trigger("pause");

    $(this).removeClass("fa-pause").addClass("fa-play");
  });

  /*========== Popup ==========*/
  $(document).on("click", ".popBtn", function () {
    var popUp = $(this).data("popup");
    $("body").addClass("flow");
    $(".popup[data-popup= " + popUp + "]").fadeIn();
  });
  $(document).on("click", ".crosBtn", function () {
    var popUp = $(this).parents(".popup").data("popup");
    $("body").removeClass("flow");
    $(".popup[data-popup= " + popUp + "]").fadeOut();
  });

  /*========== Popup-big ==========*/
  $(document).on("click", ".full_pop_btn", function () {
    var masonary = setInterval(function () {
      $grid = $(".iso_container").isotope({
        percentPosition: true,
        itemSelector: ".col",
      });
      clearInterval(masonary);
    }, 0);

    var popUp = $(this).data("popup");
    $("body").addClass("flow");
    $(".popup-full[data-popup= " + popUp + "]").show();
  });
  $(document).on("click", ".back_btn", function () {
    var popUp = $(this).parents(".popup-full").data("popup");
    $("body").removeClass("flow");
    $(".popup-full[data-popup= " + popUp + "]").hide();
  });

  $(".datepicker").datepicker({
    dateFormat: "MM dd, yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "1900:2060",
  });

  // Timepicker Js
  $(".timepicker").timepicki({
    reset: true,
  });

  // Select Js
  $(document).ready(function () {
    $(".selectpicker").selectpicker({ dropupAuto: false });
  });

  // Data Table Js
  var sortOrder = $("th.sortBy").index() > -1 ? $("th.sortBy").index() : 0;
  $(".dataTable").DataTable({
    order: [[sortOrder, "asc"]],
    pageLength: 25,
    columnDefs: [
      {
        orderable: false,
        targets: "no-sort",
      },
    ],
    responsive: true,
  });
  // rateYo
  $(".ratestars").rateYo({
    rating: 0.0,
    fullStar: true,
    // readOnly: true,
    normalFill: "#ddd",
    ratedFill: "#f6a623",
    starWidth: "14px",
    spacing: "2px",
  });
  $(".ratestars-1").rateYo({
    rating: 5.0,
    fullStar: true,
    readOnly: true,
    normalFill: "#ccc",
    ratedFill: "#f6a623",
    starWidth: "14px",
    spacing: "2px",
  });
  // $('.listing').owlCarousel({
  //     autoplay: true,
  //     nav: true,
  //     navText: ['<i class="fi-chevron-left"></i>', '<i class="fi-chevron-right"></i>'],
  //     dots: false,
  //     loop: true,
  //     autoHeight: true,
  //     animateOut: 'fadeOut',
  //     smartSpeed: 1000,
  //     margin:15,
  //     autoplayTimeout: 8000,
  //     autoplayHoverPause: true,
  //     responsive: {
  //         0:{
  //             items: 1,
  //             autoHeight: true,
  //         },
  //         600:{
  //             items: 2
  //         },
  //         1000:{
  //             items: 4
  //         }
  //     }
  // });

  $("#owl-testi").owlCarousel({
    autoplay: true,
    nav: false,
    navText: [
      '<i class="fi-chevron-left"></i>',
      '<i class="fi-chevron-right"></i>',
    ],
    // navText: [ 'prev', 'next' ],
    dots: true,
    loop: true,
    margin: 15,
    center: true,
    autoWidth: false,
    autoHeight: false,
    smartSpeed: 1000,
    animateOut: "fadeOut",
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        autoplay: false,
        autoHeight: true,
        dots: true,
        nav: false,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  $("#owl-add").owlCarousel({
    autoplay: true,
    nav: false,
    dots: false,
    navText: [
      '<i class="fi-arrow-left"></i>',
      '<i class="fi-arrow-right"></i>',
    ],
    loop: true,
    margin: 20,
    animateOut: "fadeOut",
    smartSpeed: 1000,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    items: 1,
  });

  $(".listing_slider").owlCarousel({
    autoplay: false,
    nav: true,
    dots: true,
    navText: [
      '<i class="fi-arrow-left"></i>',
      '<i class="fi-arrow-right"></i>',
    ],
    loop: true,
    margin: 20,
    smartSpeed: 1000,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    items: 1,
  });

  $(".trusted_owl").owlCarousel({
    autoplay: true,
    nav: false,
    navText: [
      '<i class="fi-chevron-left"></i>',
      '<i class="fi-chevron-right"></i>',
    ],
    dots: false,
    loop: true,
    autoHeight: true,
    animateOut: "fadeOut",
    smartSpeed: 1000,
    margin: 15,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        // autoplay: false,
        autoHeight: true,
        // dots: true,
        // nav:false
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  var offSet = $("body").offset().top;
  var offSet = offSet + 250;
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    if (scrollPos >= offSet) {
      $(".bannerDots a").addClass("allbannerDots");
    } else {
      $(".bannerDots a").removeClass("allbannerDots");
    }
  });
});

function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = 25 + o.scrollHeight + "px";
}

// smooth scroling effect================
// $("html").easeScroll();

/*========== Page Loader ==========*/
$(window).on("load", function () {
  $(".loader").delay(700).fadeOut();
  $("#pageloader").delay(1200).fadeOut("slow");
});
