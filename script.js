var searchBtn = $("#run-search");
var clearBtn = $("#clear-all");

var articleDisplay = $("#articles-display");

searchBtn.on("click", function () {
    event.preventDefault();
    articleDisplay.empty();

    var searchField = $("#search-term").val().trim();
    var numRecords = parseInt($("#num-records-select").val());
    var yearStart = $("#start-year").val().trim();
    var yearEnd = $("#end-year").val().trim();

    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=BxcrhsekOy74AF5n7neZShTq822yeEDv"


    if (yearStart <= yearEnd) {
        queryUrl += "&q=" + searchField;


        if (yearStart.length === 4) {
            if (yearStart) {
                queryUrl += "&begin_date=" + yearStart + "0101";

            }
        }
        if (yearEnd.length === 4) {
            if (yearEnd) {
                queryUrl += "&end_date=" + yearEnd + "1231";
            }
        }


        $.ajax({
            url: queryUrl,
            method: "GET"

        }).then(function (NYT) {
            console.log(NYT);


            for (let i = 0; i < numRecords; i++) {
                var articleDiv = $("<div>");

                articleDiv.addClass("well");

                var span = $("<span>").text(i + 1);
                span.addClass("label label-primary");

                var headlineH3 = $("<h3>").text(NYT.response.docs[i].headline.main);

                headlineH3.prepend(span);

                var byline = NYT.response.docs[i].byline.original

                if (byline !== null) {
                    var headlineP = $("<p>").text(byline);
                }
                else {
                    var headlineP = $("<p>").text("New York Times");
                }
                articleDiv.append(headlineH3, headlineP);

                articleDisplay.append(articleDiv);

            }
        });
    }
    else {
        alert("Year end must be after year start");
    }
});


clearBtn.on("click", function () {
    event.preventDefault();
    articleDisplay.empty();
    console.log("empty");
});