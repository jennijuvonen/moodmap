angular
  .module('application.home')
  .service('DataService', DataService);

DataService.$inject = [];

function DataService() {
    this.calcualte = function() {
        return "3 + 3 = 6";
    };

    return this;
}
