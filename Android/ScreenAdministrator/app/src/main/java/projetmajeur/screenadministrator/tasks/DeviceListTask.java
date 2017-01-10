package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.CheckBox;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

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

public class DeviceListTask extends AsyncTask<Double, Integer, ArrayList<Device>> {
    DeviceListTask.DeviceListListener deviceListListener;

    Gson gson = new Gson();


    ArrayList<Device> stockage = new ArrayList<Device>();
    @Override
    protected ArrayList<Device> doInBackground(Double... params) {
        /// REQUETE POUR RECUPERER LA LISTE
        Gson gson = new Gson();

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


        return getListDevice(in);
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

}
