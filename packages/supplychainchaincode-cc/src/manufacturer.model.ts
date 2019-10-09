import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Manufacturer extends ConvectorModel<Manufacturer> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Manufacturer';

  @Required()
  @Validate(yup.string())
  public name: string;

  /**
   * productsAvailable:
   * the quantity of products ready to be distributed
   */
  @Required()
  @Validate(yup.number())
  public productsAvailable: number;

  /**
   * rawMaterialAvailable: 
   * the quantity of raw material available to be used for creating products
   */

  @Required()
  @Validate(yup.number())
  public rawMaterialAvailable: number;

}
