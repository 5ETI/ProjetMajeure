package projetmajeur.screenadministrator.entity.model;

import java.io.Serializable;
import java.security.Timestamp;

/**
 * Created by benad on 08/01/2017.
 */

public class User implements Serializable{

    private int id;
    private  String email;
    private String passw;
    private String name;
    private int role;
    private Timestamp time;

    public User(int id, String email, String name, int role, Timestamp time) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassw() {
        return passw;
    }

    public void setPassw(String passw) {
        this.passw = passw;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
}
