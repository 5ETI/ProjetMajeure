package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;

import com.google.gson.Gson;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import projetmajeur.screenadministrator.Utils.Utils;
import projetmajeur.screenadministrator.entity.model.User;

/**
 * Created by benad on 08/01/2017.
 */

public class ManagerListTask extends AsyncTask<String, Integer, ArrayList<User>> {

    ManagerListTask.ManagerListListener managerListListener;

    Gson gson = new Gson();
    ArrayList<User> stockage = new ArrayList<User>();

    @Override
    protected ArrayList<User> doInBackground(String... params) {
        String param = params[0];
        int param1 = Integer.parseInt(params[1]);
        URL url = null;
        if (param.equals("liste") && param1 == 0) {
            try {
                 //url = new URL("http://192.168.1.23:1337/managers/all");
                //url = new URL("http://10.170.0.102:1337/managers/all");
                //url = new URL("http://192.168.1.30:1337/managers/all");
                url = new URL("http://192.168.1.25:1337/managers/all");



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


            return Utils.getListManager(in);
        }
        if(param.equals("liste") && param1 != 0 )
        {
            try {
                //url = new URL("http://192.168.1.23:1337/device/getManager/" + param1 );
                //url = new URL("http://10.170.0.102:1337/device/getManager/" + param1 );
                //url = new URL("http://192.168.1.30:1337/device/getManager/" + param1 );
                url = new URL("http://192.168.1.25:1337/device/getManager/" + param1 );




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


            return Utils.getListManager(in);


        }
        if (param.equals("device")){

            try {
                //url = new URL("http:/10.170.0.102:1337/managers/otherManager/" + param1 );
                //url = new URL("http://192.168.1.23:1337/managers/otherManager/" + param1 );
                //url = new URL("http://192.168.1.30:1337/managers/otherManager/" + param1 );
                url = new URL("http://192.168.1.25:1337/managers/otherManager/" + param1 );



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


            return Utils.getListManager(in);
        }
        return stockage;
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
