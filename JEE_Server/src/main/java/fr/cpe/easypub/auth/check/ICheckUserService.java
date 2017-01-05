package fr.cpe.easypub.auth.check;

import fr.cpe.easypub.model.User;

public interface ICheckUserService {

	User getFromLocalUserList(String login, String password);

	User getUserFromDB(String email, String password);

}
