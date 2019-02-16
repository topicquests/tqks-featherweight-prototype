<template>
    <q-page :padding="true" class="flex flex-left">
    <div style="height:400px; overflow-y:scroll;" id="topbox">
      <h3>Quests and Structured Conversations</h3>
      All <i>conversations</i> in FeatherWeight are <i>structured</i>. This means that they take the shape of a 
      <i>rooted tree</i> with possibly many tree branches. 

      <h3>Quests</h3>
      Here are a few of many possible ways in which Quests can be used as conversation anchors:
      <ul>
          <li>As a periodic (e.g. daily) record of personal thoughts</li>
          <li>To pose a scenario which needs deep thinking, debate, and/or reflection</li>
          <li>To summarize ideas, discoveries, or questions which are floating about in other conversations</li>
      </ul>
      <h3>Conversation Nodes</h3>
      Here, we describe each of the primary conversation node types. We will use the following image, found <a href="https://eight2late.wordpress.com/2009/04/07/issues-ideas-and-arguments-a-communication-centric-approach-to-tackling-project-complexity/">here</a> 
      as a reference. When we use the term <b>parent node</b>, that refers to the node to which any conversation node <i>responds</i>.<br/>
      <img style="display: block; margin: 0 auto;" src="statics/images/demomap2.jpg"><br/>
      <h4>Question</h4>
      A question node serves precisely one purpose, to ask a question. When a question is asked of a particular parent node, that question can receive one or many answers.<br/>
      <b>Question Etiquette</b><br/>
      <ul>
          <li>Use a question to ask <i>one thing</i></li>
          <li>If you have several things to ask, use several questions</li>
      </ul>
      <h4>Idea - Answer</h4>
      Synonyms for Answer are <i>Idea</i>, <i>Position</i>, and <i>Claim</i>.  It is appropriate to realize that while you <i>answer a question with an Answer node</i>, you can 
      also <i>answer an answer with an Answer node</i> in which case, you are <i>refining</i> an answer. You can chain many refinements to an answer.<br/>
      An Answer node can respond to all conversation node types.<br/>
      <b>Answer Etiquette</b><br/>
      <ul>
          <li>Make one and only one answer per answer node</li>
          <li>If you have several answers, use several Answer nodes</li>
      </ul>
      <h4>Pro and Con Arguments</h4>
      As the image above illustrates, use Pro and Con arguments to make statements essentially for or against a parent node. I've seen simple Con arguments which argue that the parent node
      is <i>too vague</i>.<br/>
      <h5>Argument Etiquette</h5>
      <ul>
          <li>As with <i>any conversation node</i> argument nodes must be polite and respectful</i></li>
          <li>Make one and only one argument per node</li>
          <li>If you need to make several arguments, use one argument node for each</li>
      </ul>

    </div>
  </q-page>
</template>
