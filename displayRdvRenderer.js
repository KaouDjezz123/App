const ipc = require('electron').ipcRenderer;


function loadRdvs(){
 
    const rdvs = ipc.sendSync('getRdvs')
    const rdvsItems = rdvs.reduce((html,r)=>{
      table = document.getElementById("tablerdv") ;
             addHtmlTableRow(table , r)
       
        
         return html
    }, '');

    const rdvList = document.getElementById('rdvList');
    rdvList.innerHTML = rdvsItems;

}

document.addEventListener("DOMContentLoaded", function(){
    loadRdvs();
  //  ipc.on('updatedPatients',loadPatients)
});


function clearTable(table) {
  var rowCount = table.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
  }
}

function addHtmlTableRow(table ,RDV)
{ 
var newRow = table.insertRow(-1);
var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);
var cell5 = newRow.insertCell(4);
var cell6 = newRow.insertCell(5);
var cell7 = newRow.insertCell(6);
var cell8 = newRow.insertCell(7);


cell1.innerHTML = RDV['patient.Nom'];
cell2.innerHTML = RDV['patient.Prenom'];
cell3.innerHTML = RDV.Date.split(' ')[0];
cell4.innerHTML = RDV.Date.split(' ')[1];
cell5.innerHTML = RDV.Objet;
cell6.innerHTML = html = `         <link rel="stylesheet" type="text/css" href="style.css">
<button type="button" class="button3" onClick="editRDV(${RDV.id})"> Modifier </button> `
cell7.innerHTML = html = ` <link rel="stylesheet" type="text/css" href="style.css">
 <button type="button" class="button3" onClick="deleteRDV(${RDV.id})"> Supprimer </button> `;
cell8.innerHTML = html = ` <link rel="stylesheet" type="text/css" href="style.css">
 <button type="button" class="button3" onClick="printRDV(${RDV.id})"> Imprimer </button> `;


}



function deleteRDV(id) {
  var data = {
    'id' : id , 
  }
  ipc.sendSync('deleteRDV',data);
  table1 = document.getElementById("tablerdv") ;
  clearTable(table1) ;
  loadRdvs();

}

function editRDV(id) {
  var data = {
    'id' : id , 
  }
  ipc.sendSync('modifierRDV',data);

}
function printRDV(id) {
  var data = {
    'id' : id , 
  }
  ipc.sendSync('printRDV',data);
 

}


module.exports = { loadRdvs}
