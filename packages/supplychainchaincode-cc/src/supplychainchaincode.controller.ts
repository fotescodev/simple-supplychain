import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';
 
import { Supplier } from './supplier.model';
import { Manufacturer } from './manufacturer.model';
import { Distributor } from './distributor.model';
import { Retailer } from './retailer.model';
import { Customer } from './customer.model';
 
@Controller('supplychainchaincode')
export class SupplychainchaincodeController extends ConvectorController {
 
  /**
   * Creates a new Supplier
   * @param supplier 
   */
  @Invokable()
  public async createSupplier(
    @Param(Supplier)
    supplier: Supplier
  ) {
    await supplier.save();
  }
  /**
   * Creates a new manufacturer
   * @param manufacturer 
   */
  @Invokable()
  public async createManufacturer(
    @Param(Manufacturer)
    manufacturer: Manufacturer
  ) {
    await manufacturer.save();
  }
 
  /**
   * Creates a new distributor
   * @param distributor 
   */
  @Invokable()
  public async createDistributor(
    @Param(Distributor)
    distributor: Distributor
  ) {
    await distributor.save();
  }
 
  /**
   * Creates a new Retailer
   * @param retailer 
   */
  @Invokable()
  public async createRetailer(
    @Param(Retailer)
    retailer: Retailer
  ) {
    await retailer.save();
  }
 
  /**
   * Creates a new customer
   * @param customer 
   */
  @Invokable()
  public async createCustomer(
    @Param(Customer)
    customer: Customer
  ) {
    await customer.save();
  }
 
  /**
   * Fetches all the suppliers
   */
  @Invokable()
  public async getAllSuppliers()
  {
    const storedSuppliers = await Supplier.getAll<Supplier>();
    return storedSuppliers;
  }
 
  /**
   * Fetches a Supplier based on supplierId
   * @param supplierId 
   */
  @Invokable()
  public async getSupplierById(
    @Param(yup.string())
    supplierId: string
  )
  {
    const supplier = await Supplier.getOne(supplierId);
    return supplier;
  }
 
  /**
   * Fetches all Manufacturers
   */
  @Invokable()
  public async getAllManufacturers()
  {
    const storedManufacturers = await Manufacturer.getAll<Manufacturer>();
        return storedManufacturers;
  }
 
  /**
   * Fetches a Manufacturer based on the manufacturerId
   * @param manufacturerId 
   */
  @Invokable()
  public async getManufacturerById(
    @Param(yup.string())
    manufacturerId: string
  )
  {
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    return manufacturer;
  }
 
  /**
   * Fetches all Distributors
   */
  @Invokable()
  public async getAllDistributors()
  {
    const storedDistributors = await Distributor.getAll<Distributor>();
    return storedDistributors
  }
 
  /**
   * Fetches a Distributor based on the distributorId
   * @param distributorId 
   */
  @Invokable()
  public async getDistributorById(
    @Param(yup.string())
    distributorId: string
  )
  {
    const distributor = await Distributor.getOne(distributorId);
    return distributor;
  }
 
  /**
   * Fetches all the Retailers
   */
  @Invokable()
  public async getAllRetailers()
  {
    const storedRetailers = await Retailer.getAll<Retailer>();
    return storedRetailers;
  }
 
  /**
   * Fetches a Retailer based on the retailerId
   * @param retailerId 
   */
  @Invokable()
  public async getRetailerById(
    @Param(yup.string())
    retailerId: string
  )
  {
    const retailer = await Retailer.getOne(retailerId);
    return retailer;
  }
 
  /**
   * Fetches all Customers 
   */
  @Invokable()
  public async getAllCustomers()
  {
    const storedCustomers = await Customer.getAll<Customer>();
    return storedCustomers;
  }
 
  /**
   * Fetches a Customer based on the customerId
   * @param customerId 
   */
  @Invokable()
  public async getCustomerById(
    @Param(yup.string())
    customerId: string
  )
  {
    const customer = await Customer.getOne(customerId);
    return customer;
  }
 
  /**
   * Fetching all models
   */
  @Invokable()
  public async getAllModels()
  {
    const storedCustomers = await Customer.getAll<Customer>();
    console.log(storedCustomers);
 
    const storedRetailers = await Retailer.getAll<Retailer>();
    console.log(storedRetailers);
 
    const storedDistributors = await Distributor.getAll<Distributor>();
    console.log(storedDistributors);
 
    const storedManufacturers = await Manufacturer.getAll<Manufacturer>();
    console.log(storedManufacturers);
 
    const storedSuppliers = await Supplier.getAll<Supplier>();
    console.log(storedSuppliers);
  }
 
  /**
   * Summary: Supplier increases its own material available
   * @param supplierId 
   * @param rawMaterialSupply 
   */
  @Invokable()
  public async fetchRawMaterial(
    @Param(yup.string())
    supplierId: string,
    @Param(yup.number())
    rawMaterialSupply: number
  ) {
    const supplier = await Supplier.getOne(supplierId);
    supplier.rawMaterialAvailable = supplier.rawMaterialAvailable + rawMaterialSupply;
    await supplier.save();
  }
 
  /**
   * Summary: Manufacturer purchases raw material from Supplier
   * Supplier rawMaterialAvailable respectively decreases 
   * @param manufacturerId 
   * @param supplierId 
   * @param rawMaterialSupply 
   */
  @Invokable()
  public async getRawMaterialFromSupplier(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    supplierId: string,
    @Param(yup.number())
    rawMaterialSupply: number
  ) {
    const supplier = await Supplier.getOne(supplierId);
    supplier.rawMaterialAvailable = supplier.rawMaterialAvailable - rawMaterialSupply;
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    manufacturer.rawMaterialAvailable = rawMaterialSupply + manufacturer.rawMaterialAvailable;
 
    await supplier.save();
    await manufacturer.save();
  }
 
  /**
   * Summary: Manufacturer creates product using the raw material
   * available rawMaterial respectively decreases
   * @param manufacturerId 
   * @param rawMaterialConsumed 
   * @param productsCreated 
   */
  @Invokable()
  public async createProducts(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.number())
    rawMaterialConsumed: number,
    @Param(yup.number())
    productsCreated: number
  ) {
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    manufacturer.rawMaterialAvailable = manufacturer.rawMaterialAvailable - rawMaterialConsumed;
    manufacturer.productsAvailable = manufacturer.productsAvailable + productsCreated;
    await manufacturer.save();
  }
 
  /**
   * Summary: manufacturer sends the products to distribution
   * once the distributer receives the products the distributor's 
   * productsToBeShipped value respectively increases
   * @param manufacturerId 
   * @param distributorId 
   * @param sentProducts 
   */
  @Invokable()
  public async sendProductsToDistribution(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.number())
    sentProducts: number
  ) {
    const distributor = await Distributor.getOne(distributorId);
    distributor.productsToBeShipped = distributor.productsToBeShipped + sentProducts;
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    manufacturer.productsAvailable = manufacturer.productsAvailable - sentProducts;
 
    await distributor.save();
    await manufacturer.save();
  }
 
  /**
   * Summary: retailer orders a specific amount of products increasing the productsOrdered value
   * Ordered products are automatically queued to be shipped by the Distributor, 
   * decreasing productsToBeShipped value
   * @param retailerId 
   * @param distributorId 
   * @param orderedProducts 
   */
  @Invokable()
  public async orderProductsFromDistributor(
    @Param(yup.string())
    retailerId: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.number())
    orderedProducts: number
  ) {
    const retailer = await Retailer.getOne(retailerId);
    retailer.productsOrdered = retailer.productsOrdered + orderedProducts;
    const distributor = await Distributor.getOne(distributorId);
    distributor.productsToBeShipped = distributor.productsToBeShipped - orderedProducts;
    distributor.productsShipped = distributor.productsShipped + orderedProducts;
 
    await retailer.save();
    await distributor.save();
  }
 
  /**
   * Summary: the Retailer receives the products from the Distributer
   * productsAvailable value increases
   * Distributor's productsReceived value increases as well
   * @param retailerId 
   * @param distributorId 
   * @param receivedProducts 
   */
  @Invokable()
  public async receiveProductsFromDistributor(
    @Param(yup.string())
    retailerId: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.number())
    receivedProducts: number
  ) {
    const retailer = await Retailer.getOne(retailerId);
    retailer.productsAvailable = retailer.productsAvailable + receivedProducts;
    const distributor = await Distributor.getOne(distributorId);
    distributor.productsReceived = distributor.productsReceived + receivedProducts;
 
    await retailer.save();
    await distributor.save();
  }

  /**
    * Summary: Customer purchases a product
    * Retailer's value of productsBought increases
    * Retailer's productsAvailable decreases
    * @param retailerId 
    * @param customerId 
    * @param boughtProducts 
    */
  @Invokable()
  public async buyProductsFromRetailer(
    @Param(yup.string())
    retailerId: string,
    @Param(yup.string())
    customerId: string,
    @Param(yup.number())
    boughtProducts: number
  ) {
    const retailer = await Retailer.getOne(retailerId);
    retailer.productsAvailable = retailer.productsAvailable - boughtProducts;
    retailer.productsSold = retailer.productsSold + boughtProducts;
    const customer = await Customer.getOne(customerId);
    customer.productsBought = customer.productsBought + boughtProducts;
 
    await retailer.save();
    await customer.save();
  }
}