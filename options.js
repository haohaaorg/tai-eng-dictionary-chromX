// Saves options to chrome.storage
function save_options() {
  var defaultDict = document.getElementById("default-dictionary").value;

  chrome.storage.sync.set(
    {
      defaultDict: defaultDict,
    },
    function () {
      var status = document.getElementById("save-status");
      status.textContent = "Options saved.";
      status.style.display = "";
      setTimeout(function () {
        status.textContent = "";
        status.style.display = "none";
      }, 1000);
    }
  );
}

// read options from chrome.storage.
function restore_options() {
  chrome.storage.sync.get("defaultDict", function (items) {
    document.getElementById("default-dictionary").value =
      items.defaultDict || "eng2shn";
  });
}

// reset all to default
function reset_options() {
  chrome.storage.sync.clear(function () {
    var status = document.getElementById("save-status");
    document.getElementById("default-dictionary").value = "eng2shn";
    status.textContent = "Clear all.";
    status.style.display = "";
    setTimeout(function () {
      status.textContent = "";
      status.style.display = "none";
    }, 1000);
  });
}

restore_options();
document.getElementById("saveBtn").addEventListener("click", save_options);
document.getElementById("resetBtn").addEventListener("click", reset_options);
