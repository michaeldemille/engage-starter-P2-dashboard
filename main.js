

var tableElement = document.getElementById('dashboard-list');
var personsAreaElement = document.getElementById('persons-area');

var persons = [
    { name: 'Brinker the Tinker', info: 'Breaking code and taking names.', img: 'images/brinkerthetinker.png' },
    { name: 'Mike the Extraordinaire', info: 'Hacker by day; Genius, billionaire, playboy, philanthropist by night', img: 'images/mikeg2.jpg' },
    { name: 'Trawick the Hunter ', info: 'Lady\'s be on the look, cause Trawick the Hunter is in the house', img: 'images/hunter.png' },
    { name: 'Spencer the Kind', info: 'Need help, Spencer the Kind comes to mind', img: 'images/spencer.png' },
    { name: 'David the Nurturer', info: 'Caring for those that can\'t care for themselves', img: 'images/david.jpg' },
    { name: 'Autumn the Mysterious', info: 'Lurks in the shadows... and doesn\'t share her projects :) ', img: 'images/autumn2.jpg' }

]

var tableList = [
    { rank: '1', name: 'LoL', type: 'MOBA', cost: 'free', year: '2010' },
    { rank: '2', name: 'Ha;f-Life', type: 'FPS', cost: '$19', year: '2010' },
    { rank: '3', name: 'StarCraft', type: 'RTS', cost: '$19', year: '2008' }
];
dashboard = {};

dashboard.buildTable = function buildTable(value) {
    if (value) { value = value.toLowerCase() }
    tableElement.innerHTML = '';
    for (var i = 0; i < tableList.length; i++) {
        var tr = document.createElement('TR');
        var contentExists = false;
        for (var key in tableList[i]) {
            if (tableList[i].hasOwnProperty(key)) {
                var element = tableList[i][key];
                var td = document.createElement('td')
                if (element.toLowerCase().indexOf(value) > -1) {
                    contentExists = true;
                }
                var tdText = document.createTextNode(element);
                td.appendChild(tdText);

                tr.appendChild(td);
            }
        }
        if (contentExists) tableElement.appendChild(tr);
    }
}

dashboard.personArea = function personArea(value) {
    if (value) { value = value.toLowerCase() }
    personsAreaElement.innerHTML = ""
    var personArea = '';
    for (var i = 0; i < persons.length; i++) {
        var element = persons[i];
        if (element.name.toLowerCase().indexOf(value) > -1 && value != '') {
            var person =
                '<div class="col-xs-6 col-sm-3 placeholder">' +
                '<img src=" ' + element.img + ' " width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">' +
                '<h4>' + element.name + '</h4>' +
                '<span class="text-muted">' + element.info + '</span>' +
                '</div>'

            personArea += person;
        }
        personsAreaElement.innerHTML = personArea;
    }
}

dashboard.search = function search(value) {

    // if (value.length > 2) {
    dashboard.buildTable(value);
    dashboard.personArea(value);
    //  }
}



dashboard.buildTable('');
// dashboard.personArea('');

