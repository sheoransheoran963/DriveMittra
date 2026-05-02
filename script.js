let data = {};
let timerRunning = false;

document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();

  if(timerRunning) return;

  data.vehicle = document.getElementById("vehicle").value;
  data.state = document.getElementById("state").value;
  data.fromDate = document.getElementById("fromDate").value;
data.toDate = document.getElementById("toDate").value;

  startCountdown(300); // 5 min
  timerRunning = true;
});

function startCountdown(seconds){
  let timer = document.getElementById("countdown");

  let interval = setInterval(()=>{
    let min = Math.floor(seconds/60);
    let sec = seconds%60;

    timer.innerHTML = `⏳ ${min}:${sec < 10 ? '0'+sec : sec}`;

    seconds--;

    if(seconds < 0){
      clearInterval(interval);
      timer.innerHTML = "✅ Time Completed";
      document.getElementById("pdfBtn").style.display = "block";
    }
  },1000);
}

function downloadPDF(){
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Vehicle Pass", 20, 20);

  doc.setFontSize(12);
  doc.text("Vehicle: " + data.vehicle, 20, 40);
  doc.text("State: " + data.state, 20, 50);
  doc.text("Valid From: " + data.fromDate, 20, 60);
doc.text("Valid Upto: " + data.toDate, 20, 70);

  doc.save("Vehicle_Pass.pdf");
}
