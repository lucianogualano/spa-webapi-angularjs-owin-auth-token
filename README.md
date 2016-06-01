<h1>Single Page Applications using ASP.NET 4.6.1, Angular 1</h1>

<p>
This sample application consists of a Single Page Application Angularjs Front-End web application client that allows a user to register their
email and password credentials. Once registered the users can then log in and out of the application.

This application will support authentication and authorization of users. The application API
will be consumed by a trusted client (AngularJS front-end) so only interested in implementing a 
single OAuth 2.0 flow where the registered user will present username and password to a specific end point, 
and the API will validate those credentials, and if all is valid it will return a token for the user where the client
application used by the user should store it securely and locally in order to present this token with each request to any protected end point.
</p>
<h2> Server Side</h2>
The technologies used to communicate the client to the backend REST service are :
	<ul> 
		<li>The ASP .NET framework 4.6.1</li>
		<li> Hosted on an IIS web server</li>
		<li> Web API 2.2  (Resouce Server)</li>
		<li> OWIN middleware </li>
		<li> Database Entity Frame 6.x to SQL LocalDB server</li>
		<li> Identity Server (Entity Framework nuget package) 2.1 Autherization Server using bearer token </li>
  </ul>

<h2> Client Side</h2>
The techology used are:
	<ul>
		<li>Angularjs 1.5.5</li>
		<li>Bootstrap</li>
		<li>HTML 5</li>
		<li>CSS</li>
	</ul>
<h2>Tools</h2>
The build tools used are:
	<ul>
		<li>Bootstrap</li>		
		<li>Gulp</li>
		<li>Nuget</li>
		<li>Bower</li>
		<li>NPM</li>
	</ul>
  
 <h2> Install the following nuget packges (install-package)</h2>
  The following nuget packages are used:
  	<ul>
	  <li> Microsoft.Owin.Host.SystemWeb</li>
	  <li> Microsoft.Owin.Security</li>
	  <li> Microsoft.Owin.Security.OAuth</li>
	  <li> Microsoft.Owin.Security.Cookies</li>
	  <li> Microsoft ASP.NET Identity Owin</li>
	  <li> Microsoft.AspNet.Identity.Core</li>
	  <li> Microsoft.AspNet.Identity.EntityFramework</li>
	  <li> Microsoft.AspNet.Identity.Owin</li>
	  <li> Microsoft.AspNet.WebApi.Owin</li>
  </ul>
