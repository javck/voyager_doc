var gitalk = new Gitalk({
"clientID": "85d68c8cfe3b31cc6d41",
"clientSecret": "d6f8fabb47a0d32f47a0d565fc541940e9f57d36",
"repo": "voyager_doc",
"owner": "javck",
"admin": ["javck"],
"id": location.pathname,      
"distractionFreeMode": false  
});
gitalk.render("gitalk-container");
