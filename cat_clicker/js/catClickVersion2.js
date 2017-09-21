
var catNames = ["one", "two"];
var pics = ["cat1.jpg","cat2.jpg"]

var nameElem = '';
var picElem = '';
var catElem = '';

//create a cat list by name
$(function(){
  for(var i = 0; i < pics.length; i ++){
    nameElem = '<h2 id=item'+i+'>' + catNames[i] + "</h3>";
    $("#catlist").append(nameElem);
  }
})

//add click event listener on cat names in the list
$(function(){
  for(var i = 0; i < pics.length; i ++){
    $("#item"+i).click((function(i_copy){

      return function(){
        //clean display
        $("#catdisplay").text("cat display area");

        //display image, name and text when click
        nameElem = '<h2>' + catNames[i_copy] + "</h3>";
        picElem = '<img id=catimage'+i_copy+' src=' +pics[i_copy]+ '>';
        catElem = "<li>" + nameElem + picElem + "<h3 id=numberOfClicks"+i_copy+">"+ 0 +"</h3></li>";
        $("#catdisplay").append(catElem);

        //add event listener to the selected cat's image
        var num_clicks = 0;
        $("#catimage"+i_copy).click((function(numClickCopy) {
          return function(){
            //change text increment by one
            numClickCopy = numClickCopy+1;
            $("#numberOfClicks"+i_copy).html(numClickCopy);
          }
        })(num_clicks));

      }
    })(i));



  }
});
