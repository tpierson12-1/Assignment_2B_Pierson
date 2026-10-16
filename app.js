// declare a IIFE

(function () {
  "use strict()";

  //create a storage key
  const STORAGE_KEY = "greenhouse_telemary_readings_v1";

  // use the dom element to be stored as JS objects by using the document API
  const readingForm = document.getElementById("reading-form");
  const errorBanner = document.getElementById("form-error-banner");
  const recordsList = document.getElementById("records-list");
  const queueCount = document.getElementById("queue-count");
  const emptyState = document.getElementById("empty-state");
  const btnClearAll = document.getElementById("btn-clear-all");
});
