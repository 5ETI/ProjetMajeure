package projetmajeur.screenadministrator.tasks;

import android.bluetooth.BluetoothClass;
import android.os.AsyncTask;

import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;

import java.util.ArrayList;

import projetmajeur.screenadministrator.entity.enumeration.EnumVille;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.RechercheDevice;
import com.google.maps.android.SphericalUtil;

/**
 * Created by benad on 04/01/2017.
 */

public class DeviceTask extends AsyncTask<Double, Integer, ArrayList<Device>> {

    DeviceTask.DeviceListener deviceListener;


    Device device1 = new Device(0,"portrait",100,100,45.77931271229767,4.865341190015897,"Lyon");
    Device device2 = new Device(1,"portrait",100,100,45.78338306915131,4.862594607984647,"Lyon");
    Device device3 = new Device(2,"portrait",100,100,45.77746099967389,4.855098724365234,"Lyon");
    Device device4 = new Device(3,"portrait",100,100,45.77224874075234,4.866371158277616,"Lyon");
    Device device5 = new Device(4,"portrait",100,100,45.76913552008806,4.870147708570585,"Lyon");
    Device device6 = new Device(5,"portrait",100,100,45.76458511576175,4.869117740308866,"Lyon");
    Device device7 = new Device(6,"portrait",100,100,45.75955528964215,4.867916110670194,"Lyon");
    Device device8 = new Device(6,"portrait",100,100,48.856614,2.3522219000000177,"Paris");
    Device device9 = new Device(6,"portrait",100,100,48.841951316948126,2.337970737135038,"Paris");
    Device device10 = new Device(6,"portrait",100,100,48.85200525526809,2.285957339918241,"Paris");
    Device device11 = new Device(6,"portrait",100,100,51.519688806435894,-0.15661239274777472,"Londres");
    Device device12 = new Device(6,"portrait",100,100,51.496183322772204,-0.1289749110583216,"Londres");

    ArrayList<Device> stockage = new ArrayList<Device>();
    ArrayList<Device> liste = new ArrayList<Device>();


    @Override
    protected ArrayList<Device> doInBackground(Double... params) {
        stockage.add(device1);
        stockage.add(device2);
        stockage.add(device3);
        stockage.add(device4);
        stockage.add(device5);
        stockage.add(device6);
        stockage.add(device7);
        stockage.add(device8);
        stockage.add(device9);
        stockage.add(device10);
        stockage.add(device11);
        stockage.add(device12);

        Double typeRecherche = params[0];
        Double latUser = params[1];
        Double lonUser = params[2];
        String villeCherche = RechercheDevice.getInstance().getVillerecherche().toString();
        String distanceCherche = RechercheDevice.getInstance().getDistancerecherche().toString();

        double d = 0;

        switch (distanceCherche)
        {
            case "500 mètres":
                d = 500;
                break;
            case "1 Km":
                d = 1000;
                break;
            case"2 Km":
                d = 2000;
                break;
            case"3 Km":
                d=3000;
                break;
            case"4 Km":
                d=4000;
                break;
            case"5 Km":
                d=5000;
                break;
        }

        if(typeRecherche == 1.0){

            for(int i = 0; i < stockage.size(); i++){
                if(stockage.get(i).getVille().equals(villeCherche)){

                    liste.add(stockage.get(i));
                }

            }
            return liste;
        }
        if(typeRecherche == 2.0){
            LatLng userlatlng = new LatLng(latUser,lonUser);
            LatLngBounds perime  = toBounds(userlatlng,d);

            for(int i = 0; i < stockage.size(); i++){
                LatLng lt = new LatLng(stockage.get(i).getLatitude(),stockage.get(i).getLongitude());
                if( perime.contains(lt)){

                    liste.add(stockage.get(i));
                }


            }
            return liste;

        }

        return null;


    }

    protected void onPostExecute(ArrayList<Device> result) {
        deviceListener.onDevice(result);

    }

    public void setDeviceListener(DeviceListener deviceListener) {
        this.deviceListener=deviceListener;
    }

    public interface DeviceListener {
        void  onDevice(ArrayList<Device> list);
    }

    public LatLngBounds toBounds(LatLng center, double radius) {
        LatLng southwest = SphericalUtil.computeOffset(center, radius * Math.sqrt(2.0), 225);
        LatLng northeast = SphericalUtil.computeOffset(center, radius * Math.sqrt(2.0), 45);
        return new LatLngBounds(southwest, northeast);
    }

}
