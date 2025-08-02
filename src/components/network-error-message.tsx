"use client";
import React from 'react';
import {WifiOff} from "lucide-react";

export function NetworkErrorMessage() {
    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center h-[85dvh] gap-5">
            <WifiOff size={100} className="text-red-300" />
           <p className="text-sm text-slate-400">
               You are currently offline. Please check your internet connection.
           </p>
        </div>
    );
}