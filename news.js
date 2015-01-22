/* configuration */
var maxLength = 20;
/* writing HTML */
document.write(
  '<div data-role="page" id="list">' +
  '  <div data-role="header" data-position="fixed" data-theme="b">' +
  '     <a href="news.html" class="ui-icon-nodisc" data-iconpos="notext" data-role="button" data-iconshadow="false" data-icon="home" data-inline="true">Home</a>' +
  '    <h1 id="top-head">XUGS Infopad</h1> ' +
  '  </div>' +
  '  <div data-role="content">' +
  ' <h1 style="text-align:center;"">Latest news from <br/><font style="font-family:schoolbell; color:#259b24;">Xavier University Grade School</font><br/></h1>' +
  '  <img style="width:100%;background-image:url(images/unload.png); background-position:center; background-repeat:no-repeat; min-height:200px;" src="https://dl.dropboxusercontent.com/u/186790061/GS%20Infopad/cervini.jpg"/>' +
  '    <ul data-role="listview" id="articleList" data-inset="true">' +
  '  <div data-role="footer" data-position="fixed">'+
  '    <div data-role="navbar" class="ui-icon-nodisc" data-iconpos="top" data-theme="c">' +
  '    <ul>' +
  '      <li><a href="news.html"  class="ui-btn-active" data-theme="a" data-icon="home" data-iconshadow="false" data-iconpos="notext">Home</a></li>' +
  '      <li><a href="sched.html" data-icon="clock" data-iconshadow="false" data-iconpos="notext">Schedules</a></li>' +
  '      <li><a href="handbook.html" data-iconshadow="false" data-icon="tag" data-iconpos="notext">Handbook</a></li>' +
  '      <li><a href="contact.html" data-iconshadow="false" data-icon="phone" data-iconpos="notext">Contact</a></li>' +
    '      <li><a href="credits.html" data-iconshadow="false" data-icon="info" data-iconpos="notext">About</a></li>' +
  '    </ul>' +
  '    </div>' +
  '</div>'
);
for(var i=1; i<=maxLength; i++){
  document.write(
    '<li id="list' + i + '"><a href="#article' + i + '" id="link' + i + '">&nbsp;</a></li>'
  );
}
document.write(
  '    </ul>' +
  '  </div>' +
  '</div>'
);
for(i=1; i<=maxLength; i++){
  document.write(
    '<div data-role="page" id="article' + i + '">' +
    '  <div data-role="header" data-position="fixed" data-theme="b">' +
    '    <a href="#list" data-role="button" data-icon="arrow-l" data-back="true" class="ui-icon-nodisc" data-iconshadow="false" data-iconpos="notext">Back</a>' +
    '    <h1 id="articleHeader' + i + '">&nbsp;</h1>' +
    '    <a href="#" id="openButton' + i + '" data-role="button" data-icon="bars"' +
    '      rel="external" class="ui-icon-nodisc" data-iconshadow="false">Open</a>' +
    '  </div>' +
    '  <div data-role="content" data-theme="d">' +
    '    <div id="articleContent' + i + '" class="articleContent"></div>' +
    '    <div data-role="controlgroup" data-type="horizontal">' +
    '      <a href="#article' + String(i-1) + '" data-role="button" data-icon="arrow-l"' +
    '        data-inline="true" class="prevButton">Previous</a>' +
    '      <a href="#article' + String(i+1) + '" data-role="button" data-icon="arrow-r"' +
    '        data-inline="true" class="nextButton" data-iconpos="right">Next</a>' +
    '    </div>' +
    '  </div>' +
    '</div>'
  );
}
/* JSONP */
$(function(){
  getOnlineFeed('http://calcunico.blogspot.com/feeds/posts/default?alt=rss');
  getOnlineFeed('https://www.facebook.com/feeds/page.php?id=907791529232944&format=rss20');
});
/* functions */
var listEntries = function(json) {
  if (!json.responseData.feed.entries) return false;
  $('#widgetTitle').text(json.responseData.feed.title);
  var articleLength =json.responseData.feed.entries.length;
  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
  for (var i = 1; i <= articleLength ; i++) {
    var entry = json.responseData.feed.entries[i-1];
    $('#link' + i).text(entry.title);
    $('#articleHeader' + i).text(entry.title);
    $('#openButton' + i).attr('href', entry.link);
    $('#articleContent' + i).append(entry.content);
  }
  $('#article1 .prevButton').remove();
  $('#article' + articleLength + ' .nextButton').remove();
  if (articleLength < maxLength) {
    for (i = articleLength + 1; i <= maxLength; i++) {
      $('#list' + i).remove();
      $('#article' + i).remove();
    }
  }
};
var getOnlineFeed = function(url) {
  var script = document.createElement('script');
  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/services/feed/load?callback=listEntries&hl=en&output=json-in-script&q='
                      + encodeURIComponent(url)
                      + '&v=1.0&num=' + maxLength);
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
};