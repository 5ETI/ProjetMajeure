package fr.cpe.easypub.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import fr.cpe.easypub.model.User;

@Path("/auth")
public interface IAuthService {
	
	@GET
	@Produces("application/json")
	@Path("/echo")
	String echo();
	
	/**
	 * Authenticate user
	 * 
	 * Consumes Json: 
	 * url:		http://localhost:8080/auth/rest/auth/
	 * body:	{	"email" : "admin@admin.com", 
	 * 				"password" : "admin" }
	 * 
	 * Produces Json:
	 * 	if user exists: {	"id": 1,
     * 						"email": "admin@admin.com",
     *						"password": "admin",
     *						"name": "Admin",
     * 						"role": "ADMIN",
     *						"timestamp": 1483458543000 }
	 *  if user do not exists: null
	 *  
	 * @param User
	 * @return User
	 */
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	User auth(User user);

}
