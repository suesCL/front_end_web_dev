$(function(){

  var model = {
    currentCat : null,
    cats : [
      {catName: "cat_one", picSource: "cat1.jpg", num_clicks: 0},
      {catName: "cat_two", picSource: "cat2.jpg", num_clicks: 0}
    ]

  };


  var octopus = {
    init: function() {
      //start the entire application
      model.currentCat = model.cats[0];
      catListView.init();
      Catview.init();

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

      // //add click listener at each button
      // var nameElem = '';
      // var piELem = '';
      // var catElem = '';
      //
      // for(var i = 0; i < catNames.length; i ++){
      //
      // }
  };

  octopus.init();

}());
