$(function(){

  var model = {
    currentCat : null,
    cats : [
      {catName: "cat_one", picSource: "cat1.jpg", num_clicks: 0},
      {catName: "cat_two", picSource: "cat2.jpg", num_clicks: 0},
      {catName: "cat_three", picSource: "cat3.jpg", num_clicks: 0}
    ]

  };


  var octopus = {
    init: function() {
      //start the entire application
      model.currentCat = model.cats[0];
      catListView.init();
      Catview.init();
      adminView.init();

    },

    getCurrentCat: function(){
      return model.currentCat;
    },

    setCurrentCat: function(cat){
      model.currentCat = cat ;
    },


    getAllCats: function(){
      return model.cats;
    },

    incrementClicks: function(){
      model.currentCat.num_clicks ++;
      Catview.render();
    }


  };


  var Catview = {
    init: function(){
      //add click listener at cat image
      var currentCat = octopus.getCurrentCat;
      $("#catimage").click(function() {
          //change text increment by one
          octopus.incrementClicks();
        });

      this.render();
    },


    render: function(){
      //call multiple times
      var cat = octopus.getCurrentCat();
      var catName = cat.catName;
      var catSource = cat.picSource;
      var clicks = cat.num_clicks;

      //display the current cat image
      $("#catname").html(catName);
      $("#numberOfClicks").html(clicks);
      var imageSource = document.getElementById('catimage');
      imageSource.src = catSource;

   }

  };

  var catListView = {
    init: function(){
      var cats = octopus.getAllCats();
      this.render(cats);
    },

    render: function(cats){
      //render cat list buttons
      $("#catlist").html("");

      var i = 0;
      cats.forEach(function(cat) {
        //create button for each cat
        var button = '<button id = button' + i + '>' + cat.catName + '</button>';
        $("#catlist").append(button);

        //add clicklistener on each button
        $("#button" + i).click((function(cat_copy){
          return function(){
            octopus.setCurrentCat(cat_copy);
            Catview.render();
          }})(cat));

          i = i+1;
       });

      }

  };


  var adminView = {

    init: function(){
      //add click listener at admin button
      $("#adminButton").click(function() {
        //show input form and buttons
        adminView.render();
      });


    },

    //render form and cancel/save buttons
    render: function(){
      //show form with inputs
      var currentCat = octopus.getCurrentCat();
      var inputName = "cat name:<br><input type:text name=catName value=" + currentCat.catName + "><br>";
      var inputUrl  = "cat url:<br><input type:text name=catUrl value=" + currentCat.picSource + "><br>";
      var inputClicks = "Numer of clicks:<br><input type:text name=num_clicks value=" + currentCat.num_clicks + "><br>";

      var adminInput = inputName + inputUrl + inputClicks;
      $("form").append(adminInput);

      //show save and cancel buttons
      var cancelbutton = '<button id = cancelbutton>cancel</button>';
      $("#admin").append(cancelbutton);

      var savebutton = '<button id = savebutton>save</button>';
      $("#admin").append(savebutton);

      //add click listener at cancel button
      $("#cancelbutton").click(function() {
        adminView.cancelDisplay();
      });

      //add click listener at save button
      $("#savebutton").click(function() {
        var x = document.forms["form1"];
        var cat = {catName: x.elements[0].value, picSource: x.elements[1].value, num_clicks: x.elements[2].value};
        octopus.setCurrentCat(cat);
        adminView.cancelDisplay();
        Catview.render();
      });



    },

    cancelDisplay: function(){
      var adminEle = document.getElementById('admin');
      var cancelEle = document.getElementById('cancelbutton');
      var saveEle = document.getElementById('savebutton');
      //remove form html
      $("form").html("");
      //remove buttons
      adminEle.removeChild(cancelEle);
      adminEle.removeChild(saveEle);
    }

  };

  octopus.init();

}());
