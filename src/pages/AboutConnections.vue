<template>
  <q-page :padding="true" class="flex flex-left">
    <div style="height:400px; overflow-y:scroll;" id="topbox">
      <h3>Making Connections Among Nodes</h3>
      <h5>Background</h5>
      It is frequently desirable to forge connections among various pages (nodes). For instance, connections between two, say, Answers, with relations like:
      <ul>
        <li>Disagrees With</li>
        <li>Is an Example Of</li>
        <li>Causes</li>
      </ul>
      and so forth. Conversationally it's like saying <i>What is said in this view disagrees with what is said in that view.</i>
      The idea is to wire up a <i>graph</i> of connections among nodes.
      <h5>The Steps Involved in Making Connections</h5>
      In the big picture, these are the steps:
      <ol>
        <li>Navigate to a node of interest</li>
        <li>Click the Connections Bar near the bottom of the view</li>
        <li>Click the link <b>New Connection</b></li>
        <li>That takes you to the Connection Form where you simply click</li>
      </ol>
      <img src="statics/images/topicsindex.png"><br/>
      <img src="statics/images/NewConnection.png"><br/>
    </div>
  </q-page>
</template>
