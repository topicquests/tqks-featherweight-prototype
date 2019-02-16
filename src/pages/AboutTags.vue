<template>
  <q-page :padding="true" class="flex flex-left">
    <div style="height:400px; overflow-y:scroll;" id="topbox">
      <h3>Tags and Tagging</h3>
          Tags are <i>markers</i>. They mark <i>information trails</i> along which explorers navigate, looking for stuff.<br/><br/>
    Tags are <i>reminders</i><br/><br/>
    Tags can identify <i>topics</i> to be found when looking in the documents with that tag.<br/><br/>
    Tags have the property that the first time a particular tag is entered, that is the one which will stay around. This example will illustrate:
    <ul>
        <li>"My Tag" is the first time that particular string is used</li>
        <li>"my tag" is used later
            <ul>
                <li>The new document will be tagged with "My Tag"</li>
            </ul>
        </li>
    </ul>
    
    <h3>Public Tags</h3>
    Public tags are created by all participants, and used by all participants.<br/><br/>
    You can list tags by using the Applications:Tags menu selection.<br/><br/>
    There is (for the time being) an experimental Tag Cluster application. It's fun to see, but not very useful. Lots of development work centers on 
    improving the tagging experience.<br/><br/>
    <b>Tagging Etiquette</b><br/>
    Each community of users will fall into its own habit space, but it is useful to offer a few suggestions:
    <ul>
        <li>Tags stand out if they use caps rather than lower case, e.g. "My Tag" rather than "my tag"</li>
        <li>Tags should not use characters such as symbols like # & % $ / \ | and so forth. That is because the strings used to name
            tags are used to <i>identify</i> tags later.  A simple safe example is this "Joe's Birthday". The apostrophe does not interfere,
            but, this is not <i>twitter</i>; LiteWeight does not use hashtags, and special characters don't convey information that's useful
        </li>
        <li>To the greatest degree possible, tags should reflect topics to be found in the documents they represent</li>
    </ul>
    </div>
  </q-page>
</template>
