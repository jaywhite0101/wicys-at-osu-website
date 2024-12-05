(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['singleTestimony'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<div class=\"testimonial-post\">\r\n    <div class=\"testimonial-content\">\r\n        <div class=\"testimony-text-col\">\r\n            <div class=\"testimony-text\">\r\n                <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":6,"column":28}}}) : helper)))
    + "</h2>\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":7,"column":19},"end":{"line":7,"column":27}}}) : helper)))
    + "</p>\r\n            </div>\r\n            <button type=\"button\" class=\"button\" id=\"readMore\">Read More</button>\r\n        </div>\r\n        <div class=\"testimony-pic\">\r\n            <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":12,"column":22},"end":{"line":12,"column":29}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"alt") || (depth0 != null ? lookupProperty(depth0,"alt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data,"loc":{"start":{"line":12,"column":36},"end":{"line":12,"column":43}}}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n";
},"useData":true});
})();