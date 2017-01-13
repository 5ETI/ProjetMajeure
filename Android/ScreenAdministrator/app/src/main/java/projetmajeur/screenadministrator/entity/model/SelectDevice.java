package projetmajeur.screenadministrator.entity.model;

import java.util.ArrayList;

/**
 * Created by benad on 12/01/2017.
 */
public class SelectDevice {
    private static SelectDevice ourInstance = new SelectDevice();

    public static SelectDevice getInstance() {
        return ourInstance;
    }

    ArrayList<Device> stockage;

    private SelectDevice() {
        this.stockage =new ArrayList<Device>();
    }

    public void AddDevice(Device device ){

        stockage.add(device);
    }

    public void DeleteDevice(Device device){

        stockage.remove(device);
    }

    public ArrayList<Device> getStockage() {
        return stockage;
    }

    public void setStockage(ArrayList<Device> stockage) {
        this.stockage = stockage;
    }

    public void clean(){

        stockage.clear();
    }
}
