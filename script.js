var a = `<div class="row-item"><form><label>Select a type of activity: </label>
<select id="types" class="round-input" name="Type of Activity">
<option value=""></option><option value="recreational">Recreation</option>
<option value="education">Education</option><option value="social">Social</option>
<option value="relaxation">Relaxing</option><option value="cooking">Cooking</option>
<option value="diy">DIY</option><option value="charity">Charity</option>
<option value="music">Music</option>
<option value="busywork">Busywork</option></select></form></div>`;

var b = `<div class="row-item"><form><label>Enter a price or price range (1-6): </label>
<input id="priceInput" class="round-input" type="text"></input></form></div>`;

var c = `<div class="row-item"><form><label>Number of participants: </label>
<input id="participantsInput" class="round-input" type="text"></input></form></div>`;



document.getElementById("searchType").addEventListener("change", function (event) {
    event.preventDefault();
    document.getElementById("boredSubmit").value = "Find Something To Do";
    var select = document.getElementById("searchType");
    var insert = document.getElementById("limit-search");
    console.log(select.value);
    if (select.value == "random") {
        insert.innerHTML = "";
    } else if (select.value == "activityType") {
        insert.innerHTML = a;
    } else if (select.value == "price") {
        insert.innerHTML = b;
    } else if (select.value == "participants") {
        insert.innerHTML = c;
    }
})

document.getElementById("boredSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("boredSubmit").value = "Try Something Else";
    const typ = document.getElementById("types");
    const pr = document.getElementById("priceInput");
    const part = document.getElementById("participantsInput");
    var v = "";
    if (typ != null) {
        v = typ.value;
        console.log(v);
    } else if (pr != null) {
        v = pr.value;
        console.log(v);
    } else if (part != null) {
        v = part.value;
        console.log(v);
    }
    var url = `https://www.boredapi.com/api/activity`;
    var select = document.getElementById("searchType").value;
    if (select == "activityType") {
        url += `?type=${v}`;
    } else if (select == "price") {
        if (v.includes("-")) {
            const prices = v.split("-");
            url += `?minprice=${prices[0]/10}&maxprice=${prices[1]/10}`;
        } else {
            url += `?price=${v/10}`;
        }
    } else if (select == "participants") {
        url += `?participants=${v}`;
    }
    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let result = "<div>";
            //result += `<img src="images/${}">`;
            var sa = document.getElementById("suggested-activity");
            result += `<h2 class="center">${json.activity}</h2>`;
            result += `<div class="center"><h2>Number of Participants: `;
            result += `${json.participants}</h2>`;
            if (json.participants > 1) {
                result += `<img src="images/groups_white_24dp.svg">`;
            } else {
                result += `<img src="images/person_white_24dp.svg">`;
            }
            result += `</div><div class="center"><h2>Price: `;
            var x = Math.floor(json.price * 10)
            if (x === 0) {
                result += `Free!</h2>`;
            } else {
                result += `</h2>`;
            }
            result += `<img src="images/attach_money_white_24dp.svg">`.repeat(x);
            result += `</div>`;
            if (json.link != "") {
                result += `<div class="center"><a href="${json.link}">Click Here For More Info</a></div>`;
            }
            result += `</div>`;
            sa.innerHTML = result;
        })
});