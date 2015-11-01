# INTRODUCTION #
Ever wanted to pass url parameters **to** your scripts using the &lt;script&gt; tag then retrieve them **from** your scripts once they are loaded ? 

**script.js** (*thrak.script-1.0.1.js*, to be more precise) is made for you. It is designed as kinda jQuery extension function, **$.script()**.

# HOW TO USE IT ? #

There are two contexts you need to consider for using script.js :


1. The context of the caller ; this typically is you html page, which contains the &lt;script&gt; tags that will invoke your script(s).
2. The context of the callee, ie your script : this is where you need to retrieve the url parameters that were passed by the caller

## CONTEXT OF THE CALLER (YOUR HTML PAGE) ##

In your html page, you first need :

1. A reference to jQuery, for example :

		<script language='javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'&gt;&lt;/script>

2. A reference to script.js :

		<script language="javascript" type="text/javascript" src="thrak.script-1.0.1.js"></script>

3. A reference to your own script(s), for example :

		<script language="javascript" type="text/javascript" src="sample_include_1.js?script1_param1=value1&script1_param2=value2&script1_paramn=valuen"></script>

## CONTEXT OF THE CALLEE (YOUR SCRIPT) ##

When your script executes, the **$.script()** function is available to it. It returns an object that contains data specific to your script, such as url parameters. You are free to use it (or not) but keep in mind the following aspects :

1.  **$.script()** returns the data related to the last &lt;script&gt; tag found in the calling document. This is in fact the &lt;script&gt; tag that invoked your script. Although it could be possible, the **$.script()** function is not designed to retrieve data from other scripts that may have been included before yours.
2.  The return value of **$.script()** is local to the scope of your script. Once you get out of your script's scope, **$.script()** may reference another &lt;script&gt; tag. This is why it is really important to save the function's return value if you want to use it later.

The following paragraphs give some various "techniques" to save this data.

### SAVING DATA THE CLASSICAL WAY ###
This is the simplest way : just declare a global variable :

		// File : save_classical.js
		var 	save_classical_script_data 	=  $. script ( ) ;

### SAVING DATA THE JQUERY WAY ###

jQuery plugins typically contain the following lambda-function construction, which is an easy way to map the **jQuery** global object to the well-known **$** ; you simply define a closure and call it immediately, supplying the jQuery global object as a parameter :

		( function ( $ )
   		   {
				// The "$" variable is now available to your plugin
		    } ( jQuery ) ) ;

Just do the same way within your script :

		// File : save_jquery.js
		( function ( $, $script )
   		   {
				// Now, "$" is a synonym of the jQuery object, and $script is available
				// throughout your plugin to reference script invocation data
		    } ( jQuery, $. script ( ) ) ) ;
	
# REFERENCE #

This section gives a detailed description of the object returned by the **$.script()** functions, which has no parameters.

The example data values all refer to this example script tag :

		<script language="javascript" src="http://www.example.com/dir/file.js?lang=fr"></script>

- **basename** (string) :
Script filename (eg, *"file.js"*).

- **domain** (string) :
Script domain (eg, *"www.example.com"*).

- **dirname** (string) :
Script directory (eg, *"/dir"*).

- **object** :
The DOM *&lt;script&gt;* element.

- **parameters** (object) :
An object containing the parameters specified in the query string part of the url.
In our example, the "parameters" member would contain the following :

		{
			lang : "fr"
		 }

- **path** (string) :
Url path, without query parameters (eg, *"http://www.example.com/dir/file.js"*).

- **query** (string) :
Query parameters (eg, *"?lang=fr"*).

- **url** (string) :
The whole script url (eg, *"http://www.example.com/dir/file.js?lang=fr"*).

- **get ( name, defval )** :
Retrieves the value of parameter "name". If undefined, "defval" will be returned.

