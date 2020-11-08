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
The data folder is created to keep all data which is coupled to the code -- 'that's why it is in root/src/preprocessing/...' and not at the top level of the hierarchy. Below are some bullet-points describing each file:
* *'wiki4schools_topics_raw.txt'* : Used to paste topics from wikipedia for schools (website). Contents of this file will be parsed by [this file](https://github.com/crunchypi/wiki-nodes/blob/develop/src/preprocessing/data_gen/articles.py), which is covered [in this section](#preprocessingdata_gen). The structure of this data file is as follows:
  * '#' drops the current line, used for commenting.
  * '[TOPIC=abc]' denotes where a topic of name 'abc' starts. Everything from this marker, until the next, will be interpreted as article names, separated with tabs (tabs because that's the format of the wikipedia for schools site, so you can just copy-paste).




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
