package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;
import android.util.Log;

import com.google.gson.Gson;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import projetmajeur.screenadministrator.entity.model.Device;

import static android.content.ContentValues.TAG;

/**
 * Created by benad on 05/01/2017.
 */

public class AddDevice extends AsyncTask <Device,Integer,Boolean>{

    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    Gson gson = new Gson();

    AddDevice.AddDeviceListener addDeviceListener;
    @Override
    protected Boolean doInBackground(Device... params) {

        Device device = params[0];

        JSONObject obj = new JSONObject();

        try {
            obj.put("orientation", String.valueOf(device.getOrientation()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("longueur", String.valueOf(device.getLongueur()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("hauteur",  String.valueOf(device.getHauteur()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("latitude",  String.valueOf(device.getLatitude()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("longitude",  String.valueOf(device.getLongitude()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("ville",  String.valueOf(device.getVille()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("type",  String.valueOf(device.getType()));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String json = gson.toJson(obj);

        Log.i("jssoon : ",obj.toString());

       //String url = "http://10.170.0.102:1337/device/add";
        //String url = "http://192.168.1.23:1337/device/add";
        //String url = "http://192.168.1.30:1337/device/add";
        String url = "http://192.168.1.25:1337/device/add";


        OkHttpClient client = new OkHttpClient();

        RequestBody body = RequestBody.create(JSON, obj.toString());
        Log.i("Body : ", body.toString());
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        Response response = null;
        try {
            response = client.newCall(request).execute();
            Log.i(TAG, response.toString());
            Integer code = response.code();
            return code == 200;
        } catch (IOException e) {
            e.printStackTrace();
        }


        return false;
    }

    protected void onPostExecute(Boolean result) {
        addDeviceListener.onAddDevice(result);
        this.cancel(true);

    }
    public void setAddDeviceListener(AddDevice.AddDeviceListener addDeviceListener) {
        this.addDeviceListener=addDeviceListener;
    }

    public interface AddDeviceListener {
        void  onAddDevice(Boolean result);
    }

}
