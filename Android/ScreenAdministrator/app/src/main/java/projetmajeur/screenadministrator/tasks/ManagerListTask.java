package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;

import com.google.gson.Gson;

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
import java.net.URL;
import java.util.ArrayList;

import projetmajeur.screenadministrator.activity.ManagerActivity;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;

/**
 * Created by benad on 08/01/2017.
 */

public class ManagerListTask extends AsyncTask<String, Integer, ArrayList<User>> {

    ManagerListTask.ManagerListListener managerListListener;

    Gson gson = new Gson();

    @Override
    protected ArrayList<User> doInBackground(String... params) {

        URL url = null;
        try {
           // url = new URL("http://192.168.1.23:1337/managers/all");
            url = new URL("http://10.170.1.100:1337/managers/all");

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


        return getListManager(in);
    }

    public ArrayList<User> getListManager (InputStream in){
        ArrayList<User> list = new ArrayList<User>();
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
            User dev = gson.fromJson(String.valueOf(jsonobject),User.class);
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

    protected void onPostExecute(ArrayList<User> result) {
        managerListListener.onManager(result);
        this.cancel(true);


    }

    public void setManagerListListener(ManagerListTask.ManagerListListener managerListListener) {
        this.managerListListener=managerListListener;
    }

    public interface ManagerListListener {
        void  onManager(ArrayList<User> list);
    }
}
