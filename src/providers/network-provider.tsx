"use client";

import React from 'react';
import {useOnlineStatus} from "@/hooks";
import {NetworkErrorMessage} from "@/components";

interface NetworkProviderProps {
    children: React.ReactNode;
}

export function NetworkProvider({ children }: NetworkProviderProps) {

    const isOnline = useOnlineStatus();
    return (
        <div className={"w-full"}>
            { isOnline ?children : <NetworkErrorMessage />}
        </div>
    );
}