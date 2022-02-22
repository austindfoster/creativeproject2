const images = ["images/", "images/", "images/", "images/", "images/", "images/", "images/", "images/", "images/"];

document.getElementById("boredSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const typeValue = document.getElementById("types").value;
    const priceValue = document.getElementById("priceInput").value;
    const participantsValue = document.getElementById("participantsInput").value;
    console.log(typeValue);
    console.log(priceValue);
    console.log(participantsValue);
    var url = `http://www.boredapi.com/api/activity`;
    if (typeValue != "") {
        url += `?type=${typeValue}`;
    } else if (priceValue != "") {
        if (priceValue.includes("-")) {
            const prices = priceValue.split("-");
            url += `?minprice=${prices[0]}&maxprice=${prices[1]}`;
        } else {
            url += `?price=${priceValue}`;
        }
    } else if (participantsValue != "") {
        url += `?participants=${participantsValue}`;
    }
    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let result = "<div>";
            var sa = document.getElementById("suggested-activity");
            var url2 = `https://imsea.herokuapp.com//api/1?q=${json.activity}`;
            fetch(url2)
                .then(function (r) {
                    return response.json();
                }).then(function (j) {
                    console.log(j);
                    let i = Math.floor(Math.random() * j.results.length);
                    let source = j.results[i];
                    result += `<img src=${source} max-height: 500px>`;
                })
            result += `<h2>Activity: ${json.activity}</h2>`;
            result += `<h2>Number of Particpants: ${json.participants}</h2>`
            result += `<h2>Price: ${json.price}</h2>`;
            if (json.link != "") {
                result += `<a href="${json.link}">Click Here For More Info</a>`;
            }
            result += `</div>`;
            sa.innerHTML = result;
        })
});