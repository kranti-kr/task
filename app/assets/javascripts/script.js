
$(function() {
   var SliderModule = (function() {
    var pb = {};
    pb.el = $('#slider');
    pb.items = {
      panels: pb.el.find('.slider-wrapper > li'),
    }

    var SliderInterval,
      currentSlider = 0,
      nextSlider = 1,
      lengthSlider = pb.items.panels.length;

    pb.init = function(settings) {
      this.settings = settings || {duration: 8000};
      var items = this.items,
        lengthPanels = items.panels.length,
        output = '';

      for(var i = 0; i < lengthPanels; i++) {
        if(i == 0) {
          output += '<li class="active"></li>';
        } else {
          output += '<li></li>';
        }
      }

      $('#control-buttons').html(output);

      activateSlider();
      $('#control-buttons').on('click', 'li', function(e) {
        var $this = $(this);
        if(!(currentSlider === $this.index())) {
          changePanel($this.index());
        }
      });

    }

    var activateSlider = function() {
      SliderInterval = setInterval(pb.startSlider, pb.settings.duration);
    }

    pb.startSlider = function() {
      var items = pb.items,
        controls = $('#control-buttons li');
      if(nextSlider >= lengthSlider) {
        nextSlider = 0;
        currentSlider = lengthSlider-1;
      }

      controls.removeClass('active').eq(nextSlider).addClass('active');
      items.panels.eq(currentSlider).fadeOut('slow');
      items.panels.eq(nextSlider).fadeIn('slow');

      currentSlider = nextSlider;
      nextSlider += 1;
    }
    var changePanel = function(id) {
      clearInterval(SliderInterval);
      var items = pb.items,
        controls = $('#control-buttons li');
      if(id >= lengthSlider) {
        id = 0;
      } else if(id < 0) {
        id = lengthSlider-1;
      }

      controls.removeClass('active').eq(id).addClass('active');
      items.panels.eq(currentSlider).fadeOut('slow');
      items.panels.eq(id).fadeIn('slow');
      currentSlider = id;
      nextSlider = id+1;
      activateSlider();
    }

    return pb;
   }());

   SliderModule.init({duration: 4000});

});

$(document).ready(function() {
  $("#menutoggle").click(function() {
    $('.xs-menu').toggleClass('displaynone');

    });
  $('ul li').click(function(e) {
    e.preventDefault();
    $('li').removeClass('active');
    $(this).addClass('active');
  });
    $(".drop-down").hover(function() {
      $('.mega-menu').addClass('display-on');
    });
    $(".drop-down").mouseleave(function() {
      $('.mega-menu').removeClass('display-on');
    });

});

$(document).ready(function(){
lnk = "https://test-prod-api.herokuapp.com/products"
  dataLoad(lnk)
});

function dataLoad(link){

  $.getJSON(link, function(result) {
        var l = result.products.length
        
        for (var i = 0; i < l; i++) {
          $("#content div").append("<p class='design-box-js'><img src="+result.products[i].img +"><span style='padding: 2px 5px; float: left;'>"+ result.products[i].name+ "</span><span style='padding: 2px 5px; float: right;'>"+ result.products[i].price +"</span></p>");
        }
  var show_per_page = 9; 
  var number_of_items = $('#content div').children().size();
  var number_of_pages = Math.ceil(number_of_items/show_per_page);
  
  //set the value of our hidden input fields
  $('#current_page').val(0);
  $('#show_per_page').val(show_per_page);
  
  var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
  var current_link = 0;
  while(number_of_pages > current_link){
    navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
    current_link++;
  }
  navigation_html += '<a class="next_link" href="javascript:next();">Show More</a>';
  
  $('#page_navigation').html(navigation_html);
  
  //add active_page class to the first page link
  $('#page_navigation .page_link:first').addClass('active_page');
  
  //hide all the elements inside content div
  $('#content div').children().css('display', 'none');
  
  //and show the first n (show_per_page) elements
  $('#content div').children().slice(0, show_per_page).css('display', 'block');
  
});

}

function previous(){
  
  new_page = parseInt($('#current_page').val()) - 1;
  //if there is an item before the current active link run the function
  if($('.active_page').prev('.page_link').length==true){
    go_to_page(new_page);
  }
  
}

function next(){
  new_page = parseInt($('#current_page').val()) + 1;
  //if there is an item after the current active link run the function
  if($('.active_page').next('.page_link').length==true){
    go_to_page(new_page);
  }
  
}
var c = 1
function go_to_page(page_num){
  //get the number of items shown per page
  var show_per_page = parseInt($('#show_per_page').val());
  
  c = c+1
  //get the element number where to start the slice from
  start_from = 0;
  end_of = c*show_per_page
  console.log(end_of)
  //get the element number where to end the slice
  end_on = start_from + end_of;
  
  //hide all children elements of content div, get specific items and show them
  $('#content div').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
  
  /*get the page link that has longdesc attribute of the current page and add active_page class to it
  and remove that class from previously active page link*/
  $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
  
  //update the current page input field
  $('#current_page').val(page_num);
}
