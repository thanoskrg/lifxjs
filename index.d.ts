export = LifxJS;

declare class LifxJS {
  constructor();
  init(opts: LifxJS.LifxJSInitOptions): void;
  get: LifxJS.LifxJSGet;
  power: LifxJS.LifxJSPower;
  color: LifxJS.LifxJSColor;
  scene: LifxJS.LifxJSScene;
}

declare namespace LifxJS {

  interface LifxJSInitOptions {
    appToken: string;
  }

  interface LifxJSGet {
    all(): Promise<Array<LifxLight>>;
    light(id: string): Promise<Array<LifxLight>>;
    group(id: string): Promise<Array<LifxLight>>;
    location(id: string): Promise<Array<LifxLight>>;
    scenes(): Promise<Array<LifxScene>>;
  }

  interface LifxJSPower {
    all(power: LifxPower): LifxJSPowerResult;
    light(id: string, power: LifxPower): LifxJSPowerResult;
    group(id: string, power: LifxPower): LifxJSPowerResult;
    location(id: string, power: LifxPower): LifxJSPowerResult;
  }

  interface LifxJSPowerResult extends Promise<LifxSetStateResponse> {}

  interface LifxJSColor {
    all(config: LifxJSColorConfig, wakeup?: boolean): LifxJSColorResult;
    light(id: string, config: LifxJSColorConfig): LifxJSColorResult;
    light(id: string, config: LifxJSColorConfig, wakeup: boolean): LifxJSColorResult;
    group(id: string, config: LifxJSColorConfig, wakeup?: boolean): LifxJSColorResult;
    location(id: string, config: LifxJSColorConfig, wakeup?: boolean): LifxJSColorResult;
  }

  interface LifxJSColorConfig {
    hex?: string;
    rgb?: string;
    hue?: number;
    saturation?: number;
    brightness?: number;
    kelvin?: number;
  }

  interface LifxJSColorResult extends Promise<LifxSetStateResponse> {}

  interface LifxJSScene {
    activate(uuid: string): LifxJSSceneResult;
  }

  interface LifxJSSceneResult extends Promise<LifxSetStateResponse> {}

  interface LifxSetStateResponse {
    results: Array<LifxSetStateResponseResultItem>;
  }

  interface LifxSetStateResponseResultItem {
    id: string;
    label: string;
    status: LifxReachabilityStatus;
  }

  interface LifxLight {
    id: string;
    uuid: string;
    label: string;
    connected: boolean;
    power: LifxPower;
    color: LifxColor;
    brightness: number;
    zones?: LifxZones;
    effect: LifxEffect;
    chain?: LifxChain;
    group: LifxGroup;
    location: LifxLocation;
    product: LifxProduct;
    last_seen: string;
    seconds_since_seen: number;
  }

  interface LifxScene {
    uuid: string;
    name: string;
    account: LifxAccount;
    states: Array<LifxState>;
    created_at: number;
    updated_at: number;
  }

  interface LifxColor {
    hue: number;
    saturation: number;
    kelvin: number;
  }

  interface LifxZones {
    count: number;
    zones: Array<LifxZone>;
  }

  interface LifxZone {
    brightness: number;
    hue: number;
    kelvin: number;
    saturation: number;
    zone: number;
  }

  interface LifxChain {
    count: number;
    children: Array<LifxChainChild>;
  }

  interface LifxChainChild {
    height: number;
    index: number;
    user_x: number;
    user_y: number;
    width: number;
  }

  interface LifxGroup {
    id: string;
    name: string;
  }

  interface LifxLocation {
    id: string;
    name: string;
  }

  interface LifxProduct {
    name: string;
    identifier: string;
    company: string;
    capabilities: LifxProductCapabilities;
  }

  interface LifxProductCapabilities {
    has_color: boolean;
    has_variable_color_temp: boolean;
    has_ir: boolean;
    has_chain: boolean;
    has_multizone: boolean;
    min_kelvin: boolean;
    max_kelvin: boolean;
  }

  interface LifxAccount {
    uuid: string;
  }

  interface LifxState {
    brightness?: number;
    color?: LifxColor;
    selector: string;
  }

  type LifxPower = "on" | "off";

  type LifxEffect = "OFF" | "MORPH" | "MOVE";

  type LifxReachabilityStatus = "ok" | "timed_out" | "offline";
}