/**
 * Model backing for view/importForm.hbs template
 * @author samueldoyle
 */
define(function (require) {
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        uiUtils = require("util/uiUtils");

    var IndexBodyModel = Backbone.Model.extend({
        defaults: {
            mainHeader: "A blueprint is a visual model for deployment topology. This page has an import utility that allows you to automatically render the selected application blueprint into vCloud Automation Center 6.0",
            importHeader: "Import Application",
            readMeHeader: "Description",
            contactEnabled: false,
            importEnabled: false,
            contactText: "Contact",
            contactName: "Marketplace Support",
            contactEmail: "app-mgmt-partner-support@vmware.com",
            contactEmailLink: undefined,
            appDDSLink: '<a href="http://www.vmware.com/files/pdf/vcloud/vmware-vcloud-automation-center-datasheet.pdf">vCloud Automation Center - Application Services</a>',
            importButtonText: "Import",
            infoBulletPoints: []
        },

        initialize: function () {
            var that = this;

            this.set("contactEmailLink", uiUtils.generateEmailTemplate({
                emailToAddress: that.get("contactEmail"),
                emailToName: that.get("contactName")
            }));

            var bulletValues = [
                {msg: 'A blueprint is a visual model for deployment topology. This page has an import utility that allows you to automatically render the selected application blueprint into ' + that.get("appDDSLink")},
                {msg: 'Your vCloud Automation Center - Application Services instance needs to be network accessible for the import utility to work'},
                {msg: 'You need to have Catalog Admin and Application Architect roles to use import the blueprint into your instance of vCloud Automation Center - Application Services'},
                {msg: 'If you do not have an instance of vCloud Automation Center - Application Services, contact us at ' + that.get("contactEmailLink")}
            ];

            _.each(bulletValues, function (bullet) {
                this.get("infoBulletPoints").push(bullet);
            }, this);

            Backbone.Model.prototype.initialize.apply(this, arguments);
        }
    });

    return new IndexBodyModel();
});
