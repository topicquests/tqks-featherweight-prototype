Resources for connections.

Each file is a tiny JSON document which provides display strings for three different contexts, one of which is if an arc is drawn on a graph, and two of which exist in the node views of this platform.

Those two are related to the _direction_ of the arrow implied by the connection.

* If the context is a source node connected to its target, you see the term one way, for example **causes**
* For the context of a target node _looking back_ at its source node, another term, for example **is caused by** is displayed.
* Some connections (predicates) are _symmetrical_ in which case both directions say the same thing.

This collection must expand as new connections are added.

"isSymmetrical": true has been added to symmetrical relations