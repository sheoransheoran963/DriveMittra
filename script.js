let data = {};
let timeLeft = 300;

// PAGE SWITCH
function goToPage2(){
  data.vehicle = document.getElementById("vehicle").value;
  data.state = document.getElementById("state").value;
  data.fromDate = document.getElementById("fromDate").value;
  data.toDate = document.getElementById("toDate").value;

  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

function goToPage3(){
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "block";
saveData();
  startCountdown();
}

// COUNTDOWN
function startCountdown(){
  let timer = document.getElementById("countdown");

  let interval = setInterval(()=>{
    let min = Math.floor(timeLeft/60);
    let sec = timeLeft%60;

    timer.innerHTML = `⏳ ${min}:${sec < 10 ? '0'+sec : sec}`;
    timeLeft--;

    if(timeLeft < 0){
      clearInterval(interval);
      timer.innerHTML = "❌ Time expired";
    }
  },1000);
}

// ⚠️ FAKE COMPLETE BUTTON (testing ke liye)
function completeFromBackend(){
  document.getElementById("downloadBtn").style.display = "block";
  document.getElementById("countdown").innerHTML = "✅ Completed";
}

// PDF
function downloadPDF(){
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.text("Vehicle: " + data.vehicle, 20, 20);
  doc.text("State: " + data.state, 20, 30);
  doc.text("Valid: " + data.fromDate + " to " + data.toDate, 20, 40);

  doc.save("pass.pdf");
}
