let form = document.getElementById("marker_form");

form.elements["hour"].addEventListener("click", () => {
    markerList.request("hour");
})

form.elements["day"].addEventListener("click", () => {
    markerList.request("day");
})

form.elements["week"].addEventListener("click", () => {
    markerList.request("week");
})