import React from 'react';
import AttributeImage from "../../../../pages/checkout/includes/attributes/AttributeImage";
import {Link} from "react-router-dom";
import {characterLimiter} from "../../../../utils/Helpers";
import AttrConfigs from "../../../../pages/checkout/includes/attributes/AttrConfigs";
import {singleProductTotal} from "../../../../utils/CartHelpers";
import {cartItemCheckedVariousTotal} from "../../../../utils/AliHelpers";

const OrderBody = (props) => {

	const {product, currency} = props;


	const productPageLink = (product) => {
		const ItemId = product?.ItemId;
		const ProviderType = product?.ProviderType;
		return ProviderType === 'aliexpress' ? `/aliexpress/product/${ItemId}` : `/product/${ItemId}`;
	};


	return (
		<div className="cartItem">
			{
				product?.item_variations?.map((variation, index) =>
					<div className="variation" key={index}>
						<div className="row align-items-center">
							<div className="col-2">
								<AttributeImage product={product} productPageLink={productPageLink(product)} attributes={variation?.attributes}/>
							</div>
							<div className="col-10">

								<Link to={productPageLink(product)} title={product.Title}>
									{characterLimiter(product.Title, 130)}
								</Link>
								<div>
									<p className="my-1 small">Provider: <strong>{product.ProviderType}</strong></p>
									<p className="my-1 small">Weight: <strong>{product.weight} Kg.</strong>
										<span className="ml-2">Shipping Rate: <strong>{currency + ' ' + product.shipping_rate}</strong> per Kg.</span>
									</p>
									{
										product.ProviderType === 'aliexpress' &&
										<p className="my-1 small">Shipping Type: <strong>{product.shipping_type}</strong></p>
									}
								</div>
								{
									JSON.parse(variation?.attributes).length > 0 &&
									<div className="row">
										<div className="col-12">
											<div className="mb-2 small">Variations: <strong><AttrConfigs attributes={variation?.attributes}/></strong></div>
										</div>
									</div>
								}
								<div className="row align-items-center">
									<div className="col-6 text-left ">
										<p className="m-0 pt-3 pt-lg-0"><strong>{`${currency + ' ' + variation.price} x ${variation.qty}`}</strong>
										</p>
									</div>
									<div className="col-6 text-right">
										<p className="m-0 pt-3 pt-lg-0">
											<strong>{`${currency + ' ' + Math.round(Number(variation.qty) * Number(variation.price))}`}</strong></p>
									</div>
								</div>

							</div>
						</div>

						<hr className="my-2"/>

					</div>
				)
			}
			<div className="clearfix">
				<div className="text-right">
					Product Total: <strong>{currency + ' ' + (parseInt(product?.product_value) - parseInt(product?.DeliveryCost))}</strong>
				</div>
			</div>
			<hr className="my-2"/>
			{
				product?.ProviderType === "aliexpress" && parseInt(product?.DeliveryCost) > 0 &&
				<div className="row">
					<div className="col-12">
						<div className="text-right">
							{
								product?.shipping_type === 'express' ?
									`China Local Delivery Charge: `
									:
									`China to BD Shipping Charge: `
							}
							<strong>{currency + ' ' + product?.DeliveryCost}</strong>
						</div>
					</div>
				</div>
			}

			{
				product?.ProviderType !== "aliexpress" && parseInt(product?.DeliveryCost) > 0 &&
				<div className="row">
					<div className="col-12">
						<div className="text-right">
							China Local Shipping cost: <strong>{currency + ' ' + product?.DeliveryCost}</strong>
						</div>
					</div>
				</div>
			}
			{parseInt(product?.DeliveryCost) > 0 && <hr className="my-2"/>}

			<div className="row">
				<div className="col-12">
					<div className="text-right">Subtotal: <strong>{currency + ' ' + product?.product_value}</strong>
					</div>
				</div>
			</div>
			<hr className="my-2"/>
		</div>
	);
};

export default OrderBody;