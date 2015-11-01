/******************************************************************************

	Sample script to demonstrate the usage of the $.script object.
	It uses a JQuery-like approach to store the parameters and adds the 
	get_sample1_parameters function to the $ object.

 ******************************************************************************/

( function ( $, $script )
   {
	$. get_sample1_parameters	=  function ( )
	   {
		return ( $script. parameters ) ;
	    }
    } ( jQuery, $.script ( ) ) ) ;