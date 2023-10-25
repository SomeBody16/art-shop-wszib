
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum DeliveryEstimateUnit {
    business_day = "business_day",
    day = "day",
    hour = "hour",
    month = "month",
    week = "week"
}

export enum OrderStatus {
    canceled = "canceled",
    complete = "complete",
    processing = "processing",
    waiting_for_payment = "waiting_for_payment"
}

export enum RolePermission {
    LOGIN = "LOGIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}

export interface AdminCreateInput {
    email: string;
    roleId: string;
}

export interface AdminModelPaginateQuery {
    filter?: Nullable<JSON>;
    limit?: Nullable<number>;
    page?: Nullable<number>;
    search?: Nullable<string>;
    searchBy?: Nullable<string[]>;
    sortBy?: Nullable<JSON>;
}

export interface AdminPatchInput {
    email?: Nullable<string>;
    roleId?: Nullable<string>;
}

export interface CustomerModelPaginateQuery {
    filter?: Nullable<JSON>;
    limit?: Nullable<number>;
    page?: Nullable<number>;
    search?: Nullable<string>;
    searchBy?: Nullable<string[]>;
    sortBy?: Nullable<JSON>;
}

export interface OrderModelPaginateQuery {
    filter?: Nullable<JSON>;
    limit?: Nullable<number>;
    page?: Nullable<number>;
    search?: Nullable<string>;
    searchBy?: Nullable<string[]>;
    sortBy?: Nullable<JSON>;
}

export interface ProductCreateInput {
    available?: Nullable<number>;
    currency: string;
    description: string;
    imageIds: string[];
    name: string;
    price: number;
    publishedAt?: Nullable<DateTime>;
    shippingCountries: string[];
    slug: string;
}

export interface ProductModelPaginateQuery {
    filter?: Nullable<JSON>;
    limit?: Nullable<number>;
    page?: Nullable<number>;
    search?: Nullable<string>;
    searchBy?: Nullable<string[]>;
    sortBy?: Nullable<JSON>;
}

export interface ProductPatchInput {
    available?: Nullable<number>;
    currency?: Nullable<string>;
    description?: Nullable<string>;
    imageIds?: Nullable<string[]>;
    name?: Nullable<string>;
    price?: Nullable<number>;
    publishedAt?: Nullable<DateTime>;
    shippingCountries?: Nullable<string[]>;
}

export interface RoleCreateInput {
    name: string;
    permissions: RolePermission[];
}

export interface RoleModelPaginateQuery {
    filter?: Nullable<JSON>;
    limit?: Nullable<number>;
    page?: Nullable<number>;
    search?: Nullable<string>;
    searchBy?: Nullable<string[]>;
    sortBy?: Nullable<JSON>;
}

export interface RolePatchInput {
    name?: Nullable<string>;
    permissions?: Nullable<RolePermission[]>;
}

export interface ShippingRateCreateInput {
    currency: string;
    deliveryEstimateMaxUnit: DeliveryEstimateUnit;
    deliveryEstimateMaxVal: number;
    deliveryEstimateMinUnit: DeliveryEstimateUnit;
    deliveryEstimateMinVal: number;
    name: string;
    price: number;
}

export interface ShippingRateModelPaginateQuery {
    filter?: Nullable<JSON>;
    limit?: Nullable<number>;
    page?: Nullable<number>;
    search?: Nullable<string>;
    searchBy?: Nullable<string[]>;
    sortBy?: Nullable<JSON>;
}

export interface ShippingRatePatchInput {
    currency?: Nullable<string>;
    deliveryEstimateMaxUnit?: Nullable<DeliveryEstimateUnit>;
    deliveryEstimateMaxVal?: Nullable<number>;
    deliveryEstimateMinUnit?: Nullable<DeliveryEstimateUnit>;
    deliveryEstimateMinVal?: Nullable<number>;
    name?: Nullable<string>;
    price?: Nullable<number>;
}

export interface AddressModel {
    city: string;
    country: string;
    createdAt: DateTime;
    id: string;
    line1: string;
    line2?: Nullable<string>;
    state: string;
    updatedAt: DateTime;
    zipCode: string;
}

export interface AdminModel {
    createdAt: DateTime;
    email: string;
    id: string;
    role: RoleModel;
    roleId: string;
    updatedAt: DateTime;
}

export interface AdminModelPaginated {
    data: AdminModel[];
    meta: PaginatedResponseMeta;
}

export interface AuthTokenResponse {
    token: string;
}

export interface AuthUrlResponse {
    url: string;
}

export interface CustomerModel {
    address: AddressModel;
    addressIds: string[];
    createdAt: DateTime;
    email: string;
    id: string;
    ip: string;
    name: string;
    phone: string;
    surname: string;
    updatedAt: DateTime;
}

export interface CustomerModelPaginated {
    data: CustomerModel[];
    meta: PaginatedResponseMeta;
}

export interface EmptyResponse {
    success: boolean;
}

export interface IMutation {
    createAdmin(data: AdminCreateInput): AdminModel | Promise<AdminModel>;
    createProduct(data: ProductCreateInput): ProductModel | Promise<ProductModel>;
    createRole(data: RoleCreateInput): RoleModel | Promise<RoleModel>;
    createShippingRate(data: ShippingRateCreateInput): ShippingRateModel | Promise<ShippingRateModel>;
    deleteAdmin(id: string): EmptyResponse | Promise<EmptyResponse>;
    deleteOrder(id: string): EmptyResponse | Promise<EmptyResponse>;
    deleteProduct(id: string): EmptyResponse | Promise<EmptyResponse>;
    deleteRole(id: string): EmptyResponse | Promise<EmptyResponse>;
    deleteShippingRate(id: string): EmptyResponse | Promise<EmptyResponse>;
    login(code: string, redirectUrl: string, state: string): AuthTokenResponse | Promise<AuthTokenResponse>;
    patchAdmin(data: AdminPatchInput, id: string): AdminModel | Promise<AdminModel>;
    patchProduct(data: ProductPatchInput, id: string): ProductModel | Promise<ProductModel>;
    patchRole(data: RolePatchInput, id: string): RoleModel | Promise<RoleModel>;
    patchShippingRate(data: ShippingRatePatchInput, id: string): ShippingRateModel | Promise<ShippingRateModel>;
}

export interface OrderModel {
    createdAt: DateTime;
    currency: string;
    customerSnapshot: CustomerModel;
    id: string;
    paymentId: string;
    price: number;
    status: OrderStatus;
    updatedAt: DateTime;
}

export interface OrderModelPaginated {
    data: OrderModel[];
    meta: PaginatedResponseMeta;
}

export interface PaginatedResponseMeta {
    currentPage: number;
    filter?: Nullable<JSON>;
    itemsPerPage: number;
    search?: Nullable<string>;
    searchBy?: Nullable<string[]>;
    sortBy: JSON;
    totalItems: number;
    totalPages: number;
}

export interface ProductModel {
    available?: Nullable<number>;
    createdAt: DateTime;
    currency: string;
    description: string;
    id: string;
    imageIds: string[];
    name: string;
    price: number;
    publishedAt?: Nullable<DateTime>;
    shippingCountries: string[];
    slug: string;
    updatedAt: DateTime;
}

export interface ProductModelPaginated {
    data: ProductModel[];
    meta: PaginatedResponseMeta;
}

export interface IQuery {
    getAdmin(id: string): AdminModel | Promise<AdminModel>;
    getAdmins(query?: Nullable<AdminModelPaginateQuery>): AdminModelPaginated | Promise<AdminModelPaginated>;
    getAuthUrl(redirectUrl: string): AuthUrlResponse | Promise<AuthUrlResponse>;
    getCustomer(id: string): CustomerModel | Promise<CustomerModel>;
    getCustomers(query?: Nullable<CustomerModelPaginateQuery>): CustomerModelPaginated | Promise<CustomerModelPaginated>;
    getOrder(id: string): OrderModel | Promise<OrderModel>;
    getOrders(query?: Nullable<OrderModelPaginateQuery>): OrderModelPaginated | Promise<OrderModelPaginated>;
    getProduct(id: string): ProductModel | Promise<ProductModel>;
    getProducts(query?: Nullable<ProductModelPaginateQuery>): ProductModelPaginated | Promise<ProductModelPaginated>;
    getRole(id: string): RoleModel | Promise<RoleModel>;
    getRoles(query?: Nullable<RoleModelPaginateQuery>): RoleModelPaginated | Promise<RoleModelPaginated>;
    getShippingRate(id: string): ShippingRateModel | Promise<ShippingRateModel>;
    getShippingRates(query?: Nullable<ShippingRateModelPaginateQuery>): ShippingRateModelPaginated | Promise<ShippingRateModelPaginated>;
}

export interface RoleModel {
    createdAt: DateTime;
    id: string;
    name: string;
    permissions: RolePermission[];
    updatedAt: DateTime;
}

export interface RoleModelPaginated {
    data: RoleModel[];
    meta: PaginatedResponseMeta;
}

export interface ShippingRateModel {
    createdAt: DateTime;
    currency: string;
    deliveryEstimateMaxUnit: DeliveryEstimateUnit;
    deliveryEstimateMaxVal: number;
    deliveryEstimateMinUnit: DeliveryEstimateUnit;
    deliveryEstimateMinVal: number;
    id: string;
    name: string;
    price: number;
    updatedAt: DateTime;
}

export interface ShippingRateModelPaginated {
    data: ShippingRateModel[];
    meta: PaginatedResponseMeta;
}

export type DateTime = any;
export type JSON = any;
type Nullable<T> = T | null;
