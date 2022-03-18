# TASK DOCUMENT #

This document includes guidelines and requirements of the technical task, and helpful resources to complete the task.

### The task info ###

* Replace the UI design (please find the UI on the UI Folder) with an interactive page.
* The UI contains the 'Stepper Form' to registe a user in the course, by sending input on answers of specific questions.
* Questions will appear as two parts including: 1) questions on screen 01 and 2) "other" question on screen 02 (see UI Folder).
* All assets you need are on the UI folder.
* Background Colors: #715398 , #67bfb5
* Button Color: #755197 , #3b4394

### Task board ###

1. Convert the UI layout to an interactive page.
2. Send the entered data which the user types in, for each individual screen.
3. Show success message for the user after sending the data and completing the steps.


### Technology and tools ###

* VUE framework. (Already installed for you on repo).
* Bootstrap-Vue framework to implement the HTML tags and style.
* Axios to handling HTTP client  https://www.npmjs.com/package/axios .
* VUEX (State Management Pattern) https://vuex.vuejs.org to handling components.
* Sweetalert2 to showing messages. https://www.npmjs.com/package/sweetalert2 .


### Registration Endpoint ###

* URL: https://jeelaidm-748b.restdb.io/rest/invitations
* Method: POST
* apiKey: 622ceb3adced170e8c83a1fd (end it on url query)
* Feilds:
    - name	    -   text
    - email	    -   text
    - phone	    -   text
    - stopper	    -   text
    - features    -   json


## AJAX Sample:

```
var url = "https://jeelaidm-748b.restdb.io/rest/invitations?apikey=622ceb3adced170e8c83a1fd";
var xhr = new XMLHttpRequest();
xhr.open("POST", url);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};
var data = `{
    "name": "Mahmoud SAID",
    "name": "name@gmail.com",
    "phone": "01093347242",
    "stopper": "nothing",
    "features": [
        "features 1",
        "features 2",
        "features 3"
    ]
}`;

xhr.send(data);
```

### Project setup

* Install packages.
```
npm i
```

* Run the project
```
npm run serve
```

### Contact

Email: msaid@aidm.ai
whatsapp: 0201093347242

Don't forget to communicate if you need an inquiry.