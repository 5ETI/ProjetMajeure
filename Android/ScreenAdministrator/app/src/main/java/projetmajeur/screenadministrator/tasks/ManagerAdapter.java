package projetmajeur.screenadministrator.tasks;

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.activity.ManagerActivity;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;

/**
 * Created by benad on 08/01/2017.
 */

public class ManagerAdapter extends RecyclerView.Adapter<ManagerAdapter.ViewHolder>  {

    private ArrayList<User> dataset;

    public static class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener
    {
        public TextView textViewId;
        public TextView textViewEmail;
        public TextView textViewName;
        public TextView textViewRole;
        public TextView textViewTime;



        public ViewHolder(View v) {
            super(v);
            textViewId = (TextView) v.findViewById(R.id.identifiant);
            textViewEmail = (TextView) v.findViewById(R.id.email);
            textViewName = (TextView) v.findViewById(R.id.name);
            textViewRole = (TextView) v.findViewById(R.id.role);
            textViewTime = (TextView) v.findViewById(R.id.time);
            itemView.setOnClickListener(this); // bind the listener


        }
        @Override
        public void onClick(View view) {
        }
    }

    public ManagerAdapter(ArrayList<User> dataset) {
        this.dataset = dataset;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.recyclerview_item_manager, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        holder.textViewId.setText("Id : " + String.valueOf(dataset.get(position).getId()));
        holder.textViewEmail.setText("Email :" + String.valueOf(dataset.get(position).getEmail()));
        holder.textViewName.setText("Name : " + String.valueOf(dataset.get(position).getName()));
        holder.textViewRole.setText("Role : " + String.valueOf(dataset.get(position).getRole()));
        //holder.textViewTime.setText("Time : " + String.valueOf(dataset.get(position).getTime()));
    }


    @Override
    public int getItemCount() {
        return dataset.size();
    }


    }
