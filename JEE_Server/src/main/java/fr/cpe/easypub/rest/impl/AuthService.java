package fr.cpe.easypub.rest.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.inject.Inject;
import fr.cpe.easypub.auth.check.ICheckUserService;
import fr.cpe.easypub.model.User;
import fr.cpe.easypub.rest.IAuthService;

public class AuthService implements IAuthService {
	
	private static Logger log = Logger.getLogger(AuthService.class.getName());
	
	List<User> listUser = new ArrayList<User>();

	@Inject
	ICheckUserService checkUserService;
	
	@Override
	public User auth(User user) {

		log.info(user.toString());
		
		//User userdb = checkUserService.getUserByLoginAndPassword(user.getLogin(), user.getPassword());
		//User userdb = checkUserService.getFromLocalUserList(user.getEmail(), user.getPassword());
		User userdb = checkUserService.getUserFromDB(user.getEmail(), user.getPassword());
		
		if(userdb == null){
			log.info("Failed authentication : wrong password or login");
			return null;
		}else{
			log.info("Receive resp user: " + userdb.toString());
			return userdb;
		}
		
	}	

	@Override
	public String echo() {
		log.info("echo");
		return "echo";		
	}

}
