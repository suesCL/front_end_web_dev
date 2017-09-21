
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');




    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "7645c9a595c5459a84594915ae90357d",'q': cityStr
    });

    $.getJSON(url).error(function() {
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded")
      })
      .done(function( data ){

        $nytHeaderElem.text("New York Times articles about " + cityStr)
        items = data.response.docs

        for(var i = 0; i < items.length; i ++){
          var a_tag = '<a href='+ items[i].web_url+'>' + items[i].headline.main + "</a>";
          var p_tag = "<p>"  + items[i].snippet + "</p>" ;
          var result = "<li class=article>" + a_tag + p_tag + "</li>";
          $nytElem.append(result);
        }

      });

      //load wikipedia
      var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&limit=10&format=json&callback=wikiCallback';

      //error handling
      var wikiRequestTIimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources")
      },8000);

      $.ajax({
        url: url,
        dataType: 'jsonp',
        // clear out old data before new request
        jsonp: "callback",
        success: function(response){
          titles = response[1]
          urls   = response[3]

          for(var i = 0; i < titles.length; i ++){
            var a_tag = '<a href='+ urls[i]+'>' + titles[i] + "</a>";
            var result = "<li>" + a_tag + "</li>";
            $wikiElem.append(result);
          }

          clearTimeout(wikiRequestTIimeout);
        }

      });

    return false;
};

$('#form-container').submit(loadData);
