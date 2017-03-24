/*global module, require*/
var Table = require('cli-table');

/**
 * Class for display bench result
 */
var DefaultReporter = function (outputStream) {

  this.outputStream = outputStream || process.stdout;

};

DefaultReporter.prototype.report = function (steps, monitor, stopwatch) {

  var tableSteps = new Table({
    head : ['Number', 'Connections', 'Errors', 'Average Response', 'Duration(ms)']
  });

  let totalSum = 0;
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    let sum = 0;
    for (let index in step.monitor.results.responseTime) {
      sum += step.monitor.results.responseTime[index];
    }
    totalSum += sum / step.monitor.results.responseTime.length;

    tableSteps.push([
      step.number,
      step.monitor.results.connection,
      step.monitor.results.errors,
      sum / step.monitor.results.responseTime.length,
      step.stopwatch.getDuration()
    ]);
  }
  this.outputStream.write('\n');
  this.outputStream.write('#### steps report ####'.inverse + '\n');
  this.outputStream.write(tableSteps.toString() + '\n');

  var tableTotal = new Table({
    head : ['Number', 'Connections', 'Errors', 'Message Send', 'Message Fail', 'Average Response', 'Duration(ms)']
  });

  tableTotal.push([
    monitor.counter,
    monitor.results.connection,
    monitor.results.errors,
    monitor.results.msgSend,
    monitor.results.msgFailed,
    totalSum / steps.length,
    stopwatch.getDuration()
  ]);

  this.outputStream.write('#### total report ####'.inverse + '\n');
  this.outputStream.write(tableTotal.toString() + '\n');

};

module.exports = DefaultReporter;
