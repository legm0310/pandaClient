import { metamaskWallet, coinbaseWallet } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const sdkOptions = {
  gasSettings: {
    speed: "fastest",
  },
  // gasless: {},
};
// const smartWalletConfig = {
//   factoryAddress: "",
//   gasless: true,
//   thirdwebApiKey: process.env.REACT_APP_THIRDWEB_API_KEY,
//   personalWallets: [metamaskWallet(), coinbaseWallet(), walletConnectV1()],
// };

const supportedWallets = [metamaskWallet(), coinbaseWallet()];

export { Sepolia, supportedWallets, sdkOptions };
