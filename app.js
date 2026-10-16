// declare a IIFE

(function () {
  "use strict()";

  //create a storage key
  const STORAGE_KEY = "greenhouse_telemary_readings_v1";

  // use the dom elements to be stored as JS objects by using the document API
  const readingForm = document.getElementById("reading-form");
  const errorBanner = document.getElementById("form-error-banner");
  const recordsList = document.getElementById("records-list");
  const queueCount = document.getElementById("queue-count");
  const emptyState = document.getElementById("empty-state");
  const btnClearAll = document.getElementById("btn-clear-all");

  // create dom elements for the html form fields
  const inputPh = document.getElementById("pH");
  const inputEc = document.getElementById("EC");
  const inputTemp = document.getElementById("temperature");
  const inputHumidity = document.getElementById("humidity");

  let readings = loadReadings();

  // initialize the UI
  render();

  // Read operation for the telemetry readings
  function loadReadings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load readings from your data store", error);
      return [];
    }

    // Write operation for telemetry readings
    function saveReadings() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
      } catch (error) {
        console.error("Failed to write to your data store", error);
      }
    }

    // Process logic for the risk badges
    function evaluateRisk(pH, EC, temperature, humidity) {
      if (pH >= 7.5 || temperature >= 95 || EC >= 4.5 || humidity >= 90) {
        return { level: "critical", label: "Critical" };
      }
      if (pH <= 6.5 || temperature <= 71.6 || EC <= 2.0 || humidity <= 70) {
        return { level: "optimal", label: "Optimal" };
      }
      return { level: "warning", label: "Warning" };
    }
  }
});
