let s2 = document.createElement('script');

s2.src = chrome.runtime.getURL('support/storygraph/script.js');

document.head.appendChild(s2);
console.log("storygraph check from content.js")