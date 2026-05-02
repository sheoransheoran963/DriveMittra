let data = {};

document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();

  data.vehicle = document.getElementById("vehicle").value;
  data.state = document.getElementById("state").value;
  data.time = document.getElementById("time").value;

  startCountdown(300); // 5 min
});

function startCountdown(seconds){
  let timer = document.getElementById("countdown");

  let interval = setInterval(()=>{
    let min = Math.floor(seconds/60);
    let sec = seconds%60;

    timer.innerHTML = `Time left: ${min}:${sec}`;

    seconds--;

    if(seconds < 0){
      clearInterval(interval);
      timer.innerHTML = "Done!";
    }
  },1000);
}

function downloadPDF(){
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.text("Vehicle: " + data.vehicle, 10, 10);
  doc.text("State: " + data.state, 10, 20);
  doc.text("Time: " + data.time, 10, 30);

  doc.save("receipt.pdf");
}
