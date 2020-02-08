import "./scss/index.scss";

import * as React from "react";

import { TextField } from "@components/molecules";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_attributes,
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";

import { CartContext, CartLine } from "../CartProvider/context";
import AddToCart from "./AddToCart";

interface ProductDescriptionProps {
  productVariants: ProductDetails_product_variants[];
  selectedAttributes: ProductDetails_product_attributes[];
  name: string;
  pricing: ProductDetails_product_pricing;
  children: React.ReactNode;
  addToCart(varinatId: string, quantity?: number): void;
  setVariantId(variantId: string);
}

interface ProductDescriptionState {
  quantity: number;
  variant: string;
  variantStock: number;
  variantPricing: ProductDetails_product_variants_pricing;
  eachVariantPricingRange: {
    min: number;
    max: number;
    currency: string;
  };
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      eachVariantPricingRange: this.getEachVariantPricingRange(),
      quantity: 1,
      variant: "",
      variantPricing: null,
      variantStock: null,
    };
  }

  getEachVariantPricingRange = () => {
    const { productVariants } = this.props;

    if (productVariants && productVariants.length) {
      const currency = productVariants[0].pricing.price.gross.currency;
      let min = productVariants[0].pricing.price.gross.amount;
      let max = productVariants[0].pricing.price.gross.amount;

      for (let index = 1; index < productVariants.length; index++) {
        const variant = productVariants[index];
        const variantAmount = variant.pricing.price.gross.amount;

        if (variantAmount < min) {
          min = variantAmount;
        } else if (variantAmount > max) {
          max = variantAmount;
        }
      }

      return {
        currency,
        max,
        min,
      };
    } else {
      return null;
    }
  };

  getLocalPriceFormat = (amount: number, currency: string) => {
    return amount.toLocaleString(undefined, {
      currency,
      style: "currency",
    });
  };

  getProductPrice = () => {
    const { pricing } = this.props;
    const { variantPricing, eachVariantPricingRange } = this.state;

    if (variantPricing) {
      const { amount, currency } = variantPricing.price.gross;
      return this.getLocalPriceFormat(amount, currency);
    } else if (eachVariantPricingRange) {
      const { min, max, currency } = eachVariantPricingRange;
      if (min === max) {
        return this.getLocalPriceFormat(min, currency);
      } else {
        return `${this.getLocalPriceFormat(
          min,
          currency
        )} - ${this.getLocalPriceFormat(max, currency)}`;
      }
    } else {
      const {
        start: {
          gross: { amount: min, currency },
        },
        stop: {
          gross: { amount: max },
        },
      } = pricing.priceRange;
      if (min === max) {
        return this.getLocalPriceFormat(min, currency);
      } else {
        return `${this.getLocalPriceFormat(
          min,
          currency
        )} - ${this.getLocalPriceFormat(max, currency)}`;
      }
    }
  };

  onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      this.setState({
        variant: selectedVariant.id,
        variantPricing: selectedVariant.pricing,
        variantStock: selectedVariant.stockQuantity,
      });
      this.props.setVariantId(selectedVariant.id);
    } else {
      this.setState({ variant: "", variantPricing: null });
      this.props.setVariantId("");
    }
  };

  handleSubmit = () => {
    this.props.addToCart(this.state.variant, this.state.quantity);
  };

  canAddToCart = (lines: CartLine[]) => {
    const { variant, quantity, variantStock } = this.state;
    const cartLine = lines.find(({ variantId }) => variantId === variant);
    const syncedQuantityWithCart = cartLine
      ? quantity + cartLine.quantity
      : quantity;
    return quantity !== 0 && variant && variantStock >= syncedQuantityWithCart;
  };

  render() {
    const { children, name, selectedAttributes } = this.props;
    const { quantity } = this.state;

    return (
      <div className="product-description">
        <h3>{name}</h3>
        <h4>{this.getProductPrice()}</h4>
        <div>
          {selectedAttributes.map(
            ({ attribute, values }) =>
              values.length > 0 && (
                <div
                  className="product-description__selected-attributes"
                  key={attribute.id}
                >
                  <span>{`${attribute.name}: `}</span>
                  <span>{values.map(({ name }) => name).join(", ")}</span>
                </div>
              )
          )}
        </div>
        <div className="product-description__variant-picker">
          <ProductVariantPicker
            productVariants={this.props.productVariants}
            onChange={this.onVariantPickerChange}
            selectSidebar={true}
          />
        </div>
        <div className="product-description__quantity-input">
          <TextField
            type="number"
            label="Quantity"
            min="1"
            value={quantity || ""}
            onChange={e =>
              this.setState({ quantity: Math.max(1, Number(e.target.value)) })
            }
          />
        </div>
         <div className="container">
  <div className="interior">
    <a  href="#open-modal" className="under">View Size Chart</a>
  </div>
</div>
<div id="open-modal" className="modal-window">
  <div>
    <a href="#" title="Close" className="modal-close">X</a>
    <span className="mysize"> WOMEN`S SIZE CHART (Measurements in inches)</span>
    <div className="content">
    
            <table>
  <thead>
    <tr> 
      <th  className="cont">SIZE  (UK/USA)  </th>
      <th  className="cont">BUST</th>
      <th  className="cont">WAIST</th>
      <th className="cont" >HIP </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-column="First Name">UK4 / US0</td>
      <td data-column="Last Name">31</td>
      <td data-column="Job Title">23.5</td>
      <td data-column="Twitter">33</td>
    </tr>
    <tr>
      <td data-column="First Name">UK6 / US2</td>
      <td data-column="Last Name">32</td>
      <td data-column="Job Title">24.5</td>
      <td data-column="Twitter">34</td>
    </tr>
    <tr>
      <td data-column="First Name">UK8 / US4</td>
      <td data-column="Last Name">33</td>
      <td data-column="Job Title">25.5</td>
      <td data-column="Twitter">35</td>
    </tr>
    <tr>
      <td data-column="First Name">UK10 / US6</td>
      <td data-column="Last Name">35</td>
      <td data-column="Job Title">27.5</td>
      <td data-column="Twitter">37</td>
    </tr>
    <tr>
      <td data-column="First Name">UK12 / US8</td>
      <td data-column="Last Name">37</td>
      <td data-column="Job Title">29.5</td>
      <td data-column="Twitter">39</td>
    </tr>
        <tr>
      <td data-column="First Name">UK14 / US10</td>
      <td data-column="Last Name">39</td>
      <td data-column="Job Title">31.5</td>
      <td data-column="Twitter">41</td>
    </tr>
        <tr>
      <td data-column="First Name">UK16 / US12</td>
      <td data-column="Last Name">41</td>
      <td data-column="Job Title">33.5</td>
      <td data-column="Twitter">43</td>
    </tr>
 
            <tr>
      <td data-column="First Name">UK18 / US14</td>
      <td data-column="Last Name">43.5</td>
      <td data-column="Job Title">36</td>
      <td data-column="Twitter">45.5</td>
    </tr>
            <tr>
      <td data-column="First Name">UK20 / US16</td>
      <td data-column="Last Name">46.5</td>
      <td data-column="Job Title">39</td>
      <td data-column="Twitter">48.5</td>
    </tr>
            <tr>
      <td data-column="First Name">UK22 / US18</td>
      <td data-column="Last Name">49</td>
      <td data-column="Job Title">41.5</td>
      <td data-column="Twitter">51</td>
    </tr>
              <tr>
      <td data-column="First Name">UK24 / US20</td>
      <td data-column="Last Name">52</td>
      <td data-column="Job Title">44.5</td>
      <td data-column="Twitter">54</td>
    </tr>
  </tbody>
</table>
            </div>
 
 
  </div>
    </div>
        <div className="product-description__about">
          <h4>Description</h4>
          {children}
        </div>
        <CartContext.Consumer>
          {({ lines }) => (
            <AddToCart
              onSubmit={this.handleSubmit}
              lines={lines}
              disabled={!this.canAddToCart(lines)}
            />
          )}
        </CartContext.Consumer>
      </div>
    );
  }
}

export default ProductDescription;
