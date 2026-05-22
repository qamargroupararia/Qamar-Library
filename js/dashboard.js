const seatSelect = document.getElementById("seatSelect");
const searchInput = document.getElementById("searchInput");
import { db }
from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const studentsRef = collection(db,"students");

const totalSeats = 60;

window.saveStudent = async function(){

const name = document.getElementById("studentName").value;

const mobile = document.getElementById("studentMobile").value;

const selectedSeat = Number(
document.getElementById("seatSelect").value
);

if(name === "" || mobile === ""){

alert("Please Fill All Fields");

return;

}

if(!selectedSeat){

alert("Please Select Seat");

return;

}

const alreadyBooked = document.querySelector(
`.seat[data-seat='${selectedSeat}']`
);

if(alreadyBooked &&
alreadyBooked.classList.contains("booked")){

alert("Seat Already Booked");

return;

}

await addDoc(studentsRef,{

name:name,

mobile:mobile,

seat:selectedSeat,

status:"Checked In",

time:new Date()

});

document.getElementById("studentName").value="";

document.getElementById("studentMobile").value="";

document.getElementById("seatSelect").value="";

}


function loadRealtimeData(){

onSnapshot(studentsRef,(snapshot)=>{

const table = document.getElementById("studentsTable");

const recent = document.getElementById("recentStudents");

const seatGrid = document.getElementById("seatGrid");

table.innerHTML="";

recent.innerHTML="";

seatGrid.innerHTML="";
seatSelect.innerHTML = `

<option value="">
Select Seat
</option>

`;
let bookedSeats=[];

let totalStudents = 0;

snapshot.forEach((docSnap,index)=>{
const searchValue = searchInput.value.toLowerCase();
const data = docSnap.data();
if(
data.name.toLowerCase().includes(searchValue) ||
data.mobile.includes(searchValue)
){
bookedSeats.push(data.seat);

totalStudents++;

table.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${data.name}</td>

<td>${data.mobile}</td>

<td>${data.seat}</td>

<td>

<span class="status-badge">

${data.status}

</span>

</td>

<td>

<button 
class="action-btn edit-btn">
Edit
</button>

<button 
class="action-btn delete-btn"
onclick="deleteStudent('${docSnap.id}')">
Delete
</button>

</td>

</tr>

`;

recent.innerHTML += `
}
<div class="student">

<span>${data.name}</span>

<span>Seat ${data.seat}</span>

</div>

`;

});



for(let i=1;i<=totalSeats;i++){

if(bookedSeats.includes(i)){

seatGrid.innerHTML += `

<div 
class="seat booked"
data-seat="${i}">
</div>

`;

}else{
seatSelect.innerHTML += `

<option value="${i}">
Seat ${i}
</option>

`;
seatGrid.innerHTML += `

<div 
class="seat available"
data-seat="${i}">

</div>

`;

}

}



document.getElementById("totalStudents").innerText = totalStudents;

document.getElementById("availableSeats").innerText = totalSeats - bookedSeats.length;

document.getElementById("todayBookings").innerText = bookedSeats.length;

});

}
window.deleteStudent = async function(id){

const confirmDelete = confirm(
"Delete Student?"
);

if(confirmDelete){

await deleteDoc(
doc(db,"students",id)
);

}

}


loadRealtimeData();
searchInput.addEventListener("input",()=>{

loadRealtimeData();

});
