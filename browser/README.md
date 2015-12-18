# INTRODUCTION #
The **$.browser** jQuery object is yet another pitiful and lamentable attempt to unify the information provided by various navigators. It tries to detect navigator name, version and other information that could be useful.

It currently supports chrome, firefox, ie, opera, safari and webkit-compatible. I can add support for more exotic navigators if you provide me a link where I can download them.

I will support MS Edge when the following two conditions will become true :

- Windows 10 have at least 12 months of existence, starting from january, 2016
- Windows 10 stops to behave as a trojan

# HOW TO USE IT ? #

Step 1 : Include jQuery :

	<script language='javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>

Step 2 : include the source file :

	<script language="javascript" type="text/javascript" src="thrak.browser-1.0.0.js"></script>

And voilà ! the **$.browser** object is available to your script...

# REFERENCE #

This section describes the information you can retrieve from the **$.browser** object.

A small distinction has been made here between *members* and *properties* :
- *members* are properties that always return the same value
- *properties* needs some code to be executed to compute their return value.

## MEMBERS ##

### $.browser.agent ###

Returns the user agent string. For example :

	Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36

### $.browser.applicationVersion ###

A structure describing the browser application version and containing the following properties :

- *codeName*	:  Application code name. Example : *"Mozilla"*
- *name*		:  Application name. Example : *"Netscape"*
- *major*		:  Application major version number. Example : *"5"*
- *minor*		:  Application minor version number. Example : *"0"*

Casting this structure to a string will return the major and minor version. Example : *"5.0"*


### $.browser -type related properties ###
The following boolean properties are set to true or false, depending on your browser type : 
chrome, safari, firefox, opera, ie, webkit or unknown.

Only one of them will be true at the same time and reflects the type of browser you are using.
The *unknown* property will be set to true if your browser type cannot be detected.

Note that I don't know so far what to do with the *webkit* property.

The **$.browser.name** property will contain the name of the property in the above list which has been set to true.

### $.browser.cookiesEnabled ###
True if cookies are enabled in the browser.

### $.browser.displayName ###
User-friendly browser display name.

### $.browser.doNotTrack ###
True if "do no track" settings are enabled on your browser.

### $.browser.language ###
A structure containing the following properties that specifies the browser's language :

- code		: language code, such as "fr", "en", etc.
- variant	: Country variant. For the "en" language, for example, it could be "US", "CA", etc. This field may be undefined.

This structure can be casted to a string, to obtain something like, for example, "fr-FR".

### $.browser.name ##"
Browser name, as supplied by the user agent string.

### $.browser.online ###
A boolean indicating whether browing is online or not.

### $.browser.platform ###
A structure describing the browser's platform :

- os		:  Os version.
- cpu		:  CPU type.

Note that these information are rarely specified by the browsers.
This structure can be casted to a string, which will result in : *"os/version"*.

### $.browser.product ###
A structure describing the product :

- name		:  Product name.
- build		:  Product build.
- buildId	:  Product build id.

This structure can be casted to a string which will result in the product name.

### $.browser.vendor ###
A structure describing vendor information :
- name		:  Vendor name.
- build		:  Vendor's application build number. May be largely undefined in IE.

This structure can be casted to a string, which will result in : *"name/build"*.

### $.browser.version ###
A structure containing the following properties, identifying the browser's version :

- major
- minor
- revision
- build
- 
Note that the 'revision' and 'build' properties may not be specified by all browsers.
This structure can be casted to a version string, for example :

	alert ( "Version : " + $. browser. version ) ;

The returned string will include the major, minor, revision and build numbers separated by a dot. Missing components will not be included (if the revision is undefined, then the resulting string will only include the major and minor version numbers, even if the build number is defined).

## Properties ##

This section describes all the runtime properties whose values must be retrieved using :

	$.browser.prop( 'property name' ) ;

Note that the *val()* function is a synonym of *prop()*.

### $.browser.prop ( 'javaEnabled' ) ###
Returns true if java is enabled in your browser, false otherwise.

### $.browser.prop ( 'taintEnabled' ) ###
To be documented.

### $.browser.prop ( 'scrollbarWidth' ) ###
Returns the width of a vertical scrollbar, in pixels.

### $.browser.prop ( 'scrollbarHeight' ) ###
Returns the height of a horizontal scrollbar, in pixels.
