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

    // Form input validation
    function validateInput(data) {
      const errors = [];

      if (isNaN(data.pH) || data.pH < 5.0 || data.pH > 7.5) {
        errors.push("pH must be number and between 5.0 to 7.5 pH");
      }
      if (isNaN(data.EC) || data.EC < 0.2 || data.EC > 4.5) {
        errors.push(
          "Electrical Conductivity must be number and between 0.2 to 4.5 mS/cm",
        );
      }
      if (
        isNaN(data.temperature) ||
        data.temperature < 55 ||
        data.temperature > 95
      ) {
        errors.push("Temperature must be number and between 55 to 95 F");
      }
      if (isNaN(data.humidity) || data.humidity < 30 || data.humidity > 90) {
        errors.push("Relative Humidity must be number and between 30 to 90 %");
      }
      return errors;
    }
  }
  // event handlers
  readingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const telemetryReadingsForm = {
      id: crypto.randomUUID(),
      pH: parseInt(inputPh.value, 10),
      EC: parseInt(inputEc.value, 10),
      temperature: parseFloat(inputTemp.value),
      humidity: parseInt(inputHumidity.value, 10),
      timestamp: new Date().toLocaleDateString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  const validationErrors = validateInput(telemetryReadingsForm);
  if (validationErrors.length > 0) {
    displayError(validationErrors.join(" "));
    return;
  }
  hideError();

  // verify the risk level
  telemetryReadingsForm.risk = evaluateRisk(
    telemetryReadingsForm.pH,
    telemetryReadingsForm.EC,
    telemetryReadingsForm.temperature,
    telemetryReadingsForm.humidity,
  );

  // keep track of the telemetry readings
  readings.unshift(telemetryReadingsForm);

  // commit to the memory
  saveReadings();

  // reset the user form after the data being stored
  telemetryReadingsForm.reset();

  // bring focus in the first field in the form
  inputPh.focus();

  recordsList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("btn-delete")) {
      const readingId = target.dataset.id;
      readings = readings.filter(function (reading) {
        return reading.id == readingId;
      });
      saveReadings();
      render();
    }
  });

  btnClearAll.addEventListener("click", (event) => {
    if (readings.length === 0) {
      return;
    }
    if (
      confirm(
        "Are you sure that you want to delete all the telemetry readings?",
      )
    ) {
      readings = [];
      saveReadings();
      render();
    }
  });
});
