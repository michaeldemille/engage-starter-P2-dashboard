

var tableElement = document.getElementById('dashboard-list');
var personsAreaElement = document.getElementById('persons-area');

var persons = [
    { name: 'Mike the Extraordinaire', info: 'Hacker by day; Genius, billionaire, playboy, philanthropist by night', img: 'images/mikeg2.jpg' },
    { name: 'Trawick the Hunter ', info: 'Lady\'s be on the look, cause Trawick the Hunter is in the house', img: 'images/hunter.png' },
    { name: 'Spencer the Kind', info: 'Need help, Spencer the Kind comes to mind', img: 'images/spencer.png' },
    { name: 'Brinker the Tinker', info: 'Breaking code and taking names.', img: 'images/brinkerthetinker.png' },
    { name: 'David the Nurturer', info: 'Caring for those that can\'t care for themselves', img: 'images/david.jpg' },
    { name: 'Autumn the Mysterious', info: 'Lurks in the shadows... and doesn\'t share her projects :) ', img: 'images/autumn2.jpg' }

]

// var tableList = [
//     { rank: '1', name: 'LoL', type: 'MOBA', cost: 'free', year: '2010' },
//     { rank: '2', name: 'Ha;f-Life', type: 'FPS', cost: '$19', year: '2010' },
//     { rank: '3', name: 'StarCraft', type: 'RTS', cost: '$19', year: '2008' }
// ];

dashboard = {};

dashboard.buildTable = function buildTable(value, tableList) {
    if (value)  value = value.toLowerCase() 
    if (!tableList) tableList = []
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
};

dashboard.personArea = function personArea(value) {
    if (value) { value = value.toLowerCase() }
    personsAreaElement.innerHTML = ""
    var personArea = '';
    for (var i = 0; i < persons.length; i++) {
        var element = persons[i];
        if (element.name.toLowerCase().indexOf(value) > -1) {
            var person =
                '<div class="col-xs-6 col-sm-3 placeholder flow" >' +
                '<img src=" ' + element.img + ' " width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">' +
                '<h4>' + element.name + '</h4>' +
                '<span class="text-muted">' + element.info + '</span>' +
                '</div>'

            personArea += person;
        }
        personsAreaElement.innerHTML = personArea;
    }
};




// setInterval(function() {
//   $("div")
//     .velocity("transition.slideLeftIn", { stagger: 250 })
//     .delay(750)
//     .velocity({ opacity: 0 }, 750)
// }, 2000);


dashboard.search = function search(value) {

    // if (value.length > 2) {
    dashboard.buildTable(value);
    dashboard.personArea(value);
    //  }
};

dashboard.addTableElement = function addTableElement(value) {
    var name = document.getElementById('name-input').value;
    firebase.database().ref('table-elements').push({
    rank: '1' + Math.random() * 100, 
    name: name, 
    type: 'MOBA', 
    cost: 'free', 
    year: '2010' 
  });
  console.log(name)
};


dashboard.personArea('');

firebase.database().ref('table-elements').on('child_added', function(data) {
  dashboard.buildTable('', [data.val()]);
});

$("#navbar").velocity(
  { 
    scale: 1.5
  },
  { 
    duration: 2000,
    delay: 500, // Insert a 500ms delay between each loop alternation.
    loop: 2 // Loop twice.
  });

