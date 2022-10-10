// package: pricedrop_query_proto
// file: pricedrops.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ChildProduct extends jspb.Message { 
    getDiscount(): number;
    setDiscount(value: number): ChildProduct;
    getDiscountType(): string;
    setDiscountType(value: string): ChildProduct;
    getMoq(): number;
    setMoq(value: number): ChildProduct;
    getMrp(): number;
    setMrp(value: number): ChildProduct;
    getPricePerUnit(): string;
    setPricePerUnit(value: string): ChildProduct;
    getPriceTlCommission(): number;
    setPriceTlCommission(value: number): ChildProduct;
    getPriceTlSingleBuy(): number;
    setPriceTlSingleBuy(value: number): ChildProduct;
    getSkuId(): string;
    setSkuId(value: string): ChildProduct;
    getCustomText(): string;
    setCustomText(value: string): ChildProduct;
    getCustomSymbol(): string;
    setCustomSymbol(value: string): ChildProduct;
    getCouponCode(): string;
    setCouponCode(value: string): ChildProduct;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChildProduct.AsObject;
    static toObject(includeInstance: boolean, msg: ChildProduct): ChildProduct.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChildProduct, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChildProduct;
    static deserializeBinaryFromReader(message: ChildProduct, reader: jspb.BinaryReader): ChildProduct;
}

export namespace ChildProduct {
    export type AsObject = {
        discount: number,
        discountType: string,
        moq: number,
        mrp: number,
        pricePerUnit: string,
        priceTlCommission: number,
        priceTlSingleBuy: number,
        skuId: string,
        customText: string,
        customSymbol: string,
        couponCode: string,
    }
}

export class ProdWithChildren extends jspb.Message { 
    getDiscount(): number;
    setDiscount(value: number): ProdWithChildren;
    getDiscountType(): string;
    setDiscountType(value: string): ProdWithChildren;
    getMoq(): number;
    setMoq(value: number): ProdWithChildren;
    getMrp(): number;
    setMrp(value: number): ProdWithChildren;
    getPricePerUnit(): string;
    setPricePerUnit(value: string): ProdWithChildren;
    getPriceTlCommission(): number;
    setPriceTlCommission(value: number): ProdWithChildren;
    getPriceTlSingleBuy(): number;
    setPriceTlSingleBuy(value: number): ProdWithChildren;
    getSkuId(): string;
    setSkuId(value: string): ProdWithChildren;
    getCustomText(): string;
    setCustomText(value: string): ProdWithChildren;
    getCustomSymbol(): string;
    setCustomSymbol(value: string): ProdWithChildren;
    getCouponCode(): string;
    setCouponCode(value: string): ProdWithChildren;
    getMinCartValue(): number;
    setMinCartValue(value: number): ProdWithChildren;
    clearChildrenList(): void;
    getChildrenList(): Array<ChildProduct>;
    setChildrenList(value: Array<ChildProduct>): ProdWithChildren;
    addChildren(value?: ChildProduct, index?: number): ChildProduct;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProdWithChildren.AsObject;
    static toObject(includeInstance: boolean, msg: ProdWithChildren): ProdWithChildren.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProdWithChildren, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProdWithChildren;
    static deserializeBinaryFromReader(message: ProdWithChildren, reader: jspb.BinaryReader): ProdWithChildren;
}

export namespace ProdWithChildren {
    export type AsObject = {
        discount: number,
        discountType: string,
        moq: number,
        mrp: number,
        pricePerUnit: string,
        priceTlCommission: number,
        priceTlSingleBuy: number,
        skuId: string,
        customText: string,
        customSymbol: string,
        couponCode: string,
        minCartValue: number,
        childrenList: Array<ChildProduct.AsObject>,
    }
}

export class ApplyPriceDropReq extends jspb.Message { 
    clearProductsinputList(): void;
    getProductsinputList(): Array<ProdWithChildren>;
    setProductsinputList(value: Array<ProdWithChildren>): ApplyPriceDropReq;
    addProductsinput(value?: ProdWithChildren, index?: number): ProdWithChildren;
    getCatalogueName(): string;
    setCatalogueName(value: string): ApplyPriceDropReq;
    clearUsertagsList(): void;
    getUsertagsList(): Array<string>;
    setUsertagsList(value: Array<string>): ApplyPriceDropReq;
    addUsertags(value: string, index?: number): string;

    hasTraceId(): boolean;
    clearTraceId(): void;
    getTraceId(): string | undefined;
    setTraceId(value: string): ApplyPriceDropReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ApplyPriceDropReq.AsObject;
    static toObject(includeInstance: boolean, msg: ApplyPriceDropReq): ApplyPriceDropReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ApplyPriceDropReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ApplyPriceDropReq;
    static deserializeBinaryFromReader(message: ApplyPriceDropReq, reader: jspb.BinaryReader): ApplyPriceDropReq;
}

export namespace ApplyPriceDropReq {
    export type AsObject = {
        productsinputList: Array<ProdWithChildren.AsObject>,
        catalogueName: string,
        usertagsList: Array<string>,
        traceId?: string,
    }
}

export class ApplyPriceDropResp extends jspb.Message { 
    clearProductsoutputList(): void;
    getProductsoutputList(): Array<ProdWithChildren>;
    setProductsoutputList(value: Array<ProdWithChildren>): ApplyPriceDropResp;
    addProductsoutput(value?: ProdWithChildren, index?: number): ProdWithChildren;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ApplyPriceDropResp.AsObject;
    static toObject(includeInstance: boolean, msg: ApplyPriceDropResp): ApplyPriceDropResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ApplyPriceDropResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ApplyPriceDropResp;
    static deserializeBinaryFromReader(message: ApplyPriceDropResp, reader: jspb.BinaryReader): ApplyPriceDropResp;
}

export namespace ApplyPriceDropResp {
    export type AsObject = {
        productsoutputList: Array<ProdWithChildren.AsObject>,
    }
}
