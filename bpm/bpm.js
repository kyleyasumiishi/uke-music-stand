/*
Beats Per Minute Tool
By: Kyle Yasumiishi
Last Updated: 4/18/2018
*/

// Global variables
let is_started = false;
let start = 0;
let current_bpm = 0;
let average_bpm = 0;
let total_clicks = 0;
let previous_click_time = 0;
let current_click_time = 0;

// Register event handlers
window.onload = function() {
    document.addEventListener("keydown", keydown);
    document.getElementById("click-btn").onclick = update_bpm;
    document.getElementById("reset-btn").onclick = reset;
}

// Calculates and returns the current bpm based on the previous two click times. 
function calc_current_bpm() {
    return Math.floor(60000 / (current_click_time - previous_click_time));
}

// Calculates and returns the average bpm based on all previous click times.
function calc_average_bpm() {
    if (total_clicks == 1) {
        return current_bpm;
    } else {
        return Math.floor(((average_bpm * (total_clicks - 1)) + current_bpm) / total_clicks);
    }
}

// Updates the current and average bpms.
function update_bpm() {
    if (!is_started) {
        is_started = true;
        start = Date.now();
    } else {
        current_click_time = Date.now() - start;
        console.log("The TIME is ", current_click_time / 1000, " seconds");
        total_clicks += 1;
        current_bpm = calc_current_bpm();
        average_bpm = calc_average_bpm();
        previous_click_time = current_click_time;
        document.getElementById("current").innerHTML = "Current: " + current_bpm;
        document.getElementById("average").innerHTML = "Average: " + average_bpm;
    }
}

// Keydown event handler for space bar.
function keydown(event) {
    if (event.key == " ") {
        event.preventDefault();
        update_bpm();
    }
}

 // Event handler for reset button. 
function reset() {
    is_started = false;
    start = 0;
    current_bpm = 0;
    average_bpm = 0;
    total_clicks = 0;
    previous_click_time = 0;
    current_click_time = 0;
    document.getElementById("current").innerHTML = "Current: " + current_bpm;
    document.getElementById("average").innerHTML = "Average: " + average_bpm;
}