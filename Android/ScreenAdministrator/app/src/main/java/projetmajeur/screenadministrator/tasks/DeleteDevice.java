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
import projetmajeur.screenadministrator.entity.model.Device;

/**
 * Created by benad on 05/01/2017.
 */

public class DeleteDevice extends AsyncTask<ArrayList<Device>,Integer,Boolean> {

    DeleteDevice.DeleteDeviceListener deleteDeviceListener;


    @Override
    protected Boolean doInBackground(ArrayList<Device>... params) {
        ArrayList<Device> stockage = params[0];
        int somme =0;
        URL url = null;

        for (int i = 0; i<stockage.size();i++) {

            try {
                //url = new URL("http://10.170.0.102:1337/device/delete/" + stockage.get(i).getId());
                //url = new URL("http://192.168.1.23:1337/device/delete/" + stockage.get(i).getId());
                //url = new URL("http://192.168.1.30:1337/device/delete/" + stockage.get(i).getId());
                url = new URL("http://192.168.1.25:1337/device/delete/" + stockage.get(i).getId());



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

        if( somme  <= stockage.size() ){

            return true;
        }

        return false;
    }

    public DeleteDevice() {
        super();
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

    }

    @Override
    protected void onPostExecute(Boolean aBoolean) {
       deleteDeviceListener.onDeleteDevice(aBoolean);
        super.onPostExecute(aBoolean);
    }

    public void setDeleteDeviceListener(DeleteDevice.DeleteDeviceListener deleteDeviceListener) {
        this.deleteDeviceListener=deleteDeviceListener;
    }

    public interface DeleteDeviceListener {
        void  onDeleteDevice(Boolean result);
    }
}
