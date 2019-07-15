import { environment } from '../../environments/environment.mhoang';

export class Constant {
  public static URL_API = environment.backendIP;
  public static PORT = environment.backendPort;
  public static PREFIX = "api";

  public static COMMON_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX].join('/');

  public static LOGIN_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'user', 'login'].join('/');
  public static LOGOUT_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'user', 'logout'].join('/');
  public static CURRENT_USER_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'user', 'current'].join('/');

  public static SEARCH_INTERVIEWEE_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'interviewee', 'search'].join("/");
  public static UPDATE_INTERVIEWE_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'interviewee', 'update'].join("/");
  public static ADD_INTERVIEWEE_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'interviewee', 'add'].join("/");

  public static POSITION_ALL_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'positions'].join("/");

  public static DOWNLOAD_FILE_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'download'].join("/");
  public static VIEW_AVATAR_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'view'].join("/");
  public static USER_LOGS_URL = [Constant.URL_API + ":" + Constant.PORT, Constant.PREFIX, 'logs'].join("/")

  public static DEFAULT_AVATAR_URL = 'assets/image/default_avatar.jpg';

  public static PAGE_NOT_FOUND = 404;
  public static SERVER_ERROR = 500;
  public static FORBIDDEN = 403;
  public static UNAUTHORIZED = 401;
  public static USERNAME_EXISTS = 400;
  public static DEFAULT_PAGE = 0;
  public static DEFAULT_SIZE = 10;
}
