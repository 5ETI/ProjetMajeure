package projetmajeur.screenadministrator.tasks;

import android.content.Intent;
import android.provider.ContactsContract;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.SelectDevice;

/**
 * Created by benad on 05/01/2017.
 */

public class RecyclerAdapter extends RecyclerView.Adapter<RecyclerAdapter.ViewHolder> {

    private final ArrayList<Device> dataset;
    private final OnItemClickListener listener;
    private String type = null;


    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView textViewId;
        public TextView textViewOrientation;
        public TextView textViewHauteur;
        public TextView textViewLongueur;
        public TextView textViewLatitude;
        public TextView textViewLongitude;
        public TextView textViewVille;
        public TextView textViewType;

        public CheckBox chkSelected;



        public ViewHolder(View v) {
            super(v);
            textViewId = (TextView) v.findViewById(R.id.identifiant);
            textViewOrientation = (TextView) v.findViewById(R.id.orientation);
            textViewHauteur = (TextView) v.findViewById(R.id.hauteur);
            textViewLongueur = (TextView) v.findViewById(R.id.longueur);
            textViewLatitude = (TextView) v.findViewById(R.id.latitude);
            textViewLongitude = (TextView) v.findViewById(R.id.longitude);
            textViewVille = (TextView) v.findViewById(R.id.ville);
            textViewType = (TextView) v.findViewById(R.id.type);
            chkSelected = (CheckBox)  itemView.findViewById(R.id.checkbox);

        }

        public void bind(final Device item, final OnItemClickListener listener) {

            itemView.setOnClickListener(new View.OnClickListener() {

                @Override public void onClick(View v) {

                    listener.onItemClick(item);
                }

            });

        }

    }

    public RecyclerAdapter(String type, ArrayList<Device> dataset, OnItemClickListener listener ) {
        this.dataset = dataset;
        this.listener = listener;
        this.type = type;
    }

    @Override
    public RecyclerAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.recyclerview_item_row, parent, false);
        return new ViewHolder(v);
    }


    @Override
    public int getItemCount() {
        return dataset.size();
    }

    @Override public void onBindViewHolder(RecyclerAdapter.ViewHolder holder, int position) {
        final int pos = position;
        holder.bind(dataset.get(position), listener);
        if(type.equals("device")){
            holder.chkSelected.setVisibility(View.VISIBLE);
        }
        if (type.equals("manager")){
            holder.chkSelected.setVisibility(View.INVISIBLE);

        }
        holder.textViewId.setText("Id : " + String.valueOf(dataset.get(position).getId()));
        holder.textViewOrientation.setText("Orientation : " + String.valueOf(dataset.get(position).getOrientation()));
        holder.textViewLongueur.setText("Longueur : " + String.valueOf(dataset.get(position).getLongueur()));
        holder.textViewHauteur.setText("Hauteur :" + String.valueOf(dataset.get(position).getHauteur()));
        holder.textViewLatitude.setText("Latitude : " + String.valueOf(dataset.get(position).getLatitude()));
        holder.textViewLongitude.setText("Longitude : " + String.valueOf(dataset.get(position).getLongitude()));
        holder.textViewVille.setText("Ville : " + String.valueOf(dataset.get(position).getVille()));
        holder.textViewType.setText("Type : " + String.valueOf(dataset.get(position).getType()));

        holder.chkSelected.setChecked(dataset.get(position).isSelected());

        holder.chkSelected.setTag(dataset.get(position));

        holder.chkSelected.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {

                CheckBox cb = (CheckBox) v;
                Device device = (Device) cb.getTag();

                device.setSelected(cb.isChecked());
                dataset.get(pos).setSelected(cb.isChecked());
                if(cb.isChecked()){

                    SelectDevice.getInstance().AddDevice(device);

                }
                else{

                    SelectDevice.getInstance().DeleteDevice(device);
                }
            }
        });

    }

    public interface OnItemClickListener {
        void onItemClick(Device item);
    }

}




