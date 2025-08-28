// function showTime() {
//   document.getElementById("demo").innerHTML = new Date().toLocaleTimeString();
// }


function showTime() {
  const now = new Date();

  // Datepart
  const datePart = now.toDateString();

  // 24 hrs format
  const time24 = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  // 12 hrs format
  const time12 = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
   
  document.getElementById("demo").innerHTML = time12;
}
