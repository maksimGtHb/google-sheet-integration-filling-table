
function rewriteSheet() {
  var props = PropertiesService.getScriptProperties();
  var stored = props.getProperty("issueResults");
  
  if (!stored) {
    Logger.log("No issueResults found.");
    return;
  }

  var issues = JSON.parse(stored);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow > 1 && lastCol > 0) {
    sheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
  }
  
  issues.forEach(function(issue) {
    
    var complexStr = issue.complex || "-";
    var processedComplex = complexStr
      .split(",") // split by commas
      .map(function(item) {
        return item.trim().replace(/\s*\(.*?\)/g, ""); // remove parentheses and contents
      })
      .join(", ");
    

    sheet.appendRow([
      issue.key,
      formatDate(issue.dataCreated),
      processedComplex,
      issue.requestType,
      issue.summary,
      issue.status
    ]);
  });

  checkAndAddHyperlinks()

  props.deleteProperty("issueResults");

  Logger.log("Pasted " + issues.length + " issues to the sheet.");
}