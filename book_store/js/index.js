// $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});


$(document).ready(function () {
  var item, searchData;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  // outputList.innerHTML = `<h3 class="msg">Please Enter A Book Name</h3>`;

  $("#search").click(function () {

    //empty html output
    outputList.innerHTML = "";
    document.body.style.backgroundImage = "url('')";
    searchData = $("#book-name").val();
    //handling empty search input field
    if (searchData == "" || searchData == null) {
      displayError();
    }
    else {
      console.log(searchData);

      $.ajax({
        url: bookUrl + searchData,
        dataType: "json",
        success: function (response) {
          console.log(response)
          if (response.totalItems == 0) {
            alert("no result!... try again")
          }
          else {
            $("#title").animate({ 'margin-top': '5px' }, 1000);
            $("#list-output").css("visibility", "visible");
            displayResults(response);
          }
        },
        error: function () {
          alert("Something went wrong... <br>" + "Try again!");
        }
      });
    }
    //مسح صندوق البحث
    $("#book-name").val("");
  });

  function displayResults(response) {
    for (var i = 0; i < response.items.length; i += 2) {
      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      publishedDate1 = item.volumeInfo.publishedDate;
      bookLink1 = item.volumeInfo.previewLink;
      previewLink = item.volumeInfo.industryIdentifiers[1].identifier
      bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

      item2 = response.items[i + 1];
      title2 = item2.volumeInfo.title;
      author2 = item2.volumeInfo.authors;
      publisher2 = item2.volumeInfo.publisher;
      publishedDate2 = item.volumeInfo.publishedDate;
      bookLink2 = item2.volumeInfo.previewLink;
      previewLink = item2.volumeInfo.industryIdentifiers[1].identifier
      bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

      outputList.innerHTML += '<div class="row mt-4">' +
        formatOutput(bookImg1, title1, author1, publisher1, publishedDate1, bookLink1, previewLink) +
        '</div>';

      outputList.innerHTML += '<div class="row mt-4">' +
        formatOutput(bookImg2, title2, author2, publisher2, publishedDate2, bookLink2, previewLink) +
        '</div>';

      console.log(outputList);
    }
  }

  function formatOutput(bookImg, title, author, publisher, publishedDate, bookLink, previewLink) {
    // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
    var viewUrl = 'https://books.google.jo/books?id=' + previewLink + `&hl=&cd=4&source=gbs_api`; //constructing link for bookviewer
    var Card = `<div class="col-lg-6">
        <div class="card" style="">
          <div class="row no-gutters">
            <div class="col-md-4" style="padding-top: 15px;">
              <img src="${bookImg}" class="card-img" alt="...">
            </div>
                 <div class="col-md-8" style="padding: 10px 10px 10px 10px">
                 <div class="card-body">

                <h2 class="card-title">${title}</h2>
                <p class="card-text">Author: ${author}</p>
                <p class="card-text">Publisher: ${publisher}</p>
                <p class="card-text">publishedDate: ${publishedDate}</p>
                <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
              </div>
            </div>
          </div>
        </div>
      </div>`
    return Card;
  }

  function displayError() {
    alert("Search term can not be empty!")
  }

});


