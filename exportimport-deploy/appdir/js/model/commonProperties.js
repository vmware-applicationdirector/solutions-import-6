/**
 * Placeholder for common properties
 * @author samueldoyle
 */
define(["jquery", "underscore", "backbone"], function ($, _, Backbone) {
    var CommonProperties = Backbone.Model.extend({
        defaults:{
            VMW_JSON:"vmware.json", // The json file that contains the config information, see the sample.vmware.json
            IMPORT_PAGE:"import.html",
            APPD_SE:"/darwin/api/service/action/importexport", // Service Endpoint for web import
            APPD_VERIFY_LOGIN:"/darwin/api/security/verify-login", // verify login api
            ID_LIST:["noticeModal", "responseDataControl", "responseData", "errordiv", "error-readme-content", "appDirUserName",
                     "center", "advancedOptionsChevron", "advancedOptionsWrap", "importFormWrapper", "page-index", "page-import", "appDirPassword",
                     "appDirHost", "appDirTenantGroup", "appdVersion", "appDirTenant", "appDirBusinessGroups", "appDirVersion", "readme-content",
                     "conflictResolutionStrategy", "importAsNewSuffix", "importGroup", "bpExportFN", "importHeader", "importButton", "contentWrapper",
                "indexBodyWrapper", "mainbody", "shared", "loginFormWrapper", "loginButton", "continueButton", "authPromptInfo"]
        },

        initialize:function () {
            _.each(this.get("ID_LIST"), function (method) {
                this[method] = function() { return $("#"+method); }
            }, this);

            Backbone.Model.prototype.initialize.apply(this, arguments);
        },

        get:function (attr) {
            if (_.isFunction(this[attr])) {
                return this[attr]();
            }
            return Backbone.Model.prototype.get.call(this, attr);
        },

        /** UI
         * If there is going to be a page element referenced in many variables add a getter method onto the model which
         * will be returned from a call to overridden get. Inject this model wherever
         **/
        noticeModalWrapper:function () {
            var target = $(document.documentElement).length > 0 ? $(document.documentElement) : $(document.body);
            if (!_.isElement($("#noticeModalWrapper")[0])) {
                target.append('<div id="noticeModalWrapper"></div>');
            }
            return $("#noticeModalWrapper");
        }
    });

    return new CommonProperties();
});
