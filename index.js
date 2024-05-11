/* 
Author: Fetch Cater
Date: 19/04/2024
Version: Finished Website
*/

$(function () {
    //these key value pairs are needed for the search results, [they are stored in an array] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    var bookTitles = [{ "title": "Black Paradox", "book": "black-paradox" }, { "title": "Deserter", "book": "deserter" }, { "title": "Fragments of Horror", "book": "fragments" }, { "title": "Frankenstein", "book": "frankenstein" }, { "title": "Gyo", "book": "gyo-deluxe" }, { "title": "Gyo, Vol. 1", "book": "gyo-1" }, { "title": "Gyo, Vol. 2: The Death-Stench", "book": "gyo-2" }, { "title": "Junji Ito Collection: A Horror Coloring", "book": "collection-coloring" }, { "title": "Junji Ito's Cat Diary: Yon & Mu", "book": "cat-diary" }, { "title": "Junji Ito's Dissolving Classroom", "book": "dissolving-classrooms" }, { "title": "Lovesickness", "book": "lovesickness" }, { "title": "Mimi's Tales of Terror", "book": "mimi" }, { "title": "No Longer Human", "book": "no-longer-human" }, { "title": "Remina", "book": "remina" }, { "title": "Sensor", "book": "sensor" }, { "title": "Shiver: Junji Ito Selected Stories", "book": "shiver" }, { "title": "Smashed: Junji Ito Story Collection", "book": "smashed" }, { "title": "Soichi: Junji Ito Story Collection", "book": "soichi" }, { "title": "Stitches", "book": "stitches" }, { "title": "The Art of Junji Ito: Twisted Visions", "book": "twisted-visions" }, { "title": "The Liminal Zone", "book": "liminal-zone" }, { "title": "Tombs", "book": "tombs" }, { "title": "Tomie: Complete", "book": "tomie-deluxe" }, { "title": "Uzumaki (3-In-1 Deluxe Edition)", "book": "uzumaki-deluxe" }, { "title": "Uzumaki Coloring Book", "book": "uzumaki-coloring" }, { "title": "Uzumaki, Volume 1", "book": "uzumaki-1" }, { "title": "Uzumaki, Volume 2", "book": "uzumaki-2" }, { "title": "Uzumaki, Volume 3", "book": "uzumaki-3" }, { "title": "Venus in the Blind Spot", "book": "venus" }]
    //document refers to the html (telling it to look at the docuemnt) and search for an element by ID, then specifying for it to search for the id search-results (it doesnt need a # because javascript knows it is searching for an id already) https://developer.mozilla.org/en-US/docs/Web/API/Window/document
    var results = document.getElementById("search-results")
    //$("") uses jquery to search the html for css selectors, in this case the id search-bar, and makes it into the variable searchBar
    var searchBar = $("#search-bar")

    // keyup ensures that the search refreshes every time a key is entered so th results match what the user is typing in as they type new keys, including backspace (which is why I didnt use keypress) https://api.jquery.com/keypress/
    $("#search-field").on("keyup", function () { searchFunction() })

    function searchFunction() {
        //.val gets the value of an input text box. it is used to set or return values https://www.geeksforgeeks.org/how-to-get-the-value-in-an-input-text-box-using-jquery/
        //I used toLowerCase to turn the search value to lowercase so the search bar is not case sensitive https://stackoverflow.com/questions/69031142/how-can-i-make-my-js-search-bar-be-not-case-sensitive 
        var searchText = $("#search-field").val().toLowerCase()
        //this makes the search results show up as display none if is searchText is an empty string
        if (searchText == "") {
            //to give CSS functions in javascript you write the property and value within "" and a , between them https://www.w3schools.com/jquery/jquery_css.asp
            $(results).css("display", "none")
            //makes the search bar rounded at the bottom and only flat when results appear
            searchBar.css("border-radius", "1vmax")
        } else {
            //makes the search bar have a flat bottom to connect to the search results
            searchBar.css("border-radius", "1vmax 1vmax 0 0")
            //declares the variable searchArray to be an empty array
            var searchArray = []
            //declares the variable searchBarHeight retrieve the id search-bar's height
            var searchBarHeight = $("#search-bar").height()
            //the results were positioned in absolute, appearing over the top of the search bar, and giving them the margin of the searchBarHeight made it begin at the bottom of the search bar, and responsive
            // the '${}' is a template literal and allows for variable to be refered ito inside of a string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            $(results).css("margin-top", `${searchBarHeight}px`)
            //i used the removeChild so if the results.firsdtChild exists, it removes all the children, in this case essentilly clearing the previous search when another key is inputed so only the relevant results are shown https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
            //while is a declaration made up of a loop and an if statement, stating to run a loop while if statment is true
            //The while runs and removes all children of the results, clearing the search results to only display what is now relevant
            while (results.firstChild) {
                results.removeChild(results.lastChild);
            }
            //when the index of 0 is less than the number of objects within the array bookTitles (until is runs out of objects to go through) check the objects within the array to see if the title has a relevant letter (turned to lowercase) to display in the search results
            for (let i = 0; i < bookTitles.length; i++) {
                const e = bookTitles[i];
                //I used .search to compare the book title to the search value to return matching results https://www.w3schools.com/jsref/jsref_search.asp
                var position = e.title.toLowerCase().search(searchText)
                //if the search cannot find the position of the letter because the letter is not within the title, it gives the value -1, and if -1 does not return returns it runs the code setting the results to display block
                if (position != -1) {
                    e.position = position
                    //array push() puts something in an array, in this case the corresponding books https://www.w3schools.com/jsref/jsref_push.asp
                    searchArray.push(e)
                    $(results).css("display", "block")
                }
            }
            // this sorts the results of the search by position so the letter being typed in the lowest position (closest to the front) are pushed to the top of the results (using position from .search) https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
            searchArray.sort((a, b) => a.position - b.position);
            for (let i = 0; i < searchArray.length; i++) {
                const e = searchArray[i];
                //createElement allows me to create elements without using html, using javascript https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
                let li = document.createElement("li")
                let a = document.createElement("a")
                //innerHTML is the text content of the element https://www.w3schools.com/jsref/prop_html_innerhtml.asp
                a.innerHTML = e.title
                //append puts one html element inside another, at the end of it, in this case the element I created in javascript into exisiting html https://api.jquery.com/append/ https://www.w3schools.com/jquery/jquery_dom_add.asp
                li.append(a)
                // setAttribute assigns an attribute to the elements I created so I can reference them in the form, in this case book means the url book-title https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
                li.setAttribute("book", e.book)
                a.setAttribute("book", e.book)
                $("#search-results").append(li)
            }

            //this allows for the user when clicking on the search result to be taken to the correct book-title page, (the correct 'template' of the html using url queries instead of creating multiple html's)
            $("#search-results > li").on("click", function () {
                var form = $("#special-magical-form")
                $("#special-magical-query").val($(this).attr("book"))
                //this submits the form and takes the user to the relevant book-title page https://www.w3schools.com/jsref/met_form_submit.asp
                form.submit()
            })
        }
    }

    // when the user clciks off the search bar, set the search bar back to its orignal form (it still runs even if the search bar is not being clicked off)
    $(document).on('click', function (e) {
        if (!$(e.target).is("#search-field")) {
            $(results).css("display", "none")
            searchBar.css("border-radius", "1vmax")
            $("#search-bar").css("background-color", "#C0C0C0")
            $("#search-field").css("background-color", "#C0C0C0")
        }
    });

    //To make the whole searchbar turn a light grey and not only the search field I used the jquery event focus on the entire search-field ID https://www.w3schools.com/jquery/jquery_events.asp
    $("#search-field").focus(function () {
        $("#search-field").css("background-color", "#D9D9D9")
        $("#search-bar").css("background-color", "#D9D9D9")
        //The searchFunction here so the searches will re-appear when focusing on the search bar after clicking off
        searchFunction()
    })

    $("#book-list > li").click(function () {
        var form = $("#special-magical-form")
        $("#special-magical-query").val($(this).attr("book"))
        //this submits the form and takes the user to the relevant book-title page https://www.w3schools.com/jsref/met_form_submit.asp
        form.submit()
        return false;
    })

    //the mouseover event is essentially hovering however I didnt use hover as it combines the mouseenter and mouseleave function and I had no need for the fcuntion mouseleave as mouseover returns to normal when the mouse leaves the element https://www.w3schools.com/jquery/jquery_events.asp
    $("#book-list > li").mouseover(function () {
        //innerHeight ensured that when I got the height for the book-list-container it exlcuded the margin which threw off the calculations https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
        var bookListHeight = $("#book-list-container").innerHeight()
        //.offset gets the distance in pixels from the top of the webpage to the top of the specified element https://stackoverflow.com/questions/9880472/determine-distance-from-the-top-of-a-div-to-top-of-the-window-with-javascript
        var bookListTop = $("#book-list").offset().top
        var halfLiHeight = $(this).height() / 2
        var liOffset = $(this).offset().top
        var bookContainerTop = $("#book-list-container").offset().top
        var bookContainerOffset = (bookListTop - bookContainerTop)
        var distance = (liOffset - bookListTop);
        let book = $(this).attr("book")
        $(`#${book}`).css("display", "flex")
        var bookHeight = $(`#${book}`).height()
        var bookOffset = 0
        // https://stackoverflow.com/questions/952924/how-do-i-chop-slice-trim-off-last-character-in-string-using-javascript slice takes off the end charcters of a string, so -2 takes of the px of height making it into a number so the bookOffset equation can complete
        // bookHeight = bookHeight.slice(0, -2);
        // I didn't need ot use this because I found a better way to find the height but I'm keeping it in because I learnt it

        //this code sets the books at the top to flex-start as to not go over the hiehgt of the list
        var bookOffsetTop = (distance - bookHeight / 2 + halfLiHeight + bookContainerOffset);
        if (bookOffsetTop > 0) {
            bookOffset = bookOffsetTop
            $("#book-imgs").css("justify-content", "flex-start")
        } else {
            $("#book-imgs").css("justify-content", "flex-start")
        }
        //this code sets the books at the end to flex-end as to not go over the hiehgt of the list
        var bookOffsetBottom = (distance + bookHeight / 2 + bookContainerOffset);
        if (bookOffsetBottom > bookListHeight) {
            bookOffset = 0
            $("#book-imgs").css("justify-content", "flex-end")
        }
        $(`#${book}`).css("margin-top", `${bookOffset}px`)
    })

    //this makes the images display none when the mouse stops hovering over the list item
    $("#book-list > li").mouseout(function () {
        let book = $(this).attr("book")
        $(`#${book}`).css("display", "none")
    })

});
