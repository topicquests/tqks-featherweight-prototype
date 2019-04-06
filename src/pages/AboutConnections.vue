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
        <li>That takes you to the Connection Form </li>
        <li>Click the <b>Got That Node</b> button</li>
        <li>Navigate to another node of interest</li>
        <li>Click the link <b>New Connection</b></li>
        <li>You're back at the Connection Form</li>
        <li>Select a Connection Type</li>
        <li>Observe the new <i>Source-Connection-Target</i> relationship</li>
        <li>You can reverse <i>Source</i> with <i>Target</i> if you wish</li>
        <li>Click the <b>Submit</b> button</li>
        <li>You are now observing the new connection</li>
      </ol>
      Below, we walk through those steps with pictures.
      <h6>Choosing a Topic</h6>
      <img src="statics/images/topicsindex.png"><br/>
      You have three Index Selections:
      <ul>
        <li>Bookmarks</li>
        <li>Quests</li>
        <li>Topics</li>
      </ul>
      Here, we illustrate the Topics Index. We have two topics which we decide to connect in a <i>causal relation</i>.
      We select Climate Change first.
      <h6>Adding a Connection</h6>
      <img src="statics/images/NewConnection.png"><br/>
      We scrolled near the bottom and clicked the <b>Connections</b> bar and hovered over the <b>New Connection</b> link. 
      We click that link. 
      <h6>First visit to the New Connection Form</h6>
      <img src="statics/images/newconnection-1.png"><br/>
      The New Connection form will be used twice. In this first pass, it is telling you that it has recorded your first selection, is waiting for your second selection.
      So, you click the <b>Got That Node</b> button and return to navigate to another node.<br/>
      You navigate to another node and click its <b>New Connection</b> link.  Now you are back at the Connection Form.
      <h6>Second visit to the Connection Form</h6>
      <img src="statics/images/newconnection-2.png"><br/>
      You now observe the two selections.<br/>
      <b>Note:</b> If you are not happy with those selections:
      <ul>
        <li>Click the <b>Clear Selections</b> button and start over</li>
      </ul>
      It is now time to choose a connection.
      <h6>Choosing a Connection</h6>
      <img src="statics/images/newconnection-3.png"><br/>
      We started this exercise with the idea of making a <i>causal</i> connection between <i>greenhouse gas</i> and <i>climate change</i>. So we select the <b>Causes</b> relation. That then causes the display to change.
      <h6>Studying the New Connection</h6>
      <img src="statics/images/newconnection-5.png"><br/>
      We immediately observe that the sequence of our topic choices was not in the same order we would have them appear in the relationship: it was not our intention to say that <i>climate change causes greenhouse gas</i> which is what is on display. 
      We respond by clicking the <b>Reverse Source and Target</b> button. 
      <h6>Verifying the New Connection</h6>      
      <img src="statics/images/newconnection-6.png"><br/>
      Looks Good!
      <h6>Submit the New Connection</h6>
      <img src="statics/images/newconnection-7.png"><br/>
      Click the <b>Submit</b> button and you are taken to your new connection. It is a topic just like other topics in the database.
      <h6>Observe the Connection</h6>
      <img src="statics/images/newconnection-8.png"><br/>
      Connection Nodes are like other nodes with the addition of two new links in the view:
      <ul>
        <li>Source: a link to the <i>source node</i> of this relationship</li>
        <li>Target: a link to the <i>target node</i> of this relationship</li>
      </ul>
      Effectively, this node <i>means</i>:
      <ul>
        <li>The topic represented by my source node is a cause of the topic represented by my target node</li>
      </ul>
      Let's now look at the two topics in this relationship.
      <h6>Climate Change's New Connection</h6>
      <img src="statics/images/newconnection-9.png"><br/>
      We can see that the new connection is on display in the Climate Change topic. It is also on display in the Greenhouse Gas topic.
      <h6>The Greenhouse Gas Topic</h6>
      <img src="statics/images/newconnection-10.png"><br/>
      <h6>The Climate Change Topic</h6>
      <img src="statics/images/newconnection-11.png"><br/>

    </div>
  </q-page>
</template>
