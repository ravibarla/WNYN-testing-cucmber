module.exports = {
  default: {
    // `--publish-quiet --require features/**/*.js`,
    format: ["json:./reports/cucumber_report.json"],
    require: ["features/step_definitions/**/*.js"],
  },
};
