package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import projetmajeur.screenadministrator.Utils.Utils;

/**
 * Created by benad on 13/01/2017.
 */

public class Assign extends AsyncTask< ArrayList<Integer>,Integer,Boolean > {

    Assign.AssignListener assignListener;
    @Override
    protected Boolean doInBackground(ArrayList<Integer>... params) {
        ArrayList<Integer> stock = params[0];
        int somme = 0;
        if (stock.get(0) == 0)// ADD DEVICE TO MANAGER
        {   URL url = null;
            int id_manager = stock.get(1);
            for (int i =2 ; i< stock.size();i++){

                try {
                    //url = new URL("http://10.170.0.102:1337/device/addToManager/"+id_manager+"/"+stock.get(i));
                    //url = new URL("http://192.168.1.23:1337/device/addToManager/"+id_manager+"/"+stock.get(i));
                    //url = new URL("http://192.168.1.30:1337/device/addToManager/"+id_manager+"/"+stock.get(i));
                    url = new URL("http://192.168.1.25:1337/device/addToManager/"+id_manager+"/"+stock.get(i));

                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }

                HttpURLConnection urlConnection = null;

                try {
                    urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.setRequestMethod("POST");
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

                String responseString = null;
                try {
                    responseString = Utils.readInputStream(in);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                JSONObject jObj = null;
                try {
                    jObj = new JSONObject(responseString);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                try {
                    if (jObj.getInt("affectedRows") != 0) {

                        somme++;
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
            if(somme  <= stock.size()){

                return true;
            }

        }
        if (stock.get(0) == 1)// ADD MANAGER TO DEVICE
        {   URL url = null;
            int id_device = stock.get(1);
            for (int i =2 ; i< stock.size();i++){

                try {

                    //url = new URL("http://10.170.0.102:1337/device/addToManager/"+stock.get(i)+"/"+id_device);
                    //url = new URL("http://192.168.1.23:1337/device/addToManager/"+stock.get(i)+"/"+id_device);
                    //url = new URL("http://192.168.1.30:1337/device/addToManager/"+stock.get(i)+"/"+id_device);
                    url = new URL("http://192.168.1.25:1337/device/addToManager/"+stock.get(i)+"/"+id_device);

                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }

                HttpURLConnection urlConnection = null;

                try {
                    urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.setRequestMethod("POST");
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

                String responseString = null;
                try {
                    responseString = Utils.readInputStream(in);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                JSONObject jObj = null;
                try {
                    jObj = new JSONObject(responseString);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                try {
                    if (jObj.getInt("affectedRows") != 0) {

                        somme++;
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
            if(somme  <= stock.size()){

                return true;
            }

        }
        return false;
    }

    protected void onPostExecute(Boolean result) {
        assignListener.onAssign(result);
        this.cancel(true);

    }
    public void setAssignListener(Assign.AssignListener assignListener) {
        this.assignListener=assignListener;
    }

    public interface AssignListener {
        void  onAssign(Boolean result);
    }
}
