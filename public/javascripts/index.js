// $(".left-nav-togglers").click(function(){
//     $(".left-nav").toggle(500);
// });

$(".slide-right").click(function() {
    var leftNavStyle = getComputedStyle(document.querySelector(".left-nav"));
    var opacity = leftNavStyle.opacity;
    if(opacity == 0){
        $(".left-nav").toggle();
        $(".left-nav").animate({opacity: 1});
    }
});
$(".slide-left").click(function() {
    var leftNavStyle = getComputedStyle(document.querySelector(".left-nav"));
    var opacity = leftNavStyle.opacity;
    if (opacity == 1) {
        $(".left-nav").animate({opacity: 0});
        setTimeout(() => { $(".left-nav").toggle(); }, 500);
    }
});