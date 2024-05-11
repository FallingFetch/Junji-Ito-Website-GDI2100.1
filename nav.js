/* 
Author: Fetch Cater
Date: 25/04/2024
Version: Finished Website
*/

$(function () {
    $(window).bind('scroll', function () {
        var navHeight = $("nav").height()
        var dropDownNav = $("#dropdownnavbar")
        if (window.scrollY > navHeight) {
            dropDownNav.css("top", "0px")
        } else {
            dropDownNav.css("top", "-400px")
        }
    });
    $("#dropdown-button").click(function () {
        $("nav > ul").toggleClass("active")
        $("nav > ul").css("top", $("nav").outerHeight())
    })
})