export interface Product {
  ProductID: number;
  ProductName?: string;
  SupplierID?: number;
  CategoryID?: number;
  QuantityPerUnit?: string;
  UnitPrice?: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: number;
  Discontinued?: boolean;
  Category?: ProductCategory;
  expanded?: boolean;
  inEdit?: boolean | string;
  locked?: boolean;
}

export interface ProductCategory {
  CategoryID?: number;
  CategoryName?: string;
  Description?: string;
  details?: any;
}