
export interface MarketData {
  solPrice: number;
  fearAndGreed: number;
  tps: number;
  totalTx: number;
}

export interface ActivityEvent {
  id: string;
  address: string;
  action: string;
  timestamp: Date;
}

export enum WhitelistStep {
  WALLET = 1,
  SOCIALS = 2,
  ELIGIBILITY = 3,
  FINAL = 4,
}

export interface WhitelistState {
  walletConnected: boolean;
  walletAddress: string | null;
  twitterVerified: boolean;
  discordVerified: boolean;
  scanComplete: boolean;
  eligible: boolean;
  applicationSubmitted: boolean;
}
