export interface ISalesChannel {
  id: string;
  name: string;
  subgroup: {
    group: number;
    id: string;
    isFromParentSource: boolean;
    name: string;
    salesChannels: any;
  };
  isActive: boolean;
  isFromParentSource: boolean;
  provider: {
    providerId: string;
    name: string;
    contactFirstName: string;
    contactLastName: string;
  };
  group: {
    flagValue: number;
    flagName: string;
  };
}

export interface ISalesChannelRequest {
  id: string;
  name: string;
  group: number;
  isActive: boolean;
  isFromParentSource: boolean;
  providerId: string;
  subgroupId: string;
}

export interface ISalesChannelGroup {
  flagValue: number;
  flagName: string;
}

export interface ISalesChannelProvider {
  providerId: string;
  name: string;
  contactFirstName: string;
  contactLastName: string;
}

export interface ISalesChannelSubGroup extends Pick<ISalesChannel, 'id' | 'name' | 'isFromParentSource'> {}
