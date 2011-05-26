/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
/**
 * Parses text from Twitter's API and generates a bar with trending topics at
 * the top of the current page
 * @param data Object JSON decoded response.  Null if the request failed.
 */
function onText(data) {
    if (data === null) return;
  // Only render the bar if the data is parsed into a format we recognize.
    var trend_names = [];
    for(var i in data) {
      var x = data[i];
      var text = '<a href="http://www.douban.com/people/' + x.uid + '"><img src="' + 
          x.icon + '"/></a>' + x.name; 
      if (x.rating !== null)
        text += ': ' + x.rating + ' stars';
      if (x.summary !== null)
        text += ' ' + x.summary;
      trend_names.push(text);
    };

    // Create the overlay at the top of the page and fill it with data.
    var trends_dom = document.createElement('div');
    var text_dom = trend_names.join(' ');
    //trends_dom.appendChild(text_dom);
    $(trends_dom).append(text_dom);
    trends_dom.style.background = '#F4F4EC';
    trends_dom.style.color = '#111';
    trends_dom.style.padding = '10px';
    trends_dom.style.position = 'relative';
    trends_dom.style.zIndex = '123456';
    trends_dom.style.font = '12px Arial';
    trends_dom.style.textAlign = 'center';
    document.body.insertBefore(trends_dom, document.body.firstChild);
};

// Send a request to fetch data from Twitter's API to the background page.
// Specify that onText should be called with the result.
chrome.extension.sendRequest({'path':window.location.pathname}, onText);
