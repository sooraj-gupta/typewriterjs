class Clipboard
{

	static init()
	{
		var link = document.createElement( "link" );
		var clips = document.querySelectorAll("[data-clipboard]")
		this.link = document.createElement( "link" )
		link.setAttribute( "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
		link.setAttribute( "rel", "stylesheet" );
		document.head.appendChild( link );
		
		for( var i = 0; i < clips.length; i++ )
		{
			if( clips[i].style.position != "absolute" )
				clips[i].style.position = "relative";
			var a = document.createElement( "a" );
			var span = document.createElement( "span" );
			span.innerHTML = "Copied!";
			span.className = "copiedmessage"
			a.id = "copya" + i;
			a.innerHTML = '<i class = "copythis fa fa-clipboard" ></i>';
			clips[i].appendChild(a);
			clips[i].appendChild(span);

			span.id = "copys" + i;
			a.setAttribute( "onclick", "Clipboard.copyToClipboard( this.parentElement.innerText, this.id );");
			//console.log( span );
			//console.log( clips[i] );
		}
	}
	static copyToClipboard( str, t ){
		const el = document.createElement('textarea');
		el.value = str;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		var i = parseInt( t.charAt( t.length-1 ) );
		var span = document.getElementById( "copys" + i );
		this.appear( span );
	};

	static appear( span )
	{
		if( span.style.display = "none" )
		{
			span.style.display = "block";
			setTimeout( function(){
				span.style.opacity = 1;
			}, 10 );
			setTimeout( function(){ 
				span.style.opacity = 0;
				setTimeout( function(){ span.style.display = "none" }, 500 );
			}, 2000 );
		}
	}
}