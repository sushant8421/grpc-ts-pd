import { grpcClient, priceDropProducer } from './client';
import * as grpc from '@grpc/grpc-js';
import { getPriceDropInput, IProductsInput } from './getPriceDropInput';
import { ApplyPriceDropResp, ApplyPriceDropReq, ProdWithChildren, ChildProduct } from './proto/pricedrops_pb';

const meta = new grpc.Metadata();
meta.add('x-catalogue-key', '9f795f1f-96e6-420e-be84-98ee63076c4c');

const req = new ApplyPriceDropReq();

req.setUsertagsList(['DIGITALLY_ACQUIRED']);
req.setTraceId('test');
req.setCatalogueName('DELHI_NCR');

const applyPriceDrops = async (offset: number, limit: number): Promise<any> => {
    const productsInput = await getPriceDropInput(offset, limit);
    console.log('offset', offset, 'limit', limit, 'length', productsInput.length, 'productsInput', productsInput);
    for (const product of productsInput) {
        const prodWithChildren = new ProdWithChildren();
        const child = new ChildProduct();
        for (const childProduct of Object.keys(product.children)) {
            child.setDiscount(product.children[childProduct].discount);
            child.setDiscountType(product.children[childProduct].discount_type);
            child.setMoq(product.children[childProduct].moq);
            child.setMrp(product.children[childProduct].mrp);
            child.setPricePerUnit(product.children[childProduct].price_per_unit);
            child.setPriceTlCommission(product.children[childProduct].price_tl_commission);
            child.setPriceTlSingleBuy(product.children[childProduct].price_tl_single_buy);
            child.setSkuId(product.children[childProduct].sku_id);
            child.setCustomText(product.children[childProduct].custom_text);
            child.setCustomSymbol(product.children[childProduct].custom_symbol);
            child.setCouponCode(product.children[childProduct].coupon_code);
            prodWithChildren.addChildren(child);
        }
        prodWithChildren.setDiscount(product.discount);
        prodWithChildren.setDiscountType(product.discount_type);
        prodWithChildren.setMoq(product.moq);
        prodWithChildren.setMrp(product.mrp);
        prodWithChildren.setPricePerUnit(product.price_per_unit);
        prodWithChildren.setPriceTlCommission(product.price_tl_commission);
        prodWithChildren.setPriceTlSingleBuy(product.price_tl_single_buy);
        prodWithChildren.setSkuId(product.sku_id);
        prodWithChildren.setCustomText(product.custom_text);
        prodWithChildren.setCustomSymbol(product.custom_symbol);
        prodWithChildren.setCouponCode(product.coupon_code);
        prodWithChildren.setCustomSymbol(product.custom_symbol);
        req.addProductsinput(prodWithChildren);
    }

    const productsOutput = new ApplyPriceDropResp();

    return new Promise<any>((resolve, reject) => {
        grpcClient.applyPriceDrops(req, meta, (err, resp) => {
            if (err) {
                reject(err);
            }
            const prodWithChildren = resp.getProductsoutputList();
            for (const prod of prodWithChildren) {
                productsOutput.addProductsoutput(prod);
            }
            resolve(productsOutput.toObject());
        });
    });
};

const main = async () => {
    for (let i = 0; i < 4; i++) {
        const offset = i * 10;
        const limit = 2;
        const result = await applyPriceDrops(offset, limit);
        console.log('offset', offset, 'limit', limit, 'result', result);
    }
};

main().then(console.log).catch(console.error);
