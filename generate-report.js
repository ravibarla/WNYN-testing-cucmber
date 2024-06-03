const fs = require('fs');
const reporter = require('cucumber-html-reporter');

const reportPath = './reports/cucumber_report.json';

// Check if the JSON report exists
if (!fs.existsSync(reportPath)) {
  console.error(`JSON report not found at path: ${reportPath}`);
  process.exit(1);
}

const options = {
  theme: 'bootstrap',
  jsonFile: reportPath,
  output: './reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "0.0.1",
    "Test Environment": "STAGING",
    "Browser": "Chrome 91.0.4472.101",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);
