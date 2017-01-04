package fr.cpe.easypub.auth.check.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import fr.cpe.easypub.auth.check.ICheckUserService;
import fr.cpe.easypub.model.Role;
import fr.cpe.easypub.model.User;

@Stateless
public class CheckUserService implements ICheckUserService {

	private static Logger log = Logger.getLogger(CheckUserService.class.getName());
	List<User> listUser = new ArrayList<User>();
	
	@PersistenceContext
    EntityManager em;

	@Override
	public User getFromLocalUserList(String login, String password) {

		if(listUser.isEmpty()){
			listUser.add(new User("admin", "admin", "Admin", Role.ADMIN));
			listUser.add(new User("manager", "manager", "Manager", Role.MANAGER));
			listUser.add(new User("device", "device", "Device", Role.DEVICE));
		}

		for(User user : listUser){
			if(user.getEmail().equals(login) && user.getPassword().equals(password)){
				log.info("user exist : " + user);
				return user;
			}
		}
		return null;
	}

	@Override
	public User getUserFromDB(String email, String password) {

		try{
    		User user = (User) em.createQuery("from User u where u.email = :email and u.password = :password")
				.setParameter("email", email)
				.setParameter("password", password)
				.getSingleResult();
    		return user;
    	}catch(NoResultException e){
    		return null;
    	}
	}

}
