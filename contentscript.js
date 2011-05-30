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
    // Create the overlay at the top of the page and fill it with data.
    var trends_dom = document.createElement('div');
    trends_dom.style.background = '#F4F4EC';
    trends_dom.style.color = '#111';
    trends_dom.style.padding = '10px';
    trends_dom.style.position = 'relative';
    trends_dom.style.zIndex = '123456';
    trends_dom.style.font = '12px Arial';
    trends_dom.style.textAlign = 'center';
    trends_dom.style.overflow = 'hidden';

    $.each(data, function(i, x){
      var img = '<a href="http://www.douban.com/people/' + x.uid + '"><img src="' + 
          x.icon + '"/></a>';
      var imge = $(img);

      var text = '<div>' + x.name + '<br/>';
      var imgurl = chrome.extension.getURL('st.gif');
      var eimgurl = chrome.extension.getURL('est.gif');
      if (x.rating !== null) {
        var i = 0;
        for (i = 0; i < x.rating; i ++) {
          text += '<img src="' + imgurl+ '"></img>';
        }
        for (i = 0; i < 5-x.rating; i ++) {
          text += '<img src="' + eimgurl + '"></img>';
        }
      }
      if (x.summary !== null)
        text += ' ' + x.summary;
      text += '</div>';
      var texte = $(text);

      imge.css('display', 'block').css('float', 'left');
      texte.css('float', 'left').css('text-align', 'left');
      texte.css('padding-left', '5px').css('padding-right', '10px').css('cursor', 'pointer');
      texte.css('max-height', '48px').css('max-width', '150px').css('overflow', 'hidden');

      var fblock = $('<div/>').append(imge).append(texte).css('display', 'inline-block');

      texte.click(function() {
        if (texte.css('max-width') && texte.css('max-width') != '500px')
          texte.css('max-width', '500px').css('overflow', 'auto');
        else
          texte.css('max-width', '150px').css('overflow', 'hidden');
      });

      $(trends_dom).append(fblock);
    });

    document.body.insertBefore(trends_dom, document.body.firstChild);
};

// Send a request to fetch data from Twitter's API to the background page.
// Specify that onText should be called with the result.
chrome.extension.sendRequest({'path':window.location.pathname}, onText);
