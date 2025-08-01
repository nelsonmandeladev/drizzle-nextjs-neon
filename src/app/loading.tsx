"use client";

import React from 'react';
import {Home} from "lucide-react";

function Loading() {
    return (
        <div className="flex items-center justify-center h-[85dvh]">
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Home className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">DASH-CMS</h1>
                    </div>
                </div>
                <p className="text-base text-slate-400">loading...</p>
            </div>
        </div>
    );
}

export default Loading;