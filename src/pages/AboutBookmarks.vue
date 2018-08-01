<template>
  <q-page :padding="true" class="flex flex-left">
    <div style="height:400px; overflow-y:scroll;" id="topbox">
      <h3>Bookmarks and Web Annotations</h3>
        FeatherWeight supports the kind of <i>bookmarking</i> activity known as <b>Web Annotations</b><br/>
        This requires a <i>Javascript Bookmarklet</i> to be added to your browser.
        The general forms of that Javascript object is described below. The task is to create a 
        <i>New Bookmark</i> for each, and give that a name according to whether it's for annotating or stashing.
        Then, use the general Javascript below and adapt the "http://localhost:3000" to the correct URL for 
        the FeatherWeight portal you are using.
        <h3>Annotating</h3>
        <b>Annotation Bookmarklet: </b>
        <div><pre><code>  
        javascript:window.open('http://localhost:3000/index.html#/bookmark/new?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title),'_blank')
        </code></pre></div>
        Using the annotate bookmarklet involves these steps:
        <ol><li>Login</li><li>Visit website</li><li>Click Annotating Bookmarklet</li>
                <li>Form opens in new page or tab: Fill it in:
                        <ul>
                                <li>Either copy and paste from the visited website</li>
                                <li>Or type in your own comments</li>
                        </ul>
                </li>
                <li>Click Save</li>
        </ol>
        Annotation is the process of adding nodes -- <i>Topics</i> -- for conversation. There are two primary concepts
        behind annotation:<br/>
        <ul>
                <li>Bringing in one specific topic for conversation, which means choosing, e.g. just one paragraph
                        from a page, or typing just one thought into the Details field 
                        <ul>
                                <li>You are always free to return to the page and grab other topics</li>
                        </ul>
                </li>
                <li>Bringing in many topics from one page as a means to enable several conversations</li>

        </ul>
        Each Annotation then becomes the root of a structured conversation in the same sense as any Quest does.
    </div>
  </q-page>
</template>
