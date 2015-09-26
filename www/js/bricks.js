"use strict";

// USAGE example >> bricks.init({isotope:".grid",item:".grid-item",sizer:".grid-sizer",back:"#back"});

// USAGE example >> homePage = {className:"home", type:"class",title:"home"); 

// USAGE example bricks.nav(homePage);

// USAGE example bricks.back();

var bricks = {

    init: function (dat) {
        console.log("BRIKCS.init(" + JSON.stringify(dat) + ")");
        bricks.$isotope = $(dat.isotope);
        bricks.$back = $(dat.back);
        bricks.$title = $("[data-role='header'] h1");
        bricks.$isotope.isotope({
            itemSelector: dat.item,
            masonry: {
                columnWidth: dat.sizer
            },
            percentPosition: true,

            getSortData: {
                sorti: '[data-sorti]', // value of attribute
            },

        });
        bricks.$isotope.isotope({
            filter: '.none'
        });
        bricks.$back.hide();


    },

    nav: function (page) {
        console.log("BRICKS.nav(" + JSON.stringify(page) + ")");
        bricks.navStack.push(page);
        if (page.type === "class") {
            //use isotope to navigate
            bricks.$isotope.isotope({
                filter: page.className
            });

        }
        else {
            // use url to navigate
            window.location.href = page.className;
        }
        // set titile

        // We are not home to show back
        if (bricks.navStack.length == 1) {
            bricks.$back.hide();
        }
        else {
            bricks.$back.show();
        }
        bricks.$title.text(page.title);

    },


    goBack: function () {
        console.log("bricks.back()");
        if (bricks.navStack.length == 1) {
            console.log("bricks.back() tride to go down past home");
            return;
        }
        var cpage = bricks.navStack.pop();
        var page = bricks.navStack[bricks.navStack.length - 1]
        if (cpage.type === "class") {
            //use isotope to navigate
            bricks.$isotope.isotope({
                filter: page.className
            });

        }
        else {
            // use url to navigate
            window.history.back();
        }
        // hide nav on home page
        if (bricks.navStack.length == 1) {
            console.log("bricks.back() on home so hide back");
            bricks.$back.hide();
        }

        // set title
        bricks.$title.text(page.title);
    },

    navStack: [],

    $isotope: {},

    $titleClass: {},

    $backClass: {},

    $title: {},


};
