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

import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;

import static android.content.ContentValues.TAG;

/**
 * Created by benad on 11/01/2017.
 */

public class AddManager extends AsyncTask<User,Integer,Boolean> {

    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    Gson gson = new Gson();

    AddManager.AddManagerListener addManagerListener;
    @Override
    protected Boolean doInBackground(User... params) {

        User user = params[0];

        JSONObject obj = new JSONObject();

        try {
            obj.put("email", String.valueOf(user.getEmail()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("password", String.valueOf(user.getPassw()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            obj.put("name",  String.valueOf(user.getName()));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String json = gson.toJson(obj);

        //tring url = "http://10.170.0.102:1337/manager/add";
        //String url = "http://192.168.1.23:1337/manager/add";
        String url = "http://192.168.1.30:1337/manager/add";

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
        addManagerListener.onAddManager(result);
        this.cancel(true);

    }
    public void setAddManagerListener(AddManager.AddManagerListener addManagerListener) {
        this.addManagerListener=addManagerListener;
    }



    public interface AddManagerListener {
        void  onAddManager(Boolean result);
    }



}
