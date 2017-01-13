package projetmajeur.screenadministrator.entity.model;

import java.util.ArrayList;

/**
 * Created by benad on 12/01/2017.
 */
public class SelectManager {
    private static SelectManager ourInstance = new SelectManager();

    public static SelectManager getInstance() {
        return ourInstance;
    }

    ArrayList<User> stockage;


    private SelectManager() {
        this.stockage = new ArrayList<User>();
    }

    public void AddManager(User user ){

        stockage.add(user);
    }

    public void DeleteManager(User user){

        stockage.remove(user);
    }

    public ArrayList<User> getStockage() {
        return stockage;
    }

    public void setStockage(ArrayList<User> stockage) {
        this.stockage = stockage;
    }

    public void clean(){

        stockage.clear();

    }
}