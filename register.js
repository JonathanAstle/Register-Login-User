const formDataObj = {};
let newUser;

function handleFormSubmit(form) {
    for (let element of form.elements) {
        if (element.id=="submitButton") {
            continue;
        }
        formDataObj[element.id] = element.value;
    }
    console.log(formDataObj);
    newUser = JSON.stringify(formDataObj);
    console.log(newUser);
    makeRequest("https://us-central1-qac-sandbox-c347f.cloudfunctions.net/setUser", "POST").then(data => {
        console.log('IT WORKED', data);
        location.href = "login.html?name="+formDataObj.firstName;
    }).catch(error => {
        console.log('IT DIDNT WORK', error);
    })

    return false;
}

function makeRequest(url, method) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
            if(xhr.status == 201){
                resolve(xhr.response);
                console.log("it worked");
            } else {
                reject(xhr.response);
            }
        };
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(newUser);
    })
}

