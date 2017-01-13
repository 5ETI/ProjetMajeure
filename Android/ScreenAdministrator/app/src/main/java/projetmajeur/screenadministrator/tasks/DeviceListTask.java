package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.CheckBox;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.squareup.okhttp.internal.Util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import projetmajeur.screenadministrator.entity.model.Device;

/**
 * Created by benad on 05/01/2017.
 */

public class DeviceListTask extends AsyncTask<String, Integer, ArrayList<Device>> {
    DeviceListTask.DeviceListListener deviceListListener;

    Gson gson = new Gson();


    ArrayList<Device> stockage = new ArrayList<Device>();
    @Override
    protected ArrayList<Device> doInBackground(String... params) {
        /// REQUETE POUR RECUPERER LA LISTE
        Gson gson = new Gson();

        String param = params[0];
        String id_manager = params [1];

        URL url = null;

        if(param.equals("listeformanager")){
            try {
                url = new URL("http://10.170.1.100:1337/device/formanager/" + id_manager);
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
            return Utils.getListDevice(in);
        }

        if(param.equals("listeall")){
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
            return Utils.getListDevice(in);
        }

        else
        {      try {
            url = new URL("http://10.170.1.100:1337/device/manager/" + id_manager );
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
            return Utils.getListDevice(in);
        }

    }

    protected void onPostExecute(ArrayList<Device> result) {
        deviceListListener.onListDevice(result);
        this.cancel(true);

    }
    public void setDeviceListListener(DeviceListTask.DeviceListListener deviceListListener) {
        this.deviceListListener=deviceListListener;
    }

    public interface DeviceListListener {
        void  onListDevice(ArrayList<Device> list);
    }



}
