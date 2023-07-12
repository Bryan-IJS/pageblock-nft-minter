/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-contract/index.d.ts" />
/// <amd-module name="@scom/scom-nft-minter/interface/index.tsx" />
declare module "@scom/scom-nft-minter/interface/index.tsx" {
    import { BigNumber, IClientSideProvider } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
    }
    export interface ICommissionInfo {
        chainId: number;
        walletAddress: string;
        share: string;
    }
    export enum ProductType {
        Buy = "Buy",
        DonateToOwner = "DonateToOwner",
        DonateToEveryone = "DonateToEveryone"
    }
    export interface IProductInfo {
        productType: BigNumber;
        productId: BigNumber;
        uri: string;
        quantity: BigNumber;
        price: BigNumber;
        maxQuantity: BigNumber;
        maxPrice: BigNumber;
        token: ITokenObject;
        status: BigNumber;
    }
    export interface IChainSpecificProperties {
        productId: number;
        donateTo: string;
    }
    export interface IEmbedData {
        name?: string;
        title?: string;
        productType?: ProductType;
        logo?: string;
        logoUrl?: string;
        description?: string;
        link?: string;
        commissions?: ICommissionInfo[];
        chainSpecificProperties?: Record<number, IChainSpecificProperties>;
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: any[];
        showHeader?: boolean;
    }
    export interface IWalletPlugin {
        name: string;
        packageName?: string;
        provider?: IClientSideProvider;
    }
    export interface INetworkConfig {
        chainName?: string;
        chainId: number;
    }
}
/// <amd-module name="@scom/scom-nft-minter/utils/token.ts" />
declare module "@scom/scom-nft-minter/utils/token.ts" {
    import { BigNumber, IWallet, ISendTxEventsOptions } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export const getERC20Amount: (wallet: IWallet, tokenAddress: string, decimals: number) => Promise<BigNumber>;
    export const getTokenBalance: (token: ITokenObject) => Promise<BigNumber>;
    export const registerSendTxEvents: (sendTxEventHandlers: ISendTxEventsOptions) => void;
}
/// <amd-module name="@scom/scom-nft-minter/utils/approvalModel.ts" />
declare module "@scom/scom-nft-minter/utils/approvalModel.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export enum ApprovalStatus {
        TO_BE_APPROVED = 0,
        APPROVING = 1,
        NONE = 2
    }
    export const getERC20Allowance: (token: ITokenObject, spenderAddress: string) => Promise<BigNumber>;
    export const getERC20ApprovalModelAction: (spenderAddress: string, options: IERC20ApprovalEventOptions) => IERC20ApprovalAction;
    interface IERC20ApprovalEventOptions {
        sender: any;
        payAction: () => Promise<void>;
        onToBeApproved: (token: ITokenObject) => Promise<void>;
        onToBePaid: (token: ITokenObject) => Promise<void>;
        onApproving: (token: ITokenObject, receipt?: string, data?: any) => Promise<void>;
        onApproved: (token: ITokenObject, data?: any) => Promise<void>;
        onPaying: (receipt?: string, data?: any) => Promise<void>;
        onPaid: (data?: any) => Promise<void>;
        onApprovingError: (token: ITokenObject, err: Error) => Promise<void>;
        onPayingError: (err: Error) => Promise<void>;
    }
    export interface IERC20ApprovalOptions extends IERC20ApprovalEventOptions {
        spenderAddress: string;
    }
    export interface IERC20ApprovalAction {
        setSpenderAddress: (value: string) => void;
        doApproveAction: (token: ITokenObject, inputAmount: string, data?: any) => Promise<void>;
        doPayAction: (data?: any) => Promise<void>;
        checkAllowance: (token: ITokenObject, inputAmount: string) => Promise<void>;
    }
}
/// <amd-module name="@scom/scom-nft-minter/utils/index.ts" />
declare module "@scom/scom-nft-minter/utils/index.ts" {
    export const formatNumber: (value: any, decimals?: number) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export function isWalletAddress(address: string): boolean;
    export { getERC20Amount, getTokenBalance, registerSendTxEvents } from "@scom/scom-nft-minter/utils/token.ts";
    export { ApprovalStatus, getERC20Allowance, getERC20ApprovalModelAction, IERC20ApprovalOptions, IERC20ApprovalAction } from "@scom/scom-nft-minter/utils/approvalModel.ts";
}
/// <amd-module name="@scom/scom-nft-minter/store/index.ts" />
declare module "@scom/scom-nft-minter/store/index.ts" {
    export const enum EventId {
        ConnectWallet = "connectWallet",
        IsWalletConnected = "isWalletConnected",
        IsWalletDisconnected = "IsWalletDisconnected",
        chainChanged = "chainChanged"
    }
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect"
    }
    export const SupportedNetworks: {
        chainName: string;
        chainId: number;
    }[];
    export const getNetworkName: (chainId: number) => string;
    export interface IContractDetailInfo {
        address: string;
    }
    export type ContractType = 'ProductInfo' | 'Proxy';
    export interface IContractInfo {
        ProductNFT: IContractDetailInfo;
        ProductInfo: IContractDetailInfo;
        Proxy: IContractDetailInfo;
    }
    export type ContractInfoByChainType = {
        [key: number]: IContractInfo;
    };
    export const state: {
        contractInfoByChain: ContractInfoByChainType;
        ipfsGatewayUrl: string;
        embedderCommissionFee: string;
        rpcWalletId: string;
    };
    export const setDataFromSCConfig: (options: any) => void;
    export const setIPFSGatewayUrl: (url: string) => void;
    export const getIPFSGatewayUrl: () => string;
    export const getEmbedderCommissionFee: () => string;
    export const getContractAddress: (type: ContractType) => any;
    export function initRpcWallet(defaultChainId: number): string;
    export function getChainId(): number;
    export function getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
    export function getClientWallet(): import("@ijstech/eth-wallet").IClientWallet;
}
/// <amd-module name="@scom/scom-nft-minter/wallet/index.ts" />
declare module "@scom/scom-nft-minter/wallet/index.ts" {
    export function isWalletConnected(): boolean;
    export const getChainId: () => number;
}
/// <amd-module name="@scom/scom-nft-minter/token-selection/index.css.ts" />
declare module "@scom/scom-nft-minter/token-selection/index.css.ts" {
    export const scrollbarStyle: string;
    export const buttonStyle: string;
    export const tokenStyle: string;
    export const modalStyle: string;
}
/// <amd-module name="@scom/scom-nft-minter/token-selection/index.tsx" />
declare module "@scom/scom-nft-minter/token-selection/index.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { ITokenObject } from '@scom/scom-token-list';
    type selectTokenCallback = (token: ITokenObject) => void;
    interface TokenSelectionElement extends ControlElement {
        readonly?: boolean;
        onSelectToken?: selectTokenCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-nft-minter-token-selection']: TokenSelectionElement;
            }
        }
    }
    export class TokenSelection extends Module {
        private btnTokens;
        private mdTokenSelection;
        private gridTokenList;
        private $eventBus;
        private _token;
        private _readonly;
        onSelectToken: selectTokenCallback;
        private _chainId;
        constructor(parent?: Container, options?: any);
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        get chainId(): number;
        set chainId(value: number);
        get readonly(): boolean;
        set readonly(value: boolean);
        private onSetup;
        private registerEvent;
        private get tokenList();
        private sortToken;
        private renderTokenItems;
        private renderToken;
        private updateTokenButton;
        private selectToken;
        private showTokenModal;
        private closeTokenModal;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-nft-minter/index.css.ts" />
declare module "@scom/scom-nft-minter/index.css.ts" {
    export const imageStyle: string;
    export const markdownStyle: string;
    export const inputStyle: string;
    export const inputGroupStyle: string;
    export const tokenSelectionStyle: string;
}
/// <amd-module name="@scom/scom-nft-minter/alert/index.tsx" />
declare module "@scom/scom-nft-minter/alert/index.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-nft-minter-alert']: ControlElement;
            }
        }
    }
    export interface IAlertMessage {
        status: 'warning' | 'success' | 'error' | 'loading';
        title?: string;
        content?: string;
        onClose?: any;
    }
    export class Alert extends Module {
        private mdAlert;
        private pnlMain;
        private _message;
        get message(): IAlertMessage;
        set message(value: IAlertMessage);
        private get iconName();
        private get color();
        closeModal(): void;
        showModal(): void;
        private renderUI;
        private renderContent;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/ERC1155.json.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/ERC1155.json.ts" {
    const _default: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/ERC1155.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/ERC1155.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IBalanceOfParams {
        account: string;
        id: number | BigNumber;
    }
    export interface IBalanceOfBatchParams {
        accounts: string[];
        ids: (number | BigNumber)[];
    }
    export interface IIsApprovedForAllParams {
        account: string;
        operator: string;
    }
    export interface ISafeBatchTransferFromParams {
        from: string;
        to: string;
        ids: (number | BigNumber)[];
        amounts: (number | BigNumber)[];
        data: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        id: number | BigNumber;
        amount: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export class ERC1155 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(uri: string, options?: TransactionOptions): Promise<string>;
        parseApprovalForAllEvent(receipt: TransactionReceipt): ERC1155.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): ERC1155.ApprovalForAllEvent;
        parseTransferBatchEvent(receipt: TransactionReceipt): ERC1155.TransferBatchEvent[];
        decodeTransferBatchEvent(event: Event): ERC1155.TransferBatchEvent;
        parseTransferSingleEvent(receipt: TransactionReceipt): ERC1155.TransferSingleEvent[];
        decodeTransferSingleEvent(event: Event): ERC1155.TransferSingleEvent;
        parseURIEvent(receipt: TransactionReceipt): ERC1155.URIEvent[];
        decodeURIEvent(event: Event): ERC1155.URIEvent;
        balanceOf: {
            (params: IBalanceOfParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        balanceOfBatch: {
            (params: IBalanceOfBatchParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        safeBatchTransferFrom: {
            (params: ISafeBatchTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<string>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        uri: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module ERC1155 {
        interface ApprovalForAllEvent {
            account: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface TransferBatchEvent {
            operator: string;
            from: string;
            to: string;
            ids: BigNumber[];
            values: BigNumber[];
            _event: Event;
        }
        interface TransferSingleEvent {
            operator: string;
            from: string;
            to: string;
            id: BigNumber;
            value: BigNumber;
            _event: Event;
        }
        interface URIEvent {
            value: string;
            id: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.json.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.json.ts" {
    const _default_1: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IBalanceOfParams {
        account: string;
        id: number | BigNumber;
    }
    export interface IBalanceOfBatchParams {
        accounts: string[];
        ids: (number | BigNumber)[];
    }
    export interface IBurnParams {
        account: string;
        id: number | BigNumber;
        value: number | BigNumber;
    }
    export interface IBurnBatchParams {
        account: string;
        ids: (number | BigNumber)[];
        values: (number | BigNumber)[];
    }
    export interface IGetRoleMemberParams {
        role: string;
        index: number | BigNumber;
    }
    export interface IGrantRoleParams {
        role: string;
        account: string;
    }
    export interface IHasRoleParams {
        role: string;
        account: string;
    }
    export interface IIsApprovedForAllParams {
        account: string;
        operator: string;
    }
    export interface IMintParams {
        to: string;
        id: number | BigNumber;
        amount: number | BigNumber;
        data: string;
    }
    export interface IMintBatchParams {
        to: string;
        ids: (number | BigNumber)[];
        amounts: (number | BigNumber)[];
        data: string;
    }
    export interface IRenounceRoleParams {
        role: string;
        account: string;
    }
    export interface IRevokeRoleParams {
        role: string;
        account: string;
    }
    export interface ISafeBatchTransferFromParams {
        from: string;
        to: string;
        ids: (number | BigNumber)[];
        amounts: (number | BigNumber)[];
        data: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        id: number | BigNumber;
        amount: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export class ERC1155PresetMinterPauser extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(uri: string, options?: TransactionOptions): Promise<string>;
        parseApprovalForAllEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): ERC1155PresetMinterPauser.ApprovalForAllEvent;
        parsePausedEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.PausedEvent[];
        decodePausedEvent(event: Event): ERC1155PresetMinterPauser.PausedEvent;
        parseRoleAdminChangedEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.RoleAdminChangedEvent[];
        decodeRoleAdminChangedEvent(event: Event): ERC1155PresetMinterPauser.RoleAdminChangedEvent;
        parseRoleGrantedEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.RoleGrantedEvent[];
        decodeRoleGrantedEvent(event: Event): ERC1155PresetMinterPauser.RoleGrantedEvent;
        parseRoleRevokedEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.RoleRevokedEvent[];
        decodeRoleRevokedEvent(event: Event): ERC1155PresetMinterPauser.RoleRevokedEvent;
        parseTransferBatchEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.TransferBatchEvent[];
        decodeTransferBatchEvent(event: Event): ERC1155PresetMinterPauser.TransferBatchEvent;
        parseTransferSingleEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.TransferSingleEvent[];
        decodeTransferSingleEvent(event: Event): ERC1155PresetMinterPauser.TransferSingleEvent;
        parseURIEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.URIEvent[];
        decodeURIEvent(event: Event): ERC1155PresetMinterPauser.URIEvent;
        parseUnpausedEvent(receipt: TransactionReceipt): ERC1155PresetMinterPauser.UnpausedEvent[];
        decodeUnpausedEvent(event: Event): ERC1155PresetMinterPauser.UnpausedEvent;
        DEFAULT_ADMIN_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        MINTER_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        PAUSER_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        balanceOf: {
            (params: IBalanceOfParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        balanceOfBatch: {
            (params: IBalanceOfBatchParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        burn: {
            (params: IBurnParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IBurnParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IBurnParams, options?: TransactionOptions) => Promise<string>;
        };
        burnBatch: {
            (params: IBurnBatchParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IBurnBatchParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IBurnBatchParams, options?: TransactionOptions) => Promise<string>;
        };
        getRoleAdmin: {
            (role: string, options?: TransactionOptions): Promise<string>;
        };
        getRoleMember: {
            (params: IGetRoleMemberParams, options?: TransactionOptions): Promise<string>;
        };
        getRoleMemberCount: {
            (role: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        grantRole: {
            (params: IGrantRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IGrantRoleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IGrantRoleParams, options?: TransactionOptions) => Promise<string>;
        };
        hasRole: {
            (params: IHasRoleParams, options?: TransactionOptions): Promise<boolean>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        mint: {
            (params: IMintParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMintParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IMintParams, options?: TransactionOptions) => Promise<string>;
        };
        mintBatch: {
            (params: IMintBatchParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMintBatchParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IMintBatchParams, options?: TransactionOptions) => Promise<string>;
        };
        pause: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        paused: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        renounceRole: {
            (params: IRenounceRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRenounceRoleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRenounceRoleParams, options?: TransactionOptions) => Promise<string>;
        };
        revokeRole: {
            (params: IRevokeRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRevokeRoleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRevokeRoleParams, options?: TransactionOptions) => Promise<string>;
        };
        safeBatchTransferFrom: {
            (params: ISafeBatchTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<string>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        unpause: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        uri: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module ERC1155PresetMinterPauser {
        interface ApprovalForAllEvent {
            account: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface PausedEvent {
            account: string;
            _event: Event;
        }
        interface RoleAdminChangedEvent {
            role: string;
            previousAdminRole: string;
            newAdminRole: string;
            _event: Event;
        }
        interface RoleGrantedEvent {
            role: string;
            account: string;
            sender: string;
            _event: Event;
        }
        interface RoleRevokedEvent {
            role: string;
            account: string;
            sender: string;
            _event: Event;
        }
        interface TransferBatchEvent {
            operator: string;
            from: string;
            to: string;
            ids: BigNumber[];
            values: BigNumber[];
            _event: Event;
        }
        interface TransferSingleEvent {
            operator: string;
            from: string;
            to: string;
            id: BigNumber;
            value: BigNumber;
            _event: Event;
        }
        interface URIEvent {
            value: string;
            id: BigNumber;
            _event: Event;
        }
        interface UnpausedEvent {
            account: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ERC20.json.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ERC20.json.ts" {
    const _default_2: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ERC20.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ERC20.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAllowanceParams {
        param1: string;
        param2: string;
    }
    export interface IApproveParams {
        spender: string;
        amount: number | BigNumber;
    }
    export interface ITransferParams {
        recipient: string;
        amount: number | BigNumber;
    }
    export interface ITransferFromParams {
        sender: string;
        recipient: string;
        amount: number | BigNumber;
    }
    export class ERC20 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): ERC20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): ERC20.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): ERC20.TransferEvent[];
        decodeTransferEvent(event: Event): ERC20.TransferEvent;
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IApproveParams, options?: TransactionOptions) => Promise<string>;
        };
        balanceOf: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        burn: {
            (amount: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (amount: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (amount: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        mint: {
            (amount: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (amount: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (amount: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferParams, options?: TransactionOptions) => Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module ERC20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/Product1155.json.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/Product1155.json.ts" {
    const _default_3: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_3;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/Product1155.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/Product1155.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IBalanceOfParams {
        account: string;
        id: number | BigNumber;
    }
    export interface IBalanceOfBatchParams {
        accounts: string[];
        ids: (number | BigNumber)[];
    }
    export interface IBurnParams {
        account: string;
        id: number | BigNumber;
        value: number | BigNumber;
    }
    export interface IBurnBatchParams {
        account: string;
        ids: (number | BigNumber)[];
        values: (number | BigNumber)[];
    }
    export interface IGetRoleMemberParams {
        role: string;
        index: number | BigNumber;
    }
    export interface IGrantRoleParams {
        role: string;
        account: string;
    }
    export interface IHasRoleParams {
        role: string;
        account: string;
    }
    export interface IIsApprovedForAllParams {
        account: string;
        operator: string;
    }
    export interface IMintParams {
        to: string;
        id: number | BigNumber;
        amount: number | BigNumber;
        data: string;
    }
    export interface IMintBatchParams {
        to: string;
        ids: (number | BigNumber)[];
        amounts: (number | BigNumber)[];
        data: string;
    }
    export interface IRenounceRoleParams {
        role: string;
        account: string;
    }
    export interface IRevokeRoleParams {
        role: string;
        account: string;
    }
    export interface ISafeBatchTransferFromParams {
        from: string;
        to: string;
        ids: (number | BigNumber)[];
        amounts: (number | BigNumber)[];
        data: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        id: number | BigNumber;
        amount: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export interface ISetURIParams {
        id: number | BigNumber;
        uri: string;
    }
    export class Product1155 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(templateURI: string, options?: TransactionOptions): Promise<string>;
        parseApprovalForAllEvent(receipt: TransactionReceipt): Product1155.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): Product1155.ApprovalForAllEvent;
        parsePausedEvent(receipt: TransactionReceipt): Product1155.PausedEvent[];
        decodePausedEvent(event: Event): Product1155.PausedEvent;
        parseRoleAdminChangedEvent(receipt: TransactionReceipt): Product1155.RoleAdminChangedEvent[];
        decodeRoleAdminChangedEvent(event: Event): Product1155.RoleAdminChangedEvent;
        parseRoleGrantedEvent(receipt: TransactionReceipt): Product1155.RoleGrantedEvent[];
        decodeRoleGrantedEvent(event: Event): Product1155.RoleGrantedEvent;
        parseRoleRevokedEvent(receipt: TransactionReceipt): Product1155.RoleRevokedEvent[];
        decodeRoleRevokedEvent(event: Event): Product1155.RoleRevokedEvent;
        parseTransferBatchEvent(receipt: TransactionReceipt): Product1155.TransferBatchEvent[];
        decodeTransferBatchEvent(event: Event): Product1155.TransferBatchEvent;
        parseTransferSingleEvent(receipt: TransactionReceipt): Product1155.TransferSingleEvent[];
        decodeTransferSingleEvent(event: Event): Product1155.TransferSingleEvent;
        parseURIEvent(receipt: TransactionReceipt): Product1155.URIEvent[];
        decodeURIEvent(event: Event): Product1155.URIEvent;
        parseUnpausedEvent(receipt: TransactionReceipt): Product1155.UnpausedEvent[];
        decodeUnpausedEvent(event: Event): Product1155.UnpausedEvent;
        DEFAULT_ADMIN_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        MINTER_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        PAUSER_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        balanceOf: {
            (params: IBalanceOfParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        balanceOfBatch: {
            (params: IBalanceOfBatchParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        burn: {
            (params: IBurnParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IBurnParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IBurnParams, options?: TransactionOptions) => Promise<string>;
        };
        burnBatch: {
            (params: IBurnBatchParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IBurnBatchParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IBurnBatchParams, options?: TransactionOptions) => Promise<string>;
        };
        getRoleAdmin: {
            (role: string, options?: TransactionOptions): Promise<string>;
        };
        getRoleMember: {
            (params: IGetRoleMemberParams, options?: TransactionOptions): Promise<string>;
        };
        getRoleMemberCount: {
            (role: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        grantRole: {
            (params: IGrantRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IGrantRoleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IGrantRoleParams, options?: TransactionOptions) => Promise<string>;
        };
        hasRole: {
            (params: IHasRoleParams, options?: TransactionOptions): Promise<boolean>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        mint: {
            (params: IMintParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMintParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IMintParams, options?: TransactionOptions) => Promise<string>;
        };
        mintBatch: {
            (params: IMintBatchParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMintBatchParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IMintBatchParams, options?: TransactionOptions) => Promise<string>;
        };
        pause: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        paused: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        renounceRole: {
            (params: IRenounceRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRenounceRoleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRenounceRoleParams, options?: TransactionOptions) => Promise<string>;
        };
        revokeRole: {
            (params: IRevokeRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRevokeRoleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRevokeRoleParams, options?: TransactionOptions) => Promise<string>;
        };
        safeBatchTransferFrom: {
            (params: ISafeBatchTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<string>;
        };
        setTemplateURI: {
            (uri: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (uri: string, options?: TransactionOptions) => Promise<void>;
            txData: (uri: string, options?: TransactionOptions) => Promise<string>;
        };
        setURI: {
            (params: ISetURIParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetURIParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetURIParams, options?: TransactionOptions) => Promise<string>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        templateURI: {
            (options?: TransactionOptions): Promise<string>;
        };
        unpause: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        uri: {
            (id: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module Product1155 {
        interface ApprovalForAllEvent {
            account: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface PausedEvent {
            account: string;
            _event: Event;
        }
        interface RoleAdminChangedEvent {
            role: string;
            previousAdminRole: string;
            newAdminRole: string;
            _event: Event;
        }
        interface RoleGrantedEvent {
            role: string;
            account: string;
            sender: string;
            _event: Event;
        }
        interface RoleRevokedEvent {
            role: string;
            account: string;
            sender: string;
            _event: Event;
        }
        interface TransferBatchEvent {
            operator: string;
            from: string;
            to: string;
            ids: BigNumber[];
            values: BigNumber[];
            _event: Event;
        }
        interface TransferSingleEvent {
            operator: string;
            from: string;
            to: string;
            id: BigNumber;
            value: BigNumber;
            _event: Event;
        }
        interface URIEvent {
            value: string;
            id: BigNumber;
            _event: Event;
        }
        interface UnpausedEvent {
            account: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ProductInfo.json.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ProductInfo.json.ts" {
    const _default_4: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_4;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ProductInfo.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ProductInfo.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IBuyParams {
        to: string;
        productId: number | BigNumber;
        quantity: number | BigNumber;
        amountIn: number | BigNumber;
    }
    export interface IBuyEthParams {
        to: string;
        productId: number | BigNumber;
        quantity: number | BigNumber;
    }
    export interface IDecrementInventoryParams {
        productId: number | BigNumber;
        decrement: number | BigNumber;
    }
    export interface IDonateParams {
        donor: string;
        donee: string;
        productId: number | BigNumber;
        amountIn: number | BigNumber;
    }
    export interface IDonateEthParams {
        donor: string;
        donee: string;
        productId: number | BigNumber;
    }
    export interface IIncrementInventoryParams {
        productId: number | BigNumber;
        increment: number | BigNumber;
    }
    export interface INewProductParams {
        productType: number | BigNumber;
        uri: string;
        quantity: number | BigNumber;
        price: number | BigNumber;
        maxQuantity: number | BigNumber;
        maxPrice: number | BigNumber;
        token: string;
    }
    export interface IOwnersProductsParams {
        param1: string;
        param2: number | BigNumber;
    }
    export interface IUpdateProductPriceParams {
        productId: number | BigNumber;
        price: number | BigNumber;
    }
    export interface IUpdateProductUriParams {
        productId: number | BigNumber;
        uri: string;
    }
    export class ProductInfo extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(nft: string, options?: TransactionOptions): Promise<string>;
        parseBuyEvent(receipt: TransactionReceipt): ProductInfo.BuyEvent[];
        decodeBuyEvent(event: Event): ProductInfo.BuyEvent;
        parseDecrementInventoryEvent(receipt: TransactionReceipt): ProductInfo.DecrementInventoryEvent[];
        decodeDecrementInventoryEvent(event: Event): ProductInfo.DecrementInventoryEvent;
        parseDonateEvent(receipt: TransactionReceipt): ProductInfo.DonateEvent[];
        decodeDonateEvent(event: Event): ProductInfo.DonateEvent;
        parseIncrementInventoryEvent(receipt: TransactionReceipt): ProductInfo.IncrementInventoryEvent[];
        decodeIncrementInventoryEvent(event: Event): ProductInfo.IncrementInventoryEvent;
        parseNewProductEvent(receipt: TransactionReceipt): ProductInfo.NewProductEvent[];
        decodeNewProductEvent(event: Event): ProductInfo.NewProductEvent;
        parseUpdateProductPriceEvent(receipt: TransactionReceipt): ProductInfo.UpdateProductPriceEvent[];
        decodeUpdateProductPriceEvent(event: Event): ProductInfo.UpdateProductPriceEvent;
        parseUpdateProductStatusEvent(receipt: TransactionReceipt): ProductInfo.UpdateProductStatusEvent[];
        decodeUpdateProductStatusEvent(event: Event): ProductInfo.UpdateProductStatusEvent;
        parseUpdateProductUriEvent(receipt: TransactionReceipt): ProductInfo.UpdateProductUriEvent[];
        decodeUpdateProductUriEvent(event: Event): ProductInfo.UpdateProductUriEvent;
        activateProduct: {
            (productId: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (productId: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (productId: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        buy: {
            (params: IBuyParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IBuyParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IBuyParams, options?: TransactionOptions) => Promise<string>;
        };
        buyEth: {
            (params: IBuyEthParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IBuyEthParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IBuyEthParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        deactivateProduct: {
            (productId: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (productId: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (productId: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        decrementInventory: {
            (params: IDecrementInventoryParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDecrementInventoryParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IDecrementInventoryParams, options?: TransactionOptions) => Promise<string>;
        };
        donate: {
            (params: IDonateParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDonateParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IDonateParams, options?: TransactionOptions) => Promise<string>;
        };
        donateEth: {
            (params: IDonateEthParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDonateEthParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IDonateEthParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        incrementInventory: {
            (params: IIncrementInventoryParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IIncrementInventoryParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IIncrementInventoryParams, options?: TransactionOptions) => Promise<string>;
        };
        newProduct: {
            (params: INewProductParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: INewProductParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: INewProductParams, options?: TransactionOptions) => Promise<string>;
        };
        nft: {
            (options?: TransactionOptions): Promise<string>;
        };
        ownersProducts: {
            (params: IOwnersProductsParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        ownersProductsLength: {
            (owner: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        productCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        productOwner: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        products: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<{
                productType: BigNumber;
                productId: BigNumber;
                uri: string;
                quantity: BigNumber;
                price: BigNumber;
                maxQuantity: BigNumber;
                maxPrice: BigNumber;
                token: string;
                status: BigNumber;
            }>;
        };
        updateProductPrice: {
            (params: IUpdateProductPriceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IUpdateProductPriceParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IUpdateProductPriceParams, options?: TransactionOptions) => Promise<string>;
        };
        updateProductUri: {
            (params: IUpdateProductUriParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IUpdateProductUriParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IUpdateProductUriParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module ProductInfo {
        interface BuyEvent {
            sender: string;
            recipient: string;
            productId: BigNumber;
            quantity: BigNumber;
            amountIn: BigNumber;
            _event: Event;
        }
        interface DecrementInventoryEvent {
            sender: string;
            productId: BigNumber;
            decrement: BigNumber;
            _event: Event;
        }
        interface DonateEvent {
            donor: string;
            donee: string;
            productId: BigNumber;
            amountIn: BigNumber;
            _event: Event;
        }
        interface IncrementInventoryEvent {
            sender: string;
            productId: BigNumber;
            increment: BigNumber;
            _event: Event;
        }
        interface NewProductEvent {
            productId: BigNumber;
            owner: string;
            _event: Event;
        }
        interface UpdateProductPriceEvent {
            sender: string;
            productId: BigNumber;
            price: BigNumber;
            _event: Event;
        }
        interface UpdateProductStatusEvent {
            sender: string;
            productId: BigNumber;
            status: BigNumber;
            _event: Event;
        }
        interface UpdateProductUriEvent {
            sender: string;
            productId: BigNumber;
            uri: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/contracts/index.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/index.ts" {
    export { ERC1155 } from "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/ERC1155.ts";
    export { ERC1155PresetMinterPauser } from "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.ts";
    export { ERC20 } from "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ERC20.ts";
    export { Product1155 } from "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/Product1155.ts";
    export { ProductInfo } from "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/ProductInfo.ts";
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-product-contract/index.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-product-contract/index.ts" {
    import * as Contracts from "@scom/scom-nft-minter/contracts/scom-product-contract/contracts/index.ts";
    export { Contracts };
    import { IWallet, BigNumber } from '@ijstech/eth-wallet';
    export interface IDeployOptions {
        deployERC20?: boolean;
        initSupply?: BigNumber.Value;
        templateURI?: string;
    }
    export interface IDeployResult {
        erc20?: string;
        product1155: string;
        productInfo: string;
    }
    export var DefaultDeployOptions: IDeployOptions;
    export function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>;
    export function onProgress(handler: any): void;
    const _default_5: {
        Contracts: typeof Contracts;
        deploy: typeof deploy;
        DefaultDeployOptions: IDeployOptions;
        onProgress: typeof onProgress;
    };
    export default _default_5;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/Proxy.json.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/Proxy.json.ts" {
    const _default_6: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            })[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_6;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/Proxy.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/Proxy.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IClaimantIdsParams {
        param1: string;
        param2: string;
    }
    export interface IEthInParams {
        target: string;
        commissions: {
            to: string;
            amount: number | BigNumber;
        }[];
        data: string;
    }
    export interface IGetClaimantBalanceParams {
        claimant: string;
        token: string;
    }
    export interface IGetClaimantsInfoParams {
        fromId: number | BigNumber;
        count: number | BigNumber;
    }
    export interface IProxyCallParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
        }[];
        to: string;
        tokensOut: string[];
        data: string;
    }
    export interface ITokenInParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
        };
        data: string;
    }
    export class Proxy extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAddCommissionEvent(receipt: TransactionReceipt): Proxy.AddCommissionEvent[];
        decodeAddCommissionEvent(event: Event): Proxy.AddCommissionEvent;
        parseClaimEvent(receipt: TransactionReceipt): Proxy.ClaimEvent[];
        decodeClaimEvent(event: Event): Proxy.ClaimEvent;
        parseSkimEvent(receipt: TransactionReceipt): Proxy.SkimEvent[];
        decodeSkimEvent(event: Event): Proxy.SkimEvent;
        parseTransferBackEvent(receipt: TransactionReceipt): Proxy.TransferBackEvent[];
        decodeTransferBackEvent(event: Event): Proxy.TransferBackEvent;
        parseTransferForwardEvent(receipt: TransactionReceipt): Proxy.TransferForwardEvent[];
        decodeTransferForwardEvent(event: Event): Proxy.TransferForwardEvent;
        claim: {
            (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (token: string, options?: TransactionOptions) => Promise<void>;
            txData: (token: string, options?: TransactionOptions) => Promise<string>;
        };
        claimMultiple: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        claimantIdCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantIds: {
            (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantsInfo: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }>;
        };
        ethIn: {
            (params: IEthInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        getClaimantBalance: {
            (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getClaimantsInfo: {
            (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }[]>;
        };
        lastBalance: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        proxyCall: {
            (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        skim: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        tokenIn: {
            (params: ITokenInParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITokenInParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ITokenInParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module Proxy {
        interface AddCommissionEvent {
            to: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface ClaimEvent {
            from: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface SkimEvent {
            token: string;
            to: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferBackEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferForwardEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            commissions: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/ProxyV2.json.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/ProxyV2.json.ts" {
    const _default_7: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            })[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_7;
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IClaimantIdsParams {
        param1: string;
        param2: string;
    }
    export interface IEthInParams {
        target: string;
        commissions: {
            to: string;
            amount: number | BigNumber;
        }[];
        data: string;
    }
    export interface IGetClaimantBalanceParams {
        claimant: string;
        token: string;
    }
    export interface IGetClaimantsInfoParams {
        fromId: number | BigNumber;
        count: number | BigNumber;
    }
    export interface IProxyCallParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
            totalCommissions: number | BigNumber;
        }[];
        to: string;
        tokensOut: string[];
        data: string;
    }
    export interface ITokenInParams {
        target: string;
        tokensIn: {
            token: string;
            amount: number | BigNumber;
            directTransfer: boolean;
            commissions: {
                to: string;
                amount: number | BigNumber;
            }[];
            totalCommissions: number | BigNumber;
        };
        data: string;
    }
    export class ProxyV2 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAddCommissionEvent(receipt: TransactionReceipt): ProxyV2.AddCommissionEvent[];
        decodeAddCommissionEvent(event: Event): ProxyV2.AddCommissionEvent;
        parseClaimEvent(receipt: TransactionReceipt): ProxyV2.ClaimEvent[];
        decodeClaimEvent(event: Event): ProxyV2.ClaimEvent;
        parseSkimEvent(receipt: TransactionReceipt): ProxyV2.SkimEvent[];
        decodeSkimEvent(event: Event): ProxyV2.SkimEvent;
        parseTransferBackEvent(receipt: TransactionReceipt): ProxyV2.TransferBackEvent[];
        decodeTransferBackEvent(event: Event): ProxyV2.TransferBackEvent;
        parseTransferForwardEvent(receipt: TransactionReceipt): ProxyV2.TransferForwardEvent[];
        decodeTransferForwardEvent(event: Event): ProxyV2.TransferForwardEvent;
        claim: {
            (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (token: string, options?: TransactionOptions) => Promise<void>;
            txData: (token: string, options?: TransactionOptions) => Promise<string>;
        };
        claimMultiple: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        claimantIdCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantIds: {
            (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        claimantsInfo: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }>;
        };
        ethIn: {
            (params: IEthInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        getClaimantBalance: {
            (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getClaimantsInfo: {
            (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{
                claimant: string;
                token: string;
                balance: BigNumber;
            }[]>;
        };
        lastBalance: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        proxyCall: {
            (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        skim: {
            (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
            txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
        };
        tokenIn: {
            (params: ITokenInParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITokenInParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ITokenInParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module ProxyV2 {
        interface AddCommissionEvent {
            to: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface ClaimEvent {
            from: string;
            token: string;
            amount: BigNumber;
            _event: Event;
        }
        interface SkimEvent {
            token: string;
            to: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferBackEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            _event: Event;
        }
        interface TransferForwardEvent {
            target: string;
            token: string;
            sender: string;
            amount: BigNumber;
            commissions: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/index.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/index.ts" {
    export { Proxy } from "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/Proxy.ts";
    export { ProxyV2 } from "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/ProxyV2.ts";
}
/// <amd-module name="@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/index.ts" />
declare module "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/index.ts" {
    import * as Contracts from "@scom/scom-nft-minter/contracts/scom-commission-proxy-contract/contracts/index.ts";
    export { Contracts };
    import { IWallet } from '@ijstech/eth-wallet';
    export interface IDeployOptions {
        version?: string;
    }
    export interface IDeployResult {
        proxy: string;
    }
    export var DefaultDeployOptions: IDeployOptions;
    export function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>;
    export function onProgress(handler: any): void;
    const _default_8: {
        Contracts: typeof Contracts;
        deploy: typeof deploy;
        DefaultDeployOptions: IDeployOptions;
        onProgress: typeof onProgress;
    };
    export default _default_8;
}
/// <amd-module name="@scom/scom-nft-minter/API.ts" />
declare module "@scom/scom-nft-minter/API.ts" {
    import { BigNumber } from '@ijstech/eth-wallet';
    import { ProductType, ICommissionInfo } from "@scom/scom-nft-minter/interface/index.tsx";
    import { ITokenObject } from '@scom/scom-token-list';
    function getProductInfo(productId: number): Promise<{
        token: any;
        productType: BigNumber;
        productId: BigNumber;
        uri: string;
        quantity: BigNumber;
        price: BigNumber;
        maxQuantity: BigNumber;
        maxPrice: BigNumber;
        status: BigNumber;
    }>;
    function getNFTBalance(productId: number): Promise<BigNumber>;
    function newProduct(productType: ProductType, qty: number, maxQty: number, price: string, maxPrice: string, token?: ITokenObject, callback?: any, confirmationCallback?: any): Promise<{
        receipt: import("@ijstech/eth-contract").TransactionReceipt;
        productId: any;
    }>;
    function getProxyTokenAmountIn(productPrice: string, quantity: number, commissions: ICommissionInfo[]): string;
    function buyProduct(productId: number, quantity: number, commissions: ICommissionInfo[], token: ITokenObject, callback?: any, confirmationCallback?: any): Promise<any>;
    function donate(productId: number, donateTo: string, amountIn: string, commissions: ICommissionInfo[], token: ITokenObject, callback?: any, confirmationCallback?: any): Promise<any>;
    export { getProductInfo, getNFTBalance, newProduct, getProxyTokenAmountIn, buyProduct, donate };
}
/// <amd-module name="@scom/scom-nft-minter/data.json.ts" />
declare module "@scom/scom-nft-minter/data.json.ts" {
    const _default_9: {
        ipfsGatewayUrl: string;
        contractInfo: {
            "43113": {
                ProductNFT: {
                    address: string;
                };
                ProductInfo: {
                    address: string;
                };
                Proxy: {
                    address: string;
                };
            };
            "97": {
                ProductNFT: {
                    address: string;
                };
                ProductInfo: {
                    address: string;
                };
                Proxy: {
                    address: string;
                };
            };
        };
        embedderCommissionFee: string;
        defaultBuilderData: {
            defaultChainId: number;
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
        };
    };
    export default _default_9;
}
/// <amd-module name="@scom/scom-nft-minter" />
declare module "@scom/scom-nft-minter" {
    import { Module, Container, VStack, IDataSchema, ControlElement } from '@ijstech/components';
    import { IChainSpecificProperties, IEmbedData, INetworkConfig, IWalletPlugin, ProductType } from "@scom/scom-nft-minter/interface/index.tsx";
    import ScomCommissionFeeSetup from '@scom/scom-commission-fee-setup';
    interface ScomNftMinterElement extends ControlElement {
        lazyLoad?: boolean;
        name?: string;
        title?: string;
        productType?: string;
        description?: string;
        logo?: string;
        logoUrl?: string;
        link?: string;
        chainSpecificProperties?: Record<number, IChainSpecificProperties>;
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        showHeader?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-nft-minter"]: ScomNftMinterElement;
            }
        }
    }
    export default class ScomNftMinter extends Module {
        private gridDApp;
        private imgLogo;
        private markdownViewer;
        private pnlLink;
        private lblLink;
        private lblTitle;
        private pnlSpotsRemaining;
        private lblSpotsRemaining;
        private pnlBlockchain;
        private lblBlockchain;
        private pnlQty;
        private edtQty;
        private lblBalance;
        private btnSubmit;
        private btnApprove;
        private lblRef;
        private lblAddress;
        private gridTokenInput;
        private tokenSelection;
        private edtAmount;
        private mdAlert;
        private lbOrderTotal;
        private lbOrderTotalTitle;
        private iconOrderTotal;
        private pnlInputFields;
        private pnlUnsupportedNetwork;
        private containerDapp;
        private productInfo;
        private _type;
        private _data;
        private $eventBus;
        private approvalModelAction;
        private isApproving;
        private tokenAmountIn;
        tag: any;
        defaultEdit: boolean;
        private contractAddress;
        readonly onConfirm: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        constructor(parent?: Container, options?: any);
        init(): Promise<void>;
        static create(options?: ScomNftMinterElement, parent?: Container): Promise<ScomNftMinter>;
        get donateTo(): string;
        get link(): string;
        set link(value: string);
        get productId(): number;
        get productType(): ProductType;
        set productType(value: ProductType);
        get name(): string;
        set name(value: string);
        get description(): string;
        set description(value: string);
        get logo(): string;
        set logo(value: string);
        get logoUrl(): string;
        set logoUrl(value: string);
        get commissions(): any;
        set commissions(value: any);
        get chainSpecificProperties(): any;
        set chainSpecificProperties(value: any);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        get defaultChainId(): number;
        set defaultChainId(value: number);
        private registerEvent;
        private onChainChanged;
        private updateTokenBalance;
        private onSetupPage;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => Promise<void>;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                customUI?: undefined;
            })[];
            getData: any;
            setData: (data: IEmbedData) => Promise<void>;
            getTag: any;
            setTag: any;
            elementName?: undefined;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
            bindOnChanged?: undefined;
        } | {
            name: string;
            target: string;
            elementName: string;
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            bindOnChanged: (element: ScomCommissionFeeSetup, callback: (data: any) => Promise<void>) => void;
            getData: () => {
                fee: string;
                name?: string;
                title?: string;
                productType?: ProductType;
                logo?: string;
                logoUrl?: string;
                description?: string;
                link?: string;
                commissions?: import("@scom/scom-nft-minter/interface/index.tsx").ICommissionInfo[];
                chainSpecificProperties?: Record<number, IChainSpecificProperties>;
                defaultChainId: number;
                wallets: IWalletPlugin[];
                networks: any[];
                showHeader?: boolean;
            };
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        private getData;
        private setData;
        private getTag;
        private updateTag;
        private setTag;
        private updateStyle;
        private updateTheme;
        private updateDAppUI;
        private refreshDApp;
        private updateSpotsRemaining;
        private initApprovalAction;
        private updateContractAddress;
        private selectToken;
        private updateSubmitButton;
        private onApprove;
        private onQtyChanged;
        private onAmountChanged;
        private doSubmitAction;
        private onSubmit;
        private buyToken;
        render(): any;
    }
}
