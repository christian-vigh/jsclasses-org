# INTRODUCTION #

**thrak.include.js** is a jQuery extension that allows for including Javascript, Css and Html server files. It relies on jQuery and Ajax for performing dynamic file inclusion but don't worry, you do not need to develop customized and complicated ajax scripts to use this plugin ; it works by itself.

Including files is really easy ; it just requires a single line of javascript :

	$. include. css ( 'userstyles.css' ) ;

There are also methods available for including javascript and html (and php files) :

	$. include. js ( 'morefuncs.js' ) ;
	$. include. html ( 'contactform.php' ) ;


## WHY SHOULD I USE $.include INSTEAD OF TRADITIONAL METHODS ? ##

Well... it depends ! in general, you may have such needs when the dynamic nature of your client-side application cannot be totally handled by the server-side software. In a full ajax application, this would mean changing theme styling, loading forms, etc. without reloading the whole page.

As a side-effect, load only the resources you need when you need them. In most cases, $.include.xxx() will get you rid of tedious ajax calls in your code.

The next point is that you can specify a callback function, which will be called when file loading has been completed.

And that you can also say : "include this file only if it was not previously included".

Finally, you can load several files at once and be guaranteed that they will be loaded sequentially in the order they were specified ; for that, use the chain() function :

	$. include. chain ( 'script1.js', 'script2.js', 'script3.js' ) ;

## HOW DOES FILE INCLUSION AFFECT MY DOCUMENT ? ##

Once again, it depends. Generally, *something* is appended to your document, but you have also the choice of specifying where you want to put it. The following sections describe who does what.

### INCLUDING JAVASCRIPT FILES ###

Javascript files are included either by calling :

		$. include. js ( 'myfile.js' ) ;

or :

		$. include. use ( 'myfile.js' ) ;

(provided that in the last example the file extension you supplied is recognized by $.include to be a valid javascript file extension).

$.include will then insert the following tag in your document :

		<script class="thrak-include" data-type="js" data-source="myfile.js">
			contents
		</script>

where *contents* are the contents of file 'myfile.js'.

### INCLUDING STYLE SHEETS ###

Just use the css() method or ".css" file extension :

		$. include. css ( 'styles.css' ) ;

or :

		$. include. use ( 'styles.css' ) ;

$.include will then insert the following tag in your document :

		<style class="thrak-include" data-type="css" data-source="style.css">
			contents
		</script>
		
where *contents* are the contents of file 'styles.css'.

### INCLUDING HTML OR PHP ###


The html() function will do the work for both :

		$. include. html ( 'contact-form.php' ) ;

or :

		$. include. use ( 'contact-form.php' ) ;
 
$.include will then insert the following tag in your document :

		<div class="thrak-include" data-type="css" data-source="style.css">
			contents
		</div>
		
where *contents* are the contents of file 'contact-form.php'.


### INCLUDING OTHER CONTENT TYPES ###

By now, the text() method is the only way to do that :

		$. include. text ( 'myfile.pdf' ) ;

or :

		$. include. use ( 'myfile.pdf' ) ;

Since ".pdf" is neither a css, js or html/php extension, it will be considered as arbitrary data. Note however that in the current version this arbitrary data will be inserted as is into a &lt;div&gt; element, exactly as for .html() calls. 


# REFERENCE #

This section describes the functions provided by the $.include extension.

## INCLUSION FUNCTIONS ##

### ASYNCHRONOUS INCLUSION FUNCTIONS ###

Asynchronous inclusion functions all have the same signature :

	$. include. xxx ( path, [ callback [, selector [, once ]]] ) ;

Parameters are the following :

- *path* (string) :
Path of the file to be included. For security reasons, no url scheme or domain name are allowed. If the specified path is relative (ie, does not start with a slash), it will be searched in the directory of the host script or page.

- *callback* (function) :
A user-supplied function to be called when downloading is over. See further in this section for an explanation on the callback function parameters.
 
- selector (string or JQuery object) :
A selector that identifies the part of the html documents which is to receive the downloaded contents. It can be for example the id of a &lt;div&gt; element (either '#theid' or $('#theid')).
If not specified, the data will be appended to the document.

- once (boolean) :
When true, files are only included once. ; when false, a new DOM element will be created for each inclusion.
Note that there is a separate download history for css, js and html files.

The callback function must have the following signature :

		callback ( status, path, object, errmsg ) 

Callback parameters are described below :

- status :
One of the following constants :
	- $.include.INCLUDE\_OK : File has been successfully included.
	- $.include.INCLUDE\_IGNORED : The *"once"* parameter of the inclusion function has been specified as true, and the specified path was already included, so no additional http request	has been performed.
	- $.include.INCLUDE\_ERRROR : Http request returned an error code ; in this case, the *"errmsg"* parameter contains the error message.
- path : the path that has been specified to the js/css/html inclusion function.
- object : The JQuery object that holds the included data.
- errmsg : Contains the error message, when *status* is equal to $.include.INCLUDE\_ERROR.
In all other cases, this parameter is undefined.

No return value is expected from this callback function.

#### SYNCHRONOUS INCLUSION FUNCTION ####

There is an inclusion function called **chain()**, that allows to load several files and guarantee that they will be sequentially loaded in the order they were specified :

		$.include. chain ( file(s) [, callback [, once ] ] )

The parameters can be specified in any order :

- file(s) :
A list of filenames specified either as :
	- a string :
		File to be loaded ; file type will be determined based on its extension :
		css for ".css", javascript for ".js", "html" for html and php files, and
		text for all other extensions.

	- an object :
		Object containing the following members :
		- path (string) :
			The path of the file to be included. This is the only mandatory
			member of this object.
		- type (string) -
			File type : either "css", "js", "html" or "text".
		- callback (function) :
			A callback function, having the same signature as for other inclusion
			directives.
		- once (boolean) :
			Specifies whether files should be included only once or not. The 
			default is false.
		- selector (string or jQuery object) :
			Item which will receive the inclusion directive.

- callback (function) :
	A function called after the last file has been downloaded. It has the following 
	signature :

		function  callback ( included_files, ignored_files, error_files )

	The three parameters are arrays that contain respectively :
	- the files included successfully 
	- the files ignored (because they were specified more than once in the document,
	  and the "once" parameter was set to true)
	- the files not found

- once (boolean) :
	Indicates if files should be included only once.

## OTHER FUNCTIONS ##

- $.include ( 'option', options ) :
Defines the global options for the file inclusions.
Currently, the "options" object supports the following fields :

	- callback (function) :
		A default callback function that will be called when the js(), css() and html() 
		functions are called without specifying a callback.

	- once (boolean) :
		Indicates if files should be included only once.

- $.include ( 'option', name, value ) :

	Sets the "name" option to the specified value.

- $.include ( 'option' ) :
	
	Returns the current inclusion options.

- $.include ( 'option', name ) :
	
	Retrieves the value of the option specified by "name".

- $.include ( type, path, [ callback [, selector [, once ]]] ) :
	
	Includes the file specified by "path" ; the "type" parameter can be any one of "css", "js" or "html".

- $.include ( path, [ callback [, selector [, once ]]] ) :
	
	Includes the specified file. File type is determined by its extension.

