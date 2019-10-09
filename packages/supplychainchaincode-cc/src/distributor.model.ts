import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Distributor extends ConvectorModel<Distributor> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Distributor';

  @Required()
  @Validate(yup.string())
  public name: string;

  /**
  * productsToBeShipped:
  * the quantity of products ready to be shipped 
  */
  @Required()
  @Validate(yup.number())
  public productsToBeShipped: number;

  /**
   * productsShipped:
   * the quantity of products shipped
   */
  @Required()
  @Validate(yup.number())
  public productsShipped: number;

  /**
    * productsReceived:
    * the quantity of products shipped that have been received.
    */
  @Required()
  @Validate(yup.number())
  public productsReceived: number;
}