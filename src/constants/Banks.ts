export type BankData = {
  logo: string;
  name: string;
  countries: string[];
};

export type BanksData = {
  [key: string]: BankData;
};

export const Banks: BanksData = {
  THV000: {
    logo: "/BNK00000.png",
    name: "Thieves Unite Bank",
    countries: ["IT"],
  },
  COWXXX: {
    logo: "/BNK0001.png",
    name: "Cowolanum Bank",
    countries: ["IT", "UK", "US"],
  },
  FIN999: {
    logo: "/BNK0002.png",
    name: "Fin Nine Nine Nine Bank",
    countries: ["IT", "DK"],
  },
};

export const AllowedBanks = Object.keys(Banks);
