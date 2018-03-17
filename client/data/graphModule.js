(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){var u=function(a){var d=a.each,h=a.Series,k=a.addEvent,l=a.fireEvent,m=a.wrap,f={init:function(){h.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var g=this.chart,a=this.options.baseSeries;this.baseSeries=a&&(g.series[a]||g.get(a))||null},addEvents:function(){var a=this,e;e=k(this.chart,
"seriesLinked",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(e)},addBaseSeriesEvents:function(){var a=this,e,d;e=k(a.baseSeries,"updatedData",function(){a.setDerivedData()});d=k(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(e,d)},destroy:function(){d(this.eventRemovers,function(a){a()});h.prototype.destroy.apply(this,arguments)}};m(a.Chart.prototype,"linkSeries",
function(a){a.call(this);l(this,"seriesLinked")});return f}(d);(function(a,d){function h(a){return function(b){return Math.floor(b/a)*a}}function k(a){return a}var l=a.each,m=a.objectEach,f=a.seriesType,g=a.correctFloat,e=a.isNumber,p=a.arrayMax,q=a.arrayMin;a=a.merge;var c={"square-root":function(a){return Math.round(Math.sqrt(a.options.data.length))},sturges:function(a){return Math.ceil(Math.log(a.options.data.length)*Math.LOG2E)},rice:function(a){return Math.ceil(2*Math.pow(a.options.data.length,
1/3))}};f("histogram","column",{binsNumber:"square-root",binWidth:void 0,pointPadding:0,groupPadding:0,grouping:!1,pointPlacement:"between",tooltip:{headerFormat:"",pointFormat:'\x3cspan style\x3d"font-size:10px"\x3e{point.x} - {point.x2}\x3c/span\x3e\x3cbr/\x3e\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name} \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e'}},a(d,{setDerivedData:function(){var a=this.derivedData(this.baseSeries.yData,this.binsNumber(),this.options.binWidth);this.setData(a,
!1)},derivedData:function(a,n,c){var b=p(a),d=q(a),t={},f=[],r;r=(c=this.binWidth=e(c)?c:(b-d)/n)?h(c):k;for(n=r(d);n<=b;n+=c||1)t[g(r(n))]=0;l(a,function(a){a=g(r(a));t[a]++});m(t,function(a,b){f.push({x:Number(b),y:a,x2:g(Number(b)+c)})});f.sort(function(a,b){return a.x-b.x});return f},binsNumber:function(){var a=this.options.binsNumber,q=c[a]||"function"===typeof a&&a;return Math.ceil(q&&q(this.baseSeries)||(e(a)?a:c["square-root"](this.baseSeries)))}}))})(d,u);(function(a,d){function h(a){var c=
a.length;a=p(a,function(a,c){return a+c},0);return 0<c&&a/c}function k(a,c){var b=a.length;c=g(c)?c:h(a);a=p(a,function(a,b){b-=c;return a+b*b},0);return 1<b&&Math.sqrt(a/(b-1))}function l(a,c,b){a-=c;return Math.exp(-(a*a)/(2*b*b))/(b*Math.sqrt(2*Math.PI))}var m=a.seriesType,f=a.correctFloat,g=a.isNumber,e=a.merge,p=a.reduce;m("bellcurve","areaspline",{intervals:3,pointsInInterval:3,marker:{enabled:!1}},e(d,{setMean:function(){this.mean=f(h(this.baseSeries.yData))},setStandardDeviation:function(){this.standardDeviation=
f(k(this.baseSeries.yData,this.mean))},setDerivedData:function(){1<this.baseSeries.yData.length&&(this.setMean(),this.setStandardDeviation(),this.setData(this.derivedData(this.mean,this.standardDeviation),!1))},derivedData:function(a,c){var b=this.options.intervals,d=this.options.pointsInInterval,e=a-b*c,b=b*d*2+1,d=c/d,f=[],g;for(g=0;g<b;g++)f.push([e,l(e,a,c)]),e+=d;return f}}))})(d,u)});
