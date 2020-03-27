declare module "lifx" {

  export = Lifx;

  class Lifx {
    init(config: LifxLibInit): void;
    get:   LifxLibGet;
    power: LifxLibPower;
    color: LifxLibColor;
    scene: LifxLibScene;
  }

  interface LifxLibInit {
    appToken: string;
  }

  interface LifxLibGet {
    lights(): Promise<Array<LifxLight>>;
    scenes(): Promise<Array<LifxScene>>;
  }

  interface LifxLibPower {
    all(power: LifxPower): LifxLibPowerResult;
    light(id: string, power: LifxPower): LifxLibPowerResult;
    group(id: string, power: LifxPower): LifxLibPowerResult;
    location(id: string, power: LifxPower): LifxLibPowerResult;
  }

  interface LifxLibPowerResult extends Promise<LifxSetStateResponse> {}

  interface LifxLibColor {
    all(config: LifxLibColorConfig): LifxLibColorResult;
    light(id: string, config: LifxLibColorConfig): LifxLibColorResult;
    group(id: string, config: LifxLibColorConfig): LifxLibColorResult;
    location(id: string, config: LifxLibColorConfig): LifxLibColorResult;
  }

  interface LifxLibColorConfig {
    hex?: string;
    rgb?: string;
    hue?: number;
    saturation?: number;
    brightness?: number;
    kelvin?: number;
  }

  interface LifxLibColorResult extends Promise<LifxSetStateResponse> {}

  interface LifxLibScene {
    activate(uuid: string): LifxLibSceneResult;
  }

  interface LifxLibSceneResult extends Promise<LifxSetStateResponse> {}

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