package projetmajeur.screenadministrator.tasks;

import android.bluetooth.BluetoothClass;
import android.os.AsyncTask;

import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import projetmajeur.screenadministrator.entity.enumeration.EnumVille;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.RechercheDevice;

import com.google.gson.Gson;
import com.google.maps.android.SphericalUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by benad on 04/01/2017.
 */

public class DeviceTask extends AsyncTask<Double, Integer, ArrayList<Device>> {

    DeviceTask.DeviceListener deviceListener;
    Gson gson = new Gson();






    @Override
    protected ArrayList<Device> doInBackground(Double... params) {

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

            String ville = String.valueOf(RechercheDevice.getInstance().getVillerecherche());
            URL url = null;
            try {
                url = new URL("http://10.170.1.100:1337/device/parVille/"+ville);

                //url = new URL("http://192.168.1.23:1337/device/parVille/"+ville);
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }

            HttpURLConnection urlConnection = null;

            try {
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.connect();

            } catch (IOException e) {
                e.printStackTrace();
            }

            InputStream in = null;
            try {
                in = new BufferedInputStream(urlConnection.getInputStream());
            } catch (IOException e) {
                e.printStackTrace();
            }


            return getListDevice(in);
        }
        if(typeRecherche == 2.0){
            LatLng userlatlng = new LatLng(latUser,lonUser);
            LatLngBounds perime  = toBounds(userlatlng,d);

            URL url = null;
            try {
                url = new URL("http://10.170.1.100:1337/device/all");

                //url = new URL("http://192.168.1.23:1337/device/all");
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }

            HttpURLConnection urlConnection = null;

            try {
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.connect();

            } catch (IOException e) {
                e.printStackTrace();
            }

            InputStream in = null;
            try {
                in = new BufferedInputStream(urlConnection.getInputStream());
            } catch (IOException e) {
                e.printStackTrace();
            }

            ArrayList<Device> stockage = getListDevice(in);
            ArrayList<Device> liste = new ArrayList<Device>();

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
        this.cancel(true);


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
    public ArrayList<Device> getListDevice (InputStream in){
        ArrayList<Device> list = new ArrayList<Device>();
        String responseString = null;
        try {
            responseString = readInputStream(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONArray jObj = null;
        try {
            jObj = new JSONArray(responseString);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        for (int i = 0; i < jObj.length(); i++) {
            JSONObject jsonobject = null;
            try {
                jsonobject = jObj.getJSONObject(i);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            Device dev = gson.fromJson(String.valueOf(jsonobject),Device.class);
            list.add(dev);
        }

        return list;
    }
    private boolean readStream(InputStream in) throws IOException, JSONException {
        String responseString = readInputStream(in);
        JSONObject jObj = new JSONObject(responseString);
        if(jObj.getInt("status")==200)
        {
            return true;
        }
        return false;
    }
    private String readInputStream(InputStream inputStream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(
                inputStream, "UTF-8"));
        String tmp;
        StringBuilder sb = new StringBuilder();
        while ((tmp = reader.readLine()) != null) {
            sb.append(tmp).append("\n");
        }
        if (sb.length() > 0 && sb.charAt(sb.length() - 1) == '\n') {
            sb.setLength(sb.length() - 1);
        }
        reader.close();
        return sb.toString();
    }

}
