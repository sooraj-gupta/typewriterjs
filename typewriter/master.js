/**
 * typewriter.js
 *
 * Copyright © Sooraj Gupta 2020
 * 
 * Program by Sooraj Gupta
 * Last Updated: 11/26/2020
 */
var typewriters = [];
var delay = settings.delay;
var blinkOn = false;
class Typewriters
{
	static init()
	{		
		var all = document.getElementsByTagName("*");
		for ( var i = 0; i < all.length; i++ )
		{
			if( all[i].hasAttribute( "data-typewriter" ) )
			{
				if( all[i].getAttribute("data-typewriter") == "on" )
				{
					
					all[i].style.display = "inline-block";
					if( window.innerWidth <= 630 && all[i].className == "desktop" )
					{
						all[i].style.display = "none";
					}
					var phrases = [];
					var buff = "";
					for ( var j = 0; j < all[i].innerHTML.length; j++ )
					{
						if ( all[i].innerHTML.charAt( j ) == ';')
						{
							phrases.push( buff );
							buff = "";
						}
						else if( j == all[i].innerHTML.length - 1 )
						{
							buff += all[i].innerHTML.charAt( j );
							phrases.push( buff );
							buff = "";
						}
						else{
							buff += all[i].innerHTML.charAt( j );
						}
					}
					
					var col = all[i].style.color;
					typewriters.push( { "self": all[i], 
									   	"pos": 0.0, 
								   	   	"forward":true, 
								   		"isPaused": false,
								   		"timer": settings.timer,
									    "phrases": phrases,
									   	"wordnum": 0,
									    "color": col
								  	  }  );
					all[i].innerHTML = "";
				}
				all[i].style.fontSize = all[i].hasAttribute( "data-typewriter-fontsize" ) ? all[i].getAttribute("data-typewriter-fontsize") : settings.fontsize;
				all[i].style.fontFamily = all[i].hasAttribute( "data-typewriter-font" ) ? all[i].getAttribute("data-typewriter-font") : settings.font;
				all[i].style.fontWeight = all[i].hasAttribute( "data-typewriter-fontweight" ) ? all[i].getAttribute("data-typewriter-fontweight") : settings.fontweight;
				all[i].style.minWidth = "1px";
				all[i].style.paddingRight = "1px";
				
			}
		}
		console.log( typewriters );
		setInterval( this.write, delay );
		setInterval( this.blink, settings.cursor );
	}
	static write()
	{
		for( var i = 0; i < typewriters.length; i++ )
		{
			typewriters[i].self.innerHTML = typewriters[i].phrases[typewriters[i].wordnum].substring( 0, Math.floor( typewriters[i].pos )  );
			
			if( typewriters[i].isPaused )
			{
				typewriters[i].timer--;
				if( typewriters[i].timer == 0 )
				{
					typewriters[i].timer = settings.timer;
					typewriters[i].isPaused  = false;
				}
				
			}
			else if( typewriters[i].forward )
			{
				typewriters[i].self.style.color = typewriters[i].color;
				typewriters[i].self.style.width = 'auto';
				typewriters[i].pos+=0.5;
				if( typewriters[i].pos > typewriters[i].phrases[typewriters[i].wordnum].length )
				{
					if( typewriters[i].self.hasAttribute( "data-typewriter-loop" ) && typewriters[i].self.getAttribute( "data-typewriter-loop") == "noloop" )
						if( typewriters[i].phrases.length - 1 == typewriters[i].wordnum )
						{
							typewriters[i].forward = true;
						}
						else
						{
							typewriters[i].forward = false;	
						}
					else {
						typewriters[i].forward = false;	
					}
					typewriters[i].pos -= 0.5;
					typewriters[i].isPaused = true;
				}
			}
			else if( !typewriters[i].forward )
			{
				if( typewriters[i].pos <= 1 )
				{
					typewriters[i].self.style.borderColor = typewriters[i].color;
					typewriters[i].self.style.color = 'transparent';
					typewriters[i].self.style.width = '3px';
					
					typewriters[i].forward = true;
					typewriters[i].pos+=0;
					typewriters[i].wordnum++;
					if( typewriters[i].wordnum == typewriters[i].phrases.length )
					{
						typewriters[i].wordnum = 0;
						
					}
				}
				else
				{
					typewriters[i].pos -= 1;	
				}
			}

		}
	}
	
	//blinks the cursor
	static blink()
	{
		for ( var i = 0; i < typewriters.length; i++ )
		{
			if( blinkOn )
			{
				typewriters[i].self.style.borderRight = "2px solid " + typewriters[i].color ;
			}
			else
			{
				typewriters[i].self.style.borderRight = "2px solid transparent";
			}
		}
		blinkOn = !blinkOn;
	}
}
Typewriters.init();