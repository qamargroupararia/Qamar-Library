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

if(name === "" || mobile === ""){

alert("Please Fill All Fields");

return;

}

let bookedSeats = [];

document.querySelectorAll(".seat.booked").forEach(seat=>{

bookedSeats.push(Number(seat.innerText));

});

let selectedSeat = null;

for(let i=1;i<=totalSeats;i++){

if(!bookedSeats.includes(i)){

selectedSeat = i;

break;

}

}

if(selectedSeat === null){

alert("No Seats Available");

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

}



function loadRealtimeData(){

onSnapshot(studentsRef,(snapshot)=>{

const table = document.getElementById("studentsTable");

const recent = document.getElementById("recentStudents");

const seatGrid = document.getElementById("seatGrid");

table.innerHTML="";

recent.innerHTML="";

seatGrid.innerHTML="";

let bookedSeats=[];

let totalStudents = 0;

snapshot.forEach((docSnap,index)=>{

const data = docSnap.data();

bookedSeats.push(data.seat);

totalStudents++;

table.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${data.name}</td>

<td>${data.mobile}</td>

<td>${data.seat}</td>

<td>${data.status}</td>

</tr>

`;

recent.innerHTML += `

<div class="student">

<span>${data.name}</span>

<span>Seat ${data.seat}</span>

</div>

`;

});



for(let i=1;i<=totalSeats;i++){

if(bookedSeats.includes(i)){

seatGrid.innerHTML += `

<div class="seat booked">

${i}

</div>

`;

}else{

seatGrid.innerHTML += `

<div class="seat available">

${i}

</div>

`;

}

}



document.getElementById("totalStudents").innerText = totalStudents;

document.getElementById("availableSeats").innerText = totalSeats - bookedSeats.length;

document.getElementById("todayBookings").innerText = bookedSeats.length;

});

}



loadRealtimeData();
