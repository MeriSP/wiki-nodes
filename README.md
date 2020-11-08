# This is the temporary documentation branch.

I've created this as a general overview of the project (used while developing), feel free to add things but make sure it stays on this branch for sanitation reasons + use the message box below ('Commit changes') to describe new additions.
<br><br>
________
### Backend/preprocessing (Python stuff):

Currently, the overall approach has been to create a set of fairly small packages which are combined/glued with a command line interface located in *main.py*. This is a good approach (arguably) because it gives a simple mental model through a clean project structure: *just use the CLI, that's the starting point of everything*.
<br><br>
This is opposed to having several modules which reference eachother and loose snippets of code -- that quickly leads to spaghetti code. However, there are a couple of trade-offs; 
- *main.py* can get a bit big (a few hundred lines of code).
- Development has some formalitise: creating a new module and testing it with 'real' data requires the usage of a hook in *main.py*.
<br>
I think the trade-off is reasonable, especially considering that this project isn't too big (*main.py* won't be too inflated).
<br><br>


________
### Index:

* preprocessing/
  * [data/](#preprocessingdata)
  * [data_gen/](#preprocessingdata_gen)
  * linking/
    * [prelinked/](#preprocessingprelinked)
  * [neo4j_tools/](#preprocessingneo4j_tools)
  * [main.py](#preprocessingmainpy)
  
  
<br><br>
________
#### preprocessing/data/

<br><br>
________
#### preprocessing/data_gen/

<br><br>
________
#### preprocessing/prelinked/

<br><br>
________
#### preprocessing/neo4j_tools/

<br><br>
________
#### preprocessing/main.py
