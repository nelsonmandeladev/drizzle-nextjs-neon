import {Crown, Shield, UserIcon} from "lucide-react";
import {RoleType} from "@/types";

interface Props {
    role: RoleType;
}
export function GetRoleBadge ({role}: Props) {
    const baseClasses = "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium";

    switch (role) {
        case 'admin':
            return (
                <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>
            <Crown className="w-4 h-4" />
            Administrator
          </span>
            );
        case 'user':
            return (
                <span className={`${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`}>
            <UserIcon className="w-4 h-4" />
            User
          </span>
            );
        case 'guest':
            return (
                <span className={`${baseClasses} bg-gray-100 text-gray-600 border border-gray-200`}>
            <Shield className="w-4 h-4" />
            Guest
          </span>
            );
        default:
            return null;
    }
};