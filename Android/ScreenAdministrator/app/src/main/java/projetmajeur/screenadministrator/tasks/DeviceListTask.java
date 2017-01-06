package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.CheckBox;

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
import java.util.List;

import projetmajeur.screenadministrator.entity.model.Device;

/**
 * Created by benad on 05/01/2017.
 */

public class DeviceListTask extends AsyncTask<Double, Integer, ArrayList<Device>> {
    DeviceListTask.DeviceListListener deviceListListener;


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


        /// REQUETE POUR RECUPERER LA LISTE

        URL url = null;

        try {
            url = new URL("http://10.170.0.135:1337/device/all");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        HttpURLConnection urlConnection = null;

        try {
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.connect();

            // code = urlConnection.getResponseCode();
            InputStream in = new BufferedInputStream(urlConnection.getInputStream());

            String responseString = readInputStream(in);
            JSONObject jObj = new JSONObject(responseString);
            Log.i("retouuuu :", String.valueOf(jObj));
            boolean state_request = readStream(in);

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


            return stockage;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return stockage;
    }

    protected void onPostExecute(ArrayList<Device> result) {
        deviceListListener.onListDevice(result);

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


}
