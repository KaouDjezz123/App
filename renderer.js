const ipc = require('electron').ipcRenderer;

function loadCurrentDayRdvs(){
    const currentDayRdvs = ipc.sendSync('getCurrentDayRdvs')
    const CurrentDayRdvsItems = currentDayRdvs.reduce((html,r)=>{
        table = document.getElementById("tableCurrentDay") ;
          addHtmlTableRow(table , r)

          return html
    },'');

    const currentRdvList = document.getElementById('CurrentDayList');
    currentRdvList.innerHTML = CurrentDayRdvsItems;

}

document.addEventListener("DOMContentLoaded", function(){
    loadCurrentDayRdvs();
  //  ipc.on('updatedPatients',loadPatients)
});




function addHtmlTableRow(table ,RDV)
{ 
var newRow = table.insertRow(-1);
var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);
var cell5 = newRow.insertCell(4);

cell1.innerHTML = RDV['patient.Nom'];
cell2.innerHTML = RDV['patient.Prenom'];
cell3.innerHTML = RDV.Date.split(' ')[0];
cell4.innerHTML = RDV.Date.split(' ')[1];
cell5.innerHTML = RDV.Objet;


}


module.exports = {loadCurrentDayRdvs}
