// declare IIFE

(function () {
  "use strict()";

  // create a storage key
  const STORAGE_KEY = "greenhouse_telemetry_readings_v1";

  // use the document API to store the dom elements as JS objects
  const readingForm = document.getElementById("reading-form");
  const errorBanner = document.getElementById("form-error-banner");
  const recordsList = document.getElementById("records-list");
  const queueCount = document.getElementById("queue-count");
  const emptyState = document.getElementById("empty-state");
  const btnClearAll = document.getElementById("btn-clear-all");

  const inputPh = document.getElementById("ph");
  const inputEC = document.getElementById("ec");
  const inputHumidity = document.getElementById("humidity");
  const inputTemp = document.getElementById("temperature");

  let records = loadRecords();

  // make initialize the UI call
  render();

  //Read operation
  function loadRecords() {
    try {
      // establish connection with your data store
      const stored = localStorage.getItem(STORAGE_KEY);
      // check if anything was returned or if store is empty
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load records from your data store", error);
      return [];
    }
  }

  //   Write operation
  function saveRecords() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error("Failed to write to your data store", error);
    }
  }

  // procsesing logic for Risk
  function evaluateRisk(ph, ec, temperature, humidity) {
    if (ph > 7.5 || ec > 4.5 || temperature > 95 || humidity > 90) {
      return { level: "critical", label: "Critical" };
    }
    if (ph <= 6.5 || ec <= 2.0 || temperature <= 71.6 || humidity <= 70) {
      return { level: "optimal", label: "Optimal" };
    }
    return { level: "warning", label: "Warning" };
  }

  // form validation:
  function validateInput(data) {
    const errors = [];

    if (isNaN(data.ph) || data.ph < 5.0 || data.ph > 7.5) {
      errors.push("pH must be a number and between 5.0 to 7.5");
    }
    if (isNaN(data.ec) || data.ec < 0.2 || data.ec > 4.5) {
      errors.push("EC must be a number and between 0.2 to 4.5 mS/cm");
    }
    if (isNaN(data.humidity) || data.humidity < 30 || data.humidity > 90) {
      errors.push("Humidity be a number and between 30 to 90 %");
    }
    if (
      isNaN(data.temperature) ||
      data.temperature < 55 ||
      data.temperature > 95
    ) {
      errors.push("Temperature must be a number and between 55 to 95 degree F");
    }

    return errors;
  }

  // event handlers
  readingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const telemetryReadingsData = {
      id: crypto.randomUUID(),
      ph: parseFloat(inputPh.value),
      ec: parseFloat(inputEC.value),
      humidity: parseInt(inputHumidity.value, 10),
      temperature: parseFloat(inputTemp.value),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const validationErrors = validateInput(telemetryReadingsData);

    if (validationErrors.length > 0) {
      displayError(validationErrors.join(" "));
      return;
    }

    hideError();

    // classify risk level
    telemetryReadingsData.risk = evaluateRisk(
      telemetryReadingsData.ph,
      telemetryReadingsData.ec,
      telemetryReadingsData.humidity,
      telemetryReadingsData.temperature,
    );

    // add this to our records array to keep track of all the user's reading data
    records.unshift(telemetryReadingsData);

    // commit this to the memory
    saveRecords();

    // reset the user form after data is being stored
    readingForm.reset();

    // bring the input focus to the first input field
    inputPh.focus();
  });

  recordsList.addEventListener("click", function (event) {
    // confirm which reading card delete btn was clicked
    const target = event.target;
    if (target.classList.contains("btn-delete")) {
      const recordId = target.dataset.id;
      records = records.filter(function (record) {
        return record.id !== recordId;
      });
      saveRecords();
      render();
    }
  });

  // delete all event
  btnClearAll.addEventListener("click", (event) => {
    if (records.length === 0) return;
    if (
      confirm("Are you sure that you want to delete all telemetry readings?")
    ) {
      records = [];
      saveRecords();
      render();
    }
  });

  // dom render
  function render() {
    queueCount.textContent = records.length;

    if (records.length === 0) {
      emptyState.classList.remove("hidden");
      recordsList.innerHTML = "";
      return;
    }
    emptyState.classList.add("hidden");

    // create a virtual dom that minimizes the browser everytime it reloads
    const fragment = document.createDocumentFragment();

    records.forEach(function (rec) {
      const li = document.createElement("li");
      li.className = "reading-card status-" + rec.risk.level;

      li.innerHTML = `<div class="card-top">
    <div>
      <div class="timestamp">Logged at ${rec.timestamp} </div>
      <span class="risk-badge ${rec.risk.level}">${rec.risk.level}</span>
    </div>

    <div class="reading-stats"> 
      <div class="reading-item"><span>pH</span>${rec.ph}</div>
      <div class="reading-item"><span>EC</span>${rec.ec}</div>
      <div class="reading-item"><span>Temperature</span>${rec.temperature.toFixed(1)} F </div>
      <div class="reading-item"><span>Relative Humidity</span>${rec.humidity} % </div>
    </div>
    <button class="btn btn-outline-danger btn-sm btn-delete" data-id="${rec.id}">Delete Reading </button>
    </div>`;

      // add this to the virtual dom
      fragment.appendChild(li);
    });

    recordsList.innerHTML = "";

    recordsList.appendChild(fragment);
  }

  // dynamically show error msg
  function displayError(message) {
    errorBanner.textContent = message;
    errorBanner.classList.remove("hidden");
  }

  // dynamically hide the error msg on correct input
  function hideError() {
    errorBanner.textContent = "";
    errorBanner.classList.add("hidden");
  }

  function escapeHtml(str) {
    return str.replace("/</g", "&lt;").replace("/>/g", "&gt;");
  }
})();
