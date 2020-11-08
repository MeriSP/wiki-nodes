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
This folder contains two primary modules:

* [articles.py](https://github.com/crunchypi/wiki-nodes/blob/develop/src/preprocessing/data_gen/articles.py): Responsible for parsing topics & article names (from 'wiki4schools_topics_raw.txt', covered in [this](#preprocessingdata) section). Contains:
  * `load_articles(path:str, delimiter:str='\t') -> Generator[ArticleList]`, it streams data from any file with the format described in [this](#preprocessingdata) section. Each streamed object will by of the type described in the next point.
  * `class ArticleList`, has two properties: `ArticleList.topic:str` and `ArticleList.article_names:list`, where the list represents a single line in the parsed file.

<br>

* [wikiapi.py](https://github.com/crunchypi/wiki-nodes/blob/develop/src/preprocessing/data_gen/wikiapi.py): Responsible for using the article names (previous point) to fetch data with the wiki api wrapper called 'wikipedia'. Contains:
  * `pull_articles(names:list) -> Generator[ArticleData]`, which simply uses its argument list to pull data from wikipedia (using the dependency found in [this](https://github.com/goldsmith/Wikipedia) repo). It is a generator which returns `ArticleData` instances (is listed further down).
  * `__pull(name:str, ttl=5) -> WikipediaPage` is the func which actually pulls data (used by the point above) -- it does so safely by accounting for ambigious wiki article names. If a API query fails, it tries to find the best match through recursion until either something is found, or `ttl` reaches zero. Note, the expected return type is defined by the API wrapper: `import wikipedia.wikipedia.WikipediaPage`
  * `class ArticleData` mirrors the wikipedia data pulled with the API which is deemed useful (listed below). It is **important** to note that the first 5 properties are populated in this module, while the last are filled elsewhere ([main.py](#preprocessingmainpy)). **Also**, all these properties will be mirrored in the neo4j dataase when creating wiki nodes ([described in this section](#preprocessingneo4j_tools)).
    * `ArticleData.name:str`(name of wiki article), 
    * `ArticleData.url:str` (real url to this article), 
    * `ArticleData.content_raw:str`(wiki text with some format), 
    * `ArticleData.links:list`(links present in the wiki article),
    * `ArticleData.html:html` (raw html of the wiki page).
    <br>There are also some additional properties like <br>
    * `ArticleData.content_cleaned:str`(reserved for when a cleaner is implemented and can clean the raw content field),
    * `ArticleData.topics_prelinked:list` (reserved for predefined topics parsed with [articles.py](https://github.com/crunchypi/wiki-nodes/blob/develop/src/preprocessing/data_gen/articles.py), as mentioned earlier in this section of the document.)



<br><br>
________
#### preprocessing/prelinked/

<br><br>
________
#### preprocessing/neo4j_tools/

<br><br>
________
#### preprocessing/main.py
