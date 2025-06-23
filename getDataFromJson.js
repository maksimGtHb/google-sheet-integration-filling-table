function doPost(e) {
  try {
    // Parse incoming JSON body
    var json = JSON.parse(e.postData.contents);
    
    var issue = json.issue;

    // Construct simplified issue object
    var issueObj = {
      key: issue.key,
      summary: issue.fields.summary,
      dataCreated: issue.fields.dataCreated,
      complex: issue.fields.complex,
      requestType: issue.fields.requestType,
      status: issue.fields.status
    };

    // Load existing stored issues
    var props = PropertiesService.getScriptProperties();
    var existing = props.getProperty("issueResults");
    var issuesArray = existing ? JSON.parse(existing) : [];

    // Append the new issue
    issuesArray.push(issueObj);

    // Save updated list back to properties
    props.setProperty("issueResults", JSON.stringify(issuesArray));

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Issue stored successfully", total: issuesArray.length })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}