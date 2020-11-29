/**
 * master.js
 *
 * Use this file in HTML: <script src = "master.js"></script>
 * Copyright © Sooraj Gupta 2020
 * Last Updated: 11/26/2020
 */

function include( file )
{
	var scr = document.createElement( 'script' );
	scr.src = file;
	scr.type = 'text/javascript'; 
	document.getElementsByTagName('body').item(0).appendChild(scr); 
}
include( 'typewriter/settings.js' );
setTimeout( function(){
	include( 'typewriter/master.js' );
}, 100 ); 