define(function(require){var $=require("jquery"),_=require("underscore"),Backbone=require("backbone"),jp=require("jsonPath"),VMWareProperties=Backbone.Model.extend({defaults:{requiredJSONPath:{"$.vmware.config.version":"configVersion","$.vmware.applications.applicationDirectorWebImport.exportFileName":"exportFileName","$.vmware.applications.applicationDirectorWebImport.exportedFileReadme":"exportedFileReadme","$.vmware.applications.applicationDirectorWebImport.exportedWithAppDVersion":"exportedWithAppDVersion","$.vmware.applications.applicationDirectorWebImport.importSectionHeader":"importSectionHeader"},optionalJSONPath:"$.vmware.applications.applicationDirectorWebImport.optional"},get:function(attr){return _.isFunction(this[attr])?this[attr]():Backbone.Model.prototype.get.call(this,attr)},optional:function(){return this.optionalValues},validateJSON:function(jsonObj){var validateAndSetList=_.pairs(this.get("requiredJSONPath")),pair,key,propValue,opts={};for(var i=0;i<validateAndSetList.length;i++){pair=validateAndSetList[i];if(!(propValue=jp(jsonObj,pair[0])))return pair[0];opts[pair[1]]=propValue[0]}return this.set(opts),undefined},initialize:function(attrs){var configJSON=JSON.parse(attrs.rawJSON),notValid=this.validateJSON(configJSON);if(!_.isUndefined(notValid))throw new Error("Validation failed! Missing required property: "+notValid);this.optionalValues=jp(configJSON,this.get("optionalJSONPath")),this.optionalValues=this.optionalValues?this.optionalValues[0]:undefined}});return VMWareProperties});