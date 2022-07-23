import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'colormind',
  webDir: 'www',
  bundledWebRuntime: false,
server:{
  hostname:'http://colormind.io'
}
};

export default config;
