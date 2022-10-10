import pgPromise, { IEventContext } from 'pg-promise';
import bluebird from 'bluebird';

const CMDB_URL = process.env.CMDB_URL || 'postgres://cm:cm@localhost:5432/cmdb';

const pgp = pgPromise({
    promiseLib: bluebird,
    error(error: Error, e: IEventContext) {
        return { ...error, DB_ERROR: true };
    },
});

function getDbClient(url: string) {
    pgp.pg.types.setTypeParser(pgp.pg.types.builtins.NUMERIC, parseFloat);
    const db = pgp({
        connectionString: url,
    });
    return db;
}

export type IProductsInput = {
    discount: number;
    discount_type: string;
    moq: number;
    mrp: number;
    price_per_unit: string;
    price_tl_commission: number;
    price_tl_single_buy: number;
    sku_id: string;
    custom_text: string;
    custom_symbol: string;
    coupon_code: string;
    min_cart_value: number;
    children: {
        discount: number;
        discount_type: string;
        moq: number;
        mrp: number;
        price_per_unit: string;
        price_tl_commission: number;
        price_tl_single_buy: number;
        sku_id: string;
        custom_text: string;
        custom_symbol: string;
        coupon_code: string;
    };
};

export type IPriceDropInput = {
    productsInput: IProductsInput[];
    catalogue_name: string;
    userTags: string[];
    trace_id: string;
};

// generate a json file with 100 records of following format from join of products and tag_wise_price_drops

/**
 *
 * {
  "productsInput": [
    {
      "discount": 1.1,
      "discount_type": "Hello",
      "moq": 10,
      "mrp": 1000,
      "price_per_unit": "Hello",
      "price_tl_commission": 1.1,
      "price_tl_single_buy": 1.1,
      "sku_id": "CM009974",
      "custom_text": "Hello",
      "custom_symbol": "Hello",
      "coupon_code": "Hello",
      "min_cart_value": 1.1,
      "children": [
        {
          "discount": 1.1,
          "discount_type": "Hello",
          "moq": 10,
          "mrp": 1000,
          "price_per_unit": "Hello",
          "price_tl_commission": 1.1,
          "price_tl_single_buy": 1.1,
          "sku_id": "CM009974",
          "custom_text": "Hello",
          "custom_symbol": "Hello",
          "coupon_code": "Hello"
        }
      ]
    }
  ],
  "catalogue_name": "DELHI_NCR",
  "userTags": [
    "DIGITALLY_ACQUIRED"
  ],
  "trace_id": "e4b3ce88-a1ce-4320-a06e-e1e93e65bb9e"
}
 */

const cmdb = getDbClient(CMDB_URL);

export const getPriceDropInput = async (offset: number, limit: number): Promise<IProductsInput[]> => {
    const productsInput: IProductsInput[] = [];

    const skus = await cmdb.any(
        `SELECT distinct p.sku_id FROM products p join tag_wise_price_drops t on p.sku_id = t.sku_id where t.end_time > NOW() order by p.sku_id offset $(offset) limit $(limit)`,
        { offset, limit },
    );
    // get productsInput of above format from products for each sku
    for (const sku of skus) {
        const product = await cmdb.one(
            `SELECT
                0 as discount,
                discount_type,
                moq,
                mrp,
                price_per_unit,
                price_tl_commission,
                price_tl_single_buy,
                sku_id,
                custom_text,
                custom_symbol,
                '' as coupon_code,
                0 as min_cart_value,
                variant_identifier
            FROM products where sku_id = $1`,
            [sku.sku_id],
        );
        const children = await cmdb.any(
            `SELECT
                0 as discount,
                discount_type,
                moq,
                mrp,
                price_per_unit,
                price_tl_commission,
                price_tl_single_buy,
                sku_id,
                custom_text,
                custom_symbol,
                '' as coupon_code
            FROM products where variant_identifier = $(variant_identifier) and sku_id = $(sku_id)`,
            {
                variant_identifier: product.variant_identifier,
                sku_id: product.sku_id,
            },
        );
        delete product.variant_identifier;
        productsInput.push({ ...product, children });
        // const priceDropInput: IPriceDropInput = {
        //     productsInput,
        //     catalogue_name: 'DELHI_NCR',
        //     userTags: ['DIGITALLY_ACQUIRED'],
        //     trace_id: 'e4b3ce88-a1ce-4320-a06e-e1e93e65bb9e',
        // };
    }

    // console.log(productsInput);
    return productsInput;
};
