const url = new URLSearchParams(location.search);

if (url.get("name")) {
    document.getElementById("welcome new user").innerHTML="Thanks for making a new user " + url.get("name") + ". You may now log in below:";
} else {
    document.getElementById("welcome new user").innerHTML="You may log in below:";
}



let formDataObj = {};

function handleFormSubmit(form) {
    for (let element of form.elements) {
        if (element.id=="submitButton") {
            continue;
        }
        formDataObj[element.id] = element.value;
    }
    
    makeRequest("https://us-central1-qac-sandbox-c347f.cloudfunctions.net/login?username=" + formDataObj.username + "&password=" + formDataObj.password, "GET")
    .then((data)=>{
        console.log("username and password accepted!");
        console.log(JSON.parse(data));
        location.href = "user.html?firstName="+JSON.parse(data).firstName+"&lastName="+JSON.parse(data).lastName;
    })
    .catch((data, data2)=>{
        console.log("username and/or password invalid!" + data);
    })

    return false;
}


function makeRequest(url, method) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
            if(xhr.status == 200){
                resolve(xhr.response);
            } else {
                reject(xhr.status);
            }
        }
        xhr.open(method, url);
        xhr.send();
    })
}

