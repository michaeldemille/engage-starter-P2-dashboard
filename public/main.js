

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



// dashboard.buildTable = function buildTable(value, tableList) {
//     if (value)  value = value.toLowerCase() 
//     if (!tableList) tableList = []
//     tableElement.innerHTML = '';
//     for (var i = 0; i < tableList.length; i++) {
//         var tr = document.createElement('TR');
//         var contentExists = false;
//         for (var key in tableList[i]) {
//             if (tableList[i].hasOwnProperty(key)) {
//                 var element = tableList[i][key];
//                 var td = document.createElement('td')
//                 if (element.toLowerCase().indexOf(value) > -1) {
//                     contentExists = true;
//                 }
//                 var tdText = document.createTextNode(element);
//                 td.appendChild(tdText);

//                 tr.appendChild(td);
//             }
//         }
//         if (contentExists) tableElement.appendChild(tr);
//     }
// };

dashboard.buildTable = function buildTable(value, tableList) {
    if (value)  value = value.toLowerCase() 
    tableElement.innerHTML = '';
    var buildTable = '';
    for (var i = 0; i < tableList.length; i++) {
        var element = tableList[i]; 
        console.log(element.name)
       if (element.name.toLowerCase().indexOf(value) > -1) {
          var table =
               '<tr>' +
               '<td>' + Math.floor(element.rank) + '</td>' +
               '<td>' + element.name + '</td>' +
               '<td>' + element.type + '</td>' +
               '<td>' + element.cost + '</td>' +
               '<td>' + element.year + '</td>' +
               '</tr>'
               console.log(table)
            buildTable += table;
        }
        tableElement.innerHTML = buildTable;
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









dashboard.search = function search(value) {

    // if (value.length > 2) {
    dashboard.buildTable(value, tableList);
    dashboard.personArea(value);
    //  }
};

dashboard.addTableElement = function addTableElement(value) {
    var rank = document.getElementById('rank-input').value;
    var name = document.getElementById('name-input').value;
    var type = document.getElementById('type-input').value;
    var cost = document.getElementById('cost-input').value;
    var year = document.getElementById('year-input').value;
    
    firebase.database().ref('table-elements').push({
    rank: rank, 
    name: name, 
    type: type, 
    cost: cost, 
    year: year 
  });
  console.log(name)
};


dashboard.personArea('');

var tableList = []

firebase.database().ref('table-elements').on('child_added', function(data) {
  tableList.push(data.val())
  dashboard.buildTable('', tableList);
});

$('.flow').velocity("transition.slideLeftIn", { stagger: 400, duration: 1000 })