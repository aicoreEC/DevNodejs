const http = require( 'http' );
const url = require( 'url' );
const fs = require( 'fs' );

const port = 80;

const server = http.createServer( function( request, response ) {
    const parsedUrl = url.parse( request.url );
    const resource = parsedUrl.pathname;

    if ( resource == '/hello' ) {
        fs.readFile( 'hello.html', 'utf-8', function( error, data ) {
            if ( error ) {
                response.writeHead( 500, { 'Content-Type':'text/html; charset=utf-8' } );
                response.end( `500 Internal Server Error ${error}` ); 
            } else {
                response.writeHead( 200, { 'Content-Type':'text/html; charset=utf-8'  } );
                response.end( data );
            }
        });
    } else {
        response.writeHead( 404, { 'Content-Type':'text/html; charset=utf-8' } );
        response.end( '404 Page Not Found' );
    }
}).listen( port, function() {
    console.log( `Server is running... ${port}` );
});
