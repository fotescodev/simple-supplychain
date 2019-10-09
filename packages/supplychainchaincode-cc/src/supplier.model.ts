import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Supplier extends ConvectorModel<Supplier> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Supplier';

  @Required()
  @Validate(yup.string())
  public name: string;


  /** 
   * rawMaterialAvailable: 
   * the quantity of raw material available to be supplied
   */
  @Required()
  @Validate(yup.number())
  public rawMaterialAvailable: number;


}
