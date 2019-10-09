import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Retailer extends ConvectorModel<Retailer> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Retailer';

  @Required()
  @Validate(yup.string())
  public name: string;

  /**
   * productsOrdered: the quantity of products ordered
   */
  @Required()
  @Validate(yup.number())
  public productsOrdered: number;

  /**
   * productsAvailable:
   * the quantity of products available for sale
   */
  @Required()
  @Validate(yup.number())
  public productsAvailable: number;

  /**
   * productsSold: 
   * the quantity of products that have been sold
   */
  @Required()
  @Validate(yup.number())
  public productsSold: number;
}
