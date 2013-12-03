/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */

(function(factory){typeof define=="function"&&define.amd?define(factory):window.purl=factory()})(function(){var tag2attr={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href",embed:"src",object:"data"},key=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"],aliases={anchor:"fragment"},parser={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},isint=/^[0-9]+$/;function parseUri(url,strictMode){var str=decodeURI(url),res=parser[strictMode||!1?"strict":"loose"].exec(str),uri={attr:{},param:{},seg:{}},i=14;while(i--)uri.attr[key[i]]=res[i]||"";return uri.param.query=parseString(uri.attr.query),uri.param.fragment=parseString(uri.attr.fragment),uri.seg.path=uri.attr.path.replace(/^\/+|\/+$/g,"").split("/"),uri.seg.fragment=uri.attr.fragment.replace(/^\/+|\/+$/g,"").split("/"),uri.attr.base=uri.attr.host?(uri.attr.protocol?uri.attr.protocol+"://"+uri.attr.host:uri.attr.host)+(uri.attr.port?":"+uri.attr.port:""):"",uri}function getAttrName(elm){var tn=elm.tagName;return typeof tn!="undefined"?tag2attr[tn.toLowerCase()]:tn}function promote(parent,key){if(parent[key].length===0)return parent[key]={};var t={};for(var i in parent[key])t[i]=parent[key][i];return parent[key]=t,t}function parse(parts,parent,key,val){var part=parts.shift();if(!part)isArray(parent[key])?parent[key].push(val):"object"==typeof parent[key]?parent[key]=val:"undefined"==typeof parent[key]?parent[key]=val:parent[key]=[parent[key],val];else{var obj=parent[key]=parent[key]||[];"]"==part?isArray(obj)?""!==val&&obj.push(val):"object"==typeof obj?obj[keys(obj).length]=val:obj=parent[key]=[parent[key],val]:~part.indexOf("]")?(part=part.substr(0,part.length-1),!isint.test(part)&&isArray(obj)&&(obj=promote(parent,key)),parse(parts,obj,part,val)):(!isint.test(part)&&isArray(obj)&&(obj=promote(parent,key)),parse(parts,obj,part,val))}}function merge(parent,key,val){if(~key.indexOf("]")){var parts=key.split("[");parse(parts,parent,"base",val)}else{if(!isint.test(key)&&isArray(parent.base)){var t={};for(var k in parent.base)t[k]=parent.base[k];parent.base=t}key!==""&&set(parent.base,key,val)}return parent}function parseString(str){return reduce(String(str).split(/&|;/),function(ret,pair){try{pair=decodeURIComponent(pair.replace(/\+/g," "))}catch(e){}var eql=pair.indexOf("="),brace=lastBraceInKey(pair),key=pair.substr(0,brace||eql),val=pair.substr(brace||eql,pair.length);return val=val.substr(val.indexOf("=")+1,val.length),key===""&&(key=pair,val=""),merge(ret,key,val)},{base:{}}).base}function set(obj,key,val){var v=obj[key];typeof v=="undefined"?obj[key]=val:isArray(v)?v.push(val):obj[key]=[v,val]}function lastBraceInKey(str){var len=str.length,brace,c;for(var i=0;i<len;++i){c=str[i],"]"==c&&(brace=!1),"["==c&&(brace=!0);if("="==c&&!brace)return i}}function reduce(obj,accumulator){var i=0,l=obj.length>>0,curr=arguments[2];while(i<l)i in obj&&(curr=accumulator.call(undefined,curr,obj[i],i,obj)),++i;return curr}function isArray(vArg){return Object.prototype.toString.call(vArg)==="[object Array]"}function keys(obj){var key_array=[];for(var prop in obj)obj.hasOwnProperty(prop)&&key_array.push(prop);return key_array}function purl(url,strictMode){return arguments.length===1&&url===!0&&(strictMode=!0,url=undefined),strictMode=strictMode||!1,url=url||window.location.toString(),{data:parseUri(url,strictMode),attr:function(attr){return attr=aliases[attr]||attr,typeof attr!="undefined"?this.data.attr[attr]:this.data.attr},param:function(param){return typeof param!="undefined"?this.data.param.query[param]:this.data.param.query},fparam:function(param){return typeof param!="undefined"?this.data.param.fragment[param]:this.data.param.fragment},segment:function(seg){return typeof seg=="undefined"?this.data.seg.path:(seg=seg<0?this.data.seg.path.length+seg:seg-1,this.data.seg.path[seg])},fsegment:function(seg){return typeof seg=="undefined"?this.data.seg.fragment:(seg=seg<0?this.data.seg.fragment.length+seg:seg-1,this.data.seg.fragment[seg])}}}return purl.jQuery=function($){$!=null&&($.fn.url=function(strictMode){var url="";return this.length&&(url=$(this).attr(getAttrName(this[0]))||""),purl(url,strictMode)},$.url=purl)},purl.jQuery(window.jQuery),purl});