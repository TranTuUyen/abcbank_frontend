import Config from '../config/config'

export class AccountAPIs {
    public static ACCOUNT_BASE = `${Config.API_BASE_URL}/accounts`
    public static ACCOUNT_LOGIN = `${Config.API_BASE_URL}/login`
    public static ACCOUNT_LOGOUT = `${Config.API_BASE_URL}/logout`
    public static ACCOUNT_SEACH = `${Config.API_BASE_URL}/accounts/search`
    public static ACCOUNT_CHECK_ACCOUNT_NUMBER = `${Config.API_BASE_URL}/accounts/check_account_number`
    public static ACCOUNT_CHECK_EMAIL = `${Config.API_BASE_URL}/accounts/check_email`
}