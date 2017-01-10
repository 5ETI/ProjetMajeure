package projetmajeur.screenadministrator.tasks;

import android.provider.ContactsContract;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;

/**
 * Created by benad on 05/01/2017.
 */

public class RecyclerAdapter extends RecyclerView.Adapter<RecyclerAdapter.ViewHolder> {

    private ArrayList<Device> dataset;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView textViewId;
        public TextView textViewOrientation;
        public TextView textViewHauteur;
        public TextView textViewLongueur;
        public TextView textViewLatitude;
        public TextView textViewLongitude;
        public TextView textViewVille;


        public ViewHolder(View v) {
            super(v);
            textViewId = (TextView) v.findViewById(R.id.identifiant);
            textViewOrientation = (TextView) v.findViewById(R.id.orientation);
            textViewHauteur = (TextView) v.findViewById(R.id.hauteur);
            textViewLongueur = (TextView) v.findViewById(R.id.longueur);
            textViewLatitude = (TextView) v.findViewById(R.id.latitude);
            textViewLongitude = (TextView) v.findViewById(R.id.longitude);
            textViewVille = (TextView) v.findViewById(R.id.ville);

        }
    }

    public RecyclerAdapter(ArrayList<Device> dataset) {
        this.dataset = dataset;
    }

    @Override
    public RecyclerAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.recyclerview_item_row, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(RecyclerAdapter.ViewHolder holder, int position) {
        holder.textViewId.setText("Id : " + String.valueOf(dataset.get(position).getId()));
        holder.textViewOrientation.setText("Orientation : " + String.valueOf(dataset.get(position).getOrientation()));
        holder.textViewLongueur.setText("Longueur : " + String.valueOf(dataset.get(position).getLongueur()));
        holder.textViewHauteur.setText("Hauteur :" + String.valueOf(dataset.get(position).getHauteur()));
        holder.textViewLatitude.setText("Latitude : " + String.valueOf(dataset.get(position).getLatitude()));
        holder.textViewLongitude.setText("Longitude : " + String.valueOf(dataset.get(position).getLongitude()));
        holder.textViewVille.setText("Ville : " + String.valueOf(dataset.get(position).getVille()));
    }

    @Override
    public int getItemCount() {
        return dataset.size();
    }
}




