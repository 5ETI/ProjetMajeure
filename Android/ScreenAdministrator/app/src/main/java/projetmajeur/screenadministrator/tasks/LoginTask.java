package projetmajeur.screenadministrator.tasks;

import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by benad on 20/12/2016.
 */

public class LoginTask extends AsyncTask<String, Integer, Boolean> {

    LoginTask.LoginListener loginListener;

    protected Boolean doInBackground(String... params) {
        boolean state_request=false;
        int code=0 ;
        String login = params[0];
        String pwd = params[1];
        JSONObject jsonParam = new JSONObject();

        //Json de test :
        JSONObject jsonTest = new JSONObject();
        try {
            jsonTest.put("id", "2");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            jsonTest.put("login", "tp");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            jsonTest.put("password", "tp");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            jsonTest.put("firstname", "tp");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            jsonTest.put("lastname", "tp");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            jsonTest.put("role", "WATCHER");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            jsonParam.put("login", login);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            jsonParam.put("password", pwd);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        // code a decommenter une fois que la requete vers JEE est possible
        /*
        URL url = null;
        try {
            url = new URL("http://localhost:8080/FrontAuthWatcherWebService/rest/watcherauth/auth");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        HttpURLConnection urlConnection = null;
        try {
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("POST");
            urlConnection.connect();
            urlConnection.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            OutputStreamWriter out = new   OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonParam.toString());
            out.close();

            // code = urlConnection.getResponseCode();
            InputStream in = new BufferedInputStream(urlConnection.getInputStream());
            //verifie qu'il y a bien un resultat
            state_request = readStream(in);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        } finally {
            urlConnection.disconnect();
        }

        */

        state_request = true;

        return state_request;
    }

    protected void onProgressUpdate(Integer... progress) {

    }

    protected void onPostExecute(Boolean result) {
        loginListener.onLogin(result);

    }

    public void setLoginListener(LoginListener loginListener) {
        this.loginListener=loginListener;
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

    public interface LoginListener {
        void onLogin(boolean result);
    }
}


