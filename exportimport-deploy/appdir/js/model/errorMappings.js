define(function(require){var $=require("jquery"),_=require("underscore"),Backbone=require("backbone"),indexBody=require("model/indexBody"),uiUtils=require("util/uiUtils"),ErrorMappings=Backbone.Model.extend({defaults:{ERRORS:{connect:"Could not connect to Application Director \u2013 check your Application Director IP address, Network access to Application Director and instance availability",authenticate:"Could not authenticate user \u2013 check your login credentials to Application Director and your access levels (Catalog Admin, Application Architect)","import":undefined}},initialize:function(){var emailHTML=uiUtils.generateEmailTemplate({emailToAddress:indexBody.get("contactEmail"),emailToName:indexBody.get("contactName")}),errorsHash=this.get("ERRORS");errorsHash.import="Could not import \u2013 please send an email to "+emailHTML+" with the blueprint name and URL to get the error resolved",Backbone.Model.prototype.initialize.apply(this,arguments)},get:function(attr){return _.isFunction(this[attr])?this[attr]():Backbone.Model.prototype.get.call(this,attr)}});return new ErrorMappings});