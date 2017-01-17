package projetmajeur.screenadministrator.Utils;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;

/**
 * Created by benad on 11/01/2017.
 */

public class Utils {


    static Gson gson = new Gson();

    public static boolean readStream(InputStream in) throws IOException, JSONException {
        String responseString = readInputStream(in);
        JSONObject jObj = new JSONObject(responseString);
        if(jObj.getInt("status")==200)
        {
            return true;
        }
        return false;
    }
    public static String readInputStream(InputStream inputStream) throws IOException {
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
    public static ArrayList<Device> getListDevice (InputStream in){
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
    public static ArrayList<User> getListManager (InputStream in){
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
            User dev = gson.fromJson(String.valueOf(jsonobject), User.class);
            list.add(dev);
        }

        return list;


    }





}
