# INTRODUCTION #
**$.uri** is a jQuery component that allows for parsing uris.

It provides several methods for retrieving query parameters, anchor value, optional username/password, port, protocol and so on.

It even allows an anchor value ("#somevalue") to be interpreted as a query string.

# HOW TO USE IT ? #
This is really simple ; first, include jQuery :

	<script language='javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>

Then include the uri source :

	<script language="javascript" type="text/javascript" src="thrak.uri-1.0.0.js"></script>

After that, your **window** object is populated with a new member, *url* ; the following example displays the query parameters for the current page :

	alert ( "Current query parameters : " + window. url. query ( ) ) ;

but you can also use this component to parse any uri you want :

	var 	testurl 	=  $. uri ( 'http://testuser:foobar@www.example.com:80/path/subdir/test.html?param=value&param2=value2#anchor' ) ;

	alert ( "Query parameters : " + testurl. query ( ) ) ;

# SPECIFIC FEATURES #

**$.uri** introduces a few extra goodies for manipulating urls. This includes :

- The ability to treat the anchor part of an url ("www.example.com*#myanchor*") as an additional query string.    
- The ability to have query parameters that are *local* to a page and won't be included in the final query strings. See the discussion on the **locals()** method in the **REFERENCE** section.
- The ability to add/remove/change value of individual query parameters. 

 
# REFERENCE #

This section gives a reference of all the methods available in the **$.uri** object. I would have liked to propose most of them as properties but, unfortunately, support for such an incredible, new and technological breakthrough feature is not yet consistently supported amongst the tiny cast of browsers and standard makers.

So you'll have to use it the jQuery way, which is not so bad indeed ; if you want to retrieve a value, just say :

	var 	value 	=  myobject. thevalue ( ) ;

and if you want to set it, just say :

	myobject. thevalue ( 'this is the new value' ) ;

All the examples in this section are based on the folllowing example url :

	http://testuser:foobar@www.example.com:80/path/subdir/test.html?param=value&param2=value2&local_parameter=local_value#anchor

Examples also assume that the query parameter **local_parameter** is *local* to the url. This can be achieved by some code like : 

	var 	url 	=  $.uri ( the_above_example_url ) ;

	$url. locals ( 'local_parameter' ) ;
 
Example values are always written in *italics* and enclosed in parentheses most of the time.

## anchor ( [value] ) ##
Gets/sets the optional anchor (*#anchor*).

## anchorParameters ( ) ##
Allows anchors to hold parameters of the form "param1=value1&param2=value2..." , which are parsed the same way as query parameters.

This trick can be useful for more or less "full ajax" pages, to add a new url to the history without	reloading everything.

This method accepts the same parameters as the **parameters()** method.

## credentials ( user, password ) ##
Gets/sets the user credentials for an url.

Returns an object containing two members : *user* and *password*.

## directory ( [value] ) ##
Gets/sets the directory part after the hostname (*path/subdir*). The resulting property will include a leading and trailing slash, even if it was missing in the supplied value.
 
## host ( [value] ) ##
Gets/sets the hostname (*www.example.com*).

## href ( [value] ) #
Gets/sets the whole uri (*http://user:password@www.example.com:80/path/subdir/test.html?param=value&param2=value2#anchor*).

If a value is specified, then all the individual properties will be assigned with the various parts of the uri value.

The returned value does not include local parameters.

## hrefLocal ( ) ##
Returns the whole href value, including the parameters declared to be local (see **locals()**).
	
Using our example, this will return :

	http://testuser:foobar@www.example.com:80/path/subdir/test.html?param=value&param2=value2&local_parameter=local_value#anchor

## hrefGlobal ( ) ##
Alias : returns href().

## locals ( ) ##
Sometimes you need to reload your page, passing it an additional parameter, depending on
user interaction. Suppose for example that your initial page is :

	home.php?param=value

then the user clicks on some "display details" link and you need to reload your page with an
additional parameter :

	home.php?param=value&details=1

then the user clicks a "login" link which redirects to page "login.php" ; you want all the 
page parameters to be passed to "login.php", but not this extra parameter, "details=1", which
was meant only for the "home.php" page.

The locals() method is there to specify which query parameters should be considered as "local"
to the current page, and not included in the value returned by the **href()** and
**query()** methods. 

The following example redirects to the page *"login.php?param=value"* :

	window. location. href	=  "login.php" + window. url. query ( ) ;

To define local parameters, either specify an array of strings :

	url. locals ( [ 'display', 'localaparam1', 'localparam2' ] ) ;

or a string specifying space- or comma-separated values :
			
	url. locals ( 'display localparam1 localparam2' ) ;

## page ( [value] ) ## 
Gets/sets the requested page (*test.html*).

## parameters ( ) ##
Returns an object having the specified properties and methods :

- **defined ( name )** : Returns true if the specified parameter is defined, false otherwise.
- **empty ( )** : Empties the list of parameters.
- **get ( name, default\_value )** : Gets an url parameter from the query string by its name. A default value can be specified if the parameter does not exist.

	If default\_value is not specified, the default value will be an empty string.
	If no parameter name is specified, then the whole parameters object is returned. 
- **remove ( name )** : Removes the specified parameter. Equivalent to set ( name ) without any 
associated value. Returns true if the parameter existed before removal, false otherwise.
- **set ( name, value )** : Replaces the value of an existing parameter or creates a new one if it does not exist.
- **toString ( )** : Assembles the various uri components and returns the full query string.

The **parameters()** function can also be called as :

	parameters ( action [, arguments] ) ;

'*action*' can be the name of any function defined in the object returned when the **parameters()** function is called without argument. The returned value in this case will not the object, but rather the return value of the called function.

## password ( [value] ) ##
Gets/sets the optional password (*foobar*).

## path ( [value] ) ##
Gets/sets the 'directory' and 'page' properties. When setting a new value, a trailing slash must be specified if the last component of the path is a subdirectory, not a page (file) name.

## port ( [value] ) ##
Gets/sets the optional port (*80*).

## protocol ( [value] ) ##
Gets/sets the protocol part (*http*).

## query ( [value] ) ##
Gets/sets the query string. The supplied value can include an optional leading quotation
mark (*?param=value&param2=value2*).

The returned value does not include local parameters.

## queryLocal ( ) ##
Returns the query string including local parameters. Using our example, this will return :

	?param=value&param2=value2&local_parameter=local_value

## queryGlobal ( ) ##
Alias : returns query().

## user ( [value] ) ##
Gets/sets the optional user (*testuser*).
