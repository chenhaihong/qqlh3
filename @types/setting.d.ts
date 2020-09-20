declare module "@/setting" {
  type Setting = {
    name: string;
    logo: string;

    // 登录页面
    loginLogo: string;
    slogan: string;
    copyright: string;
    icpCode: string;
    icpLink: string;
    beianCode: string;
    beianLink: string;
  }

  declare const setting: Setting;
  export default setting;
}
