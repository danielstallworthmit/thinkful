package com.danielstallworth.servicesandnotifications;

import android.content.Context;
import android.content.Intent;
import android.support.v4.content.WakefulBroadcastReceiver;

/**
 * Created by danie on 7/29/2016.
 */
public class AlarmBroadcastReceiver extends WakefulBroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Intent notifyService = new Intent(context, NotifyService.class);
        startWakefulService(context, notifyService);
    }
}
