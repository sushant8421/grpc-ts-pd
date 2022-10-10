import { priceDropProducer } from './client';

export const sendPriceDropUpdates = async (): Promise<any> => {
    await priceDropProducer.sendMultipleMessages(generatePriceDropCommands());
    return 'Price Drop Updates sent successfully';
};

const generatePriceDropCommands = () => {
    const commands: priceDropProducer.IPriceDropCommand[] = [];
    for (let i = 0; i < 2; i++) {
        commands.push({
            type: 'PRICE_DROP_UPDATES',
            payload: {
                admin_id: '19636',
                file_id: '1',
                row_data: {
                    tag: 'New PD',
                    catalogue_name: 'DELHI_NCR',
                    sku_id: `CM123${i}`,
                    deal_price: 75.0 + i,
                    moq: i + 1,
                    commission_percent: 1 + i,
                    campaign_name: 'HappyHourPD',
                    campaign_type: 'Acquisition',
                    campaign_description: 'HappyHourPD',
                    coupon_code: 'PrincewareStorage & Containers@65_NE',
                    is_active: true,
                    start_time: '2022-01-29T16:20:59.000Z',
                    end_time: '2022-12-05T12:29:59.000Z',
                    clubbing_key: 'HappyHourPD',
                    use_case_filter: 'New Cx',
                    priority: i + 10,
                    min_cart_value: 0,
                    disallowed_tags: ['ALL_CL', 'ALL_SY', 'ALL_AB', 'ALL_GK'],
                },
            },
        });
    }
    return commands;
};

sendPriceDropUpdates().then(console.log).catch(console.error);
