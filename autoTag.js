// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ibizafeedback.azurewebsites.net/powerbi
// @grant        none
// ==/UserScript==

(function() {
  var tagDictionary = [
    {
        commentTerms: ["ease", "easy", "easiest", "simple", "intuitive", "user friendly", "easier"],
        tag: "Ease of use"
    },
    {
        commentTerms:["awesome", "love", "amazing"],
        tag:"Love it"
    },
    {
        commentTerms:["pricing", "cost", "price", "cheap", "free"],
        tag:"Pricing"
    },
    {
        commentTerms: ["refresh", "schedule", "scheduled"],
        tag: "Refresh"
    },
    {
        commentTerms: ["slow", "unresponsive"],
        tag: "Slow"
    },
    {
        commentTerms: ["not easy", "not easiest" ,"hard", "unintuitive","convoluted", "difficult", "confusing", "complex"],
        tag: "Hard to use"
    },
    {
        commentTerms:["bug", "bugs", "buggy", "crash", "crashes", "unstable", "stability"],
        tag:"Buggy"
    }
];

function getTag(currentString)
{
    var tag ="Not Tagged";
    for(j=0; j<tagDictionary.length;j++)
        {
            currentDictionaryItem = tagDictionary[j];
            for(var k=0;k<currentDictionaryItem.commentTerms.length;k++)
            {
                currentCommentTerm = currentDictionaryItem.commentTerms[k];
                var regex = '\\b';
                regex += currentCommentTerm;
                regex += '\\b';
                if(new RegExp(regex, "i").test(currentString))
                {
                    tag = currentDictionaryItem.tag;
                    // console.log("Matched" + currentCommentTerm);
                }
            }
        }
    return tag;
}






    document.addEventListener('keydown', function(e) {
  // pressed alt+g
  if (e.keyCode == 71 && e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
   // console.log(getTag("sdafh dsaf ajds klf;jadslkfadslkf j"));
      $( document ).ready(function() {

          $("#npsEntriesTable tr").each(function(){
              var commentDivs = $(this).find(".commentColumn div");
              var tag = "";

              for(var i=0;i<commentDivs.length;i++)
              {
                  var currentString = $(commentDivs[i]).text().toLowerCase();
                  if(currentString)
                  {
                      console.log("Current String is: " + currentString);
                      tag = getTag(currentString);
                      console.log("Tag is:" + tag);
                  }
              }
              var tagInput = $(this).find(".tagsColumn input.ui-autocomplete-input");
              tagInput.val(tag);
          });
     });

      // $("#npsEntriesTable tr").each(function(){
      //     tagInput = $(this).find(".tagsColumn input.ui-autocomplete-input");
      //     var e = jQuery.Event("keydown");
      //     e.which = 9; // # Some key code value
      //     tagInput.trigger(e);
      // });
  }
}, false);
})();