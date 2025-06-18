export declare enum AdminErrors {
    NOT_FOUND = "admin not found",
    FETCHING_ADMIN = "an error occurred while fetching admin",
    AUTH_CHECK_ERROR = "an error occurred while checking auth status",
    AUTH_ERROR = "an error occurred while authenticating admin",
    ADMIN_EXIST = "admin already exists",
    CREATE_ADMIN = "an error occurred while creating an admin",
    ADMIN_REMOVED_ERROR = "an error occurred while removing admin",
    HOSPITAL_NOT_FOUND = "hospital not found",
    HOSPITAL_APPROVED_ALREADY = "hospital already approved",
    INVALID_STATUS = "invalid hospital status",
    HOSPITAL_APPROVE_ERROR = "an error occurred while approving hospital",
    ADMIN_UPDATE_ERROR = "an error occurred while updating admin",
    FETCHING_PRACTITIONERS = "an error occurred while fetching practitioners"
}
export declare enum AdminMessages {
    AUTH_SUCCESSFUL = "admin authenticated successfully",
    CREATE_ADMIN = "admin created successfully",
    ADMIN_REMOVED = "admin removed successfully",
    HOSPITAL_APPROVED = "hospital approved successfully",
    ADMIN_UPDATED = "admin updated successfully"
}
