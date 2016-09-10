var MenuItem = {
    SOUP: 1,
    MAIN: 2,
    DESSERT: 3
};

function addItem(item) {
    var itemId = null;
    switch (item) {
        case MenuItem.SOUP:
            itemId = '#soups';
            break;
        case MenuItem.MAIN:
            itemId = '#main';
            break;
        case MenuItem.DESSERT:
            itemId = '#dessert';
            break;
    }

    var $input = $("<div><label>Артикул:</label> <input type='text' name='name'> <label>Цена:</label> <input type='text' name='price'> <button class='remove' type='button'>Премахни</button></div>")
    $(itemId).append($input);
}

$(document).ready(function() {
    $('.menuForm').on('click', '.remove', function() { 
        $(this).parent().remove();
    });
    $(".addSoup").click(function() {
        addItem(MenuItem.SOUP)
        return false;
    });
    $(".addMain").click(function() {
        addItem(MenuItem.MAIN)
        return false;
    });
    $(".addDessert").click(function() {
        addItem(MenuItem.DESSERT)
        return false;
    });
    $(".menuForm").submit(function(event) {
        var json = [];

        $.fn.serializeObject = submitForm;

        var soups = $('#soups').serializeObject($('#soups :input').serializeArray());
        json.push({ "category": "Супи", "items": soups })
        var main = $('#main').serializeObject($('#main :input').serializeArray());
        json.push({ "category": "Oсновни", "items": main })
        var dessert = $('#dessert').serializeObject($('#dessert :input').serializeArray());
        json.push({ "category": "Десерти", "items": dessert })

        var jsonResult = JSON.stringify(json);
        console.log(jsonResult);

        event.preventDefault();

        uploadJsonToFirebase(jsonResult)
    });
});

function submitForm(array) {
    var result = [];

    var temp = {
        name: undefined,
        price: undefined
    };

    $.each(array, function() {
        if (temp.name == undefined) {
            temp.name = this.value;
        } else if (temp.price == undefined) {
            temp.price = this.value;
        }

        if (temp.name != undefined && temp.price != undefined) {
            result.push(temp);
            temp = {};
        }
    });
    return result;
}

function uploadJsonToFirebase(json) {
    var blob = new Blob([json], { encoding: "UTF-8", type: 'application/json' });
    var metadata = {
        contentType: 'application/json',
        contentEncoding: 'UTF-8',
        contentLanguage: 'bg'
    };

    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('menu.json').put(blob, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function(error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function() {
            // Upload completed successfully, now we can get the download URL
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log('Uploaded successfully');
            alert('Менюто е качено успешно.');
        });
}