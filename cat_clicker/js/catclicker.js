$cats = $("#cats")

var catNames = ["one", "two"];
var pics = ["cat1.jpg","cat2.jpg"]

var nameElem = '';
var picElem = '';
var catElem = '';

//create cats' pics and texts
$(function(){
  for(var i = 0; i < pics.length; i ++){
    nameElem = '<h2>' + catNames[i] + "</h3>";
    picElem = '<img id=catimage'+i+' src=' +pics[i]+ '>';
    catElem = "<li>" + nameElem + picElem + "<h3 id=numberOfClicks"+i+">"+ 0 +"</h3></li>";
    $cats.append(catElem);
  }
})


//add event listener on each cat
$(function(){
  for(var i = 0; i < pics.length; i ++){
    var num_clicks = 0;
    $("#catimage"+i).click((function(numClickCopy) {
      return function(){
        numClickCopy = numClickCopy+1;
        $("#numberOfClicks"+i).html(numClickCopy);
      };
    })(num_clicks));
  }
})
