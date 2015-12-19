# INTRODUCTION #
The **msgbox** jQuery component provides stylable alternatives to the native javascript functions alert(), confirm() and input().

The jQuery object will provide you with the following functions :

- **$.alert()**
- **$.confirm()**
- **$.error()** (this one is an alternative to $.alert(), with a separate style for error messages)
- **$.inputbox()**

Additionnally, you can use the **$.wait()** function to display a wait message while performing some processing.

There is also a (redundant) **$.msgbox()** function, which mimics the Windows API function *MessageBox*.

# HOW DOES IT WORK ? #
You first need to include jQuery and jQuery UI :

	<script language='javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>
	<script language='javascript' src='//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>

Then include a theme for styling elements specific to message boxes ; I provide a customized theme, *thrak*, based on the *redmond* theme, with additions for message boxes :

	<link rel="stylesheet" href="css/themes/thrak/jquery-ui-1.10.3.custom.css">

Finally, include the source file :

	<script language="javascript" type="text/javascript" src="thrak.ui.msgbox-1.2.1.js"></script>

# BASIC USAGE #
Calling the native message box functions of your browser is straightforward : call the function and you will be sure that the next instruction after the call will only be executed when the call has completed, ie when the user has closed the message box :

	alert ( 'this is some informational message' ) ;
	doSomethingAfterAlert ( ) ;

Doing the same using jQuery UI will require you to use callback, in order to take into account the "pure multitasking, asynchronous essential nature" of Javascript. So, using the **$.alert()** function, you will have to rewrite the above code the way below (note that I use my own indentation style for that, you are free to refuse it !) :

	$. alert 
       (
	        'this is some informational message',
	        function ( )
	           {
	                doSomethingAfterAlert ( ) ;
	            }
        ) ;

# REFERENCE #
Msgbox functions usually take at least 3 arguments :

- A message string
- A title string
- An *options* object, whose members may depend on the function you call.

You can specify arguments in the order you like, because they are recognized using their types.  The only rule to follow is that the *message* string must appear before the *title* string (if specified).

The alert(), error(), confirm(), inputbox() and msgbox() functions all accept a callback, which have the following signature :

	callback ( status, dialog )

Where *status* depends on the user action : it is usually a boolean set to true if the user clicked the Ok button and false if the user clicked the Cancel button or the Close icon ; *dialog* is a reference to the opened dialog object.

All msgbox functions accept an *options* object, which are simply options passed to the jQuery dialog() function.

Once closed, the displayed message boxes are removed from the DOM.

## $.alert ( msg, title, callback, options ) ##
Displays an alert message (simple message box). The parameters are the following :

- *message* : Message to be displayed.
- *title* : Optional message box title. The default is "Message".
- *callback* : A function to be called when the user clicks the "Ok" button or the Close icon (optional).
- *options* : Additional dialog options (optional).

The *status* parameter of the callback function is always set to true. 

## $.error ( msg, title, callback, options ) ##
Displays an error message (simple message box). The parameters are the following :

- *message* : Message to be displayed.
- *title* : Optional message box title. The default is "Error".
- *callback* : A function to be called when the user clicks the "Ok" button or the Close icon (optional).
- *options* : Additional dialog options (optional).

The difference with **$.alert()** resides only in the class names used for styling.
The *status* parameter of the callback function is always set to true. 

## $.inputbox ( msg, title, callback, options, field_definition ) ##
Asks the user for text input. The parameters are the following :

- *message* : Message to be displayed.
- *title* : Optional message box title. The default is "Input".
- *callback* : A function to be called when the user clicks the "Ok" button or the Close icon (optional).
- *options* : Additional dialog options (optional).
- *field_definition* : Html input field definition. The default is :

	&lt;input type="text" size="50"/&gt;

Note that you do not need to define an id or name attribute. This parameter is optional.

The *status* parameter of the callback function is set to the input string if the user clicked Ok, or false if the user clicked on the Cancel button or Close icon.

## $.wait () ##
This function is used to display a modal dialog with no buttons and no possibility to be closed. You can use it to display a message while doing some long processing.

It can be displayed using one of the following forms :

**$.wait ( message )**
 
**$.wait ( options )**

*message* is the message to be displayed. *options* is an object than can contain any $.dialog() options, plus the following specific members :

- *message* : Message to be displayed
- *icon* : Optional reference to an icon file.

To close the wait dialog box, simply call **$.wait()** with no parameters. 

## $.msgbox ( msg, title, callback, flags, options ) ##
The **$.msgbox()** functions mimics the Windows API **MessageBox** function. It accepts an additional *flags* parameter, which is a combination of the following bit constants :

- *$.msgbox.MB_OK* : Message box contains a Ok button
- *$.msgbox.MB_OKCANCEL* : Message box contains two buttons : Ok and Cancel
- *$.msgbox.MB_ABORTRETRYIGNORE* : Message box contains three push buttons: Abort, Retry, and Ignore
- *$.msgbox.MB_YESNOCANCEL* : Message box contains three push buttons: Yes, No, and Cancel
- *$.msgbox.MB_YESNO* : Message box contains two push buttons: Yes and No
- *$.msgbox.MB_RETRYCANCEL* : Message box contains two push buttons: Retry and Cancel
- *$.msgbox.MB_CANCELTRYCONTINUE* : Message box contains three push buttons: Cancel, Try Again, Continue

The default button, in the button set defined by the above constants, can be set to one of the following values :

- *$.msgbox.MB_DEFBUTTON1*
- *$.msgbox.MB_DEFBUTTON2*	
- *$.msgbox.MB_DEFBUTTON3*	
- *$.msgbox.MB_DEFBUTTON4*


The following flags allow to specify an additional icon to be displayed :

- *$.msgbox.MB_ICONEXCLAMATION*
- *$.msgbox.MB_ICONWARNING*
- *$.msgbox.MB_ICONINFORMATION*
- *$.msgbox.MB_ICONASTERISK*
- *$.msgbox.MB_ICONQUESTION*
- *$.msgbox.MB_ICONSTOP*
- *$.msgbox.MB_ICONERROR*
- *$.msgbox.MB_ICONHAND*

The *status* parameter of the callback function will be set to one of the following constants, representing the button the user clicked :

- *$.msgbox.IDABORT*
- *$.msgbox.IDCANCEL* 
- *$.msgbox.IDCONTINUE*
- *$.msgbox.IDIGNORE*
- *$.msgbox.IDNO*
- *$.msgbox.IDOK*
- *$.msgbox.IDRETRY*
- *$.msgbox.IDTRYAGAIN*
- *$.msgbox.IDYES*

# STYLING #
The following specific classes are added to dialog box items :

- *ui-popup-dialog-input* : input field of a $.inputbox() dialog.
- *ui-popup-dialog-cell* : The table cell containing the optional icon
- *ui-popup-dialog-icon* : The &lt;div&gt; containing the optional icon
- *ui-popup-dialog-message-cell* : The table cell containing the dialog box message
- *ui-popup-dialog-message* : The &lt;div&gt; containing the dialog box message
- *ui-popup-dialog-button* : A dialog button
- *ui-popup-dialog-titlebar* : the dialog title bar
- *ui-popup-dialog-title* : the dialog title within the title bar
- *ui-popup-button-icon-only* : the Close icon
- *ui-popup-dialog-buttonset* : the area of the dialog box containing the buttons
- *ui-popup-dialog-button-text* : text of a dialog button

Each of these classes have also a counterpart depending on the function you are calling. For example, the *$.alert()* function will add a **'ui-alert-dialog-button'** class for items that have class 'ui-popup-dialog-button'. **$.error()** will add **ui-error-dialog-button-class**, and so on for all the **'\*-popup\*-'** classes defined.