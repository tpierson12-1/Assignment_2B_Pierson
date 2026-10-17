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

  const inputPh = document.getElementById("pH");
  const inputEC = document.getElementById("EC");
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
  function evaluateRisk(pH, EC, temp, humidity) {
    if (pH > 7.5 || EC > 4.5 || temp > 95 || humidity > 90) {
      return { level: "critical", label: "Critical" };
    }
    if (pH <= 6.5 || EC <= 2.0 || temp <= 71.6 || humidity <= 70) {
      return { level: "optimal", label: "Optimal" };
    }
    return { level: "warning", label: "Warning" };
  }

  // INput form validation:
  function validateInput(data) {
    const errors = [];

    if (isNaN(data.pH) || data.pH < 5.0 || data.pH > 7.5) {
      errors.push("pH must be a number and between 5.0 to 7.5");
    }
    if (isNaN(data.EC) || data.EC < 0.2 || data.EC > 4.5) {
      errors.push("EC must be a number and between 0.2 to 4.5 mS/cm");
    }
    if (isNaN(data.humidity) || data.humidity < 30 || data.humidity > 90) {
      errors.push("Humidity be a number and between 30 to 90 %");
    }
    if (isNaN(data.temp) || data.temp < 55 || data.temp > 95) {
      errors.push("Temperature must be a number and between 55 to 95 degree F");
    }

    return errors;
  }

  // event handlers
  readingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      id: crypto.randomUUID(),
      pH: parseInt(inputPh.value, 10),
      EC: parseInt(inputEC.value, 10),
      humidity: parseInt(inputHumidity.value, 10),
      temp: parseFloat(inputTemp.value),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const validationErrors = validateInput(formData);

    if (validationErrors.length > 0) {
      displayError(validationErrors.join(" "));
      return;
    }

    hideError();

    // classify risk level
    formData.risk = evaluateRisk(
      formData.pH,
      formData.EC,
      formData.humidity,
      formData.temp,
    );

    // add this to our records array to keep track of all the user's reading data
    records.unshift(formData);

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
      confirm("Are you sure you want to delete all the telemetry readings?")
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
  }
})();
